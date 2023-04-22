export const getPosts = (req, res) => {
    // The query is everything after the question mark in the address
    // localhost:3000/?cat=art
    // We can specify which query to take and that is the category.
    // Condition is that if there's a category, choose all posts with
    // category, else, select all posts.
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