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
    const [deptComp,setDeptComp] = useState([]);



    const [projType,setProjectType] = useState([]);
    const [proLabel,setProjLabel] = useState([]);





    useEffect(()=> {

        const geodata = data
        retrievGeoInfo(geodata,'County',8.5);

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
                }   
            }

            setWardArray(countiesWards);

        })

       


        Dataservice.GetSubcounties()
        .then (res => {

            const countyData = res.data.data; 

            // paramaters  
            let totalres = 0;
            let pending = 0;
            let totalapproved = 0;
            let approvalrate =0

            for(let k=0; k < countyData.length; k++){

                totalres += countyData[k].all;
                pending += countyData[k].pending;
                totalapproved += countyData[k].approved;
                approvalrate += countyData[k].approved_percentage/countyData.length
            }


            data.projectNumber = totalres;
            data.totalSpent = pending;
            data.totalapproved = totalapproved;
            data.approvalrate = approvalrate.toFixed(1);
            

            
        })

        Dataservice.GetAllinvolvement()
        .then (res => {
            const comm = res.data.data
            data.CommmunityInvolvement = comm.women_involved.percentage
            data.citizenPriority = comm.youth_involved.percentage
            setCurrentComp(data);
        })

       

       
    } ,[]);


    const handleChange = (value) => {
        if(value !== 'Sub County'){
            const selSubCounty = value;
            const subCounty = subCountyList.filter(subcounty => subcounty.name === selSubCounty)[0];
           let index = subCountyList.findIndex(sub => sub.name === selSubCounty);
            const wards = subCounty.wards;
            setWardList(wards);
            const geoSubCounty = data.subCounty;
            const CountyGeo = geoSubCounty.filter(geosub => geosub.Name.toLowerCase() === selSubCounty.toLowerCase())[0];
            retrievGeoInfo(CountyGeo,'subCounty',11);
            getDept(selSubCounty,'constituency');
            getProjectSum(selSubCounty,'constituency',subCounty,index);
            setCountyGeo(CountyGeo);

            setDeptComp([])
        }
        
        
    }


    const handleWard = (value) => {

        if(value !== 'Wards'){
            const ward = value;
            getDept(ward,'wards');

            let WardCounty = {};
            let wardGeo = {};
            let index = ''

            if(wardList.some(wards => wards.name === ward)){
                WardCounty = wardList.filter(subcounty => subcounty.name.toLowerCase() === ward.toLowerCase())[0];
                const wardsGeo = subCountyGeo.wards;
                wardGeo = wardsGeo.filter(geosub => geosub.Name.toLowerCase() === ward.toLowerCase())[0];
                SetGeoJson(); 
            }else{

                const countyGeoData = subCountyList
                let  geoEnd = data.subCounty;

                let wardGeoArr = [];
                let wardGeos = []

                for(let i=0; i < countyGeoData.length; i++){
                    const wards = countyGeoData[i].wards.values();
                    for(let ward of wards ){
                        wardGeoArr.push(ward); 
                    }
                }

                for(let j=0; j < geoEnd.length; j++){
                    const wardsgeo = geoEnd[j].wards.values();
                                 
                    for(let ward of wardsgeo ){
                        wardGeos.push(ward);
                    }
                }

                WardCounty= wardGeoArr.filter(subcounty => subcounty.name.toLowerCase() === ward.toLowerCase())[0];
                wardGeo = wardGeos.filter(geo => geo.Name.toLowerCase() === ward.toLowerCase())[0];
                   
            }
            const find = ({name,wards})=> name.includes(value) || wards && wards.some(find);
            const subName = subCountyList.filter(find)[0];
            wardGeo.subName = subName.name;

            retrievGeoInfo(wardGeo,'ward',14);
            getProjectSum(ward,'ward',WardCounty,index);
        }

        setDeptComp([])


            
    }


    

    const handleDept = e => {
        if(e.target.value !== 'Department'){
            const dept = e.target.value
            const deptinfo = departmentList.filter(inner => inner.department === dept)[0];
            setDeptComp(deptinfo);
        }
    }


     const getDept = (subCountyName,location) => {
        Dataservice.GetDepartment(subCountyName,location)
        .then (res =>{
          const department = res.data.data;
          setDepartmentList(department);
          projectType(department);
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

                totalres = currentWard.all;
                pending = currentWard.pending;
                totalapproved = currentWard.approved;
                approvalrate = currentWard.approved_percentage;
            }else{
                let wardProject = res.data.data[index].wards;
                    for(let i =0; i < wardProject.length; i++){
                        totalres += wardProject[i].all 
                        pending += wardProject[i].pending;
                        totalapproved += wardProject[i].approved;
                        approvalrate += wardProject[i].approved_percentage / wardProject.length;
                        
                    }

            }

            subCounty.projectNumber = totalres;
            subCounty.totalSpent = pending;
            subCounty.totalapproved = totalapproved;
            subCounty.approvalrate = approvalrate.toFixed(1);
            
           
        
            Dataservice.Community(subcounty,location)
            .then((res) => {
                const  commData = res.data.data;
                subCounty.CommmunityInvolvement = commData.women_involved.percentage
                subCounty.citizenPriority = commData.youth_involved.percentage;
                setCurrentComp(subCounty);
            })

           
            // getStatus();
             
        })
    }



     const projectType = (department) => {

        let typeLabel = [];
        let typeData = [];
        let pievalues = []
        let totalvalue = 0

        for(let labels of department){
            typeLabel.push(labels.department)
            
        }

        for(let data of department){
            totalvalue += parseInt(data.total)
            typeData.push(parseInt(data.total))
        }

        for (let pieval of typeData){
            pievalues.push(parseInt(((pieval/totalvalue)*360).toFixed(0)))
            
        }

        setProjectType(pievalues);
        setProjLabel(typeLabel);

     }



    //  const getStatus = () => {

    //     Dataservice.GetStatus()
    //     .then(res => {
            
    //     })
    //  }


    const retrievGeoInfo = (mapdata,type,zoom)=> {
        const geodata = {
            Name: mapdata.Name,
            lon: mapdata.lon,
            lat: mapdata.lat,
            type : type,
            zoom : zoom,
            color: mapdata.color,
            subName : mapdata.subName
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
        compdata:[currentComp,deptComp],
        jsondata:Geojsondata,
        proTypeData:[projType,proLabel]
    }
    
    return <FilterContext.Provider value={UiData}>{ children }</FilterContext.Provider>


};

export {FilterContext,FilterProvider};


