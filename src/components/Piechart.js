import React,{useMemo,useState,useEffect} from 'react';
import {Doughnut} from 'react-chartjs-2';

import '../css/project.min.css';



const Piechart = ({state,ToolData,setPieTitle,setPiePercent}) => {

    const [call,setCall] = useState([])


    const chartState = useMemo(() => {
        return state;
    }, [state])

    useMemo(() => {

        let timecall = setTimeout(()=> {

            const calldata = {

                title : function(item, data){
                    let currentindex = item[0].index
                    const title = data.labels[currentindex];
                    setPieTitle(title);
                    return title;
                },
                label:function(item){

                    if(ToolData !== undefined){
                        let currentindex = item.index
                        let currentCount = ToolData.count[currentindex];
                        return `Total Projects : ${currentCount}`;
                    }
                    
                },
                footer:function(item){
                    if(ToolData !== undefined){
                        let currentindex = item[0].index
                        let currentPecent = ToolData.percentage[currentindex]
                        setPiePercent(currentPecent);
                        return `Percentage : ${currentPecent} %`;
                    } 
                }

            }

            setCall(calldata)
        },1000);
        
        return () => clearTimeout(timecall);

    },[ToolData,setPieTitle,setPiePercent])
    

    return(

        <div className="project__piewrapper">
            <Doughnut
                data={chartState}
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
                        callbacks :call
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