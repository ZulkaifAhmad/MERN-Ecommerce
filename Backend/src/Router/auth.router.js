import express from 'express'
import { Login, Signup , Logout } from '../Controller/auth.controller.js'

let router = express.Router()

router.post('/signup' , Signup )
router.post('/login' , Login )
router.post('/logout' , Logout)

export default router

