import React, {useState, useEffect} from 'react';
import {Line} from "react-chartjs-2";
import numeral from "numeral";
const options = {
    legend : {
        display : false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips:{
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales:{
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: true,
                },
                ticks:{
                    callback : function(value, index, values) {
                        return numeral(value).format("0,0");
                    }
                }
            },
        ],
    },
}

function LineGraph({country}) {
    
    const [mydata, setData] = useState({});
    const [dataType, setType] = useState("cases");
    //https://disease.sh/v3/covid-19/historical/all?lastdays=120

    const dataFormat = (dt, type) =>
    {
        let charData = [];
        let lastDataPoint;
        if (dt != undefined)
        {
            if (type in dt)
            {
                for (let date in dt.cases) {
                    if (lastDataPoint){
                        let newDataPoint = {
                            x: date,
                            y: dt[type][date] - lastDataPoint,
                        };
                        charData.push(newDataPoint);
                    }
                    lastDataPoint  = dt[type][date];

                }
            }
        }
        return charData;
    }

    useEffect(() => {
        const getData = async () => {
            const url = country === "Worldwide" ? "https://disease.sh/v3/covid-19/historical/all?lastdays=120" : `https://disease.sh/v3/covid-19/historical/${country}?lastdays=120`; 
            
            await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log("graph data=",data);
                let formatted;
                if (country === "Worldwide")
                {
                    formatted = dataFormat(data,dataType);
                }
                else
                {
                    formatted = dataFormat(data["timeline"],dataType);
                    
                }
                setData(formatted);
                console.log(mydata);
                
            })
        }
        getData();
    },[country])


    return (
        <div>
            <h1 >Graph</h1>
            <h5>{country}</h5>
            {mydata && mydata.length > 0 && ( 
            <Line options={options} data={
                {
                        datasets: [
                            {
                            backgorundColor: "rgba(204,16,52,0.5",
                            borderColor: "#CC1034",
                            data: mydata,
                            },
                        ],
                }
            }></Line>
            )}
        </div>
    )
}

export default LineGraph
