import React,{useContext} from 'react';
import { MapContainer, TileLayer,useMap,GeoJSON ,setGeoJSON,} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FilterContext } from '../FilterContext';



// 
const ChangeView = ({ data , zoom }) => {

        const map = useMap()
        map.setView(data,zoom);
        return null;
}



const MapEle = () => {

    const {geodatas} = useContext(FilterContext);
    const currentGeo = geodatas;

    const data = [currentGeo.lat,currentGeo.lon]
    const zoom = currentGeo.zoom
    const geodata = currentGeo

    console.log(currentGeo);

    return(

        <div className="hero__map">

            <MapContainer center={data} zoom={zoom} scrollWheelZoom={false} style={{height:"100%", width:"100%" ,position:"absolute",top:"0pc",left:"0pc"}}>
                            <ChangeView data={data} zoom={zoom}/>
                            <TileLayer
                                attribution="©<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
                                url="https://api.mapbox.com/styles/v1/olaotan1041995/ckq0fijmn0gbt18mw4k95r5jj/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib2xhb3RhbjEwNDE5OTUiLCJhIjoiY2tweTRodWsxMGg5eDJ2bndyODlobGlxaCJ9.stHQ92521Ab8YYw5cLAg3Q"/>
              
                            {geodata !== undefined ? (
                                <GeoJSON />
                            ):(
                                console.log('nodata')
                            )}   
            </MapContainer>

        </div>
    )
}


export default MapEle

