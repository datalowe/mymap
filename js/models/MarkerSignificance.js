"use strict";
import m from 'mithril';

import { UserSingleton } from './UserSingleton.js';

/*
Represents 'significance' of map markers, eg if a location
is a high priority destination or if a location is 
somewhere a traveller plans to stay for a night.
*/
const MarkerSignificance = {
    list: [],
    current: {},
    API_SIG_URL: "http://localhost:8000/api/markersignificances/",
    getList: async () => {
        try {
            const result = await m.request({
                method: "GET",
                url: MarkerSignificance.API_SIG_URL,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                }
            });
            MarkerSignificance.list = result;
        } catch (e) {
            console.log(e);
            m.route.set("/login");
        }
    },
    getSingle: async (id) => {
        try {
            const result = await m.request({
                method: "GET",
                url: MarkerSignificance.API_SIG_URL + `${id}/`,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                }
            });
            MarkerSignificance.current = result;
        } catch (e) {
            MarkerSignificance.current = {};
            console.log(e.message);
            m.route.set("/login");
        }
    },
};

export { MarkerSignificance };