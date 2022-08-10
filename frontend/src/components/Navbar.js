import React from 'react'
import {Link, useHistory, useLocation} from "react-router-dom";




const Navbar = (props) => {

    let history= useHistory()
    const handleLogout = () =>{
        localStorage.removeItem('token')
        history.push('/login')
        props.showAlert("Logged-Out Successfully!", "success")
    }

    let location = useLocation();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/about">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item ">
                        <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/"><i class="fa-solid fa-house"></i><span className="sr-only">(current)</span> Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about"><i class="fa-solid fa-circle-info"></i> About</Link>
                    </li>
                </ul>
                {!localStorage.getItem('token')? <form className="form-inline my-2 my-lg-0">
                    <Link className="btn btn-success mx-1" to="/login" role="button">Login</Link>
                    <Link className="btn btn-success mx-1" to="/signup"  role="button">SignUp</Link>
                </form>: <Link className="btn btn-success mx-1" onClick={handleLogout} to="/login" role="button">Logout</Link>  }
            </div>
        </nav>
    )
}

export default Navbar