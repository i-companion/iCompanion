import { Col, Container, Row } from 'react-bootstrap';

/** The Home page. */
const Home = () => (
  <main>
    <Container id="landing-page" fluid className="py-3">
      <Row className="align-middle text-center">
        <Col xs={4}>
        <h1>Find other players to connect with!</h1>
        </Col>
        <Col xs={8} className="d-flex flex-column justify-content-center">
          <h1>Welcome to iCompanion!</h1>
          <p></p>
        </Col>
      </Row>
    </Container>
  </main>
);

export default Home;
