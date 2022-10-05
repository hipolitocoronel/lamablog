import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation } from "react-router-dom";

function Write() {
    const state = useLocation().state;

    const [desc, setDesc] = useState(state?.description || "");
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm();

    const handleBlog = async (data, e) => {
        if (desc.length === 0) return setError("La descripcion es requerida");
        data.desc = desc;
        data.file = data.file[0];
        console.log();

        /*
        toast
            .promise(postService.create(data), {
                loading: "Guardando blog",
                success: "Blog agregado correctamente",
                error: "Verifique los datos ingresados",
            })
            .then(() => {
                //e.target.reset();
                setError("");
            });*/
    };

    console.log(state);

    return (
        <>
            <div className="container-write">
                <p className="error">
                    {errors.title?.message ||
                        errors.cat?.message ||
                        errors.desc?.message ||
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
                                {...register("file")}
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

                            <div className="cat">
                                <input
                                    type="radio"
                                    name="cat"
                                    value="1"
                                    {...register("cat", {
                                        required: "Seleccione una categoria",
                                        value: state?.category.id,
                                    })}
                                    onChange={(e) =>
                                        setValue("cat", "1", {
                                            shouldValidate: true,
                                        })
                                    }
                                    checked={getValues("cat") === "1"}
                                />
                                <label htmlFor="art">Arte</label>
                            </div>
                            <div className="cat">
                                <input
                                    type="radio"
                                    name="cat"
                                    value="2"
                                    {...register("cat", {
                                        required: "Seleccione una categoria",
                                        value: state?.category.id,
                                    })}
                                    onChange={(e) =>
                                        setValue("cat", "1", {
                                            shouldValidate: true,
                                        })
                                    }
                                    checked={getValues("cat") === "1"}
                                />
                                <label htmlFor="science">Ciencia</label>
                            </div>
                            <div className="cat">
                                <input
                                    type="radio"
                                    name="cat"
                                    value="3"
                                    {...register("cat", {
                                        required: "Seleccione una categoria",
                                        value: state?.category.id,
                                    })}
                                    onChange={(e) =>
                                        setValue("cat", "1", {
                                            shouldValidate: true,
                                        })
                                    }
                                    checked={getValues("cat") === "1"}
                                />
                                <label htmlFor="technology">Tecnologia</label>
                            </div>
                            <div className="cat">
                                <input
                                    type="radio"
                                    name="cat"
                                    value="4"
                                    {...register("cat", {
                                        required: "Seleccione una categoria",
                                        value: state?.category.id,
                                    })}
                                    onChange={(e) =>
                                        setValue("cat", "4", {
                                            shouldValidate: true,
                                        })
                                    }
                                    checked={getValues("cat") === "4"}
                                />
                                <label htmlFor="design">Diseño</label>
                            </div>
                            <div className="cat">
                                <input
                                    type="radio"
                                    name="cat"
                                    {...register("cat", {
                                        required: "Seleccione una categoria",
                                        value: state?.category.id,
                                    })}
                                    onChange={(e) =>
                                        setValue("cat", "5", {
                                            shouldValidate: true,
                                        })
                                    }
                                    checked={getValues("cat") === "5"}
                                />
                                <label htmlFor="cinema">Cine</label>
                            </div>
                            <div className="cat">
                                <input
                                    type="radio"
                                    name="cat"
                                    value="6"
                                    {...register("cat", {
                                        required: "Seleccione una categoria",
                                        value: state?.category.id,
                                    })}
                                    onChange={(e) =>
                                        setValue("cat", "6", {
                                            shouldValidate: true,
                                        })
                                    }
                                    checked={getValues("cat") === "6"}
                                />
                                <label htmlFor="food">Comida</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Write;
