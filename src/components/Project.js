import React,{useState} from 'react';
import '../css/styles.min.css';
import '../css/project.min.css';
import ProjectWrapper from './Projectwrapper';
import FinancialWrapper from './FinancialWrapper';





const Project = () => {


    return(

        <div className="project">
            <ProjectWrapper/>
            <FinancialWrapper/>
        </div>
    )

}

export default Project;