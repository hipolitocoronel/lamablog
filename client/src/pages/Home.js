import { Link, useLocation } from "react-router-dom";
import MeGusta from "../images/megusta.png";
import Comentario from "../images/comentario.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { catChange } from "../reducers/catReducer";

function Home() {
    const cat = useLocation().search.substring(5);
    const dispatch = useDispatch();

    const posts = useSelector((state) => {
        if (state.cat === "ALL") {
            return state.posts;
        } else {
            return state.posts.filter((post) => post.descripcion === cat);
        }
    });

    useEffect(() => {
        cat ? dispatch(catChange(cat)) : dispatch(catChange("ALL"));
    }, [cat]);

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent;
    };

    return (
        <div className="home">
            <div className="posts">
                {posts?.map((post) => (
                    <div key={post.id} className="post">
                        <div className="image">
                            <img
                                src={`http://localhost:3001/uploads/${post.image}`}
                                alt="imagen principal del post"
                            />
                        </div>
                        <div className="content">
                            <Link
                                to={"/post/" + post.id}
                                className="link title"
                            >
                                {post.title}
                            </Link>
                            <p>{getText(post.description).slice(0, 320) + "...."}</p>
                            <div className="content-footer">
                                <Link
                                    to={`/post/${post.id}`}
                                    className="button link"
                                >
                                    Leer más
                                </Link>
                                <div className="actions">
                                    <div className="statics">
                                        <img src={MeGusta} />
                                        <p>1</p>
                                    </div>
                                    <div className="statics">
                                        <img src={Comentario} />
                                        <p>0</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
