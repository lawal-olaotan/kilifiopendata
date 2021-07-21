import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import  'chartjs-plugin-datalabels';
import '../css/project.min.css';


const Piechart = ({state, height, width,ToolData}) => {

    return(

        <div className="project__piewrapper">
            <Doughnut
            data={state}
            height= {height}
            width={width}
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

                        label : function(item,data){

                            if(ToolData !== undefined){
                                let currentindex = item.index
                                let currentCount = ToolData.count[currentindex]

                                return `Total Projects : ${currentCount}`;
                            }
                          
                
                            
                        },
                        title : function(item,data){
                            let currentindex = item[0].index
                            const title = data.labels[currentindex]
                
                            return title
                        },
                        footer:function(item,data){
                            
                            if(ToolData !== undefined){
                                let currentindex = item[0].index
                                let currentPecent = ToolData.percentage[currentindex]
                                return `Percentage : ${currentPecent} %`;
                            } 
                        }
                    },
                    positioners:{
                        
                    }
                    
                },
                maintainAspectRatio:false,
                cutoutPercentage:'65',
                
                responsive: true,
                legend:{
                    display:true,
                    position:'right',
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