import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Write from "./pages/Write";
import Layout from "./components/Layout";
import Single from "./pages/Single";
import { DataContexProvider } from "./context/dataContex";
import { useEffect } from "react";
import { initializePosts } from "./reducers/postReducer";
import { useDispatch } from "react-redux";
import { Toaster } from "react-hot-toast";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/post/:id",
                element: <Single />,
            },
            {
                path: "/write",
                element: <Write />,
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initializePosts());
    }, []);

    return (
        <div className="app">
            <Toaster />
            <div className="container">
                <DataContexProvider>
                    <RouterProvider router={router} />
                </DataContexProvider>
            </div>
        </div>
    );
}

export default App;
