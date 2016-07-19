jQuery(function($) {
	$("#location-box").geocomplete({
		map: "#location-map",
		mapOptions: {
			// Apple Maps-esque style from Snazzy Maps
			styles: [{"featureType":"landscape.man_made","elementType":"geometry","stylers":[{"color":"#f7f1df"}]},{"featureType":"landscape.natural","elementType":"geometry","stylers":[{"color":"#d0e3b4"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"geometry","stylers":[{"color":"#fbd3da"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#bde6ab"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffe15f"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#efd151"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"black"}]},{"featureType":"transit.station.airport","elementType":"geometry.fill","stylers":[{"color":"#cfb2db"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#a2daf2"}]}],
			scaleControl: false,
			streetViewControl: false,
			zoomControl: false,
			mapTypeControlOptions: {
				mapTypeIds: google.maps.MapTypeId.ROADMAP
			},
			draggable: false
		}
	});
})

//@TODO use geolocation to set the initial position -> reverse geocoding 
// https://developers.google.com/maps/documentation/javascript/examples/map-geolocation
// https://developers.google.com/maps/documentation/javascript/examples/geocoding-reverse
// $("input").geocomplete("find", "NYC");
//@TODO logo
//@TODO sass and gulp
