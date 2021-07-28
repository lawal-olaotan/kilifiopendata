import React from 'react';
import {Doughnut} from 'react-chartjs-2';

import '../css/project.min.css';



const Piechart = ({state,ToolData,setPieTitle,setPiePercent}) => {

    // function addData(chart, label, data) {
    //     chart.data.labels.push(label);
    //     chart.data.datasets.forEach((dataset) => {
    //         dataset.data.push(data);
    //     });
    //     chart.update();
    // }


    return(

        <div className="project__piewrapper">
            <Doughnut
                data={state}
                options={{ 
                    plugins:{
                        datalabels:{
                            display:false
                        }
                    },
                    tooltips:{
                        displayColors:false,
                        backgroundColor:'#FFF',
                        titleFontColor:'#000',
                        bodyFontColor:'black',
                        footerFontColor:'black',
                        borderColor : 'green',
                        borderWidth: 1,
                        xPadding: 12,
                        yPadding: 12,
                        caretSize :0,
                        callbacks :{

                            title : function(item,data){
                                let currentindex = item[0].index
                                const title = data.labels[currentindex];
                                setPieTitle(title);
                                return title;
                            },
                            label:function(item,data){

                                if(ToolData !== undefined){
                                    let currentindex = item.index
                                    let currentCount = ToolData.count[currentindex];
                                    return `Total Projects : ${currentCount}`;
                                }
                                
                            },
                            footer:function(item,data){
                                
                                if(ToolData !== undefined){
                                    let currentindex = item[0].index
                                    let currentPecent = ToolData.percentage[currentindex]
                                    setPiePercent(currentPecent);
                                    return `Percentage : ${currentPecent} %`;
                                } 
                            }
                        },
                        
                    },
                    maintainAspectRatio:false,
                    cutoutPercentage:'65',
                    
                    responsive: true,
                    legend:{
                        // display:true,
                        position:'right',
                        align:'center',
                        labels:{
                            boxWidth: 12,
                        }
                    }
                }}
            />
        </div>
    );

};

export default Piechart;