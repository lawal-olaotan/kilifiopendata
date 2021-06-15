import React from 'react';
import '../css/hero.min.css';
import Map from './Map'
import Popup from './Popup'



const DataTable = ({ data }) => {

    const mapData = [data.lat,data.lon]


    return(

        <div className="hero">

            <div className="hero__map">
                <Map data= {mapData}/>    
            </div>
            <Popup data={data}/>
        </div>
    )

}

export default DataTable;