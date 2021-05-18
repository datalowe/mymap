import o from "ospec";

import { UserSingleton } from "../models/UserSingleton.js";

// this relies on the back end API server being online
o.spec("UserSingleton", () => {
    o.specTimeout(5000);
    o("Login with valid credentials works", async () => {
        UserSingleton.username = 'regular';
        UserSingleton.password = 'password';
        await UserSingleton.login();

        o(UserSingleton.token.length > 0).equals(true);
    });

    o("Login with invalid credentials produces error", async () => {
        UserSingleton.username = 'incorrect';
        UserSingleton.password = 'badpassword';
        await UserSingleton.login();

        o(UserSingleton.token.length).equals(0);
    });
});