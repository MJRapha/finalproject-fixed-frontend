import { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { RegisterFormType } from "../../@types/@types";
import AuthContext from "../../context/AuthContext";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import authService from "../../services/auth.service";
import css from "./Register.module.scss"

const Register = () => {
    const nav = useNavigate();
    //prevent double submit:
    const [isLoading, setIsLoading] = useState(false);
    const [errMessage, setErrMessage] = useState<string | undefined>(undefined);
    const { isLoggedIn } = useContext(AuthContext);

    const initialValues = {
        username: "",
        email: "",
        password: "",
    };

    //Validations:
    const validationSchema = Yup.object({
        username: Yup.string().min(3, "Name is too short").required(),
        email: Yup.string().email("Must be a valid email").required(),
        password: Yup.string().min(3, "Password is too short").required(),
    });

    //if all is valid=> this method is invoked
    const handleRegister = (formValues: RegisterFormType) => {
        setIsLoading(true);

        const { username, email, password } = formValues;
        authService
            .register(username, email, password)
            .then((res) => {
                console.log(res.data);
                //swal
                nav("/login");
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
            <div className="container mt-3">
                <h2 className="mb-3" style={{ textDecoration: "underline", textAlign: "center" }}>Register</h2>
                <div>
                    {errMessage && <div>${errMessage}</div>}
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleRegister}
                        validationSchema={validationSchema}
                    >
                        <Form className="w-75 mx-auto">
                            <div>
                                <label htmlFor="username" className="form-label">
                                    User Name:
                                </label>
                                <Field
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    id="username"
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="alert alert-danger"
                                />
                            </div>
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
                                    Register
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default Register;