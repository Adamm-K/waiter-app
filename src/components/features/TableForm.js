import { Form, Row, Col, Button,  } from 'react-bootstrap';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { getAllStatuses } from '../../redux/tablesStatusRedux';

const TableForm = ({ action, actionText, ...props}) => {

  const statuses = useSelector(getAllStatuses); 
  const id = props.id;

  const [status, setStatus] = useState(props.status || '');
  const [people, setPeople] = useState(props.people || '');
  const [maxPeople, setMaxPeople] = useState(props.maxPeople || '');
  const [bill, setBill] = useState(props.bill || 0);
  const [tableNumber, setTableNumber] = useState(props.tableNumber || '')
  const [statusError, setStatusError] = useState(false);

  if(people > maxPeople) {
    setPeople(maxPeople);
  };
  if(maxPeople > 10) {
    setMaxPeople(10);
  };

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  const handleSubmit = () => {   
    setStatusError(!status);
    if(maxPeople && tableNumber){
      action({ id, people, maxPeople, bill, status, tableNumber });
    }
  }

  return (
    <Row>
      <h1 className="my-5">Table {props.tableNumber}</h1>
      <Form onSubmit={validate(handleSubmit)}>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1"><b>Table number:</b></Form.Label>
          <Col sm="1"  >
            <Form.Control 
                {...register("number", { required: true})}
                value={tableNumber} 
                type="number"                
                onChange={e => setTableNumber(e.target.value)} 
              />
              {errors.number && <small className="d-block form-text text-danger mt-2">This field is required</small>}
          </Col> 
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1"><b>Status: </b></Form.Label>
          <Col sm="10">
            <Form.Control {...register("status", { required: true})}
                as="select"
                placeholder="Please select status"
                value={status ? status : "1"}
                onChange={e => setStatus(e.target.value)}
                className="w-25"
                >
                  <option disabled value="1">Select status...</option>
                {statuses.map((status, index) => <option key={index} value={status}>{status}</option> )}   
              </Form.Control> 
          </Col> 
          {statusError && <small className="d-block form-text text-danger mt-2">Please choose status</small>} 
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm="1"><b>People: </b></Form.Label>
          <Col sm="1"  >
            <Form.Control 
                {...register("people", { required: true})}
                value={status === 'Busy' ? people : 0} 
                type="number"                
                onChange={e => setPeople(e.target.value)} 
              />
              {errors.people && <small className="d-block form-text text-danger mt-2">This field is required</small>}
          </Col>          
          /
          <Col sm="1"  >
            <Form.Control 
                {...register("maxPeople", { required: true})}
                value={maxPeople} 
                type="number"                
                onChange={e => setMaxPeople(e.target.value)}
               />
              {errors.maxPeople && <small className="d-block form-text text-danger mt-2">This field is required</small>}
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm="1"><b>Bill: </b></Form.Label>
          <Col sm="1">
            <Form.Control 
                {...register("bill", { required: true})}
                value={ status === 'Busy' ? bill : 0 }
                type="number"                
                onChange={e => setBill(e.target.value)}                               
              />
            </Col>
            {errors.bill && <small className="d-block form-text text-danger mt-2">This field is required</small>}         
        </Form.Group>
        <Button className="mt-3" as="input" type="submit" value={actionText} />{' '}
      </Form>
    </Row>
  )
}

export default TableForm