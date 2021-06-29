import React,{useContext,useState} from 'react';
import '../css/styles.min.css';
import logo from '../logo.svg';
import {FilterContext} from '../FilterContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

const NavBar = () => {

     const {subcounty,wards,depts} = useContext(FilterContext);
      const [subCountyList,handleChange] = subcounty;
      const [wardList,handleWard] = wards;
      const [departmentList,handleDept] = depts;

      const [searchResult, SetSearchResult] = useState([]);
      const [show,setShow] = useState(false);


      

      const handleSearch = e => {
        const searchTerm = e.target.value;

       
        if(searchTerm !== ''){
          const searchValue = subCountyList.filter(term => (term.name.toLowerCase().includes(searchTerm.toLowerCase()))   );
          SetSearchResult(searchValue);
          getWards(subCountyList);
          console.log(subCountyList);
          setShow(!show)
        }else{
          setShow(false)
        }
          
          // console.log(searchResult)
      }


      const getWards= (subco)=> {
            let wardArr = []
            let ready = []
            for(let i=0; i < subco.length; i++ ){
                wardArr.push(subco[i].wards);

                ready.push(wardArr[0])
                ready.push(wardArr[1])
              console.log(ready);
            }
      }

    

    return (

        <header className="header">

            <div className="top">

                <div className="top__logowrapper">
                    <img src={logo} className="App-logo" alt="logo" />
                </div>

                <div className="top__searchwrapper">

                      <div className="top__searchinput">
                          <input className="top__search" type="search" onChange={handleSearch} placeholder="Search By Sub-Counties"/>
                          <button  className="top__btn" type="submit">Search</button>
                      </div>

                      <ul className={`top__searchbox ${show ? '': "invisible"}`}>
                        {searchResult.length === 0 ? (
                          <li className="top__searchitem">Not Found</li>
                        ): (
                           
                          searchResult && searchResult.map((result)=> (
                          <li className="top__searchitem">{result.name}</li>
                          ))
                        
                        )}
                      </ul>

                </div>

                <div className="toggle_btn"> 
                  <FontAwesomeIcon icon={faCoffee} />
                </div>
            
            </div>

            <nav className="nav">
              <div className="nav__left">

                  <div className="nav__select">
                      <select className="nav__orgselect" onChange={handleChange}>
                        <option>Sub County</option>
                        {subCountyList && subCountyList.map((subCounty)=> (
                          <option >{subCounty.name}</option>
                        )) }    
                      </select>
                  </div>

                  <div className="nav__select" >
                      <select className="nav__orgselect"  onChange={handleWard}>
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
            </nav>
       
      </header>

    )



}

export default NavBar;