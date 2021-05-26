"use strict";
import m from 'mithril';

/*
Represents an app user.
*/
const UserSingleton = {
    LOGIN_URL: "https://mymap-mapback.herokuapp.com/api/token-auth/",
    REGISTER_URL: "https://mymap-mapback.herokuapp.com/api/register/",
    username: "",
    password: "",
    token: "",
    serverMsg: "",
    login: async () => {
        try {
            const result = await m.request({
                method: "POST",
                url: UserSingleton.LOGIN_URL,
                body: {
                    username: UserSingleton.username,
                    password: UserSingleton.password
                }
            });

            UserSingleton.token = result.token;
        } catch (e) {
            UserSingleton.token = "";
            console.log(e.message);
        }
    },
    register: () => {
        return m.request({
            method: "POST",
            url: UserSingleton.REGISTER_URL,
            body: {
                username: UserSingleton.username,
                password: UserSingleton.password
            }
        })
            .then(result => {
                UserSingleton.token = result.token;
            })
            .catch(e => {
                UserSingleton.token = "";
                UserSingleton.serverMsg = e.message;
                console.log(e.message);
            });
    },
    // TODO replace with proper token validation
    isLoggedIn: () => UserSingleton.token.length > 0
};

export { UserSingleton };
