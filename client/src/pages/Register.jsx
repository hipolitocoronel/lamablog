import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth";
import toast, { Toaster } from "react-hot-toast";

function Register() {
    const [error, setError] = useState();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRegister = async (data, e) => {
        toast
            .promise(authService.register(data), {
                loading: "Registrando...",
                success: "Registro exitoso, por favor inicie sesión",
                error: "Hubo un problema con el servidor",
            })
            .then(() => {
                e.target.reset();
                setError("");
                navigate("/login");
            })
            .catch((e) => console.error(e));
    };
    return (
        <div className="auth">
            <Toaster />
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit(handleRegister)}>
                <input
                    type="text"
                    placeholder="Nombre Completo"
                    {...register("name", {
                        required: "El nombre es requerido",
                    })}
                />
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    {...register("username", {
                        required: "El nombre de usuario es requerido",
                    })}
                />
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    {...register("email", {
                        required: "El correo es requerido",
                    })}
                />
                <input type="file" name="file" id="file"/>
                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", {
                        required: "La contraseña es requerida",
                    })}
                />
                {
                    <p>
                        {errors.name?.message ||
                            errors.username?.message ||
                            errors.email?.message ||
                            errors.password?.message ||
                            error}
                    </p>
                }
                <button type="submit">Registrar</button>
                <span>
                    Ya tienes una cuenta? <Link to="/login">Ingresar</Link>
                </span>
            </form>
        </div>
    );
}

export default Register;
