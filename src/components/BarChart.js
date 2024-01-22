import React,{useContext} from 'react';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { FilterContext } from '../FilterContext';
import '../css/project.css';




const BarChart =( {state,bartick} ) => {

    const {statsCount} = useContext(FilterContext);
    const statCount =  statsCount

    return (

        <Bar 
        data={state}
        plugins={[ChartDataLabels]}
        options={{
            layout:{
                padding:12
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
                callbacks:{
                    label : function(item,data){
                        let barIndex = item.index;
                        let realD = statCount[barIndex]
                        return `Project Total: ${realD}`;
                    },
                    footer:function(item,data){
                        let barvalue = item[0].value;
                       let label = `Percentage: ${barvalue} %`;
                        return label;
                    }
                },
                
            },
            title:{
                display:false,
            },
            legend:{display:false},
            scales:{
                yAxes:[{
                    display:false,
                    beginAtZero: true,
                }],
                xAxes:[{
                    display:true,
                    background:'transparent',
                    gridLines:{
                        display:false,
                    },
                    ticks:bartick

                }]
            },
            // responsive:true,
            maintainAspectRatio:false
        }}
        />
       
    )


}

export default BarChart;