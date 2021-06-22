import React,{useContext} from 'react';
import { MapContainer, TileLayer,useMap,GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FilterContext } from '../FilterContext';



// 
const ChangeView = ({ data , zoom , Geojsondata }) => {
        const map = useMap()
        map.setView(data,zoom);
        return null;


}       

const MapEle = () => {

    const {geodatas} = useContext(FilterContext);
    const {jsondata} = useContext(FilterContext);
    const currentGeo = geodatas;
    const Geojsondata =jsondata



    // map parameters data
    const data = [currentGeo.lat,currentGeo.lon]
    const zoom = currentGeo.zoom


    const mapStyle = {
        fillColor: "white",
        weight: 1,
        color: "black",
        fillOpacity: 1,
      };

    
      const onEachCountry = (country, layer) => {
        layer.options.fillColor = country.properties.color;
        const name = country.properties.CONSTITUEN;
        layer.bindPopup(`${name}`);
      };


    return(

        <div className="hero__map">

            <MapContainer center={data} zoom={zoom} scrollWheelZoom={false} style={{height:"100%", width:"100%" ,position:"absolute",top:"0pc",left:"0pc"}}>
                            <ChangeView data={data} zoom={zoom} Geojsondata={Geojsondata}/>
                            <TileLayer
                                attribution="©<a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>"
                                url="https://api.mapbox.com/styles/v1/olaotan1041995/ckq80krhmab6d18rlc29va4t2/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoib2xhb3RhbjEwNDE5OTUiLCJhIjoiY2tweTRodWsxMGg5eDJ2bndyODlobGlxaCJ9.stHQ92521Ab8YYw5cLAg3Q"/>
              
                            {Geojsondata !== undefined ? (
                                <GeoJSON data={Geojsondata.Features} style={mapStyle} />
                            ):(
                                console.log('nodata')
                            )}   
            </MapContainer>

        </div>
    )
}


export default MapEle

