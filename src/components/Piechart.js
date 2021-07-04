import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import '../css/project.min.css';


const Piechart = ({state}) => {

    

    return(

        <div className="project__piewrapper">
            <Doughnut
            data={state}
            height= {300}
            width={600}
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