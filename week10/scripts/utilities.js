export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options)
    });
}
// async/await, keeps code running while waiting for response
// await, sit on line until the line runs

export function getJSON(url) {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            } else {
                // console.log(response.json());
                return response.json();
            }
        })
        .catch(err => console.log(err));

        // .then((jsonData) => {
        //     console.log(jsonData);
        // })
}