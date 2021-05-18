"use strict";

import m from "mithril";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import position from "../models/UserPosition.js";

import locationIcon from "../../img/location.png";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

let map;
const locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize:     [24, 24],
    iconAnchor:   [12, 12],
    popupAnchor:  [0, 0]
});

function showMap() {
    const places = {
        "BTH": [56.181932, 15.590525],
        "Stortorget": [56.160817, 15.586703],
        "Hoglands Park": [56.164077, 15.585887],
        "Rödebybacken": [56.261121, 15.628609]
    };

    // setView: Sets the view of the map (geographical center and zoom) 
    // with the given animation options. ('13' is the zoom level)
    // map = L.map('map').setView([57, 16], 12);
    map = L.map('map').setView(places["Stortorget"], 12);

    // other base maps can be found at:
    // http://leaflet-extras.github.io/leaflet-providers/preview/index.html
    // https://leafletjs.com/plugins.html#basemap-providers
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map);

    Object.entries(places).forEach(([pName, pLoc]) => {
        L.marker(pLoc).addTo(map).bindPopup(pName);
    });

    console.log('map should be added!');
}

function showPosition() {
    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        L.marker(
            [
                position.currentPosition.latitude,
                position.currentPosition.longitude
            ],
            {
                icon: locationMarker
            }
        ).addTo(map).bindPopup("Din plats");
    }
}

const Map = {
    oninit: position.getPosition,
    oncreate: showMap,
    view: function() {
        showPosition();
        return [
            m("h1", "Map"),
            m("div#map.map", "")
        ];
    }
};

export default Map;
