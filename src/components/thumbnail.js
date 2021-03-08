import React, {useContext} from 'react'
import {RichText} from 'prismic-reactjs'
import { motion} from "framer-motion";

import {DataContext} from '../dataContext';

const Thumbnail = ({project}) => {

    const {setShowProject, setCurrentProject} = useContext(DataContext);

    const showProjectHandler = () => {
        setCurrentProject(project.data);
        setShowProject(true);
    }

    return (
            <motion.div  
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1}} 
                transition={{ duration:1 }}  
                onClick={showProjectHandler} 
                className="thumbnail">
                    <div className="thumbnail-image-container">
                        <img src={project.data.thumbnail.url} alt=""/>
                    </div>

                    <div className="thumbnail-title-container">
                        <h4 className="thumbnail-title">{RichText.asText(project.data.project_name)}</h4> 
                    </div> 
            </motion.div>
    )
}

export default Thumbnail