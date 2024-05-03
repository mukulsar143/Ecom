import { useState } from 'react'
import './register.css'
import { useNavigate } from 'react-router-dom'


export default function Register() {
    const [user, setuser] = useState({first_name : '', last_name : '', email : '', password : ''})
    const navigate = useNavigate()

    const onuserchange = (e) => {
        setuser({...user, [e.target.name]: e.target.value})
    }

    const onusersubmit = async(e) =>{
        e.preventDefault()
        const res = await fetch("http://127.0.0.1:8000/api/accounts/register/", {
            method : "POST",
            headers : {
                "Content-Type" : "application/json",
            },
            body : JSON.stringify(user)
        })
        const json = await res.json()
        if (json.success) {
            navigate('/login')            
        } else {
            alert("Something Went Wrong...")
        }
    }

  return (
    <>
    <div className="register">
        <div className="container">
            <div className="form">
                <h2># Register</h2>    
                <form onSubmit={onusersubmit}>
                    <div className="box">
                        <div className="label">
                            <h4>First Name</h4>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='First name' name='first_name' value={user.first_name} onChange={onuserchange}/>
                        </div>
                    </div>
                    <div className="box">
                        <div className="label">
                            <h4>Last Name</h4>
                        </div>
                        <div className="input">
                            <input type="text" placeholder='Last Name' value={user.last_name} onChange={onuserchange} name='last_name' />
                        </div>
                    </div>
                    <div className="box">
                        <div className="label">
                            <h4>E-Mail</h4>
                        </div>
                        <div className="input">
                            <input type="email" placeholder='E-mail' name='email' value={user.email} onChange={onuserchange} />
                        </div>
                    </div>
                    <div className="box">
                        <div className="label">
                            <h4>Password</h4>
                        </div>
                        <div className="input">
                        <input type="password" placeholder='Password' name='password' value={user.password} onChange={onuserchange} />
                        </div>
                    </div>
                    <button >Submit</button>
                </form>
            </div>    
        </div>    
    </div>    
    </>
  )
}
