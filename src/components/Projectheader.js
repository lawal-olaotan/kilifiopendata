import React,{useState} from 'react';

import ProjectTitle from './ProjectTitle';
import ProjectSelect from './ProjectSelect';
import DateFilter from './DateFilter';


const ProjectHeader = () => {

    const [show,setShow] = useState(true);

    const Title = {
        Name : 'Project Report'
    }

    return (

        <div className="project__headerwrapper">
                
                        <div className="project__header">
                            <ProjectTitle title={Title}/>
                            <button  onClick={ () => setShow(!show)} className="project__hidefilter"> { show ? ( 'Hide Filter') :('show Filter') } </button>
                        </div>

                        <div className={`project__filters ${show ? "" : "notactive"}`}>
                            <ProjectSelect/>
                            <DateFilter/>
                            <DateFilter/>
                        </div>
        </div>
    )

}



export default ProjectHeader;