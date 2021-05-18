"use strict";
import m from 'mithril';

import { UserSingleton } from './UserSingleton.js';

/*
Represents a geographical location.
*/
const Location = {
    list: [],
    current: {},
    API_LOC_URL: "http://localhost:8000/api/locations/",
    getList: async () => {
        try {
            const result = await m.request({
                method: "GET",
                url: Location.API_LOC_URL,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                }
            });
            Location.list = result;
        } catch (e) {
            console.log(e);
            m.route.set("/login");
        }
    },
    getSingle: async (id) => {
        try {
            const result = await m.request({
                method: "GET",
                url: Location.API_LOC_URL + `${id}/`,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                }
            });
            Location.current = result;
        } catch (e) {
            console.log(e.message);
            m.route.set("/login");
        }
    },
    filterList: async (filterStr) => {
        if (Location.list.length === 0) {
            await Location.getList();
        }
        const filterRegEx = new RegExp(filterStr, 'i');

        return Location.list.filter(x => {
            if (x.address && x.address.match(filterRegEx)) {
                return true;
            }
            if (x.place_name && x.place_name.match(filterRegEx)) {
                return true;
            }
            if (x.description && x.description.match(filterRegEx)) {
                return true;
            }
            return false;
        });
    }
};

export { Location };