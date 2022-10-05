import { Link, useLocation } from "react-router-dom";
import Editar from "../images/edit.png";
import Eliminar from "../images/delete.png";
import Perfil from "../images/perfil.jpg";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import Comment from "../components/Comment";
import { useContext } from "react";
import DataContext from "../context/dataContex";
import dayjs from "dayjs";

function Single() {
    const postId = useLocation().pathname.split("/")[2];

    const { currentUser } = useContext(DataContext);

    const post = useSelector((state) => {
        const { posts } = state;
        return posts.find((post) => post.id === Number(postId));
    });

    const formatDate = () => {
        const postDate = dayjs(post.date);
        const today = dayjs(new Date());
        const formats = [
            ["seconds", 60, " segundos"],
            ["hours", 60, " horas"],
            ["days", 7, " días"],
        ];

        let diff = today.diff(postDate, "day");
        if (diff > 7) {
            return "hola";
        } else {
            for (const format of formats) {
                diff = today.diff(postDate, format[0]);
                if (diff <= format[1]) {
                    return `Publicado hace ${diff} ${format[2]}`;
                }
            }
        }
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
                    {post && currentUser.username === post.user.username && (
                        <div className="action">
                            <Link
                                to={`/write?id=${post && post.id}`}
                                state={post}
                            >
                                <img src={Editar} alt="logo editar" />
                            </Link>
                            <img src={Eliminar} alt="logo eliminar" />
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

            {post && (
                <Sidebar
                    post={{ id: post?.id, cat: post.category.id }}
                />
            )}
        </div>
    );
}

export default Single;
