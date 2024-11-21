import { Col, Container } from 'react-bootstrap';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
const Footer = () => (
  <footer className="mt-auto py-3 bg-dark">
    <Container>
      <Col className="text-center">
        ilab located across from Kuykendall
        <br />
        University of Hawaii
        <br />
        Honolulu, HI 96822
        <br />
      </Col>
    </Container>
  </footer>
);

export default Footer;
