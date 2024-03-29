import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/Home';
import Main from './components/Landing';
import { PokemonCreate } from './components/PokemonCreate';
import { PokemonDetail } from './components/PokemonDetail';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
         <Switch>
          
          <Route exact path='/' component={Main} />
          <Route path='/home/:id' component={PokemonDetail} />
          <Route path='/home' component={Home} />
          <Route path='/pokemon' component={PokemonCreate} />
          
        </Switch> 
      </div>
    </BrowserRouter>
  );
}

export default App;
