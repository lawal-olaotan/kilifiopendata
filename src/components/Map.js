import React,{useState,useEffect} from 'react';
import {Icon} from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup,useMap} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
// import marker from '../marker.svg';

// const ICON = new Icon({
//     iconUrl:marker,
//     iconSize:[32,32]
// });

function ChangeView({data,zoom}){

    const map = useMap()
    map.setView(data,zoom)
    return null
               
}


const Map = ({data,zoom}) => {


    return(

        <MapContainer center={data} zoom={zoom} scrollWheelZoom={false} style={{height:"100%", width:"100%" ,position:"absolute",top:"0pc",left:"0pc"}}>

                        <TileLayer
                            attribution="© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>"
                            url="https://api.mapbox.com/styles/v1/olaotan1041995/ckpzecciu1xv218rlkc03q0u2/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib2xhb3RhbjEwNDE5OTUiLCJhIjoiY2tweTRodWsxMGg5eDJ2bndyODlobGlxaCJ9.stHQ92521Ab8YYw5cLAg3Q"  />

                             {/* <Marker  position={data}>
                            <Popup>is located here</Popup> 
                        </Marker> */}
                                        
                   <ChangeView data ={data} zoom={zoom}/>        

        </MapContainer>

    )
}


export default Map 

