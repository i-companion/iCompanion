import { getServerSession } from 'next-auth';
import { Col, Container, Row } from 'react-bootstrap';
import ContactCard from '@/components/ContactCard';
import { Contact } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { loggedInProtectedPage } from '@/lib/page-protection';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

const ListPage = async () => {
  // Protect the page, only logged in users can access it.
  const session = await getServerSession(authOptions);
  loggedInProtectedPage(
    session as {
      user: { email: string; id: string; randomKey: string };
      // eslint-disable-next-line @typescript-eslint/comma-dangle
    } | null,
  );

  const owner = session?.user!.email ? session.user.email : '';

  const contacts: Contact[] = await prisma.contact.findMany({
    where: {
      owner,
    },
  });

  const notes = await prisma.note.findMany({
    where: {
      owner,
    },
  });
  return (
    <main>
      <Container id="list" fluid className="py-3">
        <Container>
          <Row>
            <Col>
              <h2 className="text-center">List Contacts</h2>
              <Row xs={1} md={2} lg={3} className="g-4 mt-3">
                {contacts.map((contact) => (
                  <Col key={contact.firstName + contact.lastName}>
                    <ContactCard contact={contact} notes={notes.filter((note: any) => note.contactId === contact.id)} />
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </Container>
      </Container>
    </main>
  );
};

export default ListPage;
