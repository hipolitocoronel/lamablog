import postService from "../services/blog";
import toast from "react-hot-toast";

const postReducer = (state = [], action) => {
    switch (action.type) {
        case "NEW_POST":
            return [...state, action.data];
        case "UPDATE_POST":
            return state.map((post) =>
                post.id != action.data.id ? post : action.data
            );
        case "INIT_POSTS":
            return action.data;
        default:
            return state;
    }
};

//CONTROLADORES DE ACCION
export const createPost = (content) => {
    return async (dispatch) => {
        const newPost = await postService.create(content);
        dispatch({
            type: "NEW_POST",
            data: newPost,
        });
    };
};

export const updatePost = (content) => {
    return async (dispatch) => {
        const updatedPost = await postService.update(content);
        dispatch({
            type: "UPDATE_POST",
            data: updatedPost,
        });
    };
};

export const initializePosts = () => {
    return async (dispatch) => {
        toast
            .promise(postService.getPosts(), {
                loading: "Cargando blogs",
                success: "Blogs cargados correctamente",
                error: "Hubo un error con el servidor",
            })
            .then((posts) =>
                dispatch({
                    type: "INIT_POSTS",
                    data: posts,
                })
            );

        /*
        const posts = await postService.getPosts();
        dispatch({
            type: "INIT_POSTS",
            data: posts,
        });*/
    };
};

export default postReducer;
