import React,{useContext} from 'react';
import { FilterContext } from '../FilterContext';
import Piechart from '../components/Piechart';
import ProjectTitle from './ProjectTitle';
import ProjectSum from './ProjectSum';
import '../css/styles.min.css';
import '../css/project.min.css';





const Community = () => {

    const {communityList,commInTipTitles,commInTipPercs,commInTools,womenInTools,womenTipTitles,womenInTipPercs} = useContext(FilterContext);
    const communityPieData =  communityList;

    const [commInTipTitle, setCommInTipTitle] = commInTipTitles
    const [commInTipPerc, setCommInTipPerc] = commInTipPercs
    const communityInTip = commInTools 
    
    const womenInTip = womenInTools;
    const [womenInTipPerc, setWomenInTipPerc] = womenInTipPercs;
    const [womenInTipTitle, setWomenInTipTitle] = womenTipTitles;
  


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

    // const youthComp = {

    //     labels: communityPieData.label,
    //     datasets:[
    //         {
    //             label: 'Projects',
    //             backgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             hoverBackgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             data: communityPieData.youth_data
    //         }
    //     ] 

    // }
    
    // const disabledComp = {

    //     labels: communityPieData.label,
    //     datasets:[
    //         {
    //             label: 'Projects',
    //             backgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             hoverBackgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             data: communityPieData.disabled_data
    //         }
    //     ] 

    // }

    // const meetingComp = {

    //     labels: communityPieData.label,
    //     datasets:[
    //         {
    //             label: 'Projects',
    //             backgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             hoverBackgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             data: communityPieData.meeting_data
    //         }
    //     ] 

    // }

    // const ImpleComp = {

    //     labels: communityPieData.label,
    //     datasets:[
    //         {
    //             label: 'Projects',
    //             backgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             hoverBackgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             data: communityPieData.project_data
    //         }
    //     ] 

    // }

    // const materialsComp = {

    //     labels: ['Great', 'Poor'],
    //     datasets:[
    //         {
    //             label: 'Projects',
    //             backgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             hoverBackgroundColor:[
    //                 '#90CBA9',
    //                 '#EBA10F',
    //             ],
    //             data: communityPieData.materials_data
    //         }
    //     ] 

    // }
   

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

                        <div className="project__pie">
                                <p className="project__sumtitle">Based on Youth Participation</p>
                                <Piechart state={youthComp}/>
                        </div>

                        {/* <div className="project__pie">
                                <p className="project__sumtitle">Based on Disabled Participation</p>
                                <Piechart state={disabledComp}/>
                        </div> */}

                        {/* <div className="project__pie">
                                <p className="project__sumtitle">Based on Meetings Participation</p>
                                <Piechart state={meetingComp}/>
                        </div> */}

                    </div>

                    <hr/>

                    {/* <div className="project__infostep">

                        <div className="project__pie">
                                <p className="project__sumtitle">Based on project Implemetation Involvement</p>
                                <Piechart state={ImpleComp} height={150} width={300} />
                        </div>

                        <div className="project__pie">
                                <p className="project__sumtitle">Based on overall quality of materials</p>
                                <Piechart state={materialsComp} height={172} width={345} />
                        </div>
                    </div> */}
            
                </div>

        </div>

    );


};

export default Community; 