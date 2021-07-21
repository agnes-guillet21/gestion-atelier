import React from"react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Accueil from '../pages/AccueilPage';
import Fournisseur from '../pages/FournisseursPage';
import Client from '../pages/ClientsPage';
import User from '../pages/UsersPage';
import Taches from '../pages/TasksPage';
import TrelloPage from "../trello/TrelloPage";

function Routes(){

return(
    <div>
    
        <Router>
            <Switch>
                <Route path="/" exact component={Accueil}/>
                <Route path="/Dashboard" exact component={TrelloPage}/>
                <Route path="/Utilisateurs" exact component={User}/>
                <Route path="/Clients"  exact component={Client}/>
                <Route path="/Fournisseurs"  exact component={Fournisseur}/>
                <Route path="/Taches"  exact component={Taches}/>
                <Route path ="/" component={()=> <div>ERREUR 404</div>}/>
            </Switch>
        </Router>

    </div>
)

}
export default Routes;