import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Main from './pages/Main'
import Layout from './pages/Layout'
import NoPage from './pages/NoPage'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Main />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
