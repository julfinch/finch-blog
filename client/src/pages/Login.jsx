import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login = () => {
    const [inputs, setInputs] = useState({
        username:'',
        password:'',
    })
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    //ASSIGNING MULTIPLE INPUTS TO A SINGLE FUNCTION
    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    //MAKE THIS FUNCTION ASYNC SINCE WE'RE MAKING API REQUEST
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            await login(inputs)
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
                <span>
                    Create an account <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    )
}

export default Login