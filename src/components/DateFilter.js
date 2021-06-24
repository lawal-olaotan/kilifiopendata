import React from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateFilter = () => {

    return(

        <div className="nav__select project__extra">
                <DatePicker
                // selected={ this.state.startDate }
                // onChange={ this.handleChange }
                name="startDate"
                dateFormat="MM/dd/yyyy"
                value="Date Project Started: DD-MM-YY"/>
            </div>

    )

}

export default DateFilter;