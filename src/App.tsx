import './App.css';
import Login from './components/login';
import { BrowserRouter, Route } from 'react-router-dom';
import ResultPage from './components/result-page';
import Header from './components/tags/header';
import LandingPage from './components/landing-page';

require('dotenv').config();

function App() {
  return (
    <BrowserRouter>
      <div className="container-fluid">
      <Login></Login>
      {/* <LandingPage></LandingPage>
      <Header></Header> */}
      {/* <ResultPage></ResultPage> */}
      </div>

      <Route exact path="/" component={Login} />
          <Route path="/home" component={LandingPage} />
          <Route path="/results" component={ResultPage} />
    </BrowserRouter>
    
  );
}

export default App;
