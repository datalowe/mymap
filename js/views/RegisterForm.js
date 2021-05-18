"use strict";
import m from 'mithril';

import { UserSingleton } from "../models/UserSingleton.js";

const RegisterForm = {
    view: () => {
        return m('div', [
            m("h1", "Register"),
            m("form.regular-form", {
                onsubmit: async e => {
                    e.preventDefault();
                    await UserSingleton.register();
                    if (UserSingleton.token) {
                        // m.route.set("/home");
                        alert("User successfully created!");
                    } else {
                        if (UserSingleton.serverMsg.length > 0) {
                            alert(UserSingleton.serverMsg);
                        } else {
                            alert("Something went wrong, please try again later.");
                        }
                        
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
                m("button.column-span-2.button.success-button[type=submit]", "Register")
            ]),
        ]);
    }
};

export { RegisterForm }