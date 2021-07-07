import React,{useState,useContext} from 'react';
import {FilterContext} from '../FilterContext';
import ProjectTitle from './ProjectTitle';
import ProjectSelect from './ProjectSelect';
// import DateFilter from './DateFilter';


const ProjectHeader = () => {

    const [show,setShow] = useState(true);
    const {ProStatusList} = useContext(FilterContext);
    const [projectStatus,handleStatus] = ProStatusList;

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
                            <ProjectSelect data={projectStatus} handler={handleStatus}/>
                            {/* <DateFilter/>
                            <DateFilter/> */}
                        </div>
        </div>
    )

}



export default ProjectHeader;