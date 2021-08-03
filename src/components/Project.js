import React,{useContext} from 'react';
import { FilterContext } from '../FilterContext';
import ProjectWrapper from './Projectwrapper';
import Community from './Community';
import '../css/styles.min.css';
import '../css/project.min.css';
// import Citizen from './Citizen'





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
                <Community/>
                {/* <Citizen/> */}
            </div>  

        )}

          

        </div>
        
    )

}

export default Project;