"use strict";
import m from 'mithril';

import { UserSingleton } from './UserSingleton.js';
import { Location } from './Location.js';

/*
Represents a forecast for a location and multiple time points.
*/
const ForecastPoint = {
    list: [],
    current: {},
    API_FORECAST_URL: "https://mymap-mapback.herokuapp.com/api/forecasts/",
    /*
    Fetches an array of forecast point data and storing them
    in ForecastPoint.list. Takes in an array of objects where each object
    has a 'lat' and 'lon' property, with numeric lat-/longitude values.
    */
    getList: async (coordsArr) => {
        if (coordsArr.length === 0) {
            return false;
        }
        try {
            const result = await m.request({
                method: "POST",
                url: ForecastPoint.API_FORECAST_URL,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                },
                body: {'coords': coordsArr}
            });

            ForecastPoint.list = result;
        } catch (e) {
            console.log(e);
            m.route.set("/login");
        }
    },
    /*
    Similar to getList, but only takes a single object with 'lat'/'lon'
    properties as an argument and stores the API call response data
    in ForecastPoint.current.
    */
    getSingle: async (coordsObj) => {
        try {
            const result = await m.request({
                method: "POST",
                url: ForecastPoint.API_FORECAST_URL,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                },
                body: [coordsObj]
            });

            ForecastPoint.current = result;
        } catch (e) {
            console.log(e.message);
            m.route.set("/login");
        }
    },
    /*
    Retrieves forecast position data for all locations currently stored in
    Location.list
    */
    getForAllLocations: async () => {
        if (Location.list.length === 0) {
            await Location.getList();
        }
        try {
            const coords = Location.list.map(x => {
                return {'lat': x.latitude, 'lon': x.longitude};
            }
            );

            await ForecastPoint.getList(coords);
        } catch (e) {
            console.log(e);
        }
    }
};

export { ForecastPoint };
