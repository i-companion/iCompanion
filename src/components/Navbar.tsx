'use client';

import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Container, Nav, Navbar, NavDropdown, Image } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';

const NavBar: React.FC = () => {
  const { data: session } = useSession();
  const currentUser = session?.user?.email;
  const pathName = usePathname();

  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <Image src="uhm-logo.png" style={{ width: '50px' }} alt="University of Hawaii at Manoa logo"></Image>
        </Navbar.Brand>
        <Navbar.Brand href="/">iCompanion</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto justify-content-start">
            <Nav.Link href="/connections" active={pathName === '/connections'}>
              Connections
            </Nav.Link>
            <Nav.Link href="/schedule" active={pathName === '/schedule'}>
              Schedule
            </Nav.Link>
            <NavDropdown id="games-dropdown" title="Games">
              <NavDropdown.Item href="/popular-games">Popular Games</NavDropdown.Item>
              <NavDropdown.Item href="/available" key="available" active={pathName === '/available'}>Available Games at the iLab</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {session ? (
              <>
                <Nav.Link href="/profile" key="profile" active={pathName === '/profile'}>
                  Profile
                </Nav.Link>
                <NavDropdown title={currentUser}>
                  <NavDropdown.Item href="/api/auth/signout">
                    <BoxArrowRight /> Sign Out
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/auth/signin">
                  <PersonFill /> Sign in
                </Nav.Link>
                <Nav.Link href="/auth/signup">
                  <PersonPlusFill /> Sign up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
