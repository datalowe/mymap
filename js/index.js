"use strict";
import m from 'mithril';

import { LoginForm } from './views/LoginForm.js';
import { RegisterForm } from './views/RegisterForm.js';
import { Layout } from './views/Layout.js';
import { AddLocationForm } from './views/AddLocationForm.js';
import { AddSignificanceForm } from './views/AddSignificanceForm.js';
import Map from './views/Map.js';

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
    "/map": {
        render: () => {
            return m(Map);
        }
    },
    "/add-location": {
        render: () => {
            return m(Layout, m(AddLocationForm));
        }
    },
    "/add-significance": {
        render: () => {
            return m(Layout, m(AddSignificanceForm));
        }
    }
});
