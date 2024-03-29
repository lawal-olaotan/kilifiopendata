import React,{useContext} from 'react';
import { FilterContext } from '../FilterContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons';




const Popup = () => {

    const {compdata,geodatas} = useContext(FilterContext);
    const [currentComp,deptComp,communityPop,projectStats]= compdata;
    const currentGeo = geodatas

    const loader = <FontAwesomeIcon icon={faSpinner} className="fa-spin"/>;

    return (

        <div className="hero__content">

              { currentComp.length === 0 ?(

                <div className="hero__loader">{loader}</div>

              ):(
                <div>
                <div className="hero__title">{currentGeo.Name}{currentGeo.type === 'ward' ? (<span> Ward</span>):('')}</div>

                <div style={{background:(currentGeo.color)}} className="hero__colorbar">{currentGeo.subName}</div>

                    {deptComp.length === 0 ? (
                        <div>
                            <div className="hero__contenttable">

                            <div className="hero__project">
                                <span className="hero__protitle">{projectStats.totalProjects}</span>
                                <p className="hero__prosubtitle">Total Projects</p>
                            </div>

                            <div className="hero__project">
                                <span className="hero__protitle">{projectStats.pendingProjects}</span>
                                <p className="hero__prosubtitle">Pending Projects</p>
                            </div>
                                
                            </div>

                            <div className="hero__contenttable">
                            <div className="hero__project">
                                <span className="hero__protitle">{projectStats.projectsApproved}</span>
                                <p className="hero__prosubtitle">Projects Approved</p>
                            </div>

                            <div className="hero__project">
                                <span className="hero__protitle">{projectStats.approvalRate}%</span>
                                <p className="hero__prosubtitle">Approval Rate</p>
                            </div>   
                            </div>

                        </div>

                    ) :(

                        <div>

                            <div className="hero__dept">{deptComp.department} Department</div>

                            <div className="hero__contenttable">

                                <div className="hero__project">
                                    <span className="hero__protitle">{deptComp.total}</span>
                                    <p className="hero__prosubtitle">Total Projects</p>
                                </div>

                                <div className="hero__project">
                                    <span className="hero__protitle">{deptComp.percentage}%</span>
                                    <p className="hero__prosubtitle">Project percentage</p>
                                </div>
                                    
                            </div>

                        </div>
                
                    )}
                   
                </div>
            
              )}
                    
        
        </div>
    )
}


export default Popup