import { MdLocalShipping } from "react-icons/md";
import "./nav.css";
import { FiLogIn, FiAtSign } from "react-icons/fi";
import { CiLogout, CiUser } from "react-icons/ci";
import { AiOutlineSearch } from "react-icons/ai";
import logo from "../../Pictures/visiting.webp";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar({search, setsearch, searchproduct}) {

  const navigate = useNavigate()


  const user = localStorage.getItem('token');
  const userrem = () => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
      navigate('/login')
    }
  }
  return (
    <div className="header">
      <div className="top_header">
        <div className="icon">
          <MdLocalShipping />
        </div>
        <div className="info">
          <p>Free shipping shopping upto $2000</p>
        </div>
      </div>
      <div className="mid_header">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="searchbox">
          <input type="text" placeholder="Search" value={search} name="search" onChange={((e)=>setsearch(e.target.value))} />
          <button onClick={searchproduct}>
            <AiOutlineSearch />
          </button>
        </div>
        {user ? (<>
          <div className="user">
            <div className="icon">
              <CiLogout />
            </div>
            <div className="btn">
              <button onClick={userrem}>Logout</button>
            </div>
          </div>
            
          </>
        ) : (
          <div className="user">
            <div className="icon">
              <FiLogIn />
            </div>
            <div className="btn">
              <Link to='/login'><button>LogIn</button></Link>
            </div>
            <div className="icon">
              <FiAtSign />
            </div>
            <div className="btn">
              <Link to='/register'><button>SignIn</button></Link>
            </div>
          </div>
        )}
      </div>
      <div className="last_header">
        <div className="user_profile">
         {user?
         <><div className="icon">
            <CiUser />
          </div>
          <div className="info">
            <h2>Mukul Sarkar</h2>
            <p>makessidd143@gmail.com</p>
          </div></>
          :
          <><div className="icon">
            <CiUser />
          </div>
          <div className="info">
            <p>Please Login..</p>
          </div></>}
        </div>
        <div className="nav">
          <ul>
            <li><Link to='/' className = 'link'>Home</Link></li>
            <li><Link to='/shop' className = 'link'>Shop</Link></li>
            <li><Link to='/cart' className = 'link'>Cart</Link></li>
            <li><Link to='/contact' className = 'link'>Contact</Link></li>
          </ul>
        </div>
        <div className="offer">
          <p>flat 10% over all Iphone</p>
        </div>
      </div>
    </div>
  );
}
