"use strict";

import m from "mithril";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import { Location } from "../models/Location.js";

import addMarkerWithLocData from "./maphelpers/markerHandling.js";

import showPosition from "./maphelpers/showPosition.js";

import position from "../models/UserPosition.js";
import {addMarkersWithLocData, clearMarkers} from "./maphelpers/markerHandling.js";

const geocoder = new OpenStreetMapProvider();

async function showMap() {
    const map = L.map('map');
    map.activeMarkers = [];

    await Location.getList();

    if (Location.list && Location.list.length > 0) {
        const lastIndex = Location.list.length - 1;
        const lastCoords = [Location.list[lastIndex].latitude, Location.list[lastIndex].longitude];

        // setView: Sets the view of the map (geographical center and zoom) 
        // with the given animation options. ('13' is the zoom level)
        map.setView(lastCoords, 12);
    } else {
        map.setView([59.2722152, 15.2124328], 4);
    }
    

    // other base maps can be found at:
    // http://leaflet-extras.github.io/leaflet-providers/preview/index.html
    // https://leafletjs.com/plugins.html#basemap-providers
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',    {
        attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
    }).addTo(map);

    if (Location.list) {
        addMarkersWithLocData(Location.list, map);
    }

    return map;
}

const Map = {
    newAddressMarkers: [],
    addressStr: "",
    oninit: async () => {
        position.getPosition();
        await Location.getList();
    },
    oncreate: async () => {
        Map.map = await showMap();
    },
    view: function() {
        showPosition(Map.map);
        return ('div', [
            m("input#search-locations[type=text]" +
                "[placeholder=Name/address/description keywords...]", {
                    oninput: async e => {
                        const locLs = await Location.filterList(e.target.value);

                        await clearMarkers(Map.map);
                        await addMarkersWithLocData(locLs, Map.map);
                    }
                }
            ),
            m("form.regular-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    if (Map.newAddressMarkers && Map.newAddressMarkers.length > 0) {
                        for (const m of Map.newAddressMarkers) {
                            await Map.map.removeLayer(m);
                        }
                        Map.newAddressMarkers = [];
                    }
                    await geocoder
                        .search({ query: Map.addressStr})
                        .then(resultArr => {
                            if (resultArr.length > 0) {
                                for (const res of resultArr) {
                                    console.log(res);
                                    const newMarker = L.marker([res.y, res.x]);
                                    Map.newAddressMarkers.push(newMarker);
                                    newMarker.addTo(Map.map).bindPopup(res.label);
                                }
                                if (resultArr.length > 1) {
                                    Map.map.setView([resultArr[0].y, resultArr[0].x], 5);
                                } else {
                                    Map.map.setView([resultArr[0].y, resultArr[0].x], 8);
                                }
                            }
                            else {
                                alert("No matching addresses found.");
                            }
                    }); 
                }
            }, [
                m("input#search-address[type=text]" +
                "[placeholder='New Street 123, Cityville]", {
                    oninput: async e => {
                        Map.addressStr = e.target.value;
                        if (Map.newAddressMarkers && Map.newAddressMarkers.length > 0) {
                            for (const m of Map.newAddressMarkers) {
                                await Map.map.removeLayer(m);
                            }
                            Map.newAddressMarkers = [];
                        }
                    }
                }
                ),
                m("button.column-span-2.button.success-button[type=submit]", "Search")
            ]),
            m("div#map.map", "")
        ]);
    }
};

export default Map;
