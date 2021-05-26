"use strict";
import m from 'mithril';

import { UserSingleton } from './UserSingleton.js';

/*
Mapping from back end icon `code_name`s to
HTML element (currently font awesome) CSS style names.
Eg with Font Awesome, 'shopping-bag' will be used to
form the element `<i class="fas fa-shopping-bag"></i>`.
*/
const iconNames = {
    "bed": "bed",
    "bus": "bus",
    "coffee": "coffee",
    "cross": "cross",
    "crown": "crown",
    "globe": "globe",
    "hamburger": "hamburger",
    "house": "home",
    "mountain": "mountain",
    "ship": "ship",
    "shopping-bag": "shopping-bag",
    "shopping-cart": "shopping-cart",
    "subway": "subway",
    "swimmer": "swimmer",
    "train": "train",
    "tram": "tram",
    "tree": "tree",
    "important-building": "university",
    "utensils": "utensils"
};

/*
Represents map marker icons.
*/
const MarkerIcon = {
    list: [],
    API_ICO_URL: "https://mymap-mapback.herokuapp.com/api/markericons/",
    getList: async () => {
        try {
            const result = await m.request({
                method: "GET",
                url: MarkerIcon.API_ICO_URL,
                headers: {
                    Authorization: `Token ${UserSingleton.token}`,
                }
            });

            MarkerIcon.list = result;
        } catch (e) {
            console.log(e);
            m.route.set("/login");
        }
    },
    /**
     *
     * @returns (Font Awesome) CSS class names.
     */
    getClassNames: async () => {
        if (MarkerIcon.list.length === 0) {
            await MarkerIcon.getList();
        }
        return MarkerIcon.list.map(x => iconNames[x.code_name]);
    },
    getClassNameById: async (iconId) => {
        if (MarkerIcon.list.length === 0) {
            await MarkerIcon.getList();
        }
        const codeName = MarkerIcon.list.find(x => x.id == iconId).code_name;

        return iconNames[codeName];
    }
};

export { MarkerIcon };
