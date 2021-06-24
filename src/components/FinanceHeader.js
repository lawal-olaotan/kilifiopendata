import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from "@fortawesome/free-solid-svg-icons";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import ProjectTitle from './ProjectTitle';
import ProjectSelect from './ProjectSelect';
import DateFilter from './DateFilter';


const FinanceHeader = () => {

    const [show,setShow] = useState(true);
    const Title = {
        Name : 'Financial Report'
    }

    return (

                <div className="project__headerwrapper">
                
                        <div className="project__header">
                            <ProjectTitle title={Title}/>
                            <button  onClick={ () => setShow(!show)} className="project__hidefilter"> { show ? ( 'Hide Filter') :('show Filter') } </button>
                        </div>

                        <div className={`project__filters financehead ${show ? "" : "notactive"}`}>
                            <ProjectSelect/>
                            <DateFilter/>
                        </div>
            </div>
    )

}



export default FinanceHeader;