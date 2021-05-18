"use strict";
import m from 'mithril';

/*
Represents an app user.
*/
const UserSingleton = {
    LOGIN_URL: "http://localhost:8000/api/token-auth/",
    REGISTER_URL: "http://localhost:8000/api/register/",
    username: "",
    password: "",
    token: "",
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
                console.log(result.data.message);
            })
            .catch(e => {
                console.log(e.message);
            });
    },
    // TODO replace with proper token validation
    isLoggedIn: () => UserSingleton.token.length > 0
};

export { UserSingleton };
