import {Col, Container, Row} from "react-bootstrap";
import {Route, Switch} from "react-router-dom";
import React from "react";
import {routes} from "../routes";


export default function MainContent() {
  return (
    <Container>
      <Row>
        <Col md={{span: 6, offset: 3}} style={{padding: '40px 0 0 0'}}>
          <Switch>
            {routes.map((route, index) => (
              // Render more <Route>s with the same paths as
              // above, but different components this time.
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.child/>}
              />
            ))}
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}