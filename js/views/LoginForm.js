"use strict";
import m from 'mithril';

import { UserSingleton } from "../models/UserSingleton.js";

const LoginForm = {
    view: () => {
        return m('div', [
            m("h1", "Log in"),
            m("form.regular-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    await UserSingleton.login();
                    if (UserSingleton.token) {
                        m.route.set("/map");
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
        ],
        m("div", [
            m("p", "Don't have a user yet?"),
            m(m.route.Link, {
                href: "/register",
                selector: "button"
            }, "Register")
        ]),
        );
    }
};

export { LoginForm }