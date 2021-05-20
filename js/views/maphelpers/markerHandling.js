import { MarkerIcon } from "../../models/MarkerIcon.js";
import { MarkerSignificance } from "../../models/MarkerSignificance.js";
import { iconComponentFactory } from "../buildcomponents/iconComponentFactory.js";


const formMarkerWithLocData = async (loc, map) => {
    const iconName = await MarkerIcon.getClassNameById(loc.icon);
    const hexCode = await MarkerSignificance.getHexCodeById(loc.significance);
    const locIcon = iconComponentFactory('#' + hexCode, iconName);
    let markerTitle = loc.place_name ? loc.place_name : loc.address;
    const desc = `<p>${loc.description}</p>`;
    let address = (loc.place_name && loc.address) ? loc.address : "";

    markerTitle = `<h2><strong>${markerTitle}</strong></h2>`;
    address = `<p><em>${address}</em></p>`;
    

    return L.marker([loc.latitude, loc.longitude], {icon: locIcon}).
    bindPopup(markerTitle + address + desc);
};

const addMarkersWithLocData = async (arrLoc, map) => {
    for (const loc of arrLoc) {
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

export { addMarkersWithLocData, clearMarkers };