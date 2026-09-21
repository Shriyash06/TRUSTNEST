
 
  mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({

        container: 'map', // container ID
        center: visting.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
        zoom: 12, // starting zoom
        style : 'mapbox://styles/mapbox/streets-v11' // style URL    
    });




    const marker = new mapboxgl.Marker({color: 'red'})
        .setLngLat(visting.geometry.coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    `<h3>${visting.location}</h3><p>exact location of the place`
                )
        ) // listing.geometery.coordinates;
        .addTo(map);

// mapboxgl.accessToken = mapToken;

// console.log(coordinates);

// const map = new mapboxgl.Map({
//     container: 'map',
//     center: coordinates,
//     zoom: 9
// });

// const marker = new mapboxgl.Marker()
//     .setLngLat(coordinates)
//     .addTo(map);