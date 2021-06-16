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
        map.setView(data,9)
        map.flyTo(data,map.getZoom())
        return null
               
}


const Map = ({data}) => {

       const initaldata = [-3.0281, 39.7595]

    return(

        <MapContainer center={initaldata} zoom={8.3} scrollWheelZoom={false} style={{height:"100%", width:"100%" ,position:"absolute",top:"0pc",left:"0pc"}}>

                        <TileLayer
                            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                            url="https://api.mapbox.com/styles/v1/olaotan1041995/ckpz7eii101u519ppz639i8x2/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib2xhb3RhbjEwNDE5OTUiLCJhIjoiY2tweTRodWsxMGg5eDJ2bndyODlobGlxaCJ9.stHQ92521Ab8YYw5cLAg3Q"  />
                             <Marker icon={ICON} position={data}>
                            <Popup>is located here</Popup> 
                        </Marker>
                                        
                   <ChangeView data = {data}/>        

        </MapContainer>

    )
}


export default Map 

