import './App.css';
import Layout from './components/Layout';
import LandingPage from './containers/landing-page';
import MovieDetail from './containers/movie-detail-page';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Layout>
      <BrowserRouter>
      <Switch>
          <Route path="/movie">
            <MovieDetail />
          </Route>
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </BrowserRouter>
      </Layout>
      </div>
      
   
  );
}

export default App;
