import React from 'react';

const Popup = ({data}) => {


    return (

        <div className="hero__content">
              
                <div className="hero__title">{data.Name}</div>

                    <div className="hero__contenttable">

                        <div className="hero__project">
                            <span className="hero__protitle">{data.projectNumber}</span>
                            <p className="hero__prosubtitle">Total Number of Projects</p>
                        </div>

                        <div className="hero__project">
                            <span className="hero__protitle">{data.totalSpent}</span>
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
                            <span className="hero__protitle">{data.CommmunityInvolvement}</span>
                            <p className="hero__prosubtitle">Commmunity Involvement</p>
                        </div>

                        <div className="hero__project">
                            <span className="hero__protitle">{data.citizenPriority}</span>
                            <p className="hero__prosubtitle">citizen Priority</p>
                        </div>
                            
                    </div>
                    

            </div>
    )
}


export default Popup