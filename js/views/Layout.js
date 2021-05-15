"use strict";
import m from 'mithril';

// import { aq } from "../util/adequate.js";

// import { UserSingleton } from "../models/UserSingleton.js";

const Layout = {
    view: vnode => {
        return m("div#root.root", [
            m("main.container", vnode.children)
        ]);
    }
};

export { Layout };