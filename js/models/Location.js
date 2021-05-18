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
};

export { Location };