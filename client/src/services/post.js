import axios from "axios";
const baseUrl = "http://localhost:3001/api/posts";

const getToken = () => {
    let token = JSON.parse(window.localStorage.getItem("userLogged")).token;
    return (token = `Bearer ${token}`);
};

const getPosts = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const getOnePost = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`);
    console.log(res);
    return res.data;
};

const create = async (blog) => {
    const config = {
        headers: {
            Authorization: getToken(),
        },
    };
    const res = await axios.post(baseUrl, blog, config);
    return res.data;
};

const update = async (blog) => {
    const config = {
        headers: {
            Authorization: getToken(),
        },
    };

    const res = await axios.put(baseUrl, blog, config);
    return res.data;
};

const remove = async (blog) => {
    const config = {
        headers: {
            Authorization: getToken(),
        },
    };

    console.log(config);
    const res = await axios.delete(baseUrl, blog, config);
    return res.data;
};

const createImg = async (file) => {
    const data = new FormData();
    data.append("file", file);

    const res = await axios.post(`${baseUrl}/upload`, data);
    return res.data;
};

export default { create, getPosts, getOnePost, update, remove ,createImg };