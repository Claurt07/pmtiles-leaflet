// Create the map container
const mapContainer = document.getElementById("map");
if (mapContainer) {
  console.log("Map container found");
  const map = L.map(mapContainer).setView([37.572101, 36.934172], 12);
  console.log("Map created");

  // Set the OpenStreetMap basemap URL
  const osmUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  // Create the OpenStreetMap basemap layer
  const osmLayer = L.tileLayer(osmUrl, {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    subdomains: ["a", "b", "c"],
  });
  console.log("OSM layer created");

  // Add the OpenStreetMap basemap layer to the map
  // osmLayer.addTo(map);
  console.log("OSM layer added to map");

  // Add the PMTiles layer from a URL
  const pmtilesLayer = new pmtiles.LeafletLayer(
    "https://s3.dualstack.us-east-1.amazonaws.com/production-raw-data-api/default/buildings_test_pmtiles_uid_c4824472-d799-421f-b87a-485c61508e9d.pmtiles",
  );

  pmtilesLayer.on("tileloadstart", function () {
    console.log("PMTiles loading started");
  });

  pmtilesLayer.on("tileload", function () {
    console.log("PMTiles tile loaded");
  });

  pmtilesLayer.on("tileerror", function (error) {
    console.error("PMTiles tile loading error", error);
  });

  pmtilesLayer.addTo(map);
  console.log("PMTiles layer added to map");
} else {
  console.error("Map container not found");
}
console.log(typeof pmtiles); // Should return 'object'
