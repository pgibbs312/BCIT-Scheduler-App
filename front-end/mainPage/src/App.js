import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar.js';
import Header from './components/Header';
import Fifth_floor from './components/fifth_floor';
import Calender from './components/calander'

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <Fifth_floor />
      <Calender />
    </>
  );
}

export default App;
