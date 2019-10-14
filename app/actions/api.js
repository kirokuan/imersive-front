import { CALL_API } from 'redux-api-middleware';
const jsonHeader = { 'Content-Type': 'application/json' };
const baseUrl = "/";
const defaultPostReq = {
    method: "POST",
    headers: jsonHeader,
    credentials: "include"
};

const defaultGetReq = {
    method: "GET",
    credentials: "include"
};

const onApiLogout = () => {
    window.location.href = "/";
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
                    params = this.parseUrl(action[CALL_API]);
                    return { ...action[CALL_API], params };
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
export const loginApi = (user, password) => ({
    [CALL_API]: Object.assign(defaultPostReq, {
        endpoint: `${baseUrl}login`,
        types: LoginActions.getNames(),
        body: JSON.stringify({
            user, password
        })
    })
});

export const RegisterActions = new ApiActionGenerator("Register");
export const registerApi = (user, password) => ({
    [CALL_API]: Object.assign(defaultPostReq, {
        endpoint: `${baseUrl}register`,
        types: LoginActions.getNames(),
        body: JSON.stringify({
            user, password
        })
    })
});
