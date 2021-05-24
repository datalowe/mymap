"use strict";
import m from 'mithril';

import { UserSingleton } from "../models/UserSingleton.js";

const RegisterForm = {
    view: () => {
        return m('div.send-form-container', [
            m("i[class=fas fa-user-circle form-top-icon icon-with-header]"),
            m("h1[class=form-title]", "Register"),
            m("form.regular-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    await UserSingleton.register();
                    if (UserSingleton.token) {
                        m.route.set("/map");
                    } else {
                        if (UserSingleton.serverMsg.length > 0) {
                            alert(UserSingleton.serverMsg);
                        } else {
                            alert("Something went wrong, please try again later.");
                        }
                    }
                }
            }, [
                m("input#username[name=username][required=required][type=text]" +
                "[placeholder=username]",
                {
                    oninput: e => {
                        UserSingleton.username = e.target.value;
                    }
                }
                ),
                m("input#password[name=password][required=required][type=password]" +
                "[placeholder=password]",
                    {
                        oninput: e => {
                            UserSingleton.password = e.target.value;
                        }
                    }
                ),
                m("button.column-span-2.button.primary-button[type=submit]", "Register")
            ]),
        ]);
    }
};

export { RegisterForm }