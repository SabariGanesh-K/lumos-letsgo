import Home from './Home';
import "react-router-dom"
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { AppProvider } from './context/AppConfig';
import MakeRaise from './MakeRaise';
import User from './User';
import Vote from './Vote';
import SendTransac from './SendTransac';
function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/raise' element={<MakeRaise />} />
          <Route path='/user' element={<User />} />
          <Route path='/vote' element={<Vote />} />
          <Route path='/sendtransac' element={<SendTransac />} />
        </Routes>
      </Router>
    </AppProvider>

  );
}

export default App;
