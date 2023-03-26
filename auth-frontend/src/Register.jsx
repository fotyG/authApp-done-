import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [register, setRegister] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const configuration = {
            method: "post",
            url: "http://localhost:3000/register",
            data: {
                email,
                password,
            },
        };
        axios(configuration)
        .then((result) => {setRegister(true)})
        .catch((error) => {error = new Error()})
    }
  return (
      <>
          <h2>Register</h2>
          <Form className="mt-3">
              {/* email */}
              <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                      name="email"
                      value={email}
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </Form.Group>

              {/* password */}
              <Form.Group className="mt-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                      name="password"
                      value={password}
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </Form.Group>

              {/* submit button */}
              <Button className="mt-3" variant="primary" type="submit"
              onClick={(e)=> handleSubmit(e)}
              >
                  Submit
              </Button>
              {register? (
                <p className="text-success">You are registered successfully</p>
              ) : (
                <p className="text-danger">You are not registered</p>
              )}
          </Form>
      </>
  );
}
export default Register