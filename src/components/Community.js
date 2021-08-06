import React,{useContext} from 'react';
import { FilterContext } from '../FilterContext';
import Piechart from '../components/Piechart';
import ProjectTitle from './ProjectTitle';
import ProjectSum from './ProjectSum';
import '../css/styles.min.css';
import '../css/project.min.css';





const Community = () => {

    const {communityList,commInTipTitles,commInTipPercs,commInTools,womenInTools,womenTipTitles,womenInTipPercs,disabledInTools,disabledInTipTitles,disabledInTipPercs,youthInTools,youthInTipTitles,youthInTipPercs,projectInTools,projectInTipTitles,projectInTipPercs,meetingInTools,meetingInTipTitles,meetingInTipPercs,matingInTools,matingInTipTitles,matingInTipPercs} = useContext(FilterContext);
    const communityPieData =  communityList;
   

        const [commInTipTitle, setCommInTipTitle] = commInTipTitles
        const [commInTipPerc, setCommInTipPerc] = commInTipPercs
        const communityInTip = commInTools 
    
        const womenInTip = womenInTools;
        const [womenInTipPerc, setWomenInTipPerc] = womenInTipPercs;
        const [womenInTipTitle, setWomenInTipTitle] = womenTipTitles;


        const disabledInTip = disabledInTools;
        const [disabledInTipTitle, setDisabledInTipTitle] = disabledInTipTitles
        const [disabledInTipPerc, setDisabledInTipPerc] = disabledInTipPercs


        const youthInTip = youthInTools;
        const [youthInTipTitle, setYouthInTipTitle] = youthInTipTitles
        const [youthInTipPerc, setYouthInTipPerc] =  youthInTipPercs

        const projectInTip = projectInTools
        const [projectInTipTitle, setProjectInTipTitle] = projectInTipTitles
        const [projectInTipPerc, setProjectInTipPerc] = projectInTipPercs


       const meetingInTip =  meetingInTools
        const [meetingInTipTitle, setMeetingInTipTitle] = meetingInTipTitles
        const [meetingInTipPerc, setMeetingInTipPerc] = meetingInTipPercs


       const matInTip = matingInTools
        const [matgInTipTitle, setMatingInTipTitle] = matingInTipTitles
        const [matingInTipPerc, setMatingInTipPerc] =  matingInTipPercs
        

        


    const projectSum = {
        summaryName: '% Community Involvement',
        sumValue: `${communityPieData.average_pec}%`,
        sumText: 'Includes all touch points (women involvements , youth involvements ... )',
    }

    const commComp = {


        
        labels: communityPieData.label,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                data:communityPieData.community_data
            }
        ] 
    }

   


    const womenComp = {

        labels: communityPieData.label,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                data: communityPieData.women_data
            }
        ] 

    }

    const youthComp = {

        labels: communityPieData.label,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                data: communityPieData.youth_data
            }
        ] 

    }
    
    const disabledComp = {

        labels: communityPieData.label,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                data: communityPieData.disabled_data
            }
        ] 

    }

    const meetingComp = {

        labels: communityPieData.label,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                data: communityPieData.meeting_data
            }
        ] 

    }

    const ImpleComp = {

        labels: communityPieData.label,
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                data: communityPieData.project_data
            }
        ] 

    }

    const materialsComp = {

        labels: ['Great', 'Poor'],
        datasets:[
            {
                label: 'Projects',
                backgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                hoverBackgroundColor:[
                    '#90CBA9',
                    '#EBA10F',
                ],
                data: communityPieData.materials_data
            }
        ] 

    }
   

    const Title = {
        Name : 'Community Involvement'
    }


    return (

        <div className="project__wrapper">

            <ProjectTitle title={Title}/>

                <div className="project__infowrapper">

                        <div className="project__infostep">

                            <ProjectSum data={projectSum}/>

                            <div className="project__threepie">

                                <p className="project__sumtitle">Based on Community Participation</p>

                                <div className="project__pie">
                                    <Piechart state={commComp}  ToolData={communityInTip} setPieTitle={setCommInTipTitle} setPiePercent={setCommInTipPerc}/> 
                                   
                                    { commInTipTitle !== '' && commInTipPerc !== undefined ? (
                                            <div className="project__position">
                                                <p className="project__pietitle">{commInTipTitle}</p>
                                                <h4 className="project__pievalue">{commInTipPerc}%</h4> 
                                            </div>
                                        ):(<div></div>)
                                    } 
                                        
                                </div>
                                
                            </div>

                            <div className="project__threepie">
                                <p className="project__sumtitle">Based on Women Participation</p>

                                <div className="project__pie">
                                    <Piechart state={womenComp} ToolData={womenInTip} setPieTitle={setWomenInTipTitle} setPiePercent={setWomenInTipPerc}/>
                                    { commInTipTitle !== '' && commInTipPerc !== undefined ? (
                                            <div className="project__position">
                                                <p className="project__pietitle">{womenInTipTitle}</p>
                                                <h4 className="project__pievalue">{womenInTipPerc}%</h4> 
                                            </div>
                                        ):(<div></div>)
                                    } 
                                </div>
 
                            </div>

                        </div>  

                        <hr/>

                    <div className="project__infostep">

                            <div className="project__chart threepstyle">
                                <p className="project__sumtitle">Based on Youth Participation</p>
                                <div className="project__pie">
                                    <Piechart state={youthComp} ToolData={youthInTip} setPieTitle={setYouthInTipTitle} setPiePercent={setYouthInTipPerc}/>
                                    { youthInTipTitle !== '' && youthInTipPerc !== undefined ? (
                                            <div className="project__position">
                                                <p className="project__pietitle">{youthInTipTitle}</p>
                                                <h4 className="project__pievalue">{youthInTipPerc}%</h4> 
                                            </div>
                                        ):(<div></div>)
                                    } 
                                </div>
 
                            </div>

                            <div className="project__chart threepstyle">
                                    <p className="project__sumtitle">Based on Disabled Participation</p>
                                    <div className="project__pie">
                                        <Piechart state={disabledComp} ToolData={disabledInTip} setPieTitle={setDisabledInTipTitle} setPiePercent={setDisabledInTipPerc} />
                                        { disabledInTipTitle !== '' && disabledInTipPerc !== undefined ? (
                                                <div className="project__position">
                                                    <p className="project__pietitle">{disabledInTipTitle}</p>
                                                    <h4 className="project__pievalue">{disabledInTipPerc}%</h4> 
                                                </div>
                                            ):(<div></div>)
                                        } 
                                    </div>
                            </div>

                            <div className="project__chart threepstyle">
                                    <p className="project__sumtitle">Based on project Implemetation</p>
                                    <div className="project__pie">
                                        <Piechart state={ImpleComp} ToolData={projectInTip} setPieTitle={setProjectInTipTitle} setPiePercent={setProjectInTipPerc} />
                                        { projectInTipTitle !== '' && projectInTipPerc !== undefined ? (
                                                <div className="project__position">
                                                    <p className="project__pietitle">{projectInTipTitle}</p>
                                                    <h4 className="project__pievalue">{projectInTipPerc}%</h4> 
                                                </div>
                                            ):(<div></div>)
                                        } 
                                    </div>
                            </div>

            
                    </div>

                    <hr/>

                    <div className="project__infostep">


                            <div className="project__chart">
                                    <p className="project__sumtitle">Based on Meetings Participation</p>
                                    <div className="project__pie">
                                        <Piechart state={meetingComp} ToolData={meetingInTip} setPieTitle={setMeetingInTipTitle} setPiePercent={setMeetingInTipPerc} />
                                        { meetingInTipTitle !== '' && meetingInTipPerc !== undefined ? (
                                                <div className="project__position">
                                                    <p className="project__pietitle">{meetingInTipTitle}</p>
                                                    <h4 className="project__pievalue">{meetingInTipPerc}%</h4> 
                                                </div>
                                            ):(<div></div>)
                                        } 
                                    </div>
                            </div>


                            <div className="project__chart">
                                    <p className="project__sumtitle">Based on overall quality of materials</p>
                                    <div className="project__pie">
                                        <Piechart state={materialsComp} ToolData={matInTip} setPieTitle={setMatingInTipTitle} setPiePercent={setMatingInTipPerc} />
                                        { matgInTipTitle !== '' && matingInTipPerc !== undefined ? (
                                                <div className="project__position newposition">
                                                    <p className="project__pietitle">{matgInTipTitle}</p>
                                                    <h4 className="project__pievalue">{matingInTipPerc}%</h4> 
                                                </div>
                                            ):(<div></div>)
                                        } 
                                    </div>
                            </div>

                    </div>

                     
            
                </div>

        </div>

    );


};

export default Community; 