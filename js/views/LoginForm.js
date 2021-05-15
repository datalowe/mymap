"use strict";
import m from 'mithril';

import { UserSingleton } from "../models/UserSingleton.js";

const LoginForm = {
    view: () => {
        return [
            m("h1", "Log in"),
            m("form.regular-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    await UserSingleton.login();
                    if (UserSingleton.token) {
                        // m.route.set("/home");
                        alert("Successfully logged in!");
                    } else {
                        alert("Incorrect username/password, please try again.");
                    }
                }
            }, [
                m("label[for=username]", "Username"),
                m("input#username[name=username][required=required][type=text]" +
                "[placeholder=username]",
                {
                    oninput: e => {
                        UserSingleton.username = e.target.value;
                    }
                }
                ),
                m("label[for=password]", "Password"),
                m("input#password[name=password][required=required][type=password]",
                    {
                        oninput: e => {
                            UserSingleton.password = e.target.value;
                        }
                    }
                ),
                m("button.column-span-2.button.success-button[type=submit]", "Log in")
            ]),
        ];
    }
};

export { LoginForm }