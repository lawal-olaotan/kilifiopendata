import React,{useState,useEffect} from  'react';
import data from './endpoint.json';
import Items from "./entitles/Items";
import wards from "./datas/wards.json";
import subcounty from "./datas/sub_counties.json";
import Dataservice from './Dataservice';


const FilterContext = React.createContext();

 const FilterProvider = ({ children }) => {

    const [subCountyList,setSubCountyList] = useState([]);
    
    const [wardList, setWardList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);

    const [currentComp, setCurrentComp] = useState([]);
    const [currentGeo, setCurrentGeo] = useState([]);
    const [Geojsondata,setGeoJsonData] = useState([]);


    useEffect(()=> {

        const geodata = data
        setCurrentComp(data);
        retrievGeoInfo(geodata,'County',8.5);

        Dataservice.GetAll()
        .then(res => {
            const subCont = res.data.data;
            setSubCountyList(subCont);
        })

       
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
            const subCounty = subCountyList.filter(subcounty => subcounty.name === selSubCounty)[0];
            const index = subCountyList.findIndex(sub => sub.name === selSubCounty);
            const wards = subCounty.wards;
            const geoSubCounty = data.subCounty;
            const currentGeo = geoSubCounty.filter(geosub => geosub.Name === selSubCounty)[0];
            retrievGeoInfo(currentGeo,'subCounty',10);
            setWardList(wards);
            getDept(selSubCounty,'constituency');
            getProjectSum(selSubCounty,'constituency',subCounty,index);
        }  
    }

     const getDept = (subCountyName,location) => {
        Dataservice.GetDepartment(subCountyName,location)
        .then (res =>{
          const department = res.data.data;
          setDepartmentList(department);
        })  
     }
     

     const getProjectSum = (subcounty,location,subCounty,index) => {
        
        Dataservice.GetStats(subcounty,location)
        .then (res => {

            let wardProject = res.data.data[index].wards;

            let totalres = 0;
            let pending = 0;
            let totalapproved = 0;
            let approvalrate = 0;


            for(let i =0; i < wardProject.length; i++){
                totalres += wardProject[i].all 
                pending += wardProject[i].pending;
                totalapproved += wardProject[i].approved;
                approvalrate += wardProject[i].approved_pec / wardProject.length;
            }

            subCounty.projectNumber = totalres;
            subCounty.totalSpent = pending;
            subCounty.totalapproved = totalapproved;
            subCounty.approvalrate = approvalrate.toFixed(1);

            Involvement(subcounty,location,subCounty)
             
        })

     }


     const Involvement = (subcounty,location,subCounty) => {

        Dataservice.Community(subcounty,location)
        .then((res) => {
            const  commData = res.data.data;
            subCounty.CommmunityInvolvement = commData.women_involved.percentage
            subCounty.citizenPriority = commData.youth_involved.percentage
            console.log(commData);
            setCurrentComp(subCounty);
            
        })



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


