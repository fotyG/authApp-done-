import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const cookies = new Cookies();

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://localhost:3000/login",
            data: {
                email,
                password
            },
        };
        axios(configuration)
        .then((result) => {
            cookies.set("TOKEN", result.data.token, {
                path: "/", // This makes it available in all pages
            })
            setLogin(true)
            navigate('/auth');
        })
        .catch((error) => {error = new Error()})
    }
    
    return (
        <>
            <h2>Login</h2>
            <Form className="mt-3">
                {/* email */}
                <Form.Group controlId="formBasicEmail2">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        name="email"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>

                {/* password */}
                <Form.Group className="mt-3" controlId="formBasicPassword2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>

                {/* submit button */}
                <Button
                    className="mt-3"
                    variant="primary"
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </Button>
                {login ? (
                    <p className="text-success">
                        You Are Logged in Successfully
                    </p>
                ) : (
                    <p className="text-danger">You Are Not Logged in</p>
                )}
            </Form>
        </>
    );
};
export default Login;
