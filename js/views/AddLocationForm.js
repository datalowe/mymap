"use strict";
import m from 'mithril';

import { Location } from "../models/Location.js";

import { MarkerIcon } from "../models/MarkerIcon.js";
import { MarkerSignificance } from "../models/MarkerSignificance.js";

const AddLocationForm = {
    oninit: () => {
        MarkerIcon.getList();
        MarkerSignificance.getList();
    },
    view: () => {
        return m('div', [
            m("h1", "Add location"),
            m("form.regular-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    Location.save();
                }
            }, [
                m("label[for=place-name]", "Name"),
                m("input#place-name[name=place-name][type=text]" +
                "[placeholder=Museum of London]",
                {
                    oninput: e => {
                        Location.current.place_name = e.target.value;
                    }
                }
                ),
                m("label[for=address]", "Address"),
                m("input#address[name=address][type=text][placeholder=150 London Wall, London]",
                    {
                        oninput: e => {
                            Location.current.address = e.target.value;
                        }
                    }
                ),
                m("label[for=latitude]", "Latitude"),
                m("input#latitude[name=latitude][type=number][step=any][placeholder=51.5178968]",
                    {
                        oninput: e => {
                            Location.current.latitude = e.target.value;
                        }
                    }
                ),
                m("label[for=longitude]", "Longitude"),
                m("input#longitude[name=longitude][type=number][step=any][placeholder=-0.0958907]",
                    {
                        oninput: e => {
                            Location.current.longitude = e.target.value;
                        }
                    }
                ),
                m("label[for=description]", "Description"),
                m("textarea#description[name=description][placeholder=Has a London Black History exhibition I want to visit]",
                    {
                        oninput: e => {
                            Location.current.description = e.target.value;
                        }
                    }
                ),
                m("label[for=icon]", "Icon"),
                m("select#icon[name=icon]",
                    {
                        oninput: e => {
                            Location.current.icon = e.target.value;
                        }
                    },
                    MarkerIcon.list.map(i => {
                        const rName = i.humanreadable_name;
                        return m(
                            `option[value=${i.id}]`, 
                            rName.charAt(0).toUpperCase() + rName.substr(1, rName.length)
                        );
                    }),
                ),
                m("label[for=significance]", "Significance"),
                m("select#significance[name=significance]",
                    {
                        oninput: e => {
                            Location.current.significance = e.target.value;
                        }
                    },
                    MarkerSignificance.list.map(i => {
                        const label = i.significance_label;
                        return m(
                            `option[value=${i.id}]`, 
                            label.charAt(0).toUpperCase() + label.substr(1, label.length)
                        );
                    }),
                ),
                m("button.column-span-2.button.success-button[type=submit]", "Save")
            ]),
        ],
        );
    }
};

export { AddLocationForm };