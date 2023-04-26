//1a
import express from 'express'
//3a
import authRoutes from './routes/auth.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
//4a
import cookieParser from 'cookie-parser'
//5a
import multer from 'multer';

//1b
const app = express()
//1c
app.use(express.json())
//4b
app.use(cookieParser())
//5b
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now()+file.originalname)
    }
})

const upload = multer({storage})

app.post('/api/upload', upload.single('file'), function (req, res) {
    const file = req.file;
    res.status(200).json(file.filename);
})

//3b
app.use("/api/auth", authRoutes)
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)


//1d
app.listen(8800,() => {
    console.log("Connected!")
})