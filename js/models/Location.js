"use strict";
import m from 'mithril';

import { UserSingleton } from './UserSingleton.js';

/*
Represents a geographical location.
*/
const Location = {
    list: [],
    current: {},
    API_LOC_URL: "https://mymap-mapback.herokuapp.com/api/locations/",
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
    save: async () => {
        try {
            const result = await m.request({
                method: "POST",
                url: Location.API_LOC_URL,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                },
                body: Location.current,
            });

            Location.current = result;
        } catch (e) {
            console.log(e);
        }
    },
    update: async () => {
        try {
            await m.request({
                method: "PUT",
                url: Location.API_LOC_URL + `${Location.current.id}/`,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                },
                body: Location.current,
            });
        } catch (e) {
            console.log(e);
        }
    },
    deleteCurrent: async () => {
        try {
            await m.request({
                method: "DELETE",
                url: Location.API_LOC_URL + `${Location.current.id}/`,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                }
            });
            Location.list = Location.list.filter(x => x.id === Location.current.id);
            Location.current = {};
        } catch (e) {
            console.log(e);
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
