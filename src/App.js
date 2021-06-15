import logo from './logo.svg';
import React,{useState,useEffect} from 'react';
import './css/styles.min.css';
import data from './endpoint.json';
import DataTable from './components/DataTable'




function App() {

const [componentdata,setCompDate] = useState([])
const [subcount,setSubCount] = useState([])
const [wards,setWards] = useState([])
const[department,setDepartment] = useState(null)

 

useEffect(()=> {retrievecounty()},[])

  const retrievecounty= () => {
    const departData = data.department;
    const subData = data.subCounty;
    setCompDate(data);
    setDepartment(departData);
    setSubCount(subData);
 
 }

  const handleChange = e => {
    const subcounty = e.target.value;
    const subCounty = subcount.filter(ward => ward.Name === subcounty)[0]
    const wardList = subCounty.wards;
    const department = subCounty.department
    setDepartment(department);
    setWards(wardList);
    setCompDate(subCounty);
 }

 const handleWard = e => {
   const ward = e.target.value
   const wardinfo = wards.filter(inner => inner.Name === ward)[0]
   const wardDept = wardinfo.department;
   setCompDate(wardinfo);
   setDepartment(wardDept);
  
  
 }

const handleDept = e => {
      const dept = e.target.value
      const deptinfo = department.filter(inner => inner.Name === dept)[0];
      setCompDate(deptinfo);
    
}

// const HandleSearch = e => {
//   const searchItem = e.target.value
//   setQ(searchItem);
  
// }

// comming back to title
// const findtiitle = () => {
//   let queryData = data.subCounty.filter(item => item.Name.toLowerCase().indexOf(q) > -1 )
//   console.log(queryData);
//   console.log(subcount)
//   // setCompDate(queryData);
// }



  return (

    <div className="App">

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

                  <select onChange={handleChange}>
                    <option >Sub County</option>
                    {subcount && subcount.map((subCounty)=> (

                      <option >{subCounty.Name}</option>
                    )) }
                        
                  </select>
              </div>

              <div className="nav__select" >
                  <select onChange={handleWard}>
                    <option>Wards</option>
                    {wards && wards.map((ward)=> (
                      <option>{ward.Name}</option>
                    )) }
                  </select>
              </div>

              <div className="nav__select">
                  <select onChange={handleDept}>
                    <option>Department</option>
                    {department && department.map((dept)=> (
                      <option>{dept.Name}</option>
                    )) }
                        
                  </select>
              </div>
            
          </div>
        </nav>
       
      </header>

      <DataTable data={componentdata}/>
    </div>
  );
}

export default App;
