import { useState, useEffect } from 'react';
import VotePage from './pages/VotePage';
import MailPage from './pages/MailPage';
import './App.css';
import ChartPage from './pages/ChartPage';

function App() {

let [user, setUser] = useState(null)

useEffect(() => {
  
}, [user])


switch (user && !user.voted) {
  case true:
    return <VotePage onUser={user} onSetUser={setUser}/>
    break;

  case false:
    return <ChartPage onUser={user}/>
    break;
    
  default:
    return <MailPage onSetUser={setUser}/>

    break;
  }

}

export default App;
