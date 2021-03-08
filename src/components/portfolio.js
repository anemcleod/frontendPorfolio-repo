import React, {useState, useContext,useEffect} from 'react'

import {DataContext} from '../dataContext';

import Slides from './slides'

const Portfolio = () => {

    const [x, setX] = useState(0);
    const [slideLimit, setSlideLimit] = useState(0);

    const {projectsData} = useContext(DataContext);
   
    useEffect(()=> {
        if(projectsData) {
            setSlideLimit(()=>{
                return ((projectsData.length-3)*-35);
            })
        }
    }, [projectsData]);

    const next = e => {
        e.preventDefault();
        setX(prevState => {
           let newState = prevState - 35;
           return newState;
        });
    };

    const prev = () => {
        setX(prevState => {
            let newState = prevState +  35;
            return newState;
         });
    }


    return (
            <React.Fragment>
                
                {
                    (x !== 0) ? (
                                    <div 
                                        onClick={prev} 
                                        className="slider-btn-container prev">
                                        <div className="dot"></div>
                                    </div> 
                                ) : null
                }
                

                <div className="slider-window">
                    <Slides 
                        x={x} 
                        projectsData={projectsData}/>
                </div>
                

                {
                    (x > slideLimit) ? (
                                            <div 
                                                onClick={next} 
                                                className="slider-btn-container next">
                                                <div className="dot"></div> 
                                            </div> 
                                        ) : null
                }
                
            </React.Fragment>
    )
}

export default Portfolio;