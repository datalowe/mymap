"use strict";

import m from "mithril";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { OpenStreetMapProvider } from "leaflet-geosearch";

import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";

import { Location } from "../models/Location.js";

import {showPosition, moveToPosition } from "./maphelpers/showPosition.js";

import position from "../models/UserPosition.js";
import {
    addMarkersWithLocData, 
    clearMarkers, 
    addWeatherMarkers, 
    clearWeatherMarkers,
    markerClickListener,
    formQMarkerAtPos
} from "./maphelpers/markerHandling.js";
import { ForecastPoint } from "../models/ForecastPoint.js";

const geocoder = new OpenStreetMapProvider();

async function showMap() {
    let map;

    if (window.innerWidth < 800) {
        map  = L.map('map', { zoomControl: false, worldCopyJump: true });
    } else {
        map = L.map('map', { zoomControl: true, worldCopyJump: true });
        map.zoomControl.setPosition('bottomleft');
    }

    await Location.getList();
    await ForecastPoint.getForAllLocations();

    if (Location.list && Location.list.length > 0) {
        const lastLoc = [...Location.list].sort((x, y) => x.id < y.id)[0];
        // const lastCoords = [Location.list[lastIndex].latitude, Location.list[lastIndex].longitude];
        // const lastCoords = [Location.list[0].latitude, Location.list[0].longitude];
        const lastCoords = [lastLoc.latitude, lastLoc.longitude];

        // setView: Sets the view of the map (geographical center and zoom) 
        // with the given animation options. ('12' is the zoom level)
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
        await ForecastPoint.getForAllLocations();
    },
    oncreate: async () => {
        Map.map = await showMap();
        Map.showingWeather = false;
        Map.map.on('contextmenu', async x => {
            if (Map.map.qMarker) {
                Map.map.removeLayer(Map.map.qMarker);
            }

            const marker = await formQMarkerAtPos({
                'latitude': x.latlng.lat, 
                'longitude': x.latlng.lng
            });

            marker.addTo(Map.map);

            Map.map.qMarker = marker;

            Map.map.qMarker.on('dblclick', markerClickListener);
        }
        )
    },
    view: function() {
        showPosition(Map.map);
        return ('div', [
            m(
                "button#search-swap[type=button]", {
                    onclick: async e => {
                        const swapSearch = document.getElementById('search-swap').children[0];
                        const searchLocationsForm = document.getElementById('search-locations-form');
                        const searchAddressForm = document.getElementById('search-address-form');

                        if (swapSearch.classList.contains('fa-globe')) {
                            swapSearch.classList.remove('fa-globe');
                            swapSearch.classList.add('fa-filter');
                            searchAddressForm.hidden = false;
                            searchLocationsForm.hidden = true;
                        } else {
                            swapSearch.classList.add('fa-globe');
                            swapSearch.classList.remove('fa-filter');
                            searchLocationsForm.hidden = false;
                            searchAddressForm.hidden = true;
                        }
                    }
                }, 
                m("i[class=fas fa-filter]")
            ),
            m("form#search-locations-form[hidden]",
                {
                    onsubmit: e => {
                        e.preventDefault();
                    }
                },
                [m("input#search-locations[type=text]" +
                    "[placeholder=Name/address/description keywords...]", {
                        oninput: async e => {
                            const locLs = await Location.filterList(e.target.value);

                            await clearMarkers(Map.map);
                            await addMarkersWithLocData(locLs, Map.map);
                        }
                    }
                )]
            ),
            m("form#search-address-form", {
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
                                    const newMarker = L.marker([res.y, res.x]);
                                    Map.newAddressMarkers.push(newMarker);
                                    const newMark = newMarker.addTo(Map.map)
                                        .bindPopup(res.label)
                                        // .on('dblclick', e => console.log(e.latlng));
                                        .on('dblclick', markerClickListener);
                                    newMark.address = res.label;
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
                "[placeholder=221b baker street, london]", {
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
                m("button#button-search[type=submit]", m("i[class=fas fa-search]")),
            ]),
            m(
                "button#goto-position[type=button][class=map-secondary-button floating-action-button]", 
                {
                    onclick: async e => {
                        moveToPosition(Map.map);
                    }
                },
                m("i[class=fas fa-crosshairs map-secondary-button-content]")
            ),
            m(
                "button#show-weather[type=button][class=map-primary-button floating-action-button]", 
                {
                    onclick: async e => {
                        if (Map.showingWeather) {
                            await clearWeatherMarkers(Map.map);
                            await addMarkersWithLocData(Location.list, Map.map);
                        } else {
                            await clearMarkers(Map.map);
                            addWeatherMarkers(ForecastPoint.list, Map.map, 0);
                        }
                        Map.showingWeather = !Map.showingWeather;
                    }
                },
                m("i[class=fas fa-cloud map-primary-button-content]")
            ),
            m("div#map.map", "")
        ]);
    }
};

export default Map;
