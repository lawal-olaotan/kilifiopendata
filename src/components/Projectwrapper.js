import React,{useContext} from 'react';
import '../css/styles.min.css';
import '../css/project.min.css';
import { FilterContext } from '../FilterContext';
import Piechart from '../components/Piechart';
import ProjctHeader from '../components/Projectheader';
import ProjectSum from './ProjectSum';
import BarChart from './BarChart';



const ProjectWrapper = () => {


    const {compdata,proTypeData,ProPhase,ProStatus} = useContext(FilterContext);
    const [currentComp]= compdata;
    const [projType,proLabel] = proTypeData;
    const [phasedata,phaselabel] = ProPhase
    const [projStatusLabel,projStatusData,statusComp] = ProStatus;
   

    const projectSummary = {
        summaryName: 'Projects',
        sumValue: currentComp.projectNumber,
        sumText: 'Includes completed, ongoing and proposed projects',
    }


    const statusSummary = {
        summaryName:`Total Projects in ${currentComp.name}`,
        sumValue: currentComp.projectNumber,
        sumText: 'Includes completed, ongoing and proposed projects'
    }

    const statusProjects = {
        summaryName:`Total ${statusComp.title} projects in ${currentComp.name}`,
        sumValue: statusComp.count,
        sumText: `Includes all ${statusComp.title} projects`
    }

    const statusperc = {
        summaryName:`% of ${statusComp.title} projects in ${currentComp.name}`,
        sumValue: `${statusComp.percentage}%`,
        sumText: `Includes all ${statusComp.title} project rates in ${currentComp.name}`
    }


    const projectType = {
        labels:proLabel ,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                    '#9B51E0',
                    '#6042E4',
                    '#E029D1',
                    '#184E2D',
                    '#EF0E4D',
                    '#FCE842',
                    '#3C4B97'

                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                    '#2B87E3',
                    '#9B51E0',
                    '#6042E4',
                    '#E029D1',
                    '#184E2D',
                    '#EF0E4D',
                    '#FCE842',
                    '#3C4B97',

                ],
                data:projType
            }
        ]   
    }

    const projectComp = {

        labels: phaselabel,
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
                data:phasedata
            }
        ] 

    }


    const state = {
        
        labels: projStatusLabel,
        datasets:[{
            label:'Project Status',
            backgroundColor:'#6FCF97',
            data:projStatusData,
            barThickness: 69,
        }

        ]
    }

    const width =698


    return (

        <div className="project__wrapper">

                <ProjctHeader/>

                <div className="project__infowrapper">

                {statusComp.length === 0 ? (

                    <div className="project__infostep">

                        <ProjectSum data={projectSummary}/>

                        <div className="project__pie">
                            <p className="project__sumtitle">Based on Project Status</p>
                            <BarChart state={state} width={width}/>  
                        </div>
                    
                    </div> 


                ) : ( 

                    <div className="project__infostep">

                        <ProjectSum data={statusSummary}/>
                        <ProjectSum data={statusProjects}/>
                        <ProjectSum data={statusperc}/>

                    </div> 


                )}

                    



                    <hr/>

                    <div className="project__infostep">

                        <div className="project__pie ">
                                <p className="project__sumtitle margin-bottom">Based on Project Execution Phase</p>
                                <Piechart state={projectComp} height={150} width={300}/>
                        </div>

                        <div className="project__pie">
                                <p className="project__sumtitle">Based on Project Department</p>
                                <Piechart state={projectType} height={300} width={600}/>
                        </div>
                        
                    </div> 
            
                </div>

            </div>

    );


};

export default ProjectWrapper; 