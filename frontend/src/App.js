import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <Navbar />
      <br />
      <Switch>
        <Route exact path="/" component={ExerciseList} />
        <Route exact path="/edit/:id" component={EditExercise} />
        <Route exact path="/create" component={CreateExercise} />
        <Route exact path="/user" component={CreateUser} />
      </Switch>
    </Router>
  );
}

export default App;
