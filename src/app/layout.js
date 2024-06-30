import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.min.css";
import BootstrapClient from "@/components/BootstrapClient.js";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavLink, Nav, NavDropdown, Container } from "react-bootstrap";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WinTH03's TTRPG Tools",
  description: "Tools for playing tabletop role-playing games.",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>
        <Navbar>
          <Container>
            <NavbarBrand href="/">WinTH03's TTRPG Tools</NavbarBrand>
            <NavbarToggle aria-controls="main-navbar" />
            <NavbarCollapse id="main-navbar">
              <Nav>
                <NavLink href="/">Home</NavLink>
                <NavDropdown title="Fallout">
                  <NavLink href="/fallout">Overview</NavLink>
                  <NavLink href="/fallout/inventory">Inventory</NavLink>
                  <NavLink href="/fallout/combat">Combat</NavLink>
                  <NavLink href="/fallout/wiki">Wiki</NavLink>
                </NavDropdown>
              </Nav>
            </NavbarCollapse>
          </Container>
        </Navbar>
        <Container fluid className="p-4">
          {children}
        </Container>
        <BootstrapClient />
      </body>
    </html>
  );
}
