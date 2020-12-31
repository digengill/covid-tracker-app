import React,{useState, useEffect } from 'react';
import './Map.css';
import {Map as LeafletMap, TileLayer, Circle, Popup} from "react-leaflet";

const categories = {
    cases : {
        color : "#b00000"
    },
    recovered : {
        color: "#5af900"
    },
    deaths : {
        color: "#1243fd"
    }

}

const getRadius = (country, type) => {
    const test = country[type]/4;
    if (test > 1000000)
    {
        return 1000000;
    }
    else if (test < 10000)
    {
        return 50000;
    }
    return test;
}


const drawCircles = (data, type) => (
    data.map((country) => 
    <Circle center={[country.countryInfo.lat,country.countryInfo.long]} fillOpacity={0.4} color={categories[type].color} radius = {getRadius(country,type)}>
        <Popup>
            <div className="popup__flag"
                style={{backgroundImage: `url(${country.countryInfo.flag})`}}>
            </div>
                <div>
                    <div>
                        <div>
                            Country: {country.country}
                        </div>
                        Cases: {country.cases}
                    </div>
                    Deaths: {country.deaths}
                </div>
                    Recovered: {country.recovered}
        </Popup>
    </Circle> 
    )
)

function Map({countries, center, zoom, casesType}) {

    return (
        <div className="app__map">
            <h1>I am a map</h1>
            <LeafletMap center={center} zoom={zoom}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright"> OpenStreetMap</a> contributors'/>
                {drawCircles(countries,casesType)}
            </LeafletMap>
        </div>
      
    )
}

export default Map
