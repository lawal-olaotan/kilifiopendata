import React from 'react';
import {Doughnut} from 'react-chartjs-2';






const Piechart = () => {

    const state = {

        labels: ['Construction Based', 'Technology Based','Human Resource','Research Based'],
        datasets:[{
            label:'Projects',
            backgroundColor:[
                '#90CBA9',
                '#EBA10F',
                '#2B87E3',
                '#9B51E0',
            ],
            hoverBackgroundColor:[
                '#90CBA9',
                '#EBA10F',
                '#2B87E3',
                '#9B51E0',
            ],
            data: [100,70,40,150]
        }]

    }


    return(
    
        <Doughnut
        data={state}
        options={{ 
            title:{
                display: true,
                text: 'Based on project type',
                fontSize:20
            },
            legend:{
                display: true,
                position:'right',
            }
        }}
        
        />
    )

};


export default Piechart;