import React, { useState } from 'react';
import './NavigationBar.css';
import { Link, useLocation, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

const NavBar = ({ user, updateUser }) => {
  const location = useLocation();
  const history = useHistory();
  const [isOpen, setOpen] = useState(false);
  return (
    <nav>
      <ul className="components">
        <div className='menuIcon'><MenuIcon fontSize="large" onClick={() => setOpen(isOpen ? false : true)} /></div>
        <div className="brand">
          <img src={`${process.env.REACT_APP_BACKEND_URL}/elevated-sounds-logo.png`} alt="logo" width="50px" height="50px" className="logo" />
          <Link to="/" className="navStyle" key={0}>
            <li className="link">Elevated Sounds</li>
          </Link>
        </div>
        <div className={isOpen ? 'pages-open pages' : 'pages-closed pages'}>
          <Link to="/" className="navStyle" style={location.pathname === "/" ? { color: 'grey' } : null} key={1} onClick={()=>setOpen(false)}>
            <li className="link">Home</li>
          </Link>
          <Link to="/products" className="navStyle" style={location.pathname === "/products" ? { color: 'grey' } : null} key={2} onClick={()=>setOpen(false)}>
            <li className="link">Products</li>
          </Link>
          <Link to={user.ID !== null ? "/cart" : "/signin"} className="navStyle" style={location.pathname === "/cart" || location.pathname === "/signin" || location.pathname === '/register' ? { color: 'grey' } : null} key={location.pathname === "/cart" ? 4 : 5} onClick={()=>setOpen(false)}>
            <li className="link">{user.ID !== null ? 'Cart' : 'Sign In'}</li>
          </Link>
          {user.ID !== null ?
            <Link to="/" className="navStyle" onClick={() => { updateUser({ type: 'LOG OUT' }); fetch(`${process.env.REACT_APP_BACKEND_URL}/logout`, { credentials: 'include', headers: { 'Content-Type': 'application/json', }, }); setOpen(false); history.push("/");}} key={6}>
              <li className="link">Logout</li>
            </Link>
            : null
          }
        </div>
      </ul>
    </nav>
  )
};

export default NavBar;