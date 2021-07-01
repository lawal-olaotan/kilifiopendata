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

    const [subCountyGeo, setCountyGeo] = useState({});

    const [wardArray,setWardArray] = useState([]);


    useEffect(()=> {

        const geodata = data
        setCurrentComp(data);
        retrievGeoInfo(geodata,'County',8.45);

        Dataservice.GetAll()
        .then(res => {
            const subCont = res.data.data;
            setSubCountyList(subCont);
        })

        Dataservice.GetStats(subcounty,'ward')
        .then (res=> {
            const countiesStats = res.data.data;
           
            let countiesWards = []
            for(let i=0; i < countiesStats.length; i++){
                const wards = countiesStats[i].wards.values();
                for(let ward of wards ){
                    countiesWards.push(ward);
                    setWardArray(countiesWards);
                }
            }
        })

       
    } ,[]);


    const handleChange = (value) => {
        if(value !== 'Sub County'){
            const selSubCounty = value;
            const subCounty = subCountyList.filter(subcounty => subcounty.name === selSubCounty)[0];
            const index = subCountyList.findIndex(sub => sub.name === selSubCounty);
            const wards = subCounty.wards;
            setWardList(wards);
            const geoSubCounty = data.subCounty;
            const CountyGeo = geoSubCounty.filter(geosub => geosub.Name.toLowerCase() === selSubCounty.toLowerCase())[0];
            retrievGeoInfo(CountyGeo,'subCounty',10);
            getDept(selSubCounty,'constituency');
            getProjectSum(selSubCounty,'constituency',subCounty,index);
            setCountyGeo(CountyGeo);
        }  
    }


    const handleWard = (value) => {

        if(value !== 'Wards'){
            const ward = value;
            getDept(ward,'wards');
            let WardCounty = {};
            const index = ''

            if(wardList.length === 0 ){
                const countyGeoData = subCountyList
                let wardGeoArr = [];

                for(let i=0; i < countyGeoData.length; i++){
                    const wards = countyGeoData[i].wards.values();
                    for(let ward of wards ){
                        wardGeoArr.push(ward);
                    }
                }
                WardCounty= wardGeoArr.filter(subcounty => subcounty.name === ward)[0];
            }else{
                WardCounty = wardList.filter(subcounty => subcounty.name === ward)[0];
                const wardsGeo = subCountyGeo.wards;
                const wardGeo = wardsGeo.filter(geosub => geosub.Name.toLowerCase() === ward.toLowerCase())[0];
                retrievGeoInfo(wardGeo,'ward',14);
                SetGeoJson();  
            }

            getProjectSum(ward,'ward',WardCounty,index);
              
        }
    }


    const handleDept = e => {
        if(e.target.value !== 'Department'){
            const dept = e.target.value
            const deptinfo = departmentList.filter(inner => inner.Name === dept)[0];
            setCurrentComp(deptinfo);
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
            let totalres = 0;
            let pending = 0;
            let totalapproved = 0;
            let approvalrate = 0;
            if(index === ''){
                let currentWard = wardArray.filter(inner => inner.name === subcounty)[0];
                console.log(wardArray);
                totalres = currentWard.all || 'not available';
                pending = currentWard.pending;
                totalapproved = currentWard.approved;
                approvalrate = currentWard.approved_pec;
            }else{
                let wardProject = res.data.data[index].wards;
                    setWardArray(wardProject);
                    for(let i =0; i < wardProject.length; i++){
                        totalres += wardProject[i].all 
                        pending += wardProject[i].pending;
                        totalapproved += wardProject[i].approved;
                        approvalrate += wardProject[i].approved_pec / wardProject.length;
                        
                    }

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
            setCurrentComp(subCounty);
            getStatus();
            
        })

     }



     const getStatus = () => {

        Dataservice.GetStatus()
        .then(res => {
        })
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


    // not using now 
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


