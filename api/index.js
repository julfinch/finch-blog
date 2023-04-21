//1a
import express from 'express'
//3a
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
//4a
import cookieParser from 'cookie-parser'

//1b
const app = express()
//1c
app.use(express.json())
//4b
app.use(cookieParser())
//3b
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


//1d
app.listen(8800,() => {
    console.log("Connected!")
})