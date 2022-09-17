import Header from './components/views/Header';
import Footer from './components/views/Footer';
import Container from 'react-bootstrap/Container';
import { Routes, Route} from 'react-router-dom';
import Home from './components/pages/Home';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchData } from './redux/tablesRedux';

function App() {

  const dispatch = useDispatch();

  useEffect(() => dispatch(fetchData()), [dispatch] )

  return (
  <main>
    <Container>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
      </Routes>
      <Footer />
    </Container>
  </main>
  );
}

export default App;
