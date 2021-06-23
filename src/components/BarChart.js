import React from 'react';
import {Bar} from 'react-chartjs-2';
import '../css/project.min.css';

const BarChart =() => {


    const state = {

        labels: ['Completed & in use','Incomplete & in use','Incomplete & not in use','Ongoing & in use','Ongoing & not in use','Does not exist'],
        datasets:[{
            label:'Project Status',
            backgroundColor:'#6FCF97',
            data:[12,28,17,10,25,2.5],
            barThickness: 64,
        }

    ]

    }




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
                        fontSize:7,
                        fontWeight:'bolder',
                        fontColor:'black'
                    }

                }]
            }
        }}
        />
       
    )


}

export default BarChart;