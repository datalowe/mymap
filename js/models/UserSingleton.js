"use strict";
import m from 'mithril';

const UserSingleton = {
    LOGIN_URL: "http://localhost:8000/api/token-auth/",
    REGISTER_URL: "http://localhost:8000/api/register/",
    username: "",
    password: "",
    token: "",
    login: () => {
        console.log({
            username: UserSingleton.username,
            password: UserSingleton.password
        }); 
        return m.request({
            method: "POST",
            url: UserSingleton.LOGIN_URL,
            body: {
                username: UserSingleton.username,
                password: UserSingleton.password
            }
        })
            .then(result => {
                UserSingleton.token = result.token;
            })
            .catch(e => {
                console.log(e.message);
            });
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
