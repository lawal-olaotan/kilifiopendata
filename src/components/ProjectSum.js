import React from 'react';
import '../css/project.min.css';


const ProjectSum = ({data}) => {


    return (

        <div className="project__summary">
            <p className="project__sumtitle">{data.summaryName}</p>
            <p className="project__sumvalue">{data.sumValue}</p>
            <p className="project__sumtext">{data.sumText}</p>
        </div>
    )

}


export default ProjectSum;