import React,{useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from "@fortawesome/free-solid-svg-icons";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";



const ProjectHeader = () => {

    const [show,setShow] = useState(true);

    return (

        <div className="project__headerwrapper">
                
                        <div className="project__header">
                            <h4 className="project__title">Project Report</h4>
                            <button id="project" onClick={ () => setShow(!show)} className="project__hidefilter"> { show ? ( 'Hide Filter') :('show Filter') } </button>
                        </div>

                        <div className={`project__filters ${show ? "" : "notactive"}`}>

                            <div className="nav__select ">
                                <select className="nav__orgselect">
                                    <option>Project Type</option>
                                    <option>Infrastructural</option>
                                    <option>Human Resources</option>
                                    <option>Sports</option>
                                </select>
                            </div>
                            <div className="nav__select">
                                <select className="nav__orgselect" >
                                    <option>Project Status</option>
                                    <option>Not Completed</option>
                                    <option>Not Started</option>
                                    <option>Started</option>
                                </select>
                            </div>

                            <div className="nav__select project__extra">
                            <DatePicker
                                // selected={ this.state.startDate }
                                // onChange={ this.handleChange }
                                name="startDate"
                                dateFormat="MM/dd/yyyy"
                                value="Date Project Started: DD-MM-YY"/>
                            </div>

                            <div className="nav__select project__extra">
                                <DatePicker
                                // selected={ this.state.startDate }
                                // onChange={ this.handleChange }
                                name="startDate"
                                dateFormat="MM/dd/yyyy"
                                value="Date Project Visited: DD-MM-YY"/>
                            </div>

                        </div>
                </div>
    )

}



export default ProjectHeader;