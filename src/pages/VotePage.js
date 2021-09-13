import myCat from '../img/myCat.jpg'
import { useState } from 'react';
import { getUsers, vote } from '../tools/firebaseFunctions'
import '../App.css';

function VotePage(props) {
  let apiCat = 'https://placekitten.com/453/640'
  
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
            vote("my-cat", props.onUser)
            props.onSetUser({...props.onUser, voted: true})
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
            vote("api-cat", props.onUser)
            props.onSetUser({...props.onUser, voted: true})
        }}
        >
        <h1>This random kitten from the internet</h1>
      </div>
      </div>
    </div>
  );
}

export default VotePage;
