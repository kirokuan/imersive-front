import { RSAA } from 'redux-api-middleware';
import Auth from '../utils/Auth';
const jsonHeader = { 'Content-Type': 'application/json' };
const baseUrl = "/";
const defaultPostReq = {
    method: "POST",
    headers: jsonHeader
};


const onApiLogout = () => {
    window.location.href = "/";
    Auth.clear();
};
class ApiActionGenerator {
    constructor(name) {
        this.Name = name;
    }
    parseUrl(action) {
        const url = action.endpoint;
        const regex = /[?&]([^=#]+)=([^&#]*)/g;
        const params = {};
        let match = regex.exec(url);
        while (match) {
            params[match[1]] = match[2];
            match = regex.exec(url);
        }
        //    this.pamams = params;
        return params;
    }
    getNames() {
        let params;
        return [
            {
                type: this.req(),
                payload: (action, state) => {
                    params = this.parseUrl(action[RSAA]);
                    return { ...action[RSAA], params };
                }
            },
            {
                type: this.success(),
                payload: (action, state, res) => {
                    return res.json().then((json) => {
                        return Object.assign(json, { params });
                    });
                },
            },
            {
                type: this.fail(), payload: (action, state, res) => {
                    if (res.status === 401) {
                        onApiLogout();
                    }
                    return res.json().then((json) => {
                        return Object.assign(json, { params });
                    });
                }
            }];
    }
    req() {
        return this.Name + "Req";
    }
    success() {
        return this.Name + "Success";
    }
    fail() {
        return this.Name + "Fail";
    }
}


export const LoginActions = new ApiActionGenerator("Login");
export const loginApi = (username, password) => ({
    [RSAA]: Object.assign(defaultPostReq, {
        endpoint: `${baseUrl}login`,
        credentials: 'omit',
        types: LoginActions.getNames(),
        body: JSON.stringify({
            username, password
        })
    })
});

export const RegisterActions = new ApiActionGenerator("Register");
export const registerApi = (username, password) => ({
    [RSAA]: Object.assign(defaultPostReq, {
        endpoint: `${baseUrl}register`,
        credentials: 'omit',
        types: RegisterActions.getNames(),
        body: JSON.stringify({
            username, password
        })
    })
});

export const LogoutActions = new ApiActionGenerator("Logout");
export const logoutApi = () => ({
    [RSAA]: Object.assign(defaultPostReq, {
        endpoint: `${baseUrl}logout`,
        types: LoginActions.getNames()
    })
});
