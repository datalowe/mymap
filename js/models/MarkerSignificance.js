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
    save: async () => {
        try {
            const result = await m.request({
                method: "POST",
                url: MarkerSignificance.API_SIG_URL,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                },
                body: MarkerSignificance.current,
            });
            MarkerSignificance.current = result;
        } catch (e) {
            console.log(e.message);
        }
    },
    /**
     * @returns An array of marker significances that are owned/created by
     * the current user (rather than being default significances, which have
     * an owner_id of `null`).
     */
    getOwnedList: async () => {
        if (MarkerSignificance.list.length === 0) {
            await MarkerSignificance.getList();
        }

        return MarkerSignificance.list.filter(x => x.owner_id !== null);
    },
    getHexCodeById: async (sigId) => {
        if (MarkerSignificance.list.length === 0) {
            await MarkerSignificance.getList();
        }
        const hexCode = MarkerSignificance.list.find(x => x.id == sigId).hex_code;
        return hexCode;
    }
};

export { MarkerSignificance };