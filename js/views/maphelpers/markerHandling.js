import m from "mithril";

import { MarkerIcon } from "../../models/MarkerIcon.js";
import { MarkerSignificance } from "../../models/MarkerSignificance.js";
import { iconComponentFactory, weatherIconComponentFactory } from "../buildcomponents/iconComponentFactory.js";
import { Location } from "../../models/Location.js";

const formWeatherMarker = async (forecastData) => {
    const weatherIcon = weatherIconComponentFactory(forecastData.symbol_name);
    const markerTitle = `<h2><strong>${forecastData.t}°C</strong></h2>`;

    return L.marker([forecastData.latitude, forecastData.longitude], {icon: weatherIcon}).
    bindPopup(markerTitle);
};

const formMarkerWithLocData = async (loc) => {
    const iconName = await MarkerIcon.getClassNameById(loc.icon);
    const hexCode = await MarkerSignificance.getHexCodeById(loc.significance);
    const locIcon = iconComponentFactory('#' + hexCode, iconName);
    let markerTitle = loc.place_name ? loc.place_name : loc.address;
    const desc = loc.description ? `<p>${loc.description}</p>` : "";
    let address = (loc.place_name && loc.address) ? loc.address : "";

    markerTitle = `<h2><strong>${markerTitle}</strong></h2>`;
    address = `<p><em>${address}</em></p>`;
    

    return L.marker([loc.latitude, loc.longitude], {icon: locIcon}).
    bindPopup(markerTitle + address + desc);
};

const addMarkersWithLocData = async (locArr, map) => {
    if (!map.hasOwnProperty('activeMarkers')) {
        map.activeMarkers = [];
    }
    for (const loc of locArr) {
        const marker = await formMarkerWithLocData(loc);
        map.activeMarkers.push(marker);
        marker.addTo(map);
    }
};

const clearMarkers = async map => {
    await map.activeMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
}

const addWeatherMarkers = async (forecastArr, map, hoursFromNow) => {
    if (!map.hasOwnProperty('activeWeatherMarkers')) {
        map.activeWeatherMarkers = [];
    }
    for (const forecast of forecastArr) {
        console.log(`symbol_name_${hoursFromNow}h`);
        const marker = await formWeatherMarker({
            't': forecast[`t_${hoursFromNow}h`],
            'symbol_name': forecast[`symbol_name_${hoursFromNow}h`],
            'latitude': forecast['latitude'],
            'longitude': forecast['longitude']
        });
        map.activeWeatherMarkers.push(marker);
        console.log(marker);
        marker.addTo(map);
    }
};

const clearWeatherMarkers = async map => {
    await map.activeWeatherMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
}

const markerClickListener = e => {
    Location.current.latitude = Number.parseFloat(e.latlng.lat).toFixed(6);
    Location.current.longitude = Number.parseFloat(e.latlng.lng).toFixed(6);
    if (e.target.address) {
        Location.current.address = e.target.address;
    }
    m.route.set('/add-location');
}

const formQMarkerAtPos = async (pos, map) => {
    const locIcon = iconComponentFactory('#000000', 'question');
    return L.marker([pos.latitude, pos.longitude], {icon: locIcon});
};

export { 
    addMarkersWithLocData, 
    clearMarkers, 
    addWeatherMarkers, 
    clearWeatherMarkers,
    markerClickListener,
    formQMarkerAtPos
};