import { useState } from 'react';
import { registerAndSaveToDatabase } from '../tools/firebaseFunctions'

function RegPage() {

    const [mail, setMail] = useState("")

  return (
    <div className="RegPage">
        <label>e-mail:</label>
        <input onChange={(e) => setMail(e.target.value)}></input>
        <button 
        onClick={() => {
            console.log(mail)
            registerAndSaveToDatabase(mail)
        }}>
            Let's vote
        </button>
    </div>
  );
}

export default RegPage;
