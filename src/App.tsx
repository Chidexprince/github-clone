import './App.css';
import Login from './components/login';
import ResultPage from './components/result-page';
import Header from './components/tags/header';
import LandingPage from './components/landing-page';

function App() {
  return (
    <div className="container-fluid">
      <Login></Login>
      {/* <LandingPage></LandingPage>
      <Header></Header> */}
      {/* <ResultPage></ResultPage> */}
    </div>
  );
}

export default App;
