import axios from "axios";
let token = null;

const setToken = (access) => (token = `bearer ${token}`);

const getPosts = async () => {
    const res = await axios.get("/posts");
    return res.data;
};

const getOnePost = async (id) => {
    const res = await axios.get(`/posts/${id}`);
    console.log(res);
    return res.data;
};

const create = async (blog) => {
    const config = {
        headers: { Autorization: token, "Content-Type": "multipart/form-data" },
    };
    const res = await axios.post("/posts", blog, config);
    return res.data;
};

export default { create, getPosts, getOnePost, setToken };
