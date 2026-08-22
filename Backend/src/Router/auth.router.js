import express from 'express'
import { Login, Signup , Logout , AdminLogin } from '../Controller/auth.controller.js'

let authRouter = express.Router()

authRouter.post('/signup' , Signup )
authRouter.post('/login' , Login )
authRouter.post('/logout' , Logout)
authRouter.post('/admin/login' , AdminLogin)

export default authRouter

