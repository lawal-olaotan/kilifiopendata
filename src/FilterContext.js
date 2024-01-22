import React,{useState,useEffect,useRef} from  'react';
import data from './endpoint.json';
import Items from "./entitles/Items";
import wards from "./datas/wards.json";
import subcounty from "./datas/sub_counties.json";
import summary from "./department/summary.json"
import projectsCounty from "./department/subcounty.json";
import projectsWards from "./department/wards.json"
import { Community, GetAll, GetAllinvolvement, GetDepartment, GetStatus, GetSubcounties, citizenPriority} from './Dataservice';

const FilterContext = React.createContext();



 const FilterProvider = ({ children }) => {

    const MountRef = useRef(true)

    const [subCountyList,setSubCountyList] = useState([]);
    
    const [wardList, setWardList] = useState([]);
    const [departmentList, setDepartmentList] = useState([]);

    const [currentComp, setCurrentComp] = useState([]);
    const [currentGeo, setCurrentGeo] = useState([]);
    const [Geojsondata,setGeoJsonData] = useState([]);

    const [subCountyGeo, setCountyGeo] = useState({});

    const [wardArray,setWardArray] = useState([]);
    const [deptComp,setDeptComp] = useState([]);


    // Project wrapper state
    const [projType,setProjectType] = useState([]);
    const [proLabel,setProjLabel] = useState([]);

    const [phasedata,setPhaseData] = useState([]);
    const [phaselabel,setPhaseLabel] = useState([]);


    const [projStatusLabel,setProjStatusLabel] = useState([]);
    const [projStatusData,setProjStatusData] = useState([]);

    // for handling project status toggle effect
    const [projectStatus,setProjectStatus] = useState([]);

    const [statusComp,setStatusComp] = useState([]);


    // community bar chart data 
    const [communityPieData,setCommunityPie] = useState([]);
    const [communityPop,setCommunityPop] = useState([]);

    // citizen poirioty Data 
    const [citizenCompData, setCitizenCompData] = useState([]);


    // project stats state 
    const [projectStats,setProjectStats] = useState([]);

    // mobile nav state 
    const [showNavbar, setShowNavbar] = useState(true);

    // show Project section state 
    const [showProject,setShowProject] = useState(true);

    // real count for project status 
    const [statCount, setStatsCount] = useState([]);

    const [statuStats, setStatusStats] = useState([]);

    const [deptStats, setDeptStats] = useState([]);

    const [pietitle,setPieTitle] = useState('');
    const [piePercet, setPiePercent] = useState('');


    const [deptTipTitle,SetDeptTipTitle] = useState('');
    const [deptTipValue,setDeptTipValue] = useState('');


    const [communityInTip,setCommunityInTip] = useState([]);
    const [commInTipTitle, setCommInTipTitle] = useState('')
    const [commInTipPerc, setCommInTipPerc] = useState('')


    const [womenInTip,setWomenInTip] = useState([]);
    const [womenInTipTitle, setWomenInTipTitle] = useState('');
    const [womenInTipPerc, setWomenInTipPerc] = useState('');


    const [disabledInTip,setDisabledInTip] = useState([]);
    const [disabledInTipTitle, setDisabledInTipTitle] = useState('');
    const [disabledInTipPerc, setDisabledInTipPerc] = useState('');


    const [youthInTip,setYouthInTip] = useState([]);
    const [youthInTipTitle, setYouthInTipTitle] = useState('');
    const [youthInTipPerc, setYouthInTipPerc] = useState('');


    const [projectInTip,setProjectInTip] = useState([]);
    const [projectInTipTitle, setProjectInTipTitle] = useState('');
    const [projectInTipPerc, setProjectInTipPerc] = useState('');


    const [meetingInTip,setMeetingInTip] = useState([]);
    const [meetingInTipTitle, setMeetingInTipTitle] = useState('');
    const [meetingInTipPerc, setMeetingInTipPerc] = useState('');


    const [matInTip,setMatingInTip] = useState([]);
    const [matgInTipTitle, setMatingInTipTitle] = useState('');
    const [matingInTipPerc, setMatingInTipPerc] = useState('');
    

    useEffect(()=> {
        const geodata = data
        retrievGeoInfo(geodata,'County',8.5);
        setCurrentComp(data);
        setSubCountyList(data.subCounty);
        getProjectSum(null,'county');
    } ,[]);


  
   
    
    const handleChange = async(value) => {

        if(value === 'Sub County') return false;

        const selSubCounty = value;
        const subCounty = subCountyList.filter(subcounty => subcounty.Name === selSubCounty)[0];
        setWardList(subCounty.wards)

        const geoSubCounty = data.subCounty;
        const CountyGeo = geoSubCounty.filter(geosub => geosub.Name.toLowerCase() === selSubCounty.toLowerCase())[0];
        retrievGeoInfo(CountyGeo,'subCounty',10.4);

            getDept(selSubCounty,'subCounty');
            setCurrentComp(subCounty);
            setCountyGeo(CountyGeo);
            getProjectSum(selSubCounty,'subCounty');
            setDeptComp([])
            setStatusComp([]);
            setShowNavbar(true);
            setShowProject(false);
        

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
            getCommunityData(ward,'ward')
            retrievGeoInfo(wardGeo,'ward',14);
            setCurrentComp(WardCounty);
            getProjectSum(ward,'ward',index);
            getStatus(ward,'ward')
            // citizenPriorities(ward,'ward')
           
            setShowNavbar(true)
            setShowProject(false);
            
        }

        setDeptComp([])
        setStatusComp([]);
   
    }


    const NavState = () => {
        setShowNavbar(!showNavbar);
    }

    const handleDept = e => {
        if(e.target.value !== 'Department'){
            const dept = e.target.value
            const deptinfo = departmentList.filter(inner => inner.department === dept)[0];
            setDeptComp(deptinfo);
            getStatus(dept,'department')
            getCommunityData(dept,'department')
            // citizenPriorities(dept,'department')
            setStatusComp([]);
            setShowNavbar(true)
        }
    }



    const handleStatus = e => {
        if(e.target.value === 'Project Status') return null 
            const statusKey = e.target.value;
            // console.log(currentComp);
            // expect a conditional here
            const {projectExecution,totalProjects} = projectsCounty.subCounty.filter(projectSub => projectSub.Name === currentComp.Name)[0];
            
            let data; 

            for( let exeState in projectExecution){
                    if(exeState === statusKey) {
                        const exeStateNum = projectExecution[exeState]
                        data = {
                            title:exeState,
                            count:exeStateNum,
                            percentage: parseInt((exeStateNum/totalProjects)*100)
                        }
                    }
                   
            }
            setStatusComp(data);
    }


    const getDept = (subCountyName,location) => {
    
            const subCountyInfo = projectsCounty.subCounty
            const { departments,totalProjects, projectstatus, projectExecution}= location === 'subCounty'?  subCountyInfo.filter(subCounty => subCountyName.toLowerCase() === subCounty.Name.toLowerCase())[0] : ''
            setDepartmentList(departments)
            projectType(departments,totalProjects)
            getStatus(projectstatus,projectExecution,totalProjects)

    }


    //  const citizenPriorities = (subcounty,location) => {
    //     Dataservice.citizenPriority(subcounty,location)
    //     .then (res => {
    //         const citizenData = res.data.data;
    //         const citizenpercent = citizenData.percentage;
    //         const citizenPriorValue = citizenData.priority;

    //         const otherPriority = citizenData.other_priorities;

    //         let otherPriorityArr = []
    //         for(let m=0; m < otherPriority.length; m++){
    //             const otherPriorityValues = otherPriority[m].priorities.values();

    //             for(let otherPriorityValue of otherPriorityValues ){
    //                 otherPriorityArr.push(otherPriorityValue);
    //             }   
    //         }

    //         const totalPriorityValue = parseInt(citizenPriorValue + otherPriorityArr.length)
    //         const citizenLabel = ['priority','Not Priority']
    //         const citizenPieData = [parseInt(((citizenPriorValue/totalPriorityValue)*360).toFixed(2)), parseInt(((otherPriorityArr.length/totalPriorityValue)*360).toFixed(2))];

    //         const CitizenComponenet = {
    //             percent : citizenpercent,
    //             pielable : citizenLabel,
    //             pieData: citizenPieData,
    //             totalProject : citizenPriorValue
    //         }

    //         setCitizenCompData(CitizenComponenet);
            
            
    //     })
    //  }
     


     const getProjectSum = (name = null,location) => {
            let projectSum;

            switch(location){
                case "county":
                    projectSum = summary.countySummary
                    break;
                case "subCounty":
                    const subCountySummaries = summary.subCountySummaries
                    projectSum = subCountySummaries.filter(subCounty => subCounty.Name.toLowerCase() === name.toLowerCase())[0]
                    break;
                case "ward":
                    break;
                default:
                console.log("invalid location")
            }
        
            setProjectStats(projectSum);

    }

   

    
    const getStatus = (statusData,projectExecution,totalProject)=> {

            const statPerc = [ parseInt((statusData.approved/totalProject)*100), parseInt((statusData.pending/totalProject)*100),]
            const statusCount = [statusData.approved, statusData.pending]
            let statusTool = {
                count : statusCount,
                percentage : statPerc
            }

            const phasedProject = parseInt((statusData.approved/totalProject)*360)
            const nonPhasedProject = parseInt((statusData.pending/totalProject)*360)

            const phasedLabel = ['Approved', 'pending']
            const phaseData = [nonPhasedProject,phasedProject];
             
            setPhaseLabel(phasedLabel);
            setPhaseData(phaseData);


            let projectStatusLabel = [];
            let projectStatusData = [];
            let projectRealData = [];


            for(let phase in projectExecution){
                const executionCount = projectExecution[phase]
                const percentage = parseInt((executionCount/totalProject)*100)
                projectStatusData.push(percentage)
                projectRealData.push(executionCount)
                projectStatusLabel.push(phase)
                
            }


            setProjectStatus(projectStatusLabel)

            setStatusStats(statusTool);
            
            setPieTitle(phasedLabel[0])
            setPiePercent(statusTool.percentage[0])
        
    

            setProjStatusLabel(projectStatusLabel)
            setProjStatusData(projectStatusData)
            setStatsCount(projectRealData);
        
    }



     const projectType = (department,projectSum) => {


        let typeLabel = [];
        let typeData = [];
        let pievalues = [];
        let percentValues =  [];


      

        for(let labels of department){
            typeLabel.push(labels.Name)
            typeData.push(parseInt(labels.totalProjects))
            pievalues.push(parseInt((( labels.totalProjects/projectSum)*360)))
            percentValues.push(parseInt(labels.percentage))
        }
        
        if(typeLabel.length){
    
            const DeptToolTip = {
                count : typeData,
                percentage : percentValues
            }

        setDeptStats(DeptToolTip);
        setDeptStats(DeptToolTip);

            setDeptStats(DeptToolTip);

            SetDeptTipTitle(typeLabel[0])
            setDeptTipValue(percentValues[0])
            setProjectType(pievalues);
            setProjLabel(typeLabel);
        }
    
     };


    const getCommunityData = (subcounty,location) => {

        let commArray = []

        Community(subcounty,location)
          .then( res => {

            if (!MountRef.current) {return null}
                const  commData = res.data.data;
                const communityInLabel = ['Involved','Not Involved']


                const communityIn = commData.community_involved;
                const communityInData = [parseInt((communityIn.percentage/100)*360),parseInt(((100 - communityIn.percentage)/100)*360)];
                const communityInPercentage = [parseInt(communityIn.percentage), parseInt(100 - communityIn.percentage)];
                const communityInCount = [parseInt(communityIn.count), parseInt((communityIn.count*communityInPercentage[1]/communityInPercentage[0]))];

            
                // communityToolTip
                const commInToolTip = {
                    count : communityInCount,
                    percentage: communityInPercentage
                }

                setCommunityInTip(commInToolTip);
                setCommInTipTitle(communityInLabel[0]);
                setCommInTipPerc(communityInPercentage[0]);


                const womenIn = commData.women_involved;
                const womenInData = [parseInt((womenIn.percentage/100)*360),parseInt(((100 - womenIn.percentage)/100)*360)];
                const womenInPercentage = [parseInt(womenIn.percentage),parseInt(100 - womenIn.percentage)];
                const womenInCount = [parseInt(womenIn.count), parseInt((womenIn.count*womenInPercentage[1]/womenInPercentage[0]))];

                const womenInToolTip = {
                    count : womenInCount,
                    percentage : womenInPercentage
                }

                setWomenInTip(womenInToolTip);
                setWomenInTipTitle(communityInLabel[0]);
                setWomenInTipPerc(womenInPercentage[0]);



                const disabledIn = commData.disabled_involved;
                const disabledInData = [parseInt(((disabledIn.percentage/100)*360)), parseInt((((100 - disabledIn.percentage)/100)*360))];
                const disabledInPercentage = [parseInt(disabledIn.percentage),parseInt(100 - disabledIn.percentage)];
                const disabledInCount = [parseInt(disabledIn.count),parseInt((disabledIn.count*disabledInPercentage[1]/disabledInPercentage[0]))];


                const disbaledInToolTip = {
                    count : disabledInCount,
                    percentage : disabledInPercentage
                }

                setDisabledInTip(disbaledInToolTip);
                setDisabledInTipTitle(communityInLabel[0]);
                setDisabledInTipPerc(disabledInPercentage[0]);


                const YouthIn = commData.youth_involved;
                const youthInData = [parseInt(((YouthIn.percentage/100)*360)), parseInt((((100 - YouthIn.percentage)/100)*360))];
                const youthInPercentage =  [parseInt(YouthIn.percentage),parseInt(100 - YouthIn.percentage)];
                const youthInCount = [parseInt(YouthIn.count),parseInt((YouthIn.count*youthInPercentage[1]/youthInPercentage[0]))];
                

                const YouthInToolTip = {
                    count : youthInCount,
                    percentage : youthInPercentage
                }

                setYouthInTip(YouthInToolTip);
                setYouthInTipTitle(communityInLabel[0]);
                setYouthInTipPerc(youthInPercentage[0]);


                const projectIn = commData.implemented_timely; 
                const ProjectInData =[parseInt(((projectIn.percentage/100)*360)), parseInt((((100 - projectIn.percentage)/100)*360))];
                const projectInPercentage =[parseInt(projectIn.percentage),parseInt(100 - projectIn.percentage)];
                const projectInCount = [parseInt(projectIn.count),parseInt((projectIn.count*projectInPercentage[1]/projectInPercentage[0]))];

                const projectToolTip = {
                    count : projectInCount,
                    percentage:projectInPercentage
                }

                setProjectInTip(projectToolTip);
                setProjectInTipTitle(communityInLabel[0])
                setProjectInTipPerc(projectInPercentage[0])


                const meetingIn = commData.meeting_involved; 
                const meeetingInData = [parseInt(((meetingIn.percentage/100)*360)), parseInt((((100 - meetingIn.percentage)/100)*360))];
                const meetingInPercentage =[parseInt(meetingIn.percentage),parseInt(100 - meetingIn.percentage)];
                const meetingInCount = [parseInt(meetingIn.count),parseInt((meetingIn.count*meetingInPercentage[1]/meetingInPercentage[0]))];

                const meetingToolTip = {
                    count : meetingInCount,
                    percentage : meetingInPercentage
                }

                    setMeetingInTip(meetingToolTip)
                    setMeetingInTipTitle(communityInLabel[0])
                    setMeetingInTipPerc(meetingInPercentage[0])
                


                const materialsIn = commData.quality_materials; 
                const materialsInData = [parseInt(((materialsIn.percentage/100)*360)), parseInt((((100 - materialsIn.percentage)/100)*360))];
                const materialsInPercentage =[parseInt(materialsIn.percentage),parseInt(100 - materialsIn.percentage)];
                const materialsInCount = [parseInt(materialsIn.count),parseInt((materialsIn.count*materialsInPercentage[1]/materialsInPercentage[0]))];

                const materialToolTip = {
                    count : materialsInCount,
                    percentage: materialsInPercentage
                }

                setMatingInTip(materialToolTip);
                setMatingInTipTitle('great')
                setMatingInTipPerc(materialsInPercentage[0])
                


                // const [matInTip,setMatingInTip] = useState([]);
                // const [matgInTipTitle, setMatingInTipTitle] = useState('');
                // const [matingInTipPerc, setMatingInTipPerc] = useState('');
                


            
                let newData = {}
                newData.CommmunityInvolvement = commData.women_involved.percentage
                newData.citizenPriority = commData.youth_involved.percentage;
                

                for(let property in commData){
                    commArray.push(commData[property]);  
                }

                let total = 0;
                for(let item of commArray){
                    total += item.percentage
                }
                
                const communityPar = parseInt(total/commArray.length)
        

                const communityData = {
                    average_pec: communityPar,
                    label : communityInLabel,
                    community_data:communityInData,
                    disabled_data:disabledInData,
                    project_data : ProjectInData,
                    meeting_data : meeetingInData,
                    materials_data : materialsInData,
                    women_data: womenInData,
                    youth_data: youthInData 
                }

                
                setCommunityPie(communityData);
                setCommunityPop(newData);
      
            })  
            
            
    };


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
                console.log('')         
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
        compdata:[currentComp,deptComp,communityPop,projectStats],
        jsondata:Geojsondata,
        proTypeData:[projType,proLabel],
        ProPhase: [phasedata,phaselabel],
        ProStatus: [projStatusLabel,projStatusData,statusComp],
        ProStatusList: [projectStatus,handleStatus],
        communityList: communityPieData,
        citizenList:citizenCompData,
        navStatus : [NavState,showNavbar],
        statsCount: statCount,
        myStatusStats : statuStats,
        deptTool : deptStats,
        pieTitle : [pietitle,setPieTitle],
        PiePercent : [piePercet, setPiePercent],
        deptTipTitles :[deptTipTitle,SetDeptTipTitle] ,
        deptTipValues : [deptTipValue,setDeptTipValue],
        projectView : showProject,
        commInTipTitles:[commInTipTitle, setCommInTipTitle],
        commInTipPercs : [commInTipPerc, setCommInTipPerc],
        commInTools : communityInTip,
        womenInTools : womenInTip,
        womenTipTitles:[womenInTipTitle, setWomenInTipTitle],
        womenInTipPercs : [womenInTipPerc, setWomenInTipPerc],
        disabledInTools : disabledInTip,
        disabledInTipTitles:[disabledInTipTitle, setDisabledInTipTitle],
        disabledInTipPercs :[disabledInTipPerc, setDisabledInTipPerc],
        youthInTools : youthInTip,
        youthInTipTitles:[youthInTipTitle, setYouthInTipTitle],
        youthInTipPercs :[youthInTipPerc, setYouthInTipPerc],
        projectInTools: projectInTip,
        projectInTipTitles:[projectInTipTitle, setProjectInTipTitle],
        projectInTipPercs :[projectInTipPerc, setProjectInTipPerc],
        meetingInTools:meetingInTip,
        meetingInTipTitles:[meetingInTipTitle, setMeetingInTipTitle],
        meetingInTipPercs :[meetingInTipPerc, setMeetingInTipPerc],
        matingInTools:matInTip,
        matingInTipTitles:[matgInTipTitle, setMatingInTipTitle],
        matingInTipPercs :[matingInTipPerc, setMatingInTipPerc],
        
    }

    return <FilterContext.Provider value={UiData}>{ children }</FilterContext.Provider>


};

export {FilterContext,FilterProvider};


