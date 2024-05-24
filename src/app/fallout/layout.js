import { Container } from "react-bootstrap";

export default function FalloutLayout({ children }) {
    return (
        <div>
            <h1>Fallout TTRPG</h1>
            <p>Tools for playing the Fallout TTRPG.</p>
            <Container fluid>
                {children}
            </Container>
        </div>
    );
};