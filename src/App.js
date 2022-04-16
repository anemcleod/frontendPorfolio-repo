import './assets/style.sass';

import React, {useState, useContext, useEffect} from 'react';
import { RichText } from 'prismic-reactjs';
import { motion, AnimatePresence } from "framer-motion";

import { DataContext } from './dataContext';

import Swoosh from './components/swoosh';
import Portfolio from './components/portfolio'
import Project from './components/project'
import Contact from './components/contact';


function App() {

  const  [page, setPage] = useState(1);
  const  [portfolio, setPortfolio] = useState(false)
 
  const {showProject, pageData, showContact, setShowContact} = useContext(DataContext);

  const showContactHandler = () => {
    setShowContact(prevState => {
      return !prevState
    });
  }

  const scrollHandler = () => {
    setPage(prevState => {
     if(prevState === 3) {
        return 1
      } else {
      return prevState+1
    }
    })
  }

  useEffect(() =>{
    if(page === 2){
      setPortfolio(true);
    } else {
      setPortfolio(false)
    }
  },[page]);

  return (
    <div className={`App ${page % 2 === 0 ? "App-scroll-one": ""}`}>
      <h1 className="seo-title">ane mcleod front-end developer</h1>
      
      <div className={`bg-container ${page === 3 ? "bg-container-scroll-one": ""}`}>
          <Swoosh page={page}/>

          { 
              page===3 && <motion.img 
                            initial={{rotate: -120}} 
                            animate={{rotate: 0}} 
                            originY={1}
                            transition={{
                              delay: 1,
                              damping: 9.5,
                              type: "spring"
                            }}
                            className="bg-palms" 
                            src={pageData ? pageData.location_image.url :''}  
                            alt=""/>
          }

          <img 
            className="bg-img" 
            src={pageData ? pageData.background_portrait.url :''}  
            alt=""/>
          
          <div className={`main-container ${page === 2 ? "main-container-scroll-one": ""}`}> 
            <div className={`filter ${page % 2 === 0 ? "filter-scroll-one": ""}`}></div>
            
            <div className={`header-container ${page > 1 ? "header-container-scroll-one": ""}`}>
                  <div 
                    onClick={scrollHandler} 
                    className={`greet-img-container ${page > 1 ? "greet-img-container-scroll-one": ""}`}>

                  <img 
                    className={`greet-img  ${page === 3 ? "greet-img-scroll-one": ""}`} 
                    src={pageData ? pageData.greeting_image.url :''} alt=""/>
              </div>
              
              <div className={`icon-container ${page > 1 ? "icon-container-scroll-one": ""}`}>
                  <a 
                    href={pageData ? pageData.linkdin.url :''} 
                    target="_blank" rel="noreferrer">
                    <div className="portfolio-linkdin-icon"></div>
                  </a>

                  <div 
                    onClick={showContactHandler} 
                    className="portfolio-message-icon">
                  </div>

                  <a 
                    href={pageData ? pageData.github_account.url : ''} 
                    target="_blank" rel="noreferrer">
                      <div className="portfolio-github-icon"></div>
                  </a>
              </div>

            </div>

            <AnimatePresence>
                {
                    portfolio && <motion.div 
                                    className="portfolio-container" 
                                    exit={{opacity: 0, x: 20}} 
                                    transition={{duration: 0.5}}>
                                    <Portfolio/>
                                  </motion.div>
                }
            </AnimatePresence>
          
              {
                  (page === 1) ? (       
                                    <motion.div 
                                        initial={{ opacity: 0 }} 
                                        animate={{ opacity: 1 }} 
                                        transition={{ duration: 1 }} 
                                        className="sub-title-container sub-title_1">
                                        {pageData ? RichText.render(pageData.page_one_subtitle) : null}
                                    </motion.div>
                                  ) : null
              }
        
            {
                 (page === 2) ? (
                                  <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    transition={{ duration: 1 }} 
                                    className="sub-title-container">
                                    {pageData ? RichText.render(pageData.page_two_subtitle) : null}
                                  </motion.div>
                               ) : null
            }

            {
                 (page === 3) ? (
                                  <motion.div 
                                    initial={{ opacity: 0 }} 
                                    animate={{ opacity: 1 }} 
                                    transition={{ duration: 1, delay: 1 }} 
                                    className="sub-title-container">
                                    {pageData ? RichText.render(pageData.page_three_subtitle) : null}
                                  </motion.div>
                                ) : null
            }

            <div 
                onClick={scrollHandler} 
                className={`portfolio-arrow-icon ${page === 1 ? "bounce-2": ""} ${page === 3 ? "flip": ""}`}>
            </div>
          </div>    
      </div>

      <AnimatePresence>
          {
           
            showProject &&  <motion.div 
                              className="project" 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              transition={{ duration: 0.5 }} 
                              exit={{ opacity: 0 }}>
                              <Project/>
                            </motion.div>
            
          }
      </AnimatePresence>

      <AnimatePresence>
          {
            showContact &&  <motion.div 
                              className="project" 
                              initial={{ opacity: 0 }} 
                              animate={{ opacity: 1 }} 
                              transition={{ duration: 0.5 }} 
                              exit={{ opacity: 0 }}>
                              <Contact showContactHandler={showContactHandler}/>
                            </motion.div>
          }
     </AnimatePresence>
    </div>
  );
}

export default App;
