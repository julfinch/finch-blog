import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [inputs, setInputs] = useState({
        username:'',
        email:'',
        password:'',
    })
    const [error, setError] = useState(null)

    const navigate = useNavigate();

    //ASSIGNING MULTIPLE INPUTS TO A SINGLE FUNCTION
    const handleChange = e => {
        setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    //MAKE THIS FUNCTION ASYNC SINCE WE'RE MAKING API REQUEST
    const handleSubmit = async e => {
        e.preventDefault()
        try{
            const res = await axios.post("/auth/register", inputs)
            console.log(res)
            navigate("/login")
        }catch(err){
            setError(err.response.data)
        }
    }

    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <input type='text' placeholder='username' name='username' onChange={handleChange}/>
                <input type='email' placeholder='email' name='email' onChange={handleChange}/>
                <input type='password' placeholder='password' name='password' onChange={handleChange}/>
                <button onClick={handleSubmit}>Register</button>
                {error && <p>{error}</p>}
                <span>Do you have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    )
}

export default Register