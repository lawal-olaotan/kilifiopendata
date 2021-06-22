import React,{useContext} from 'react';
import { FilterContext } from '../FilterContext';




const Popup = () => {

    const {compdata} = useContext(FilterContext);
    const currentComp = compdata;

    return (

        <div className="hero__content">
              
                <div className="hero__title">{currentComp.Name}</div>

                    <div className="hero__contenttable">

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.projectNumber}</span>
                            <p className="hero__prosubtitle">Total Number of Projects</p>
                        </div>

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.totalSpent}</span>
                            <p className="hero__prosubtitle">Total Funds Spent(KES)</p>
                        </div>
                            
                    </div>

                    <div className="hero__contenttable">

                        <div className="hero__project">
                            <span className="hero__protitle">6</span>
                            <p className="hero__prosubtitle">Total Number of SubCounty</p>
                        </div>

                        <div className="hero__project">
                            <span className="hero__protitle">10</span>
                            <p className="hero__prosubtitle">Total Number of wards</p>
                        </div>
                            
                    </div>

                    <div className="hero__contenttable">

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.CommmunityInvolvement}</span>
                            <p className="hero__prosubtitle">Commmunity Involvement</p>
                        </div>

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.citizenPriority}</span>
                            <p className="hero__prosubtitle">citizen Priority</p>
                        </div>
                            
                    </div>
                    

            </div>
    )
}


export default Popup