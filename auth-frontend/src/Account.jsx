import { Container, Col, Row } from "react-bootstrap";
import Register from "./Register";
import Login from "./Login";

const Account = () => {
    return (
        <Container>
            <Row>
                <Col xs={23} sm={12} md={6} lg={6}>
                    <Register />
                </Col>
                <Col xs={23} sm={12} md={6} lg={6}>
                    <Login />
                </Col>
            </Row>
        </Container>
    );
};
export default Account;
