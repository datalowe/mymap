import o from "ospec";

import { Location } from "../models/Location.js";
import { UserSingleton } from "../models/UserSingleton.js";

// this relies on the back end API server being online
// it also relies on User model tests passing
// ... and it relies on specific data being in the
// back end database, so a lot of no-no's.
// if I want to do proper testing, I should
// start with replacing Mithril with a
// more modern framework and use probably Jest
o.spec("Location", () => {
    o.specTimeout(5000);
    o("Logged in user gets correct locations when fetching all", async () => {
        UserSingleton.username = 'regular';
        UserSingleton.password = 'password';
        await UserSingleton.login();

        await Location.getList();

        o(Location.list.length).equals(1);
    });

    o("Logged in user can retrieve single location that is theirs", async () => {
        UserSingleton.username = 'regular';
        UserSingleton.password = 'password';
        await UserSingleton.login();

        await Location.getSingle(2);

        o(Location.current.latitude).equals('56.1611345');
    });
});