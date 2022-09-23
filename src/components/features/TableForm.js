import { Form, Row, Col, Button,  } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getAllStatuses } from '../../redux/tablesStatusRedux';
import { updateTableRequest } from '../../redux/tablesRedux';

const TableForm = ({ action, actionText, ...props}) => {

  const statuses = useSelector(getAllStatuses); 
  const id = props.id;
  const dispatch = useDispatch();

  const [status, setStatus] = useState(props.status || '');
  const [people, setPeople] = useState(props.people || '');
  const [maxPeople, setMaxPeople] = useState(props.maxPeople || '');
  const [bill, setBill] = useState(props.bill || '');


  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {
    dispatch(updateTableRequest({ id, people, maxPeople, bill, status }));
  }

  return (
    <Row>
      <h1 className="my-5">Table {props.id}</h1>
      <Form onSubmit={validate(handleSubmit)}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1"><b>Status: </b></Form.Label>
          <Col sm="10">
            <Form.Control {...register("category", { required: true})}
                as="select"
                placeholder="Please select category"
                value={status ? status : "1"}
                onChange={e => setStatus(e.target.value)}
                className="w-25"
                >
                  <option disabled value="1">Select status...</option>
                {statuses.map((status, index) => <option key={index} value={status}>{status}</option> )}   
              </Form.Control> 
          </Col> 
            {/* {statusError && <small className="d-block form-text text-danger mt-2">Please choose category</small>}       */}
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1"><b>People: </b></Form.Label>
          <Col sm="1"  >
            <Form.Control 
                {...register("people", { required: true})}
                value={people} 
                type="text"                
                onChange={e => setPeople(e.target.value)} 
              />
              {errors.title && <small className="d-block form-text text-danger mt-2">This field is required and has to be at least 3 characters long</small>}
          </Col>          
          /
          <Col sm="1"  >
            <Form.Control 
                {...register("maxPeople", { required: true})}
                value={maxPeople} 
                type="text"                
                onChange={e => setMaxPeople(e.target.value)}
               />
              {errors.title && <small className="d-block form-text text-danger mt-2">This field is required and has to be at least 3 characters long</small>}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1"><b>Bill: </b></Form.Label>
          <Col sm="1">
            <Form.Control 
                {...register("bill", { required: true})}
                value={bill} 
                type="text"                
                onChange={e => setBill(e.target.value)}                               
              />
            </Col>
            {errors.title && <small className="d-block form-text text-danger mt-2">This field is required and has to be at least 3 characters long</small>}         
        </Form.Group>
        <Button className="mt-3" as="input" type="submit" value={actionText} />{' '}
      </Form>
    </Row>
  )
}

export default TableForm