import React, {useState} from 'react';
import emailjs from 'emailjs-com';

const Contact = ({showContactHandler}) => {

    const [sent, setSent] = useState({
                                        status: false,
                                        error: false,
                                        message: ''
                                    });

    const sendEmail = (e) => {
        e.preventDefault();
    
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, e.target, process.env.REACT_APP_EMAILJS_USER_ID)
          .then((result) => {
            if(result.text) { 
                setSent({
                          status: true,
                          error: false,
                          message: "Message sent"
                      });
                setTimeout(showContactHandler, 2000);
          }
          }, (error) => {
              if(error.text) { 
                  setSent({
                            status: true,
                            error: true,
                            message: 'An error has occurred, please try again later or email me directly at anemcleod@gmail.com'
                        });
            }
          });

          e.target.reset();
      }

    return (
        <div className="contact">
            <div className="contact-container">

                <div className="contact-header">
                    <div onClick={showContactHandler} 
                         className="portfolio-exit-icon">      
                    </div>
                    <h2>contact</h2>
                </div>

                <form className="contact-form" onSubmit={sendEmail}>
                    <input type="hidden" 
                           name="contact_number"/>
                    
                    <input className="form-input basic-input" 
                           type="email" 
                           name="user_email" 
                           placeholder="your email" />

                    <input className="form-input basic-input" 
                           type="text" 
                           name="subject" 
                           placeholder="subject"/>
                   
            
                    <textarea className="form-input" 
                              name="message" 
                              rows="4"
                              placeholder="message"/>

                    {
                        sent && (
                            <div className={sent.error ? 'error-message' : 'success-message'}>{sent.message}</div>
                        )
                    }

                    <input  className="form-submit" 
                            type="submit" 
                            value="Send" />
                  
                </form>
                
            </div>
        </div>
    )
}

export default Contact
