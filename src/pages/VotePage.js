import myCat from '../img/myCat.jpg'
import { useState } from 'react';
import '../App.css';

function VotePage() {
  const apiCat = 'https://placekitten.com/453/640'
  let [myCatCounter, setMyCatCounter] = useState(0)
  let [apiCatCounter, setApiCatCounter] = useState(0)

  
  return (
    <div className="VotePage">
      <div 
        className = "header">
        <h1>Which cat do you find cuter?</h1>
      </div>
      <div>
        <div 
        className="myCat picture" 
        style={{
        backgroundImage: `url(${myCat})`}}
        onClick={() => 
          {
            setMyCatCounter(++myCatCounter)
            console.log(myCatCounter)
          }
        }
        >
          <h1>My cat</h1>
      </div>
        <h1>or</h1>
      <div 
      className="randomCat picture" 
      style={{
        backgroundImage: `url(${apiCat})`
        }}
      onClick={() => 
        {
          setApiCatCounter(++apiCatCounter)
          console.log(apiCatCounter)
        }}
        >
        <h1>This random kitten from the internet</h1>
      </div>
      </div>
    </div>
  );
}

export default VotePage;
