# CLIENT 

## REGISTER.JSX
1. Install axios 
    ```shell
        npm i axios
    ```
1. Set the useState for our inputs:
    ```shell
    const [inputs, setInputs] = useState({
        username:'',
        email:'',
        password:'',
    })
    ```
1. Assigning multiple inputs to a single function:
    ```shell
    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    ```

1. To avoid writing our very long database URL over and over again, setup a proxy inside frontend `package.json` and then restart the client app:
    ```shell
        "proxy": "http://localhost:8800/api/"
    ```
1. Create handleSubmit function. We don't need to write the URL anymore inside the POST method because we already assigned it to the proxy.
    ```shell
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            const res = await axios.post("/auth/login", inputs)
            console.log(res)
            navigate("/")
        }catch(err){
            setError(err.response.data)
        }
    }
    ```
1. If we try to register in the register page, look at the CONSOLE and we should be able to see **User has been created** and if we click register again using the same data, it should show us **User already exists**
    ```shell
    import axios from 'axios';
    import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom';

    const Login = () => {
        const [inputs, setInputs] = useState({
            username:'',
            password:'',
        })
        const [error, setError] = useState(null)

        const navigate = useNavigate();

        #ASSIGNING MULTIPLE INPUTS TO A SINGLE FUNCTION
        const handleChange = e => {
            setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
        }
        #MAKE THIS FUNCTION ASYNC SINCE WE'RE MAKING API REQUEST
        const handleSubmit = async e => {
            e.preventDefault()
            try{
                const res = await axios.post("/auth/login", inputs)
                console.log(res)
                navigate("/")
            }catch(err){
                setError(err.response.data)
            }
        }

        return (
            <div className='auth'>
                <h1>Login</h1>
                <form>
                    <input type='text' placeholder='username' name='username' onChange={handleChange}/>
                    <input type='password' placeholder='password' name='password' onChange={handleChange}/>
                    {error && <p>{error}</p>}
                    <button onClick={handleSubmit}>Login</button>
                </form>
            </div>
        )
    }

    export default Login
    ```

## LOGIN.JSX
1. Just copy some of the codes from the `Register.jsx` page:
    ```shell
    import axios from 'axios';
    import React, { useState } from 'react'
    import { useNavigate } from 'react-router-dom';

    const Login = () => {
        const [inputs, setInputs] = useState({
            username:'',
            password:'',
        })
        const [error, setError] = useState(null)

        const navigate = useNavigate();

        #ASSIGNING MULTIPLE INPUTS TO A SINGLE FUNCTION
        const handleChange = e => {
            setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
        }
        #MAKE THIS FUNCTION ASYNC SINCE WE'RE MAKING API REQUEST
        const handleSubmit = async e => {
            e.preventDefault()
            try{
                const res = await axios.post("/auth/login", inputs)
                console.log(res)
                navigate("/")
            }catch(err){
                setError(err.response.data)
            }
        }

        return (
            <div className='auth'>
                <h1>Login</h1>
                <form>
                    <input type='text' placeholder='username' name='username' onChange={handleChange}/>
                    <input type='password' placeholder='password' name='password' onChange={handleChange}/>
                    {error && <p>{error}</p>}
                    <button onClick={handleSubmit}>Login</button>
                </form>
            </div>
        )
    }

    export default Login
    ```

## CONTEXT API
1. This is to create a variable that we can use globally whenever we login. Under `src folder`, create a folder named `context` and inside it, create a file named `authContext.js`.
    ```shell
        import { createContext, useEffect, useState } from 'react';
        import axios from 'axios';

        export const AuthContext = createContext();

        export const AuthContextProvider = ({children}) => {
            #During login. we will check our localStorage first, we will get it and assign it to the
            # variable currentUser, if none, then it will be null

            #We use PARSE because localStorage will give us string and we want to convert it 
            #to an array
            const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

            const login = async(inputs)  => {
                const res = await axios.post("/auth/login", inputs);
                setCurrentUser(res.data);
            };

            const logout = async(inputs) => {
                await axios.post("/auth/logout");
                setCurrentUser(null);
            };

            #Everytime we login, we will set a new currentUser inside localStorage
            #We will make a currentUser as a string, thus, the stringify function.
            useEffect(() => {
            localStorage.setItem("user", JSON.stringify(currentUser));
            }, [currentUser])
            
            return (
                <AuthContext.Provider value={{ currentUser, login, logout }}>
                    {children}
                </AuthContext.Provider>
            )
        }
    ```
1. Go to `index.js` and wrap the `<App/>` with `<AuthContextProvider><AuthContextProvider/>`.
    ```shell
        import { AuthContextProvider } from './context/authContext';

        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(
        <React.StrictMode>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </React.StrictMode>
        );
    ```
## UPDATE LOGIN.JSX
1. Now that we created a login function inside Context API, we can call that function to our `Login.jsx`.
    ```shell
        import { AuthContext } from '../context/authContext';

        const { login } = useContext(AuthContext);

        const handleSubmit = async e => {
            e.preventDefault()
            try{
                await login(inputs)
                navigate("/")
            }catch(err){
                setError(err.response.data)
            }
        }
    ```

## UPDATE NAVBAR.JSX USING THE GLOBAL currentUser
1. Using the `currentUser and logout` functions from Context API, we can use them so that the `username` will appear at the navbar. With the `logout` function, we can clear the `cookie` and remove the `user` array in the Local Storage and Cookie in the Application tab.
    ```shell
        import { AuthContext } from "../context/authContext";

        const { currentUser, logout } = useContext(AuthContext)

        <span>{currentUser?.username}</span>
        {currentUser ? (
        <span onClick={logout}>Logout</span>
        ) : (
        <Link className="link" to="/login">
            Login
        </Link>
        )}
    ```

## GETTING POSTS FROM DB WITH OUR WITHOUT CATEGORY
1. Go to the frontend folder and open `Home.jsx` and paste the codes below.
    Try to put the code `const location = useLocation()` below to see what's inside it by using `console.log(location)`. We would see that one of them is `search: ?cat=art`, using it, we can add it to the link when getting the category. `Cat` is applied as dependency so that whenever we change our category, our useEffect function will be fired again and again.
    ```shell
        const [posts, setPosts] = useState([])

        const cat = useLocation().search;

        useEffect(() => {
            const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${cat}`);
                setPosts(res.data);
            } catch(err){
                console.log(err)
            }
            };
            fetchData();
        }, [cat]);
    ```

## UPDATE SINGLE.JSX - FETCHING POSTS AND RECOMMENDED POSTS
1. Open `Single.jsx` and copy what we have applied to `Home.jsx`
    ```shell
        const [post, setPost] = useState([])

        const location = useLocation();

        const {currentUser} = useContext(AuthContext);

        #In our routes router.get("/:id", getPost) method, we need to send the id of the post
        #The location url is "localhost:3000/posts/1" where "1" is the id of the post
        #To be able to get that id, we will use split method where it's the third string after slash
        const postId = location.pathname.split("/")[2]

        useEffect(() => {
            const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch(err){
                console.log(err)
            }
            };
            fetchData();
        }, [postId]);
    ```
1. Install `moment library` so that we can dynamically update the **Posted 2 days ago** based on the date of posting.
    ```shell
        npm i moment

        <p>Posted {moment(post.date).fromNow()}</p>
    ```
1. Update the body of the page. Pass in category into the Menu component.
    ```shell
        <div className='single'>
        <div className="content">
            <img src={post?.img} alt="" />
            <div className="user">
            {post.userImg && <img src={post.userImg} alt="" />}
            <div className="info">
                <span>{post.username}</span>
                <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
            <div className="edit">
                <Link to={`/write?edit=2`}>
                <img src={Edit} alt="" />
                </Link>
                <img src={Delete} alt="" />
            </div>
            )}
            </div>
            <h1>{post.title}</h1>
            {post.desc}
        </div>
        
        <Menu cat={post.cat}/>
        </div>
    ```

## UPDATE MENU.JSX - FETCHING POSTS AND RECOMMENDED POSTS
1. Open `Menu.jsx` and apply fetching method for recommended posts.
    ```shell
        const Menu = ({cat}) => {

        const [post, setPosts] = useState([])

        useEffect(() => {
            const fetchData = async() => {
                try{
                    const res = await axios.get(`/posts/?cat=${cat}`)
                    setPosts(res.data)
                } catch(err) {
                    console.log(err)
                }
            }
            fetchData();
        }, [cat])

        return(

        )
        }
    ```

## UPDATE WRITE.JSX - 

## SENDING THE POST TO EDIT PAGE UPON CLICKING EDIT BUTTON
