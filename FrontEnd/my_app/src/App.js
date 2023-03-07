import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Main from './pages/Main'
import Layout from './pages/Layout'
import NoPage from './pages/NoPage'
import Login from './pages/Login'
import Perfil from './pages/Perfil';
import Atividades from './pages/Atividades';
import NovaAtividade from './pages/NovaAtividade';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Main />} />
          <Route path="perfil" element={<Perfil />} />
          <Route path="atividades" element={<Atividades />} />
          <Route path="nova_atividade" element={<NovaAtividade />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
