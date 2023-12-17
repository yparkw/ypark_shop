import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from './App';
import ItemDetail from './ItemDetail';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/items/:id" component={ItemDetail} />
      </Switch>
    </Router>
  );
};

export default Routing;
