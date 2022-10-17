import TableInfo from '../features/TableInfo';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../redux/tablesRedux';
import { Link } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';

const Home = () => {

  const tables = useSelector(getAllTables);

  return (
    <div>
      <Row className="align-items-center justify-content-end">
        <Col>
          <h1 className="my-5">All tables</h1>
        </Col>
        <Col className="d-flex flex-row-reverse p-2">
          <Link to="tables/add">
            <Button variant="info">Add New Table</Button>
          </Link>
        </Col>
      </Row>
      {tables.map((table, index) => (
        <TableInfo 
          key={index}
          id={table.id}  
          number={table.tableNumber}
          status={table.status}
          />          
      ))}
    </div>
  )
}

export default Home;