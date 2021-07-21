import React  from "react";
import Accueil from './pages/AccueilPage';
import Fournisseur from './pages/FournisseursPage';
import Client from './pages/ClientsPage';
import User from './pages/UsersPage';
import TrelloPage from "./trello/DragDropContext";
import Statut from "./pages/StatutPage";
import Grade from "./pages/GradePage";
import Taches from './pages/TasksPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import '../styles/App.css';
import Navbar from "./Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Data from './trello/initialeData';
import Trello2 from './test2/trello2';

function App() {


return (
    <div className="App">
        <>
         {/*<header>
      <button  onClick={() => setShowNav(!showNav)}>Menu</button>
        </header>*/}
            <Router>
                <Navbar/>
                    <Switch>
                        <Route path="/" exact component={Accueil}/>
                        <Route path="/Dashboard" exact component={TrelloPage}/>
                        <Route path="/Utilisateurs" exact component={User}/>
                        <Route path="/Clients"  exact component={Client}/>
                        <Route path="/Fournisseurs"  exact component={Fournisseur}/>
                        <Route path="/Taches"  exact component={Taches}/>
                        <Route path="/Statuts"  exact component={Statut}/>
                        <Route path="/Grades"  exact component={Grade}/>
                        <Route path ="/" component={()=> <div>ERREUR 404</div>}/>
                    </Switch>
            </Router>
        </>
     

 {/*  <Trello2></Trello2>
<FormulaireTask></FormulaireTask>*/}
   </div>
  )
}
export default App;
