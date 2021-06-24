import React from 'react';
import '../css/styles.min.css';
import '../css/project.min.css';
import Piechart from '../components/Piechart';
import FinanceHeader from './FinanceHeader';
import ProjectSum from './ProjectSum';
import BarChart from './BarChart';



const ProjectWrapper = () => {



    const projectComp = {

        labels: ['County', 'Private Sector','County Budget','Others(NGOS, CBOs,FBOs)'],
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
                data: [140,80,80,60]
            }
        ] 

    }

    const projectSummary = {
        summaryName: 'Total Funds Spent(KES)',
        sumValue: '75.6 Billion',
        sumText: 'Includes funds from other sources',
    }

    const projectAward = {
        summaryName: 'Total Amout Awarded(KES)',
        sumValue: '50.6 Billion',
        sumText: 'As per county records ',
    }

    const projectRecieved = {
        summaryName: 'Total Amout Recieved(KES)',
        sumValue: '45.6 Billion',
        sumText: 'As project site records',
    }


    const state = {
        
        labels: ['2013-2014','2014-2015','2015-2016','2016-2017','2017-2018','2018-2019','2019-2020','2020-2021'],
        datasets:[{
            label:'Project Status',
            backgroundColor:'#6FCF97',
            data:[12,26,12,10,20,2.5,5,7],
            barThickness: 64,
        }

        ]
    }

    const width = 550


    return (

        <div className="project__wrapper">

                <FinanceHeader/>

                <div className="project__infowrapper">

                    <div className="project__infostep">
                            <ProjectSum data={projectSummary}/>
                            <ProjectSum data={projectAward}/>
                            <ProjectSum data={projectRecieved}/>
                    </div>  

                    <hr/>

                    <div className="project__infostep">

                        <div className="project__pie">
                                <p className="project__sumtitle">Based on Source of funding</p>
                                <Piechart state={projectComp} width={width}/>
                        </div>

                        <div className="project__pie">
                            <p className="project__sumtitle">Based on Annaul Spendings (2013 - 2021)</p>
                            <BarChart state={state} width={width}/>
                        </div>
                        
                    </div> 
            
                </div>

            </div>

    );


};

export default ProjectWrapper; 