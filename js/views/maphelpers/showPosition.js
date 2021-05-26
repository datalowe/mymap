import L from "leaflet";

import position from "../../models/UserPosition.js";

import { iconComponentFactory } from "../buildcomponents/iconComponentFactory.js";


const userIcon = iconComponentFactory('#4285f4', 'crosshairs');

function showPosition(map) {
    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        L.marker(
            [
                position.currentPosition.latitude,
                position.currentPosition.longitude
            ],
            {
                icon: userIcon
            }
        ).addTo(map).bindPopup("<strong>Your position</strong>");
    }
}

function moveToPosition(map) {
    if (position.currentPosition.latitude && position.currentPosition.longitude) {
        map.setView(
            [position.currentPosition.latitude, position.currentPosition.longitude],
            12
        );
    }
}

export {showPosition, moveToPosition};
