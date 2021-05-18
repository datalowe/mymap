"use strict";
import m from 'mithril';

import { LoginForm } from './views/LoginForm.js';
import { RegisterForm } from './views/RegisterForm.js';
import { Layout } from './views/Layout.js';

// const LoginForm = require("./views/LoginForm.js");
// const RegisterForm = require("./views/RegisterForm.js");

// const loggedInMatchFun = () => UserSingleton.isLoggedIn() ? true : m.route.set("/home");

m.route(document.body, "/login", {
    "/login": {
        render: () => {
            return m(Layout, m(LoginForm));
        }
    },
    "/register": {
        render: () => {
            return m(Layout, m(RegisterForm));
        }
    },
});
