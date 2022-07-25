import React from 'react';
import {  NavLink } from 'react-router-dom';


const Mobile = () => {
    const Menu = () => (
        <>
          <ul>
            <NavLink to="/" activeClassName="active">
              <li>Home</li>
            </NavLink>
            <NavLink to="/about"  activeClassName="active">
              <li>About</li>
            </NavLink>
            {/* <NavLink to="/categories" activeClassName="active">
              <li>Categories</li>
            </NavLink> */}
            <NavLink to="/contact" activeClassName="active">
              <li>Contact</li>
            </NavLink>
          </ul>
        </>
      )
  return (
    <div className="app__mobile-menu">
        <Menu />
    </div>
  )
}

export default Mobile