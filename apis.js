API_KEY = 'mV5O7nONmyyE32Q2fCgX'
LAT = 49.248523
LONG = -123.108800
DIRECTION = "WEST"
ROUTE="R4"

// get the stops information for the corresponding loctions coordinates
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

// get the corresponding bus information for the stop 
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

getrouteinfo(LAT,LONG,ROUTE)
    .then(data =>{
        nearest_stop_numbers=data
        bus_info_list=[]
        closest_index = -1
        for (elem in nearest_stop_numbers){
            bus_list = getBusInfo(String(nearest_stop_numbers[elem].StopNo))
            .then(newdata => {
                bus_info_list.push(newdata)
                
                if(bus_info_list.length>=nearest_stop_numbers.length){
                    for (item in bus_info_list){
                        if (bus_info_list[item][0].Direction == "WEST"){
                            console.log(bus_info_list[item][0]);
                            closest_index = elem;
                            console.log("the closest index is about to change "+ closest_index)
                            break;
                        }
                    }

                    estimates =[]
                    if (closest_index != -1){
                        intersection = nearest_stop_numbers[closest_index].OnStreet + " and " + nearest_stop_numbers[closest_index].AtStreet 
                        for (i of bus_info_list[closest_index][0].Schedules){
                            value = i.ExpectedCountdown 
                            if (value > 0){
                                estimates.push(value)
                            }
                        } 
                        console.log("Next busses on the " + ROUTE + " " + DIRECTION + " at " + intersection + " in [" + estimates.toString()+ "] minutes")
                    }
                }

            })
        }    
    })
   
