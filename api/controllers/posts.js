import { db } from "../db.js";

export const getPosts = (req, res) => {
    // The query is everything after the question mark in the address
    // localhost:3000/?cat=art
    // We can specify which query to take and that is the category.
    // Condition is that if there's a category, choose all posts with
    // category, else, select all posts.
    const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts";

    db.query(q, [req.query.cat], (err, data) => {
        if(err) return res.status(500).send(err)

        return res.status(200).json(data)
    })
}

export const getPost = (req, res) => {
    res.json("from controller")
}
export const addPost = (req, res) => {
    res.json("from controller")
}
export const deletePost = (req, res) => {
    res.json("from controller")
}
export const updatePost = (req, res) => {
    res.json("from controller")
}