// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeScreen } from './screens/HomeScreen';
import { ProductScreen } from './screens/ProductScreen';



const App = () => {
  return (
    <>
      <Router>
        <Header />
        <main className="py-3">
          <Container>
            <Routes>
              <Route path="/" element={<HomeScreen />} />
              <Route exact path="/frontend/" element={<HomeScreen />} />
              <Route path="/product/:id" element={<ProductScreen />} />
            </Routes>
          </Container>
        </main>
        <Footer />
      </Router>
    </>
  );
}

export default App;