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
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  keywords: ["ttrpg", "winth03", "tools", "tabletop", "role-playing", "games"],  
  authors: [
    { name: "Nutpapop Yasawut" },
    {
      name: "Nutpapop Yasawut",
      url: "https://github.com/winth03/",
    },
  ],
  icons: [
    { rel: "apple-touch-icon", url: "icons/icon-256x256.png" },
    { rel: "icon", url: "icons/icon-256x256.png" },
  ],
};

export const viewport = {
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en" data-bs-theme="dark">
      <body className={inter.className}>
        <Navbar>
          <Container>
            <NavbarBrand href="/">WinTH03&apos;s TTRPG Tools</NavbarBrand>
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
