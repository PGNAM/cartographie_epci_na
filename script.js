// Créez une carte Leaflet centrée sur une position donnée
var map = L.map('map').setView([44.826, -0.555], 7,5);

// Ajoutez une couche de tuiles OpenStreetMap à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Déclarez une variable pour stocker la couche GeoJSON
var myGeoJSONLayer;

// Chargez le fichier GeoJSON avec les polygones
$.getJSON("epci2.geojson", function(data) {
  // Créez la couche GeoJSON
  myGeoJSONLayer = L.geoJSON(data, {
    style: function(feature) {
      switch (feature.properties.AOM) {
        case 'NON': return {color:"#ff0000",opacity : 0.7,fillColor: "#ff0000", fillOpacity: 0.5};
        case 'OUI': return {fillColor: "#0000ff", fillOpacity: 0.5};
        default: return {color: "#000000", fillColor: "#000000", fillOpacity: 0.5};
      }
    },
    onEachFeature: function(feature, layer) {
      var popupContent = "<strong>" + feature.properties.epci_name + "</strong><br><strong>AOM : </strong>" + feature.properties.AOM;
      if (feature.properties.bassin && feature.properties.bassin.trim() !== '') {
        popupContent += "<br><strong>Bassin</strong> : "+ feature.properties.bassin;
      }
      layer.bindPopup(popupContent);
    }
  });

  // Ajoutez la couche GeoJSON à la carte
  myGeoJSONLayer.addTo(map);

  // Ajoutez un bouton pour activer ou désactiver la couche GeoJSON
  var toggleButton = L.Control.extend({
    options: {
      position: 'topright'
    },
    onAdd: function(map) {
      var button = L.DomUtil.create('button', 'toggle-button');
      button.innerHTML = 'EPCI AOM';
      L.DomEvent.addListener(button, 'click', function() {
        if (map.hasLayer(myGeoJSONLayer)) {
          map.removeLayer(myGeoJSONLayer);
        } else {
          map.addLayer(myGeoJSONLayer);
        }
      });
      return button;
    }
  });
  map.addControl(new toggleButton());
});
