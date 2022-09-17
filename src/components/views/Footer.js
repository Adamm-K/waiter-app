import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <Container>
            <Row className='justify-content-center text-muted'>
                <Col className='mb-3' md='auto'>
                    Copyright © 2022
                </Col>
            </Row>
        </Container>
    );
};

export default Footer;