import { useDispatch } from 'react-redux';
import { addTableRequest } from '../../redux/tablesRedux';
import { useNavigate } from 'react-router';
import TableForm from './TableForm';

export const AddTableForm = () => {

  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = table => {
    dispatch(addTableRequest(table));
    navigate('/')
  };

  return (
    <TableForm action={handleSubmit} actionText="Add table"/>
  )
};

export default AddTableForm;