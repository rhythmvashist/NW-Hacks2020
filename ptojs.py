import requests
import json

def nextBusses(lat, lon, route, direction):
    apikey = "mV5O7nONmyyE32Q2fCgX"
    apiurl = "https://api.translink.ca/rttiapi/v1/"
    headers = {'Content-type': 'application/json', 'Accept': 'text/plain'}
    payload = {"ApiKey": apikey, "Lat": lat, "Long": lon, "RouteNo": route, "radius": 2000}
    r = requests.get(apiurl + "stops", headers=headers, params=payload)
    stops = json.loads(r.text)

    print(json.dumps(stops, indent=2, sort_keys=True))
    
    stopNos = []
    for stop in stops:
        stopNos.append(stop["StopNo"])
    stopInfos = []
    
    for stopNo in stopNos:
        payload = {"ApiKey": apikey, "RouteNo": route, "Count": 3}
        r = requests.get(apiurl + "stops/" +    + "/estimates", headers=headers, params=payload)
        stopInfos.append(json.loads(r.text))
    

    closest_index = -1
    
    for i in range(len(stopInfos)):
        if stopInfos[i][0]["Direction"] == direction:
            print(json.dumps(stopInfos[i], indent=2, sort_keys=True))
            closest_index = i
        
    
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