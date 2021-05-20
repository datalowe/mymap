"use strict";
import m from 'mithril';

import { MarkerSignificance } from "../models/MarkerSignificance.js";

const AddSignificanceForm = {
    view: () => {
        return m('div', [
            m("h1", "Add location significance label"),
            m("form.regular-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    MarkerSignificance.save();
                    m.route.set("add-location");
                }
            }, [
                m("label[for=label]", "Name"),
                m("input#label[name=label][type=text]" +
                "[placeholder=Booked/planned place to sleep at]",
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
                            console.log(e.target.value);
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
                m("button.column-span-2.button.success-button[type=submit]", "Save")
            ]),
        ],
        );
    }
};

export { AddSignificanceForm };