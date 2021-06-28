import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

import { AuthContextProvider } from './contexts/AuthContext';
import { AdminRoom } from './pages/AdminRoom';
import GlobalStyles from './styles/Global';
import { StyledToast } from './components/StyledToastContainer';

import 'react-toastify/dist/ReactToastify.css';
import { ModalProvider } from 'styled-react-modal';
import { MyRooms } from './pages/MyRooms';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <ModalProvider>
            <GlobalStyles />
            <StyledToast />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/rooms/new" component={NewRoom} />
              <Route path="/rooms/:id" component={Room} />
              <Route path="/myrooms" component={MyRooms} />

              <Route path="/admin/rooms/:id" component={AdminRoom} />
            </Switch>
        </ModalProvider>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
