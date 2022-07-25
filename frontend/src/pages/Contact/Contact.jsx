import React,{useRef} from 'react';
import './Contact.scss';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';


const Contact = () => {

  const form = useRef();
    const sendEmail = (e) => {
      e.preventDefault();
      emailjs.sendForm(process.env.REACT_APP_EMAIL_SERVICE_ID, process.env.REACT_APP_EMAIL_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAIL_KEY)
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

    };


  return (
    <motion.section className="app__contact" whileInView={{opacity: [0,1]}}
    transition={{ duration: 2.5, ease: [0.6, 0.5, -0.1, 0.9] }}>
      <div className="contact-card app__width">
      <h2>Contact Us</h2>
      <p>Let us know what you think! We'd love to hear from you!,
        please do not hesitate to give us your feedback. Thank you.</p>
      </div>
      <hr />
      <form ref={form} onSubmit={sendEmail} className='app__div'>
        <div className='wrap'>
          <div>
            <label htmlFor="name">Name</label>
            <input type="text" className='input' name='name' required/>
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input type="email"  className='input' name='email'  required /></div>
        </div>
        <div>
          <label htmlFor="subject">Subject</label>
          <input type="text" name="subject" className='input' autoComplete='off' required />
        </div>
        <div>
          <label htmlFor="message">Message</label>
          <textarea type="text" name="message" rows={7} autoComplete='off'  required />
        </div>
        <input type='submit' className='button' value="Submit"/>
      </form>
    </motion.section>
  )
}

export default Contact