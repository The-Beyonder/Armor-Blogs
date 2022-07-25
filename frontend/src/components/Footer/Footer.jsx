import React from 'react'
// import { BsTwitter } from 'react-icons/bs'
import logo from '../../assets/logo.png';
import './Footer.scss'

const Footer = () => {
  return (
    <footer className="app__footer">
        <div className="app__footer-content app__flex app__dir-col">
            <div className="app__footer-title app__flex app__dir-col">
                <div className="app__footer-logo">
                    <img src={logo} alt="logo" />
                </div>
                <p className="p-text">Copyright © 2022 Armor Blogs</p>
            </div>
            {/* <div className="app__footer-icons">
                <BsTwitter className="app__footer-icon" />
                <BsTwitter className="app__footer-icon" />
                <BsTwitter className="app__footer-icon" />
            </div> */}
        </div>
    </footer>
  )
}

export default Footer