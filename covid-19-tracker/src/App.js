import React, {useState, useEffect } from 'react';
import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent
}
  from "@material-ui/core";
import InfoBox from "./InfoBox.js";
import Map from "./Map.js";
import Table from "./Table.js";
import LineGraph from "./LineGraph.js";
import {sortData, formatInt} from "./util.js";
import './App.css';
import "leaflet/dist/leaflet.css";
function App() {
  const [countries, setCountries] = useState(["USA"]);
  const [location, selectLocation] = useState("Worldwide");
  const [countryData, setData] = useState({});
  const [tableData, setTable] = useState([]);
  const [center, setCenter] = useState({lat:30 , lng:30});
  const [zoom, setZoom] = useState(2);
  const [allCountriesData, setAllData] = useState([]);
  const [dataType, setType] = useState("cases");
  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setData(data);
    });
  },[]);
  
  useEffect(() => {

      const getCountriesData = async() => {
        await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({

            name: country.country,
            value: country.countryInfo.iso2,

        }));
        const sortedCountries = sortData(data);
        setCountries(countries);
        setTable(sortedCountries);
        setAllData(data);

      });
    };
      getCountriesData();

  }, []);

 

  const locationChange = async (event) => {
    const countryCode =  event.target.value;
    console.log(countryCode);
    selectLocation(countryCode);
    console.log(dataType);
    
    const url = countryCode === "Worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`; 
    console.log(url);

    await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      setData(data);
      setZoom(3);
      console.log(data);
      if (countryCode === "Worldwide")
      {
        setCenter({lat:30,lng:30});
        setZoom(2);

      }
      else
      {
        setCenter({lat:data.countryInfo.lat,lng:data.countryInfo.long});

      }
    });
    console.log("CountryInfo >> ", countryData);


  };

  return (
    <div className="App">
      <div className="app__left">
      <div className="app__header">
        <h1>Covid Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={locationChange} value={location}>
            <MenuItem value="Worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>  
            ))}
          </Select>
        </FormControl>
      </div>
      <div className="app__stats">
        <InfoBox onClick={e => setType("cases")} title="Covid-19 Cases" cases={formatInt(countryData.todayCases)} total={countryData.cases}></InfoBox>
        <InfoBox onClick={e => setType("recovered")} title="Recovered" cases={formatInt(countryData.todayRecovered)} total={countryData.recovered}></InfoBox>
        <InfoBox onClick={e => setType("deaths")} title="Deaths" cases={formatInt(countryData.todayDeaths)} total={countryData.deaths}></InfoBox>
      </div>  
      <div>
        <Map casesType={dataType} countries={allCountriesData} center={center} zoom={zoom}></Map>
      </div>
      </div>
      <div className="app__right">
          <Card>
            <CardContent>
              <h2>Total Cases</h2>
              <Table countries={tableData}></Table>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <LineGraph country={location}></LineGraph>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}

export default App;
