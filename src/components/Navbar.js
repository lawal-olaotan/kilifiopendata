import React,{useContext} from 'react';
import '../css/styles.min.css';
import logo from '../logo.svg';
import {FilterContext} from '../FilterContext';

const NavBar = () => {

     const {subcounty,wards,depts} = useContext(FilterContext);
      const [subCountyList,handleChange] = subcounty;
      const [wardList,handleWard] = wards;
      const [departmentList,handleDept] = depts;


    return (

        <header className="header">

            <div className="top">

                <div className="top__logowrapper">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>

                <div className="top__searchwrapper">
                    <input className="top__search" type="search" placeholder="Sub Counties,Projects and financial reports"/>
                    <button  className="top__btn" type="submit">Search</button>
                </div>
            
            </div>

        <nav className="nav">
          <div className="nav__left">

              <div className="nav__select">
                  <select className="nav__orgselect" onChange={handleChange}>
                    <option>Sub County</option>
                    {subCountyList && subCountyList.map((subCounty)=> (
                      <option >{subCounty.Name}</option>
                    )) }    
                  </select>
              </div>

              <div className="nav__select" >
                  <select className="nav__orgselect"  onChange={handleWard}>
                    <option>Wards</option>
                    {wardList && wardList.map((ward)=> (
                      <option>{ward.Name}</option>
                    )) }
                  </select>
              </div>

              <div className="nav__select">
                  <select className="nav__orgselect" onChange={handleDept}>
                    <option>Department</option>
                    {departmentList && departmentList.map((dept)=> (
                      <option>{dept.Name}</option>
                    )) }
                        
                  </select>
              </div>
            
          </div>
        </nav>
       
      </header>

    )



}

export default NavBar;