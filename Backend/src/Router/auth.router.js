import express from 'express'
import { Login, Signup , Logout } from '../Controller/auth.controller.js'

let authRouter = express.Router()

authRouter.post('/signup' , Signup )
authRouter.post('/login' , Login )
authRouter.post('/logout' , Logout)

export default authRouter

