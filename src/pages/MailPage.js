import { useState, useEffect } from 'react';
import { registerAndSaveToDatabase, getUsers, User } from '../tools/firebaseFunctions'
import VotePage from './VotePage';

function MailPage(props) {

    const [mail, setMail] = useState("")
    let letsVoteOnClick

useEffect(() => {

    letsVoteOnClick = (userEmail) => {
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
})
        

  return (
    <div className="MailPage">
        <div>
        <label>E-MAIL</label>
        <input onChange={(e) => setMail(e.target.value)}></input>
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

export default MailPage;
