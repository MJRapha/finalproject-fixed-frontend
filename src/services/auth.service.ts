import axios from "axios";
//import jwtDecode from 'jwt-decode';

const baseUrl = "http://localhost:3001/api/authJayMoji";

const register = (username: string, email: string, password: string) => {
    return axios.post(baseUrl + "/signup", { username, email, password });
};

const login = (email: string, password: string) => {
    return axios.post(baseUrl + "/signin", { email, password }).then((res) => {
        const token = res.data.accessToken;
        const email = res.data.email;
        const username = res.data.username;
        const role = res.data.role;
        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify({ email, username, token, role }));
        }
        return res.data;
    });
};

const logout = () => {
    localStorage.removeItem("token");
};

/* const getCurrentUser = () => {
    try {
        const jwt = localStorage.getItem("token");
        if (jwt) {
            const data = jwtDecode(jwt);
            return localStorage.setItem('user', JSON.stringify(data));
        }
        return null;
    } catch (error) {
        console.log('error', error);

    }
};
 */
export { register, login, logout };

const authService = { register, login, logout };
export default authService;