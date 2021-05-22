const myCustomColour = '#583470';

// a factory function for producing Font Awesome-based
// divIcon's
// partly copied from, partly inspired by 
// https://stackoverflow.com/questions/23567203/leaflet-changing-marker-color
const iconComponentFactory = (customColor, iconName) => {
    const markerHtmlStyle = `
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${customColor};
    width: 2.3rem;
    height: 2.3rem;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF;`;

    const icon = L.divIcon({
        className: `${customColor}-${iconName}`,
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `
        <div style="${markerHtmlStyle}" class="awesome-marker">
        <i class="fas fa-${iconName} marker-icon"></i>
        </div>`
    });

    return icon;
};

// a factory function for producing divIcon's which use
// SVG's from the YR weather API
const weatherIconComponentFactory = (iconName, color="#FFFFFF") => {
    const markerHtmlStyle = `
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${color};
    width: 2.3rem;
    height: 2.3rem;
    left: -1.5rem;
    top: -1.5rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #000000;`;

    const icon = L.divIcon({
        className: `${color}-${iconName}`,
        iconAnchor: [0, 24],
        labelAnchor: [-6, 0],
        popupAnchor: [0, -36],
        html: `
        <div style="${markerHtmlStyle}" class="awesome-marker">
        <img src="img/weathericon/svg/${iconName}.svg" class="weather-marker-icon"></img>
        </div>`
    });

    return icon;
};

export { iconComponentFactory, weatherIconComponentFactory };