import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container, Row, Col, Image } from 'react-bootstrap';

const About = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );

  return (
    <main>
      <Container id="list" fluid className="py-3 mx-4 mt-4 mb-5" style={{ backgroundColor: "#c3e0cb" }}>
        <Row>
          <Col className="text-center">
            <h1>About iLab</h1>
            <hr />
            <br />
          </Col>
        </Row>

          <Container className="justify-content-center">
            <Row>
              <Col>
                <Container className="justify-content-center text-center">
                  <h3 className="text-center">Location</h3>
                  <Image className="mt-3" src="/iLab-map.png" style={{ width: "100%"}} />
                  <h5 className="mt-3 me-3 text-center">iLab is located in the heart of UH Manoa's campus. It can be found between the Recreation Center and Bilger Hall.</h5>
                </Container>
              </Col>
              <Col>
                <Container className="justify-content-center text-center">
                  <h3 className="text-center">Times</h3>
                  <h5 className="text-center mt-3">
                    iLab is open Monday - Friday from 10am - 4pm.
                    <br />On Tuesdays it closes at 3pm.
                  </h5>
                  <Image className="mt-3" src="/iLab-exterior.png" style={{ width: "75%"}} />
                </Container>
              </Col>
            </Row>
          </Container>


      </Container>
    </main>
  );
};

export default About;
