/* global google */

const places = [{
  lat: 39.0400848,
  lon: -77.6185989,
  info: '<strong>Oatlands Historic House and Gardens</strong><br>20850 Oatlands Plantation Lane<br> Leesburg, VA 20175<br><a href="https://www.google.com/maps/dir//20850+Oatlands+Plantation+Ln,+Leesburg,+VA+20175" target="_blank">Get Directions</a>'
}, {
  lat: 39.0798574,
  lon: -77.47702,
  info: '<strong>Lansdowne Resort and Spa</strong><br>44050 Woodridge Pkwy<br> Leesburg, VA 20176<br><a href="https://www.google.com/maps/dir//44050+Woodridge+Pkwy,+Leesburg,+VA+20176" target="_blank">Get Directions</a>'
}, {
  lat: 39.0931746,
  lon: -77.5242336,
  info: '<strong>Clarion Inn Historic Leesburg</strong><br>1500 East Market Street<br> Leesburg, VA 20176<br><a href="https://www.google.com/maps/dir//1500+E+Market+St,+Leesburg,+VA+20176" target="_blank">Get Directions</a>'
}];

export default function map() {
  window.initMap = function() {
    map = new google.maps.Map(document.getElementById('map_canvas'), {
  		center: new google.maps.LatLng(39.076341, -77.542037),
  		zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
  	});

    const infowindow = new google.maps.InfoWindow({});

    places.forEach((p, i) => {
      const marker = new google.maps.Marker({
  			position: new google.maps.LatLng(p.lat, p.lon),
  			map: map
  		});
      google.maps.event.addListener(marker, 'click', ((marker) => {
  			return function () {
  				infowindow.setContent(p.info);
  				infowindow.open(map, marker);
  			};
  		})(marker));

      if (i === 0) {
        infowindow.setContent(p.info);
        infowindow.open(map, marker);
      }
    });
  };
};
