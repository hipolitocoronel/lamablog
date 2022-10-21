import { Link, useLocation, useNavigate } from "react-router-dom";
import Editar from "../images/edit.png";
import Eliminar from "../images/delete.png";
import Perfil from "../images/perfil.jpg";
import Sidebar from "../components/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../components/Comment";
import { useContext } from "react";
import DataContext from "../context/dataContex";
import dayjs from "dayjs";
import { removePost } from "../reducers/postReducer";

function Single() {
    const postId = useLocation().pathname.split("/")[2];
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useContext(DataContext);

    const post = useSelector((state) => {
        const { posts } = state;
        return posts.find((post) => post.id === Number(postId));
    });

    const formatDate = () => {
        console.log(post);
        const postDate = dayjs(post.updatedAt || post.createdAt);
        console.log("ahora: ", postDate);
        const today = dayjs(new Date());
        const formats = [
            ["seconds", 60, " segundos"],
            ["minutes", 60, " minutos"],
            ["hours", 24, " horas"],
            ["days", 7, " días"],
        ];

        let diff = today.diff(postDate, "day");
        if (diff > 7) {
            return `Publicado el ${dayjs(postDate).format("DD/MM/YY")}`;
        } else {
            for (const format of formats) {
                diff = today.diff(postDate, format[0]);
                console.log(diff);
                if (diff <= format[1]) {
                    return `Publicado hace ${diff} ${format[2]}`;
                }
            }
        }
    };

    const deletePost = () => {
        dispatch(removePost(post));
        navigate("/");
    };

    return (
        <div className="single">
            <div className="content">
                {post && post.image && (
                    <img
                        className="portada"
                        src={`http://localhost:3001/uploads/${post.image}`}
                        alt="portada de blog"
                    />
                )}
                <div className="user">
                    <img src={Perfil} alt="foto del usuario" />
                    <div className="info">
                        <span>
                            <b>{post && post.user.name}</b>
                        </span>
                        <p>{post && formatDate()}</p>
                    </div>
                    {post && currentUser?.username === post.user.username && (
                        <div className="action">
                            <Link
                                to={`/write?id=${post && post.id}`}
                                state={post}
                            >
                                <img src={Editar} alt="logo editar" />
                            </Link>
                            <img
                                src={Eliminar}
                                alt="logo eliminar"
                                onClick={deletePost}
                            />
                        </div>
                    )}
                </div>
                <h1>{post && post.title}</h1>
                {post && (
                    <div
                        dangerouslySetInnerHTML={{ __html: post.description }}
                    ></div>
                )}
                <Comment />
            </div>

            {post && <Sidebar post={{ id: post?.id, cat: post.category.id }} />}
        </div>
    );
}

export default Single;
