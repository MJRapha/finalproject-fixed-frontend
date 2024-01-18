import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { LoginFormType } from "../../@types/@types";
import AuthContext from "../../context/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import authService from "../../services/auth.service";
import css from "./Login.module.scss"

const Login = () => {
    const nav = useNavigate();
    //prevent double submit:
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const { isLoggedIn, login } = useContext(AuthContext);

    const initialValues = {
        email: "",
        password: "",
    };

    //Validations:
    const validationSchema = Yup.object({
        email: Yup.string().email("Must be a valid email").required(),
        password: Yup.string().min(3, "Password is too short").required(),
    });

    //if all is valid=> this method is invoked
    const handleLogin = (formValues: LoginFormType) => {
        setIsLoading(true);

        const { email, password } = formValues;
        authService
            .login(email, password)
            .then((res) => {
                const token = res.accessToken;
                const email = res.email;
                const username = res.username;
                const role = res.role;
                //update the context...
                login(username, email, token, role);
                nav("/");
            })
            .catch((e) => {
                console.log(e);
                alert(e); //swal //modal
                setErrMessage(JSON.stringify(e.response.data));
            })
            .finally(() => {
                setIsLoading(false);
            });
    };
    if (isLoggedIn) {
        return <Navigate to="/" />;
    }
    return (
        <div className={css.myComponent}>
            <div className="container mt-5">
                <h2 className="mb-3" style={{ textDecoration: "underline", textAlign: "center" }}>Login</h2>
                <div>
                    {errMessage && <div>${errMessage}</div>}
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleLogin}
                        validationSchema={validationSchema}
                    >
                        <Form className="w-75 mx-auto">
                            <div>
                                <label htmlFor="email" className="form-label">
                                    Email:
                                </label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="form-control"
                                    id="email"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="form-label">
                                    Password:
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="form-control"
                                    id="password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="alert alert-danger"
                                />
                                <h6 className={css.messageAboutPassword}>The password must to be with big letters, small letters, symbols, numbers and at list 8 until 30 letters</h6>
                            </div>
                            <div className="col-12 mt-2">
                                <button
                                    disabled={isLoading}
                                    className={css.buttonSub}
                                    type="submit"
                                >
                                    Login
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Login