import React from 'react';
import '../css/hero.min.css';
import Map from './Map'
import Popup from './Popup'





const DataTable = () => {
    
    return(
        <div className="hero">
            <Map/> 
            <Popup/>
        </div>
    )

}

export default DataTable;