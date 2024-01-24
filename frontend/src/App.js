import Homepage from "./pages/Homepage.js";
import NotFound from "./pages/NotFound.js";
import Notespage from "./pages/Notespage.js";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Homepage} />
        <Route path="/notes" exact component={Notespage} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;