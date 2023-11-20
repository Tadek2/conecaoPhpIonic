import { IonReactRouter } from "@ionic/react-router";
import { IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";
import MeusDadosPage from "../components/MeusDadosPage";

const AppRouter: React.FC = () => (
  <IonReactRouter>
    <IonRouterOutlet>
      <Route path="/meus-dados" component={MeusDadosPage} />
      <Redirect exact path="/" to="/meus-dados" />
    </IonRouterOutlet>
  </IonReactRouter>
);

export default AppRouter;
