import { Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import ModalDelete from './ModalDelete';
import { deleteTableRequest } from '../../redux/tablesRedux';

const TableInfo = ({number, status, id}) => {

  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () =>  setShowModal(true); 

  const handleRemove = e => {  
    e.preventDefault();
    dispatch(deleteTableRequest( id ));
    handleClose();
  };

  if(showModal) return (
    <ModalDelete showModal={showModal} handleClose={handleClose} handleRemove={handleRemove} />
  );

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
          <Link to={"/tables/" + id}>
            <Button variant="primary"  size="sm" className="mx-3">Show more</Button>
          </Link>
          <Button variant="outline-danger" size="sm" onClick={handleShow}>Delete</Button>
        </Col>
      </Row>
      <hr />
    </Row>  
  )
};

export default TableInfo;