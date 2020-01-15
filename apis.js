
API_KEY = 'mV5O7nONmyyE32Q2fCgX'
LAT = 49.248523
LONG = -123.108800
DIRECTION = "WEST"

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

getrouteinfo(LAT,LONG,"R4")
    .then(data =>{
        nearest_stop_numbers=[]
        for (elem in data){
            nearest_stop_numbers.push(data[elem].StopNo)
        }   
        bus_info_list=[]
        for (elem in nearest_stop_numbers){
            bus_list = getBusInfo(String(nearest_stop_numbers[elem]))
            .then(newdata => {
                bus_info_list.push(newdata)
                if(bus_info_list.length>=nearest_stop_numbers.length){
                    console.log("here you go")
                    console.log(bus_info_list.length)
                }

            })
        }
        closest_index = -1 
        
        // for (item in bus_info_list){
        //     console.log(bus_info_list[i][0].Direction)
        //     if (bus_info_list[item][0].Direction == "WEST"){
             
        //         console.log(bus_info_list[i][0]);
        //         closest_index = elem;
        //         break;
        //     }
        // }
        // console.log(closest_index)
        // if (closest_index != -1){
        //     intersection = bus_info_list[closest_index]OnStreet"] + " and " + stops[closest_index]["AtStreet"]
        //     estimates = [x["ExpectedCountdown"] for x in stopInfos[closest_index][0]["Schedules"] if x["ExpectedCountdown"] >= 0]
        //     console.log("Next busses on the " + route + " " + direction + " at " + intersection + " in " + str(estimates) + " minutes")
        // }
    })


//nearst_stop_obj = stop_list[0];
//nearst_stop = nearst_stop_obj["StopNo"];
//console.log(nearst_stop);   
