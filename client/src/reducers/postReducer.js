import postService from "../services/post";
import toast from "react-hot-toast";

const postReducer = (state = [], action) => {
    switch (action.type) {
        case "NEW_POST":
            return [...state, action.data];
        case "UPDATE_POST":
            return state.map((post) =>
                post.id !== action.data.id ? post : action.data
            );
        case "REMOVE_POST":
            return state.filter((post) => post.id != action.data.id);
        case "INIT_POSTS":
            return action.data;
        default:
            return state;
    }
};

//CONTROLADORES DE ACCION
export const createPost = (content) => {
    return async (dispatch) => {
        const img = await postService.createImg(content.file);
        content = { ...content, file: img };
        toast
            .promise(postService.create(content), {
                loading: "Guardando blog",
                success: "Blog guardado correctamente",
                error: "Hubo un error con el servidor",
            })
            .then((newPost) =>
                dispatch({
                    type: "NEW_POST",
                    data: newPost,
                })
            );
    };
};

export const updatePost = (content) => {
    return async (dispatch) => {
        if (content.file) {
            const img = await postService.createImg(content.file);
            content = { ...content, file: img };
        }
        toast
            .promise(postService.update(content), {
                loading: "Acualizando blog",
                success: "Blog actualizado correctamente",
                error: "Hubo un error con el servidor",
            })
            .then((updatedPost) =>
                dispatch({
                    type: "UPDATE_POST",
                    data: updatedPost,
                })
            );

        /*
                
            );
        /*
        const updatedPost = await postService.update(content);
        dispatch({
            type: "UPDATE_POST",
            data: updatedPost,
        });*/
    };
};

export const removePost = (content) => {
    console.log(content);
    return async (dispatch) => {
        toast
            .promise(postService.remove(content.id), {
                loading: "Borrando blog",
                success: "Blogs eliminado correctamente",
                error: "Hubo un error con el servidor",
            })
            .then(() =>
                dispatch({
                    type: "REMOVE_POST",
                    data: content,
                })
            );
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
