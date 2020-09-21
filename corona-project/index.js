console.log("CORONA");
function updateMap() {
  fetch("https://www.trackcorona.live/api/provinces")
    .then((response) => {
      return response.json()
    }).then((rsp) => {
      // console.log(rsp.data);
      rsp.data.forEach(element => {
        latitude = element.latitude;
        longitude = element.longitude;
        cases = element.confirmed;
        // location = element.location;
        recovered = element.recovered;
        dead = element.dead;
        // updated = element.updated;

        if (cases > 50000) {
          color = "rgb(250,0,0)";
        }
        else if (cases > 30000) {
          color = "rgb(204,204,0)";
        }
        else if (cases > 10000) {
          color = "rgb(0,100,0)";
        }
        else {
          // color = `rgb(${cases},34,45)`;
          color = "rgb(127,255,0)";
        }
        // create the popup
        var popup = new mapboxgl.Popup({ offset: 25 }).setText(
          // <h1>hello</h1>
          "(Confirmed cases : " + cases + ")(" +
          "Confirmed dead : " + dead + ")(" +
          // "location : " + location +
          "Recovered : " + recovered + ")"
          // // "Confirmed updated : " + updated 
        );
        new mapboxgl.Marker({
          color: color //color var use kiya h
        })
          .setLngLat([longitude, latitude]) //logitude pehle aayga and latitude badme
          .setPopup(popup) // sets a popup on this marker
          .addTo(map);
      });
    })
}
updateMap();