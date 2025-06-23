import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="py-5">
      <h1 className="text-center mb-4 text-primary">
        Welcome to DUYHOANGTOO App
      </h1>
      <Row className="justify-content-center">
        <Col md={6} lg={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/300x200"
              alt="Sample Image"
            />
            <Card.Body>
              <Card.Title>Featured Section</Card.Title>
              <Card.Text>
                This is a sample card to showcase some exciting content or
                features of the application. Explore more below!
              </Card.Text>
              <Button variant="primary" href="/users">
                Explore Now
              </Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Img
              variant="top"
              src="https://via.placeholder.com/300x200"
              alt="Sample Image"
            />
            <Card.Body>
              <Card.Title>Latest Updates</Card.Title>
              <Card.Text>
                Stay updated with the latest news and features. Check out the
                manage users section for more details!
              </Card.Text>
              <Button variant="success" href="/users">
                View Updates
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
