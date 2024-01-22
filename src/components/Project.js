import React,{useContext} from 'react';
import { FilterContext } from '../FilterContext';
import ProjectWrapper from './Projectwrapper';
import '../css/styles.min.css';
import '../css/project.min.css';





const Project = () => {
    const {projectView} = useContext(FilterContext)
    const showProject = projectView
   
    return(
        <div>
        {showProject ? (
            <div></div>
        ):(
            <div className='project'>
                <ProjectWrapper/>
            </div>  

        )}

          

        </div>
        
    )

}

export default Project;