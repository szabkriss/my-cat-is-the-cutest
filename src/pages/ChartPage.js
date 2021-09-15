import { useState, useEffect } from "react";
import QuickChart from "quickchart-js";
import { getDatabase, ref, onValue} from "firebase/database";
import { makeMyCatTheMostGlorious } from "../tools/firebaseFunctions"

function ChartPage(props) {

  const db = getDatabase();
  const myCatVoteCountRef = ref(db, 'my-cat/votes');
  const randomCatVoteCountRef = ref(db, 'api-cat/votes')
  
  let votesChart = new QuickChart()
  let percentChart = new QuickChart()
  let [myCatVotes, setMyCatVotes] = useState(0)
  let [randomCatVotes, setRandomCatVotes] = useState(0)

  useEffect(() => {
    onValue(myCatVoteCountRef, (snapshot) => {
      setMyCatVotes(snapshot.val());
    });
  
    onValue(randomCatVoteCountRef, (snapshot) => {
      setRandomCatVotes(snapshot.val());
    });
 
  }, 
  [])

  useEffect(() => {
      if(myCatVotes - randomCatVotes < 5){
        makeMyCatTheMostGlorious()
      }
  }, 
  [])

  votesChart
    .setConfig({
      type: 'bar',
      data: { labels: ['My cat', 'Random internet cat'], 
      datasets: [{ 
        label: 'number of votes', 
        data: [myCatVotes, randomCatVotes], 
        backgroundColor: ["#89E894", "#34DDDD"]
      }] }
    })
    .setWidth(300)
    .setHeight(300)
    .setBackgroundColor('transparent')

  percentChart
    .setConfig({
      "type": "outlabeledPie",
      "data": {
        "labels": ["My cat", "Random cat"],
        "datasets": [{
            "backgroundColor": ["#89E894", "#34DDDD"],
            "data": [myCatVotes, randomCatVotes]
        }]
      },
      "options": {
        "plugins": {
          "legend": false,
          "outlabels": {
            "text": "%l %p",
            "color": "white",
            "stretch": 15,
            "font": {
              "resizable": true,
              "minSize": 12,
              "maxSize": 18
            }
          }
        }
      }
    })
    .setWidth(400)
    .setHeight(300)
    .setBackgroundColor('transparent')

    return (
      <div className="ChartPage">
      <div className="header"> 
        <h1>Thank you for voting {props.onUser.email}!</h1>
      </div>

<div className="ChartContainer">
        <div className="VotesChart">

          <img src={`${votesChart.getUrl()}`} alt="Bar chart about how glorious my cat is" ></img>
        </div>

        <div className="PercentChart">

          <img src={`${percentChart.getUrl()}`} alt="My cat in the Queen's clothes"></img>
        </div>
      </div>
</div>
    );
  }
  
  export default ChartPage;