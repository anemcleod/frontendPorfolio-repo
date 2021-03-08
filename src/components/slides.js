import Thumbnail from './thumbnail';

const Slides = ({x, projectsData}) => {

    return (
        <div 
            className="slides-container" 
            style={{transform: `translateX(${x}%)`}}>
            {
                projectsData.map(project => {
                    return (
              
                       <Thumbnail 
                            key={project.id} 
                            project={project}/>
                 
                    )
                })
            }
        </div>         
    )
}

export default Slides