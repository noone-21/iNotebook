import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    let history = useHistory()

    const userLogin = async (e) => {
        e.preventDefault()
        const response = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        });
        const json = await response.json();
        console.log(json)
        if (json.success) {
            localStorage.setItem('token', json.authtoken)
            props.showAlert("Logged-In Successfully!", "success")
            history.push("/")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3 ' >
            <div className='row mx-6' style={{ marginLeft: '350px' }} >
                <div className='col-md-6 jumbotron' style={{ padding: '5% 4%' }} >
                    <form onSubmit={userLogin} >
                        <h1 style={{ marginLeft: '100px' }} >LOGIN</h1>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" onChange={onChange} value={credentials.email} name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" onChange={onChange} className="form-control" value={credentials.password} name='password' id="password" placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary" >Login</button>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default Login