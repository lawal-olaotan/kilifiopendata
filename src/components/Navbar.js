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
      const [searchWards,setWards] = useState([]);


      

      const handleSearch = e => {
        const searchTerm = e.target.value;
        if(searchTerm !== ''){
          const searchValue = subCountyList.filter(term => (term.name.toLowerCase().includes(searchTerm.toLowerCase())));
          SetSearchResult(searchValue);
          getWards(subCountyList,searchTerm);
          setShow(!show)
        }else{
          setShow(false)
        }
          
      }


      const getWards= (subco,searchTerm)=> {
        
            let wardArr= [];
            for(let i=0; i < subco.length; i++){
               const wards = subco[i].wards.values();
              
               for(let ward of wards ){
                  wardArr.push(ward);
               }
            }

            if(searchTerm !== ''){
              const wardValue = wardArr.filter(wards => (wards.name.toLowerCase().includes(searchTerm.toLowerCase())));
              setWards(wardValue);
              setShow(!show)
            }else{
              setShow(false)
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
                          <input className="top__search" type="search" onChange={handleSearch} placeholder="Search Projects By Sub-Counties and Wards"/>
                          <button  className="top__btn" type="submit">Search</button>
                      </div>

                      <ul className={`top__searchbox ${show ? '': "invisible"}`}>
                        <p className="top__title text-center">Sub Counties({searchResult.length}) | Wards({searchWards.length})</p>

                          <div>
                            <p className="top__title">Sub Counties</p>
                              {searchResult.length === 0 ? (
                                <li className="top__searchitem">Not Found</li>
                              ): (
                                searchResult && searchResult.map((result)=> (
                                <li onClick={ ()=> {handleChange(result.name); setShow(false);} } className="top__searchitem">{result.name}</li>
                                ))
                              
                              )}
                          </div>
                          
                          <div>
                              <p className="top__title">Wards</p>
                              {searchWards.length === 0 ? (
                                <li className="top__searchitem">Not Found</li>
                              ): (
                                
                                searchWards && searchWards.map((result)=> (
                                <li onClick={ ()=> {handleWard(result.name); setShow(false);} } className="top__searchitem">{result.name}</li>
                                ))
                              
                              )}
                          </div>
                      
                      </ul>
                </div>

                <div className="toggle_btn"> 
                  <FontAwesomeIcon icon={faCoffee} />
                </div>
            
            </div>

            <nav className="nav">
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
            </nav>
       
      </header>

    )



}

export default NavBar;