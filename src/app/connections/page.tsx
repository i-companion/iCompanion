import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container, Row, Col } from 'react-bootstrap';

const Connections = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <h1>Connections page is currently being cooked.</h1>
          </Col>
        </Row>
      </Container>

    </main>
  );
};

export default Connections;
