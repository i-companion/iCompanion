import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container, Row, Col, Card } from 'react-bootstrap';
import AvailableCard from '@/components/AvailableCard';

const Available = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <Row className="g-4 ps-5 pe-5">
              <AvailableCard />
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Available;
