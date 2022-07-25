import React, { useState, useContext } from 'react';
import './Navbar.scss';
import {  Link, NavLink } from 'react-router-dom';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { AiOutlineSearch } from 'react-icons/ai';
import Mobile from './Mobile';
import { motion } from 'framer-motion';
import { searchQuery } from "../../context/Search";
import logo from '../../assets/logo.png';


const Navbar = () => {
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

  const [isOpen, setIsOpen] = useState(false);
  const query = useContext(searchQuery);


  // set query as default value for the context
  

  return (
    <motion.div 
    whileInView={{opacity: [0,1]}}
    transition={{ duration: 2.5, ease: [0.6, 0.5, -0.1, 0.9] }}
    className="app__navbar"
    >
    <nav className="app__navbar app__width">
      <Link to='/'>
      <div className="app__navbar-logo">
        <img src={logo} alt="logo" />
      </div>
      </Link>
      <div className="app__navbar-search input">
        <AiOutlineSearch size={20} />
        <input type="text" name='search' placeholder="Search" onChange={event => query.setValue(event.target.value)} />
      </div>
      <div className="app__navbar-links">
        <Menu />
      </div>
      <RiMenu3Line className={`${!isOpen ? 'app__div navbar-menu' : 'not-visible'}`} color="#fff" size={40} onClick={() => setIsOpen(true)} />
      <div className={`${isOpen ? 'visible' : 'not-visible'}`}>
      <RiCloseLine className="app__div close_icon" color='#fff' size={40} onClick={() => setIsOpen(false)} />
      <motion.div 
        whileInView={{opacity: [0.5,1]}}
        transition={{ duration: .4, type: 'spring' }}
        >
      <Mobile/>
      </motion.div>
      </div>
    </nav>
    </motion.div>
  )
}

export default Navbar