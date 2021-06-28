import React,{useContext} from 'react';
import { FilterContext } from '../FilterContext';




const Popup = () => {

    const {compdata} = useContext(FilterContext);
    const currentComp = compdata;

    return (

        <div className="hero__content">
              
                <div className="hero__title">{currentComp.name}</div>

                    <div className="hero__contenttable">

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.projectNumber}</span>
                            <p className="hero__prosubtitle">Total Projects</p>
                        </div>

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.totalSpent}</span>
                            <p className="hero__prosubtitle">Pending Projects</p>
                        </div>
                            
                    </div>

                    <div className="hero__contenttable">
                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.totalapproved}</span>
                            <p className="hero__prosubtitle">Projects Approved</p>
                        </div>

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.approvalrate}%</span>
                            <p className="hero__prosubtitle">Approval Rate</p>
                        </div>   
                    </div>

                    <div className="hero__contenttable">

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.CommmunityInvolvement}%</span>
                            <p className="hero__prosubtitle">Women Involvement</p>
                        </div>

                        <div className="hero__project">
                            <span className="hero__protitle">{currentComp.citizenPriority}%</span>
                            <p className="hero__prosubtitle">Youth Involvement</p>
                        </div>
                            
                    </div>
                    

            </div>
    )
}


export default Popup