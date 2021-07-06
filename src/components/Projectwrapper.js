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
    const [projStatusLabel,projStatusData] = ProStatus;
   

    const projectSummary = {
        summaryName: 'Projects',
        sumValue: currentComp.projectNumber,
        sumText: 'Includes completed, ongoing and proposed projects',
    }

//    let  pielabel = ['Construction Based', 'Technology Based','Human Resource','Research Based'];
//     let piedata = [100,70,40,150];

    

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


    
    // const projectExecution = {

    //     labels: ['No phased Project', 'Phase I','Phase II'],
    //     datasets:[
    //         {
    //             label: 'Projects',
    //             backgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //                 '#2B87E3',
    //             ],
    //             hoverBackgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //                 '#2B87E3',
    //             ],
    //             data: [170,40,150]
    //         }
    //     ] 

    // }

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

                    <div className="project__infostep">

                        <ProjectSum data={projectSummary}/>

                        <div className="project__pie">
                            <p className="project__sumtitle">Based on Project Status</p>
                            <BarChart state={state} width={width}/>
                        </div>
                        
                        
                    </div>  

                    <hr/>

                    <div className="project__infostep">

                        <div className="project__pie ">
                                <p className="project__sumtitle margin-bottom">Based on project execution phase</p>
                                <Piechart state={projectComp} height={150} width={300}/>
                        </div>

                        <div className="project__pie">
                                <p className="project__sumtitle">Based on project Sector</p>
                                <Piechart state={projectType} height={300} width={600}/>
                        </div>
                        
                    </div> 
            
                </div>

            </div>

    );


};

export default ProjectWrapper; 