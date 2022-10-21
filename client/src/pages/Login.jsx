import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../services/auth";
import toast, { Toaster } from "react-hot-toast";
import DataContext from "../context/dataContex";

function Login() {
    const [error, setError] = useState();
    const navigate = useNavigate();
    const { login } = useContext(DataContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = (data, e) => {
        toast
            .promise(authService.login(data), {
                loading: "Ingresando...",
                success: "Ingreso exitoso",
                error: "Verifique sus datos",
            })
            .then((returnedUser) => {
                console.log(returnedUser);
                login(returnedUser);
                e.target.reset();
                setError("");
                navigate("/");
            })
            .catch((error) => setError(error.response.data));
    };

    return (
        <div className="auth">
            <Toaster />
            <h1>Ingresar</h1>
            <form onSubmit={handleSubmit(handleLogin)}>
                <input
                    type="text"
                    placeholder="Nombre de Usuario"
                    {...register("username", {
                        required: "El nombre de usuario es requerido",
                    })}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    {...register("password", {
                        required: "La contraseña es requerida",
                    })}
                />
                <button type="submit">Ingresar</button>
                {
                    <p>
                        {errors.username?.message ||
                            errors.password?.message ||
                            error}
                    </p>
                }
                <span>
                    No tienes una cuenta? <Link to="/register">Registrar</Link>
                </span>
            </form>
        </div>
    );
}

export default Login;
