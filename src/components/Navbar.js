import React,{useContext} from 'react';
import '../css/styles.min.css';
import logo from '../logo.svg';
import {FilterContext} from '../FilterContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars,faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import Search from '../components/Search';

const NavBar = () => {

     const {subcounty,wards,depts,navStatus} = useContext(FilterContext);
      const [subCountyList,handleChange] = subcounty;
      const [wardList,handleWard] = wards;
      const [departmentList,handleDept] = depts;
      const [ NavState,showNavbar] = navStatus
  
    return (
            <nav className="top">
                  <div className="top__logowrapper">
                      <img src={logo} className="App-logo" alt="logo" />
                  </div>
              <div className={`top__navmenu ${showNavbar ? '' : 'flexvisible'}`}>

                <div className="nav__left">
                    <div className="nav__select">
                        <select className="nav__orgselect" onChange={(e)=> handleChange(e.target.value) }>
                          <option>Sub County</option>
                          {subCountyList && subCountyList.map((subCounty)=> (
                            <option >{subCounty.name}</option>
                          )) }    
                        </select>

                    </div>

                    <div className="nav__select" >
                        <select className="nav__orgselect"  onChange={(e)=> handleWard(e.target.value)}>
                          <option>Wards</option>
                          {wardList && wardList.map((ward)=> (
                            <option>{ward.name}</option>
                          )) }
                        </select>
                    </div>

                    <div className="nav__select">
                        <select className="nav__orgselect" onChange={handleDept}>
                          <option>Department</option>
                          {departmentList && departmentList.map((dept)=> (
                            <option>{dept.department}</option>
                          )) }
                              
                        </select>
                    </div>
                </div>
                <Search/>
                <FontAwesomeIcon icon={faTimesCircle} className="icon navicon" onClick={NavState} />

              </div>
                <div className="toggle_btn"> 
                  <FontAwesomeIcon icon={faBars} className="icon" onClick={NavState} />
                </div>
            </nav>

        // </header>
    )



}

export default NavBar;