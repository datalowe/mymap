import mq from "mithril-query";
import o from "ospec";

import { LoginForm } from "../views/LoginForm.js";

o.spec("LoginForm", () => {
    o("Basic login form rendering works", () => {
        const out = mq(LoginForm);

        o(out.should.contain("Log in")).equals(true);
    });
});
