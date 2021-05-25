"use strict";
import m from 'mithril';

import { Location } from "../models/Location.js";

import { MarkerIcon } from "../models/MarkerIcon.js";
import { MarkerSignificance } from "../models/MarkerSignificance.js";

const EditLocationForm = {
    oninit: async () => {
        await MarkerIcon.getList();
        await MarkerSignificance.getList();
    },
    view: () => {
        return m('div.send-form-container', [
            m("h1[class=form-title]", "Edit location"),
            m("form.regular-form.item-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    await Location.update();
                    Location.current = {};
                    m.route.set("/map");
                }
            }, [
                m("label[for=place-name]", "Name"),
                m("input#place-name[name=place-name][type=text]" +
                "[placeholder=Museum of London]" +
                `[value=${Location.current.place_name ? Location.current.place_name : ""}]`,
                {
                    oninput: e => {
                        Location.current.place_name = e.target.value;
                    }
                }
                ),
                m("label[for=address]", "Address"),
                m("textarea#address[name=address][placeholder=150 London Wall, London]" +
                    `[value=${Location.current.address ? Location.current.address : ""}]`,
                    {
                        oninput: e => {
                            Location.current.address = e.target.value;
                        }
                    }
                ),
                m("label[for=latitude]", "Latitude"),
                m("input#latitude[name=latitude][type=number][step=any][placeholder=51.5178968]" +
                `[value=${Location.current.latitude ? Location.current.latitude : ""}]`,
                    {
                        oninput: e => {
                            Location.current.latitude = e.target.value;
                        }
                    }
                ),
                m("label[for=longitude]", "Longitude"),
                m("input#longitude[name=longitude][type=number][step=any][placeholder=-0.0958907]" +
                `[value=${Location.current.longitude ? Location.current.longitude : ""}]`,
                    {
                        oninput: e => {
                            Location.current.longitude = e.target.value;
                        }
                    }
                ),
                m("label[for=description]", "Description"),
                m("textarea#description[name=description][placeholder=Has a London Black History exhibition I want to visit]" +
                `[value=${Location.current.description ? Location.current.description : ""}]`,
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
                m('div.input-with-add-wrapper', [
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
                                label.charAt(0).toUpperCase() + label.substr(1, label.length) +
                                ` (${i.color_name.toLocaleLowerCase()})`
                            );
                        }),
                    ),
                    m(m.route.Link, {
                        selector: "button",
                        class: "add-secondary-button",
                        type: "button",
                        href: "/add-significance?sendto=edit-location"
                    },
                    m("i[class=fas fa-plus]"))
                    ]
                ),
                m("button.column-span-2.button.primary-button[type=submit]", "Save")
            ]),
            m("div.form-reroute", [
                m(m.route.Link, {
                    selector: "button",
                    class: "button primary-warning-button",
                    type: "button",
                    href: "/delete-location",
                },
                "Remove location")
            ]),
            m("div.form-reroute", [
                m(m.route.Link, {
                    selector: "button",
                    class: "button secondary-button",
                    type: "button",
                    href: "/map",
                    onclick: e => {
                        e.preventDefault();
                        Location.current = {};
                        m.route.set('/map');
                    }
                },
                "Back to map")
            ]),
        ],
        );
    }
};

export { EditLocationForm };