import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
    return (
        <footer className="footer-body">
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Retro Future
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
