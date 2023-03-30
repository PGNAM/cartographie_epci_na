// Créez une carte Leaflet centrée sur une position donnée
var map = L.map('map').setView([44.826, -0.555], 7,5);

// Ajoutez une couche de tuiles OpenStreetMap à la carte
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Chargez le fichier GeoJSON avec les polygones
$.getJSON("epci2.geojson", function(data) {
  // Ajoutez les polygones à la carte
  L.geoJSON(data, {
    style: function(feature) {
        switch (feature.properties.AOM) {
          case 'NON': return {color:"#ff0000",opacity : 0.7,fillColor: "#ff0000", fillOpacity: 0.5};
          case 'OUI': return {fillColor: "#0000ff", fillOpacity: 0.5};
          default: return {color: "#000000", fillColor: "#000000", fillOpacity: 0.5};
        }

       },
            

  }).addTo(map);


  L.geoJSON(data, {
    style: function(feature) {
        switch (feature.properties.membrenam) {
          case 'OUI': return {color: "#ffffff", fillColor: "#ff0000", fillOpacity: 0};
          case 'NON': return {weight:0.01, fillColor: "#0000ff", fillOpacity: 0};
          default: return {fillColor: "#000000", fillOpacity: 0};
        }

       },

       onEachFeature: function(feature, layer) {
        var popupContent = "<strong>" + feature.properties.epci_name + "</strong><br><strong>AOM : </strong>" + feature.properties.AOM;
        if (feature.properties.bassin && feature.properties.bassin.trim() !== '') {
          popupContent += "<br><strong>Bassin</strong> : "+ feature.properties.bassin;
        }
        layer.bindPopup(popupContent);
      }
      
            
  }).addTo(map);
});


