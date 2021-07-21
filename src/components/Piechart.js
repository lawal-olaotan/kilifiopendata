import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import  'chartjs-plugin-datalabels';
import '../css/project.min.css';


const Piechart = ({state, height, width,call}) => {

    

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
                    callbacks : call,
                },
                maintainAspectRatio:false,
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