import TableForm from './TableForm';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getTableById } from '../../redux/tablesRedux';
import { Navigate } from 'react-router-dom';
import { updateTableRequest } from '../../redux/tablesRedux';

const EditTableInfo = () => {

  const dispatch = useDispatch();
  const { tableId } = useParams();
  const tableData = useSelector(state => getTableById(state, tableId));

  let navigate = useNavigate();

  const handleSubmit = table => {
    dispatch(updateTableRequest({ ...table }));
    navigate('/');
  };

  if(!tableData) return <Navigate to="/" />

  return (
    <TableForm 
      action={handleSubmit}
      actionText="Update"
      id={tableData.id}
      status={tableData.status}
      people={tableData.people}
      maxPeople={tableData.maxPeople}
      bill={tableData.bill}
      tableNumber={tableData.tableNumber}
    />
  );
};

export default EditTableInfo