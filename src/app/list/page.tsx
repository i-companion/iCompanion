import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import GameItem from '@/components/GameItem';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

/** Render a list of stuff for the logged in user. */
const ListGames = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  const owner = (session && session.user && session.user.email) || '';
  const game = await prisma.game.findMany({
    where: { },
  });
  // console.log(stuff);
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <h1>Games</h1>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Actions</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {game.map((item) => (
                  <GameItem key={item.id} {...item} />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListGames;
