import React from 'react';
import './Hero.scss';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <motion.div 
        whileInView={{opacity: [0,1]}}
        transition={{ duration: 2.5, ease: [0.6, 0.5, -0.1, 0.9] }}
        >
        <div className="app__hero app__width">
            <div className="app__hero-upper">
                <div className="app__hero-inner">
            <div className="app__hero-content">
                <h2 className='head-text'>Welcome to the <br/> Armor Blogs</h2>
                <p className='p-text'>Get updated with the latest trends of technology</p>
            </div>
            </div>
            </div>
        </div>
        </motion.div>
    )
}

export default Hero