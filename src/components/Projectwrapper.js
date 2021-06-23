import React from 'react';
import '../css/styles.min.css';
import '../css/project.min.css';
import Piechart from '../components/Piechart';
import ProjctHeader from '../components/Projectheader';
import ProjectSum from './ProjectSum';
import BarChart from './BarChart';



const ProjectWrapper = () => {

    const projectType = {
        labels: ['Construction Based', 'Technology Based','Human Resource','Research Based'],
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                    '#9B51E0',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                    '#9B51E0',
                ],
                data: [100,70,40,150]
            }
        ]   
    }

    
    const projectExecution = {

        labels: ['No phased Project', 'Phase I','Phase II'],
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                ],
                data: [170,40,150]
            }
        ] 

    }

    const projectComp = {

        labels: ['Project Started', 'Project Completed','Project Visited'],
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                ],
                data: [160,80,120]
            }
        ] 

    }

    const projectSummary = {
        summaryName: 'Projects',
        sumValue: 80000,
        sumText: 'Includes completed, ongoing and proposed projects',
    }


    


    return (

        <div className="project__wrapper">

                <ProjctHeader/>

                <div className="project__infowrapper">

                    <div className="project__infostep">
                            <ProjectSum data={projectSummary}/>

                        <div className="project__pie">
                                <p className="project__sumtitle">Based on project type</p>
                                <Piechart state={projectType}/>
                        </div>

                        <div className="project__pie">
                            <p className="project__sumtitle">Based on project execution phase</p>
                            <Piechart state={projectExecution}/>
                        </div>
                        
                    </div>  

                    <hr/>

                    <div className="project__infostep">

                        <div className="project__pie">
                                <p className="project__sumtitle">Based on project completion rate</p>
                                <Piechart state={projectComp}/>
                        </div>

                        <div className="project__pie">
                            <p className="project__sumtitle">Based on project execution phase</p>
                            <BarChart/>
                        </div>
                        
                    </div> 
            
                </div>

            </div>

    );


};

export default ProjectWrapper; 