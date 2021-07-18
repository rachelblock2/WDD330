import { getJSON, getLocation } from "./utilities.js";

getLocation().then(result => {
    const lat  = result.coords.latitude;
    const long = result.coords.longitude;
    const baseUrl ='https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-02-02';
    let url = baseUrl + `&latitude=${lat}&longitude=${long}&maxradiuskm=100`;
    getJSON(url).then(result => {
        console.log(result);
    });
});


