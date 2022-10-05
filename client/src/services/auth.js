import axios from "axios";

const login = async (user) => {
    const res = await axios.post("/login", user);
    return res.data;
};

const register = async (user) => {
    const res = await axios.post("/register/", user);
    return res.data;
};

export default { login, register };
