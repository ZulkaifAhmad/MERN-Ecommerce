import User from "../Schema/auth.schema.js";
import jwt from "jsonwebtoken";
import BlockList from "../Schema/blocklist.schema.js";

async function Signup(req, res) {
  try {
    const { username, password, email } = req.body;

    if (!username || !password || !email) {
      return res.status(300).json({
        message: "username , password , email is required",
      });
    }

    let check_user_by_email = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (check_user_by_email) {
      return res.status(300).json({
        message: "user already exists with this email",
      });
    }

    let user = User.create({
      username,
      password,
      email,
    });

    let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });
    res.cookies("token", token);

    await user.save();
    console.log('Signup Successfully')
    res.status(200).json({
      message: "signup successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
    });
  }
}

async function Login(req, res) {
  try {
    let { email, password } = req.body;
    if (!password || !email) {
      return res.status(300).json({
        message: "password , email is required",
      });
    }
    let check_user_credientials = await User.findOne({ email });
    if (!check_user_credientials) {
      return res.status(300).json({
        message: "user does not exists , please Signup first",
      });
    }
    let checkPassword = await check_user_credientials.comparePassword(password);
    if (!checkPassword) {
      return res.status(505).json({
        message: "Password Incorrect",
      });
    }
    const token = jwt.sign(
      { id: check_user_credientials._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );

    res.cookie("token", token);
    const user = check_user_credientials.toObject();
    delete user.password;
    console.log("User Login Successfully");
    res.status(200).json({
      message: "User Login Successfully",
      userData: user,
    });
  } catch (error) {
    res.status(505).json({
      message: error.message || error,
    });
  }
}

async function Logout(req, res) {
  let token = req.cookies.token;
  if (!token) {
    return res.status(404).json({
      message: "Token is Required",
    });
  }

  const checkBlockList = await BlockList.findOne({ token });

  if (checkBlockList) {
    return res.status(303).json({
      message: "Token Already Blocklisted",
    });
  }

  BlockList.create({ token });
  res.clearCookie("token");
  console.log('Logout Successfully')

  res.status(200).json({
    message: "Logout Successfully",
  });
}

export { Signup, Login, Logout };

