import React from 'react';
import {Bar} from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import '../css/project.min.css';



const BarChart =( {state,bartick} ) => {


    return (

        <Bar 
        data={state}
        plugins={[ChartDataLabels]}
        options={{
            // layout:{
            //     padding:10
            // },
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