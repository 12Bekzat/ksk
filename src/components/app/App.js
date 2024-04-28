import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '../../scss/style.scss';
import Home from '../../pages/Home';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import AuthProvider from '../../providers/AuthProvider';
import Login from '../../pages/Login';
import Admin from '../../pages/UserCreate';
import Payments from '../../pages/Payments';
import Profile from '../../pages/Profile';
import News from '../../pages/News';
import { PopupProvider } from '../../providers/PopupProvider';
import UserEdit from '../../pages/UserEdit';
import UserCreate from '../../pages/UserCreate';
import Jkh from '../../pages/Jkh';
import JkhPage from '../../pages/JkhPage';
import HouseCreate from '../../pages/HouseCreate';
import Rate from '../../pages/Rate';

function App() {
  return (
    <Router>
      <AuthProvider>
        <PopupProvider>
          <Header />

          <div className="main">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/user/create' element={<UserCreate />} />
              <Route path='/manage' element={<Payments />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/news' element={<News />} />
              <Route path='/house/create' element={<HouseCreate />} />
              <Route path='/jkh' element={<Jkh />} />
              <Route path='/rate/create' element={<Rate />} />
              <Route path='/jkh/:id' element={<JkhPage />} />
              <Route path='/user/edit/:id' element={<UserEdit />} />
            </Routes>
          </div>

          <Footer />
        </PopupProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
