import { useState, useEffect } from 'react';
import { registerAndSaveToDatabase, getUsers } from '../tools/firebaseFunctions'

function LoginPage(props) {

    const [mail, setMail] = useState("")
    
    let letsVoteOnClick= (userEmail) => {
        registerAndSaveToDatabase(userEmail)
        .then(response => response.json())
        .then(user => props.onSetUser(user))
        .catch(() =>{
            getUsers()
            .then(users => {
                props.onSetUser(users.find(user => user.email === userEmail))
            })
        })
    }
   
  return (
    <div className="LoginPage">
        <div>
        <label>E-MAIL</label>

        <input 
            type="email"
            onChange={(e) => setMail(e.target.value)}>
        </input>

        <button 
        onClick={() => {
            letsVoteOnClick(mail)
        }}>
            Let's vote
        </button>
        
        </div>
    </div>
  );
}

export default LoginPage;
