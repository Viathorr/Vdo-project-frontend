import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Layout from './pages/Layout';
import Missing from './pages/Missing';
import Classes from './pages/Classes';
import Todos from './pages/Todos';
import Profile from './pages/profile_page/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Settings from './pages/settings_page/Settings';
import QuestionsFeed from './pages/questions_feed_page/QuestionsFeed';
import RequestAuth from './pages/RequestAuth';
import { useSelector } from 'react-redux';
import PersistLogin from './pages/PersistLogin';
 
function App() {
  const auth = useSelector(state => state.auth.value);

  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<RequestAuth />}>
            <Route path='/schedule' element={<Classes />} />
          </Route>
          <Route element={<RequestAuth />}>
            <Route path='/todos' element={<Todos />} />
          </Route>
          <Route element={<RequestAuth />}>
            <Route path='/questions_answers' element={<QuestionsFeed />} />
          </Route>
          <Route element={<RequestAuth/>}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route element={<RequestAuth/>}>
            <Route path='/settings' element={<Settings />} />
          </Route>
          
          { !auth.isAuth ? 
            <>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            </> : null
          }
          <Route path='*' element={<Missing />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
