
API_KEY = 'mV5O7nONmyyE32Q2fCgX'
LAT = 49.248523
LONG = -123.108800
DIRECTION = "WEST"

function print(input){
    console.log(input)
}

async function getrouteinfo(LAT,LONG,bus_route){
    const response = await fetch(`https://api.translink.ca/rttiapi/v1/stops?apikey=mV5O7nONmyyE32Q2fCgX&lat=${LAT}&long=${LONG}&radius=2000&RouteNo=${bus_route}`,{
    method:'GET',    
    headers:{
            'Content-type':'application/JSON',
            'accept':'application/JSON'
        }
    });   
    const data = await response.json();
    return data;
} 

async function getBusInfo(busSpot){
    const response = await fetch(`https://api.translink.ca/rttiapi/v1/stops/${busSpot}/estimates?apikey=mV5O7nONmyyE32Q2fCgX&count=3&timeframe=30`,{
        method:'GET',
        headers:{
            'Content-type':'application/JSON',
            'accept':'application/json'
        }
    });
    const data = await response.json();
    return data;
}

async function getBusInfo(busSpots){
    bus_list = []
    for (elem in busSpots){
        const response = await fetch(`https://api.translink.ca/rttiapi/v1/stops/${busSpots[elem]}/estimates?apikey=mV5O7nONmyyE32Q2fCgX&count=3&timeframe=30`,{
            method:'GET',
            headers:{
                'Content-type':'application/JSON',
                'accept':'application/json'
            }
        });
        const data = await response.json();
        bus_list.push(data)
    }
    return bus_list;
}

stop_list = getrouteinfo(LAT,LONG,"R4")
    .then(data => data.json())

print(stop_list)





//nearst_stop_obj = stop_list[0];
//nearst_stop = nearst_stop_obj["StopNo"];
//console.log(nearst_stop);   
