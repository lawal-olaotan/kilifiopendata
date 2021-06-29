import React from 'react'


const ProjectSelect = () => {

  return(

            <div className="nav__select project__extra">
            <select className="nav__orgselect">
                <option>Project Status</option>
                <option>Complete and in use</option>
                <option>Complete and not in use</option>
                <option>Incomplete and in use</option>
                <option>Incomplete and not in use</option>
                <option>Ongoing and in use</option>
                <option>Ongoing and not in use</option>
                <option>Does not exist</option>
               
            </select>
            </div>
    
    )

}


export default ProjectSelect