import express from 'express'
//2 import all functions from controllers
import { register, login, logout } from '../controllers/auth.js'

const router = express.Router()

//2. POST method since we are sending our user information and the endpoint is /register.
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)


export default router