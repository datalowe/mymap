import o from "ospec";

import { MarkerSignificance } from "../models/MarkerSignificance.js";
import { UserSingleton } from "../models/UserSingleton.js";

// this relies on the back end API server being online
// it also relies on User model tests passing
// ... and it relies on specific data being in the
// back end database, so a lot of no-no's.
// if I want to do proper testing, I should
// start with replacing Mithril with a
// more modern framework and use probably Jest
o.spec("MarkerSignificance", () => {
    o.specTimeout(5000);
    o("Valid user gets default+own marker significances", async () => {
        UserSingleton.username = 'regular';
        UserSingleton.password = 'password';
        await UserSingleton.login();

        await MarkerSignificance.getList();

        o(MarkerSignificance.list.length > 0).equals(true);
    });

    o("Logged in user can retrieve single significance that is theirs", async () => {
        UserSingleton.username = 'lowe';
        UserSingleton.password = 'password';
        await UserSingleton.login();

        await MarkerSignificance.getSingle(3);

        o(MarkerSignificance.current.significance_label).equals('Camping spot');
    });

    o("Logged in user cannot retrieve single significance that isn't theirs", async () => {
        UserSingleton.username = 'regular';
        UserSingleton.password = 'password';
        await UserSingleton.login();

        await MarkerSignificance.getSingle(3);

        o(Object.keys(MarkerSignificance.current).length).equals(0);
    });
});