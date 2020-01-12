/*

import requests
import json
def nextBusses(lat, lon, route, direction):
    apikey = "your_translink_api_key"
    apiurl = "https://api.translink.ca/rttiapi/v1/"
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    payload = {"ApiKey": apikey, "Lat": lat, "Long": lon, "RouteNo": route, "radius": 2000}
    r = requests.get(apiurl + "stops", headers=headers, params=payload)
    stops = json.loads(r.text)
    #print(json.dumps(stops, indent=2, sort_keys=True))
    stopNos = []
    for stop in stops:
        stopNos.append(stop["StopNo"])
    stopInfos = []
    for stopNo in stopNos:
        payload = {"ApiKey": apikey, "RouteNo": route, "Count": 3}
        r = requests.get(apiurl + "stops/" + str(stopNo) + "/estimates", headers=headers, params=payload)
        stopInfos.append(json.loads(r.text))
    closest_index = -1
    for i in range(len(stopInfos)):
        if stopInfos[i][0]["Direction"] == direction:
            #print(json.dumps(stopInfos[i], indent=2, sort_keys=True))
            closest_index = i
            break
    if closest_index != -1:
        intersection = stops[closest_index]["OnStreet"] + " and " + stops[closest_index]["AtStreet"]
        estimates = [x["ExpectedCountdown"] for x in stopInfos[closest_index][0]["Schedules"] if x["ExpectedCountdown"] >= 0]
        print("Next busses on the " + route + " " + direction + " at " + intersection + " in " + str(estimates) + " minutes")
if __name__ == "__main__":
    lat = 49.262440
    lon = -123.246230
    route = "R4"
    direction = "EAST"
    nextBusses(lat, lon, route, direction)

*/

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
