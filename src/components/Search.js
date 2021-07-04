import React,{useState,useContext} from 'react';
import {FilterContext} from '../FilterContext';


const Search = () => {

    const {subcounty,wards,depts} = useContext(FilterContext);
    const [subCountyList,handleChange] = subcounty;
    const [wardList,handleWard] = wards;
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
       
        <div className="top__searchwrapper">

                <div className="top__searchinput">
                    <input className="top__search" type="search" onChange={handleSearch} placeholder="Search Projects By Sub-Counties and Wards"/>
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
    )
}

export default Search;