import axios from 'axios'; 

const token = '4|OPhaU4Zbc4X5WxYfKPRHMKFJ5puaSvoKlWhmuuYu'

const data = axios.create({
    baseURL: "https://kilifi.sand-box.online/api",
    headers: {
        "Content-type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      
});

 const  GetAll = () => {
    return data.get("/boundary")
}

const GetDepartment = (subCounty,location) => {
    return data.get(`stats/departments?${location}=${subCounty}`);
}

const GetStats = (subcounty,location) => {
    return data.get(`stats/wards?${location}=${subcounty}`);
}

const Community = (subcounty,location) => {
    return data.get(`stats/involvement?${location}=${subcounty}`)
}

const GetStatus = ()=> {

    return data.get("/stats/wards?status=complete%20and%20in%20use");
}

export default {GetAll,GetDepartment,GetStats,Community,GetStatus};