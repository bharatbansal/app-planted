import React, {useState} from "react";
import Cities from "../customerLocations";
import Projects from "../plantationProjects"
import NearestPlanted from "./NearestPlanted";


function Search() {
    const [selectedCity, setSelectedCity] = useState("");   
    const [nearestProjects, setNearestProjects] = useState([]);
    const numberOfNearestProjects = 3;

    // find the distance between 2 points. find this on the web : https://www.geodatasource.com/developers/javascript
    function distance(lat1, lon1, lat2, lon2) {
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            let radlat1 = Math.PI * lat1/180;
            let radlat2 = Math.PI * lat2/180;
            let theta = lon1-lon2;
            let radtheta = Math.PI * theta/180;
            let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344; // to convert in km
            return dist;
        }
    }
    
    // Find the nearest planted projects based on the latitude and longitude of the selected city
    function findNearestProjects(lat, long) {

        Projects.sort( (a,b) => {
            
            let distanceA = distance(a.latitude, a.longitude, lat, long);
            
            let distanceB = distance(b.latitude, b.longitude, lat, long);

            if (distanceA < distanceB) {
                return -1;
            }
            if (distanceA > distanceB) {
                return 1;
            }

            return 0;
        });
        
        setNearestProjects([]);

        for (let i = 0; i < numberOfNearestProjects; i++) {
            
            let dist = distance(Projects[i].latitude, Projects[i].longitude, lat, long);
            setNearestProjects(nearestProjects => [...nearestProjects, {id: Projects[i].id, name: Projects[i].projectName, distance: dist}]);
   
        }

    }

    // Find the latitude and longitude of the selected city
    function findCordinates(event) {
        
        setSelectedCity(event.target.value);
        const city = Cities.find( city => city.name === event.target.value);

        findNearestProjects(city.latitude, city.longitude);
    }

    


   return  <div>
       <select
        name="city" 
        value={selectedCity}
        onChange={findCordinates}
        >
            {Cities.map((item, key) => 
            <option key={key} value={item.name}>  {item.name} </option>
            )}
        </select>
        <h2>
            {selectedCity}
        </h2>
        {nearestProjects.map(plant =>  
            <NearestPlanted 
                key= {plant.id}
                name= {plant.name}
                distance= {plant.distance}
            />)}        
       
    </div>
}

export default Search;