import o from "ospec";

import { MarkerIcon } from "../models/MarkerIcon.js";
import { UserSingleton } from "../models/UserSingleton.js";

// this relies on the back end API server being online
// it also relies on User model tests passing
// ... and it relies on specific data being in the
// back end database, so a lot of no-no's.
// if I want to do proper testing, I should
// start with replacing Mithril with a
// more modern framework and use probably Jest
o.spec("MarkerIcon", () => {
    o.specTimeout(5000);
    o("Valid user gets all marker icons", async () => {
        UserSingleton.username = 'regular';
        UserSingleton.password = 'password';
        await UserSingleton.login();

        await MarkerIcon.getList();

        o(MarkerIcon.list.length > 0).equals(true);
    });

    o("Marker icons are converted into correct CSS class names", async () => {
        const classNames = await MarkerIcon.getClassNames();

        o(classNames.includes("shopping-bag")).equals(true);
    });
});
