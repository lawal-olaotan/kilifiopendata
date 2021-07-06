import React from 'react';
import {Bar} from 'react-chartjs-2';
import '../css/project.min.css';

const BarChart =( {state , width } ) => {


    return (

        <Bar 
        data={state}
        height={220}
        width={width}
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
                        fontSize:6.4,
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