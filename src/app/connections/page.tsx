import { getServerSession } from 'next-auth';
import authOptions from '@/lib/authOptions';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { Container, Row, Col } from 'react-bootstrap';
import ConnectionsCard from '@/components/ConnectionsCard';

const Connections = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
    } | null,
  );
  type Person = {
    name: string;
    email: string;
    discord: string;
  }
  const person: Person[] = [
      {
          name: 'Person1', email: 'Person1@foo.com', discord: 'Person#1234'
      },
      {
          name: 'Person4', email: 'Person4@foo.com', discord: 'Person#4321'
      }
  ];
  return (
    <main>
      <Container id="list" fluid className="py-3 justify-content-center">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center ">Connections</h2>
              <Row xs={1} md={2} lg={3} className="g-4 mt-3 justify-content-center">
                {person.map((person) => (
                  <ConnectionsCard person={person} />
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default Connections;
