import { Col, Row, Button } from 'react-bootstrap'

const TableInfo = ({number, status}) => {
  return (
    <Row>
      <Row className="align-items-end mb-3">
        <Col className="col-2 d-flex align-items-end justify-content-between">
          <h2 className="mb-0">Table {number}</h2>
        </Col>
        <Col className="col-4">
          <p className="mb-0 pl-3"><strong>Status:</strong> {status}</p>
        </Col>
        <Col className="col-6 d-flex justify-content-end">
          <Button variant="primary"  size="sm">Show more</Button>
        </Col>
      </Row>
      <hr />
    </Row>  
  )
};

export default TableInfo;