import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container, Row, Col } from 'react-bootstrap';

import PopularGames from '@/components/PopularCard';

const Popular = async () => {
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
            <PopularGames />
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Popular;
