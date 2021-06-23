import React from 'react';
import {Bar} from 'react-chartjs-2';
import '../css/project.min.css';

const BarChart =( {state} ) => {


    return (

        <Bar 
        data={state}
        height={220}
        width={490}
        options={{
            title:{
                display:false,
            },
            legend:{display:false},
            scales:{
                yAxes:[{
                    display:false,
                    beginAtZero: true
                }],
                xAxes:[{
                    display:true,
                    background:'transparent',
                    gridLines:{
                        display:false,
                    },
                    ticks:{
                        fontSize:6.6,
                        fontStyle:800,
                        fontColor:'#2B622A'
                    }

                }]
            }
        }}
        />
       
    )


}

export default BarChart;