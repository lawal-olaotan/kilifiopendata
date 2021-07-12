import axios from 'axios'; 

const token = '2|E34QWMPVH4U2BXkPOz8jSBX2Wqs5vZsX58fggvfZ'

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

const  GetAllinvolvement = () => {
    return data.get("stats/involvement")
}

const GetStatus = (subcounty,location) => {
    return data.get(`stats/projects_status?${location}=${subcounty}`)
}

const GetSubcounties = () => {
    return data.get("/stats/sub_counties")
}

const citizenPriority = (subcounty,location) => {
    return data.get(`stats/priorities?${location}=${subcounty}`)
}

export default {GetAll,GetDepartment,GetStats,Community,GetStatus,GetSubcounties,GetAllinvolvement,citizenPriority};