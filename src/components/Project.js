import React from 'react';
import '../css/styles.min.css';
import '../css/project.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from "@fortawesome/free-solid-svg-icons";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import Piechart from '../components/Piechart';



const Project = () => {


    
    return(

        <div className="project">

            <div className="project__wrapper">

                <div className="project__headerwrapper">
                
                        <div className="project__header">
                            <h4 className="project__title">Project Report</h4>
                            <div className="project__hidefilter"> Hide Filter <FontAwesomeIcon icon={faBan}/> </div>
                        </div>

                        <div className="project__filters">
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

                <div className="project__infowrapper">

                    <div className="project__infostep">
                        
                        <div className="project__summary">
                            <p className="project__sumtitle">Projects</p>
                            <p className="project__sumvalue">80,000</p>
                            <p className="project__sumtext">Includes completed, ongoing and proposed projects</p>
                        </div>

                        <div className="project__pie">
                            <p className="project__sumtitle">Based on project type</p>
                            <div className="projects__piewrapper">
                                <Piechart/>
                            </div>
                        </div>
                        

                    </div>  

                </div>

                

            </div>
        </div>
    )

}

export default Project;