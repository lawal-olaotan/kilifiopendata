import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import '../css/project.min.css';


const Piechart = ({state, height, width}) => {

    

    return(

        <div className="project__piewrapper">
            <Doughnut
            data={state}
            height= {height}
            width={width}
            options={{ 
                responsive: true,
                legend:{
                    display:true,
                    position:'right',
                    labels:{
                        boxWidth: 16,
                    }
                }
            }}
            />
        </div>
    );

};

export default Piechart;