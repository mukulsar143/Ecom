import './login.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'




export default function Login() {
    const [user, setuser] = useState({ username : '', password : ''})
    const navigate = useNavigate()

    const onuserchange = (e) => {
        setuser({...user, [e.target.name]: e.target.value})
    }
    const onusersubmit = async(e) =>{
        e.preventDefault()
        const res = await fetch("http://127.0.0.1:8000/api/accounts/login/", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(user)
        })
        const json = await res.json()
        if (json.success) {
            localStorage.setItem("token", json.token)
            navigate('/')            
        } else {
            alert("Something Went Wrong...")
        }
    }
  return (
    <>
    <div className="login">
        <div className="container">
            <div className="form">
                <h2># LogIn</h2>    
                <form onSubmit={onusersubmit}>
                    <div className="box">
                        <div className="label">
                            <h4>Username</h4>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='username' name='username' value={user.username} onChange={onuserchange} />
                        </div>
                    </div>
                    <div className="box">
                        <div className="label">
                            <h4>Password</h4>
                        </div>
                        <div className="input">
                            <input type="password" placeholder='password' name='password' onChange={onuserchange} value={user.password} />
                        </div>
                    </div>
            
                    <button type='submit'>Submit</button>
                </form>
            </div>    
        </div>    
    </div>    
    </>
  )
}
