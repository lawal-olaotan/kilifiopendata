import React,{useState,useEffect} from  'react';
import data from './endpoint.json';

 const FilterContext = React.createContext();


 const FilterProvider = ({ children }) => {

    const [subCountyList,setSubCountyList] = useState([]);
    
    const [wardList, setWardList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);

    const [currentComp, setCurrentComp] = useState([]);
    const [currentGeo, setCurrentGeo] = useState([]);


    useEffect(()=> {renderUi()},[]);


    const renderUi = () => {
        const subCounties = data.subCounty;
        const departments = data.department;
        setSubCountyList(subCounties)
        setDepartmentList(departments);
        setCurrentComp(data);
        retrievGeoInfo(data,'County',8)
        console.log(data);
      
    }


    const handleChange = e => {
        const selSubCounty = e.target.value;
        const subCounty = subCountyList.filter(subcounty => subcounty.Name === selSubCounty)[0]
        const wards = subCounty.wards;
        const department = subCounty.department
        setDepartmentList(department)
        setWardList(wards);
        retrievGeoInfo(subCounty,'subCounty',10)
        setCurrentComp(subCounty);
     }


     const handleWard = e => {
        const ward = e.target.value
        const wardInfo = wardList.filter(inner => inner.Name === ward)[0]
        const wardDept = wardInfo.department;
        setDepartmentList(wardDept);
        retrievGeoInfo(wardInfo,'subCounty',10)
        setCurrentComp(wardInfo);
        retrievGeoInfo(wardInfo,'ward',12);
       
      }


      const handleDept = e => {
        const dept = e.target.value
        const deptinfo = departmentList.filter(inner => inner.Name === dept)[0];
        setCurrentComp(deptinfo);
     
    }

    const retrievGeoInfo = (mapdata,type,zoom)=> {
        const geodata = {
            Name: mapdata.Name,
            lon: mapdata.lon,
            lat: mapdata.lat,
            type : type,
            zoom : zoom
        }
        setCurrentGeo(geodata);

    }


    // all data nedded for the components and event functions
    const UiData = {
        subcounty:[subCountyList,handleChange],
        wards: [wardList,handleWard],
        depts: [departmentList,handleDept],
        geodatas:currentGeo,
        compdata:currentComp
    }
    
    return <FilterContext.Provider value={UiData}>{ children }</FilterContext.Provider>


};

export {FilterContext,FilterProvider};


