"use strict";
import m from 'mithril';

import { MarkerSignificance } from "../models/MarkerSignificance.js";

const AddSignificanceForm = {
    oninit: () => {
        MarkerSignificance.current = {};
    },
    view: () => {
        return m('div.send-form-container', [
            m("h1[class=form-title]", "Add significance label"),
            m("form.regular-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    await MarkerSignificance.save();
                    m.route.set("/" + m.route.param('sendto'));
                }
            }, [
                m("label[for=label]", "Name"),
                m("input#label[name=label][type=text]" +
                "[placeholder=Place to sleep]",
                {
                    oninput: e => {
                        MarkerSignificance.current.significance_label = e.target.value;
                    }
                }
                ),
                m("label[for=hex-code]", "Color"),
                m("input#hex-code[name=hex-code][type=color]",
                    {
                        oninput: e => {
                            MarkerSignificance.current.hex_code = e.target.value;
                        }
                    }
                ),
                m("label[for=label]", "(Optional) Color name"),
                m("input#label[name=label][type=text]" +
                "[placeholder=Dune]",
                {
                    oninput: e => {
                        MarkerSignificance.current.color_name = e.target.value;
                    }
                }
                ),
                m("button.column-span-2.button.primary-button[type=submit]", "Save"),
                m("div.form-reroute", [
                    m(m.route.Link, {
                        selector: "button",
                        class: "button secondary-button",
                        type: "button",
                        href: "/" + m.route.param('sendto'),
                    },
                    "Cancel")
                ]),
            ]),
        ],
        );
    }
};

export { AddSignificanceForm };
