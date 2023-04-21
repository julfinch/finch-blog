# BACKEND - FINCH BLOG

## INITIATE BACKEND
1. Cd to the `api folder` and npm init in the termnial.
    ```shell
         npm init -y
    ```
1. Create an `index.js` inside the `api folder`.
1. Install dependencies:
    ```shell
        npm install express mysql2 nodemon
    ```
1. Inside `package.json`, add `"type": "module",` and add `"start": "nodemon index.js"` under scripts:
    ```shell
        {
            "name": "api",
            "type": "module",
            "scripts": {
                "start": "nodemon index.js"
            },
        }
    ```
1. Create the database initially by writing the code insider `index.js`:
    ```shell
        import express from 'express'

        const app = express()

        app.use(express.json())

        app.listen(8800,() => {
            console.log("Connected!")
        })
    ```
1. Write `npm run start` in the terminal to run the database
    ```shell
        npm run start
    ```

## CREATE MYSQL CONNECTION
1. Under `api folder`, create a new file named `db.js`
    ```shell
        import mysql2 from 'mysql2'

        export const db = mysql2.createConnection({
            host:"localhost",
            user:"root",
            password:"BuchokoyMysql.1990",
            database:"blog_finch"
        })
    ```
1. Open MySQL Workbench, click Local instance and under SCHEMAS, right-click and then select Create Schema.
1. Write under name `blog_finch`, click Apply, click Apply again and then Finish. We should be able to see `blog_finch` already under SCHEMAS.
1. Under SCHEMAS, click dropdown for `blog_finch`, right-click on the Table and select Create a Table.
1. Set-up the following for our Table and click Apply, another Apply and then Finish.
    ```shell
        Table Name: users
        Column Name-----------Datatype----------PK----NN----AI
        id--------------------INT---------------✅----✅---✅
        username--------------VARCHAR(45)-------◼️----✅-----
        email-----------------VARCHAR(255)------◼️----✅-----
        password--------------VARCHAR(255)------◼️----✅-----
        img-------------------VARCHAR(255)------◼️----◼️-----
    ```
1. To verify that our Table was created, click `blog_finch` > Tables > `users`, right-click and select Select Rows - Limit 100.
1. Using the same procedure above, create a second Table named `posts`.
    ```shell
        Table Name: posts
        Column Name-----------Datatype----------PK----NN----AI
        id--------------------INT---------------✅----✅---✅
        title-----------------VARCHAR(255)------◼️----✅-----
        desc------------------VARCHAR(1000)-----◼️----✅-----
        img-------------------VARCHAR(255)------◼️----✅-----
        date------------------DATETIME----------◼️----✅-----
        uid-------------------INT---------------◼️----✅-----
    ```

1. Below the Table, click the `Foreign Keys` tab. Choose CASCADE so that when we delete a user, it's posts will be deleted too.
    ```shell
    Foreign Key Name------Referenced Table
    uid--------------------'blog'.'users'

    Foreign Key Details 'uid'
    Column-----------------Referenced Column
    ◼️id-----------------------------------
    ◼️title----------------------------------
    ◼️desc-----------------------------------
    ◼️img-----------------------------------
    ◼️date-----------------------------------
    ✅id---------------------id--------------


    On Update: CASCADE
    On Delete: CASCADE
    ```
### TESTING THE DATABASE FIRST
1. Go to `blog_finch` > Tables > `users`, right-click and select Select Rows - Limit 100.
1. Add a new user in the table and click Apply.
    ```shell
        id------username-------email-----------------password------img
        1-------test-----------test@gmail.com--------test----------
    ```
1. Create a post by going to `blog_finch` > Tables > `posts`, right-click and select Select Rows - Limit 100. **REMEMBER THAT THE USER ID WE CREATED BEFOREHAND IS 1**. Click Apply right after.
    ```shell
        id---title---desc---img----date-----------------------------uid
        1----title---desc---img----2015-12-20 10:01:00.999999-------1
    ```
1. Go to `users` table, refresh the table, and right-click on the sample user we created in the table then select `Delete row(s)` and don't forget to click APPLY. We should be expecting the `sample post` we linked to that user will be deleted automatically too.
1. Go to `posts` table, refresh the table by clicking the lightning icon and see if the sample post is already deleted.

## CREATING THE ROUTES
1. Under `api folder`, create new folder and name it `routes`. Then inside it, create the files namely `auth.js`, `posts.js`, and `users.js`. Paste the code below to each of the files.
    ```shell
        import express from 'express'

        const router = express.Router()

        export default router
    ```
1. Under `api folder`, create new folder and name it `controllers`. Then inside it, create the files namely `auth.js`, `posts.js`, and `users.js`.
1. Go back to the `index.js` and add the routes.
    ```shell
        import authRoutes from './routes/auth.js'
        import userRoutes from './routes/users.js'
        import postRoutes from './routes/posts.js'

        app.use("/api/auth", authRoutes)
        app.use("/api/users", userRoutes)
        app.use("/api/posts", postRoutes)
    ```
## AUTH.JS SETUP
1. Open `auth.js` under `routes` and add the POST method.
    ```shell
        import { register, login, logout } from '../controllers/auth.js'

        router.post('/register', register)
        router.post('/login', login)
        router.post('/logout', logout)
    ```
1. Install bcryptjs for encrypting passwords and jsonwebtoken:
    ```shell
        npm i bcryptjs jsonwebtoken cookie-parser
    ```

### REGISTER METHOD
1. Open `auth.js` under `controllers` and add the `REGISTER` method.
    ```shell
        import { db } from '../db.js';
        import bcrypt from 'bcryptjs';

        export const register = (req, res) => {
            //CHECK EXISTING USER
            const q = "SELECT * FROM users WHERE email = ? OR username = ?";

            db.query(q, [req.body.email, req.body.name], (err,data) => {
                if(err) return res.status(500).json(err);
                if(data.length) return res.status(409).json("User already exists!");

                //HASH THE PASSWORD AND CREATE A USER
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(req.body.password, salt);

                //ASSIGN INSERT METHOD FOR USERNAME,EMAIL AND PASSWORD
                const q = "INSERT INTO users(`username`,`email`,`password`) VALUES (?)";
                const values = [req.body.username, req.body.email, hash];

                //INSERT THE QUERY AND VALUES INTO OUR DB
                db.query(q, [values], (err, data) => {
                    if(err) return res.status(500).json(err);
                    return res.status(200).json("User has been created");
                })
            })
        }
    ```
1. Go back to the frontend folder `clent > src > pages > Register.jsx` and setup the registration process.

### LOGIN METHOD
1. Install `jsonwebtoken` and `cookie-parser` and import cookie-parser into our `index.js`.
    ```shell
        import cookieParser from 'cookie-parser'

        app.use(cookieParser())
    ```
1. Import `jsonwebtoken` inside `auth.js` in controllers folder.
    ```shell
        export const login = (req, res) => {
            //CHECK EXISTING USER
            const q = "SELECT * FROM users WHERE username = ?";

            db.query(q, [req.body.username], (err, data) => {
                if(err) return res.status(500).json(err);
                if(data.length === 0) return res.status(404).json("User not found!");
            
                //CHECK PASSWORD
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

            if(!isPasswordCorrect) return res.status(400).json("Wrong username or password!")

            const token = jwt.sign({id:data[0].id}, "jwtkey");
            //Deconstrut data[0] so that we can separate password from other info because we don't want password to be sent back for security reasons.
            const {password, ...other} = data[0];

            //HTTPONLY means other methods cannot access our cookie except API requests using HTTP for more security.
            //We will be requesting all other information except for the password for security.
            res.cookie("access_token", token, {
                httpOnly: true,
            }).status(200).json(other)
            })
        }
    ```
1. From here, we should be able to see inside Cookies tab in the browser that a cookie was made during login and that we are beign redirected succesfully into the homepage.
1. Setup the **CONTEXT API** in the frontend after this.

### LOGOUT METHOD
1.  We will clear the **COOKIE** named `access_token` and then remove the `user` array inside Local Storage.
    ```shell
        export const logout = (req, res) => {

            res.clearCookie("access_token", {
                sameSite: "none",
                secure: true
            }).status(200).json("User has been logged out")
        }
    ```