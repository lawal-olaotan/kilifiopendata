import React,{useState,useEffect} from 'react';
import {Icon} from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup,useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import marker from '../marker.svg';

const ICON = new Icon({
    iconUrl:marker,
    iconSize:[32,32]
});


function ChangeView({data}){

    const map = useMap()
        map.setView(data,10)
        map.flyTo(data,map.getZoom())
        return null
               
}


const Map = ({data}) => {

       const initaldata = [-2.9787,39.6359]

    return(

        <MapContainer center={initaldata} zoom={10} scrollWheelZoom={false} style={{height:"100%", width:"100%" ,position:"absolute",top:"0pc",left:"0pc"}}>

                        <TileLayer
                            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />
                             <Marker icon={ICON} position={data}>
                            <Popup>is located here</Popup>
                        </Marker>
                                        
                   <ChangeView data = {data}/>        

        </MapContainer>

    )
}


export default Map 

