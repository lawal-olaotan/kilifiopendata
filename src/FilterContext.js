import React,{useState,useEffect} from  'react';
import data from './endpoint.json';
import Items from "./entitles/Items";
import wards from "./datas/wards.json";
import subcounty from "./datas/sub_counties.json";
 const FilterContext = React.createContext();


 const FilterProvider = ({ children }) => {

    const [subCountyList,setSubCountyList] = useState([]);
    
    const [wardList, setWardList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);

    const [currentComp, setCurrentComp] = useState([]);
    const [currentGeo, setCurrentGeo] = useState([]);
    const [Geojsondata,setGeoJsonData] = useState(currentGeo);


    useEffect(()=> {
        const geodata = data
        const subCounties = data.subCounty;
        const departments = data.department;
        setSubCountyList(subCounties)
        setDepartmentList(departments);
        setCurrentComp(data);
        retrievGeoInfo(geodata,'County',8);
        SetGeoJson();

    } ,[]);


    // const renderUi = () => {
    //     const subCounties = data.subCounty;
    //     const departments = data.department;
    //     setSubCountyList(subCounties)
    //     setDepartmentList(departments);
    //     setCurrentComp(data);
    //     retrievGeoInfo(data,'County',8);
    
    // }
    

    const handleChange = e => {

        if(e.target.value !== 'Sub County'){

            const selSubCounty = e.target.value;
        const subCounty = subCountyList.filter(subcounty => subcounty.Name === selSubCounty)[0]
        const wards = subCounty.wards;
        const department = subCounty.department
        retrievGeoInfo(subCounty,'subCounty',10);
        setDepartmentList(department)
        setWardList(wards);
        setCurrentComp(subCounty);
        SetGeoJson();

        }
        
       
     }


     const handleWard = e => {

        if(e.target.value !== 'Wards'){
            const ward = e.target.value
            const wardInfo = wardList.filter(inner => inner.Name === ward)[0]
            const wardDept = wardInfo.department;
            setDepartmentList(wardDept);
            setCurrentComp(wardInfo);
            retrievGeoInfo(wardInfo,'ward',12);
            SetGeoJson();
        }
    }
        
      const handleDept = e => {
        if(e.target.value !== 'Department'){
            const dept = e.target.value
            const deptinfo = departmentList.filter(inner => inner.Name === dept)[0];
            setCurrentComp(deptinfo);
        }
        
     
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

    const SetGeoJson = () =>  {
        if(currentGeo.type === 'ward'){
                findPlace(wards.features);
            }else if (currentGeo.type === 'subCounty'){
                findPlace(subcounty.features);
            }else{
                console.log('nodata')         
            } 
    }

    const findPlace = (features) => {

        for(let i =0; i < features.length; i++ ){
            let  feature = features[i]

            if(feature.properties.CONSTITUEN.toLowerCase() === currentGeo.Name.toLowerCase()){
                let currentPosition = feature
                currentPosition.properties.type = currentGeo.type;
                let  Item = Items.find((item) => item.isFor(currentPosition.properties.type));
                if(Item != null) currentPosition.properties.color = Item.color;
                setGeoJsonData(currentPosition);
            }
        }
    }
    
    // all data nedded for the components and event functions
    const UiData = {
        subcounty:[subCountyList,handleChange],
        wards: [wardList,handleWard],
        depts: [departmentList,handleDept],
        geodatas:currentGeo,
        compdata:currentComp,
        jsondata:Geojsondata
    }
    
    return <FilterContext.Provider value={UiData}>{ children }</FilterContext.Provider>


};

export {FilterContext,FilterProvider};


