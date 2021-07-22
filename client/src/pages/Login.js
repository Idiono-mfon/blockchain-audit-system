import React from 'react';
import { Container, Row, Col, Button, Form, } from 'react-bootstrap';
import {useHistory} from "react-router-dom";

function LoginPage() {
  const history = useHistory();

  return (
    <Container fluid>
      <Row noGutters>
        <Col sm={7}>
          <img
            width={"100%"}
            height={600}
            className="mr-3"
            src="./assets/images/image1.jpg"
            alt=""
          />
        </Col>
        <Col sm={5}>
          <div className="login-wrapper">
            <div className="login-header-image"></div>
            <div className="login-form">
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="email" size="lg" className="login-input ft-2" placeholder="EMAIL" />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control type="password"  size="lg" className="login-input ft-2" placeholder="PASSWORD" />
                <div className="align-check">
                  <Form.Check type="checkbox" className="ft-2 white center" label="Check me out" />
                  <span className="ft-2 white">Forgot Password</span>
                  </div>
              </Form.Group>
             
              <Button variant="primary" onClick={() => {
          history.push("/home");
        }}  className="login-button"  block>
                Submit
              </Button>
            </Form>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage; //
