
const key = "user";
const auth = {
    valid: () => {
        return !!localStorage.getItem(key);
    },
    set: (user) => {
        localStorage.setItem(key, user);
    },
    clear: () => {
        localStorage.setItem(key, null);
    },
    getUser: () => {
        return localStorage.getItem(key);
    }
};

export default auth;
