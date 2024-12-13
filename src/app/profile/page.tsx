import { getServerSession } from 'next-auth';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import authOptions from '@/lib/authOptions';
import { Profile } from '@prisma/client';
import ProfileCard from '@/components/ProfileCard';

/** Render a list of stuff for the logged in user. */
const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );
  console.log(`Server session: ${JSON.stringify(session, null, 2)}`);

  /*
  const profiles: Profile[] = [{
    firstName: 'John',
    lastName: 'Doe',
    discord: 'john1234',
    email: 'johndoe@gmail.com',
    image: 'https://github.com/philipmjohnson.png',
    interests: ['valorant', 'league-of-legends'],
    description: 'a gamer',
  }];
  */
  
  if (!session) {
    return {
      redirect: {
        destination: '/auth/signin',
        permanent: false,
      },
    };
  }
  const loggedInUserID = parseInt(session?.user.id, 10);
  const profile =   await prisma.profile.findUnique({
    where: {
      userId: loggedInUserID
    }
  })
  

  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Row>
          <Col>
            <Row className="g-4 ps-5 pe-5">
                <ProfileCard profile={profile} />
            </Row>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default ListPage;
