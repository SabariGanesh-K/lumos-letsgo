import Home from './Home';
import "react-router-dom"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppConfig';
import MakeRaise from './MakeRaise';
import User from './User';
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/raise' element={<MakeRaise />} />
          <Route path='/user' element={<User />} />
        </Routes>
      </Router>
    </AppProvider>

  );
}

export default App;
