import mongoose from "mongoose";

let blocklist = mongoose.Schema({
    token : {
        type : String , 
        required : [true , 'token is requrired for block listing'] ,
        unique : [true , 'token must be unique to blocklist']
    }
} , {timestamps : true})

// now doing ttl indexing that will delte my token from blocklist automatically after 
// it's exprires time completed

blocklist.index({createdAt : 1} , {expireAfterSeconds : 60 * 60 * 24 * 3 })

const BlockList = mongoose.model("blocklist", blocklist);
export default BlockList ;
