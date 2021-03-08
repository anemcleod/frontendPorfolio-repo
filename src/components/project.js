import React, {useContext} from 'react';
import {RichText} from 'prismic-reactjs';

import {DataContext} from '../dataContext';

const Project = () => {

    const {setShowProject, currentProject} = useContext(DataContext);
   
    const exitProjectHandler = () => {
        setShowProject(false);
    }

    let screenshot = currentProject.screenshot.url;

    return (
        <React.Fragment>
            <div className="project-container">
                <div 
                    className="project-screenshot-container"
                    style={{"backgroundImage" : `url(${screenshot})`}}> 
                </div>

                <div className="project-details-container">
                    <div className="project-header">
                        <div 
                            onClick={exitProjectHandler} 
                            className="portfolio-exit-icon">
                        </div>

                        <h2>overview</h2>

                        {
                            currentProject ? 
                                currentProject.tech_used.map((tech, i) => {
                                    return ( 
                                            <div 
                                                className="tech" 
                                                key={i}>
                                                {tech.text}
                                            </div>
                                        )
                                }) : null
                        }
                    </div>

                    <div className="project-summary">
                       {RichText.render(currentProject.overview)}
                    </div>

                    <div className="project-nav">
                        <a 
                            href={currentProject.github_project_link.url} 
                            target="_blank" rel="noreferrer">
                                <button className="project-btn">view</button>
                        </a>

                        <a 
                            href={currentProject.project_link.url} 
                            target="_blank" rel="noreferrer">
                                <button className="project-btn">code</button>
                        </a>
                    </div>
                </div>
            </div> 
        </React.Fragment>
    )
}

export default Project