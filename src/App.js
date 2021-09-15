import { useState, useEffect } from 'react';
import VotePage from './pages/VotePage';
import MailPage from './pages/MailPage';
import './App.css';
import ChartPage from './pages/ChartPage';

function App() {

let [user, setUser] = useState(null)

useEffect(() => {
  
}, [user])


if(!user){
  return <MailPage onSetUser={setUser}/>
}

return (
    user.voted ?

    <ChartPage onUser={user}/> 
      : 
    <VotePage onUser={user} onSetUser={setUser}/>
  )
}

export default App;
