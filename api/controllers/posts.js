import { db } from "../db.js";
import jwt from 'jsonwebtoken'

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
    // We will need to return username, title, desc, img, cat and date
    // We will use the 2 tables to connect the uid of post to id of the user posting the article.
    // We will find our posts using p.id which is 1, using uid in posts, we will look 
    // the corresponding id in the users who posted it and then take its username.
    // The question mark in the end is the id that we send from frontend using split method.
    // Since both tables have the same `img`, we have to differentiate them by
    // assigning u.img AS userImg then change the content in the frontend as {userImg}
    const q = "SELECT `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id = ?"

    // PARAMS is the id in our URL
    db.query(q, [req.params.id], (err, data) => {
        if(err) return res.status(500).json(err)

        //We are fetching single item, this returns an array, we will return first item 
        // which is our post.
        return res.status(200).json(data[0])
    })
}


export const addPost = (req, res) => {
    res.json("from controller")
}


export const deletePost = (req, res) => {
    // We will use jwt so that we can only delete our own posts and not by other's.
    // User must be authenticated to be able to delete its own posts by accessing Cookie Tab.
    // Don't forget to import jwt from 'jsonwebtoken'
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Not authenticated!")

    // Remember in auth.js, when we login, we are sending our id inside
    // const token = jwt.sign({ id: data[0].id }, "jwtkey"); and we will assign it here as userInfo
    jwt.verify(token, "jwtkey", (err, userInfo) => {
        if(err) return res.status(403).json("Token is not valid!")

        //req.params.id is the id we get that frontend sent
        //We can only DELETE from our DB if id received is the same as DB id and uid.
        const postId = req.params.id;
        const q = "DELETE FROM posts WHERE `id` = ? AND `uid` = ? ";

        db.query(q, [postId, userInfo.id], (err, data) => {
            if(err) return res.status(403).json("You can only delete your own posts!");

            return res.json("Post has been deleted!");
        })
    })
}


export const updatePost = (req, res) => {
    res.json("from controller")
}