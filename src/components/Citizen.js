import React,{useContext} from 'react';
import '../css/styles.min.css';
import '../css/project.min.css';
import Piechart from '../components/Piechart';
import ProjectTitle from './ProjectTitle';
import ProjectSum from './ProjectSum';
import { FilterContext } from '../FilterContext';




const Citizen = () => {

    const {citizenList} = useContext(FilterContext);
    const citizenCompData = citizenList


    const projectComp = {

        labels: citizenCompData.pielable,
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
                data: citizenCompData.pieData
            }
        ] 

    }

    const projectSummary = {
        summaryName: 'Project Priority',
        sumValue: `${citizenCompData.percent}%`,
        sumText: 'Includes all projects presented to the community',
    }


    const totalPriority = {
        summaryName: 'Total Priortized Projects',
        sumValue: citizenCompData.totalProject,
        sumText: 'Includes all projects priortized to the community', 
    }


    const Title = {
        Name : 'Citizen Priorities'
    }


    return (

        <div className="project__wrapper">

            <ProjectTitle title={Title}/>

                <div className="project__infowrapper">

                        <div className="project__infostep">
                            <ProjectSum data={projectSummary}/>

                            <ProjectSum data={totalPriority}/>

                            <div className="project__pie">
                                <p className="project__sumtitle">Based on project Importance</p>
                                <Piechart state={projectComp}/>
                            </div>

                            {/* <div className="project__pie">
                                <p className="project__sumtitle">Based on Source of funding</p>
                                <Piechart state={projectComp}/>
                            </div> */}

                        </div>  

                    <hr/>

                </div>

        </div>

    );


};

export default Citizen; 