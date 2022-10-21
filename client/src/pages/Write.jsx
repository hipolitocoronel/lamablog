import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePost, createPost } from "../reducers/postReducer";

function Write() {
    const state = useLocation().state;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [desc, setDesc] = useState(state?.description || "");
    const [cat, setCat] = useState(state?.category.id);
    const [error, setError] = useState("");

    const categories = [
        "Arte",
        "Ciencia",
        "Tecnología",
        "Diseño",
        "Cine",
        "Comida",
    ];

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleBlog = async (data) => {
        if (desc.length === 0) return setError("La descripcion es requerida");
        data = { ...data, desc };
        data = { ...data, file: data.file[0] };

        if (state) {
            data = { ...data, id: state.id };
            dispatch(updatePost(data));
            return navigate("/");
        }

        dispatch(createPost(data));
    };

    return (
        <>
            <div className="container-write">
                <p className="error">
                    {errors.title?.message ||
                        errors.cat?.message ||
                        errors.desc?.message ||
                        errors.file?.message ||
                        error}
                </p>
                <div className="addPost">
                    <div className="content">
                        <input
                            type="text"
                            placeholder="Titulo"
                            {...register("title", {
                                required: "El título es requerido",
                            })}
                            defaultValue={state?.title}
                        />
                        <div className="editorContainer">
                            <ReactQuill
                                theme="snow"
                                placeholder="Descripción"
                                value={desc}
                                onChange={setDesc}
                            />
                        </div>
                    </div>
                    <div className="menu">
                        <div className="item">
                            <h2>Publicar</h2>
                            <span>
                                <b>Estado: </b> Borrador
                            </span>
                            <span>
                                <b>Visibilidad: </b> Publico
                            </span>
                            <input
                                style={{ display: "none" }}
                                type="file"
                                id="file"
                                {...register("file", {
                                    required: {
                                        value: !state,
                                        message: "Seleccione una imagen",
                                    },
                                })}
                            />
                            <label className="file" htmlFor="file">
                                Subir imagen
                            </label>
                            <div className="buttons">
                                <button onClick={handleSubmit(handleBlog)}>
                                    Guardar borrador
                                </button>
                                <button>Actualizar</button>
                            </div>
                        </div>
                        <div className="item">
                            <h2>Categoria</h2>

                            {categories.map((description, index) => (
                                <div key={index} className="cat">
                                    <input
                                        type="radio"
                                        name="cat"
                                        value={index + 1}
                                        checked={index + 1 == cat}
                                        {...register("cat", {
                                            required:
                                                "Seleccione una categoria",
                                            onChange: (e) =>
                                                setCat(e.target.value),
                                        })}
                                    />
                                    <label htmlFor={index + 1}>
                                        {description}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Write;
