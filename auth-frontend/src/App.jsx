import "./App.css";
import Account from "./Account";
import { Routes, Route, Link, Navigate, useNavigate } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";
import FreeComponent from "./FreeComponent";
import AuthComponent from "./AuthComponent";
import Protected from "./Protected";
import Cookies from "universal-cookie";
const cookies = new Cookies();

function App() {
  return (
    <Container>
      <Row>
        <Col className="text-center">
          <h1>React Authentication Tutorial</h1>

          <section id="navigation">
            <Link className="a" to="/">
              Home
            </Link>
            <Link className="a" to="/free">
              Free Component
            </Link>
            <Link className="a" to="/auth">
              Auth Component
            </Link>
          </section>
        </Col>
      </Row>

      <Routes>
        <Route path="/" element={<Account />} />
        <Route path="/free" element={<FreeComponent />} />
        <Route
          path="/auth"
          element={
          <Protected>
            <AuthComponent />
          </Protected>
          }
        />
      </Routes>
    </Container>
  );
}

export default App;
