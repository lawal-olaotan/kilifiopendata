import React from 'react'


const ProjectSelect = ({ data , handler }) => {

    console.log(data);

  return(

            <div className="nav__select project__extra">
            <select className="nav__orgselect" onChange={handler}>
                <option>Project Status</option>
                {data && data.map((status) => (
                    <option>{status}</option>
                ))}
            </select>
            </div>
    
    )

}


export default ProjectSelect