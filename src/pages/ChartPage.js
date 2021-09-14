import { useState, useEffect } from "react";
import QuickChart from "quickchart-js";
import { getDatabase, ref, onValue} from "firebase/database";

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

  votesChart
    .setConfig({
      type: 'bar',
      data: { labels: ['My cat', 'Random internet cat'], 
      datasets: [{ label: 'number of votes', data: [myCatVotes, randomCatVotes] }] }
    })
    .setWidth(800)
    .setHeight(400)
    .setBackgroundColor('transparent')

  percentChart
    .setConfig({
      "type": "outlabeledPie",
      "data": {
        "labels": ["My cat", "Random cat"],
        "datasets": [{
            "backgroundColor": ["#FF3784", "#36A2EB"],
            "data": [myCatVotes, randomCatVotes]
        }]
      },
      "options": {
        "plugins": {
          "legend": false,
          "outlabels": {
            "text": "%l %p",
            "color": "white",
            "stretch": 20,
            "font": {
              "resizable": true,
              "minSize": 12,
              "maxSize": 18
            }
          }
        }
      }
    })

    return (
      <div className="ChartPage">
        <h1>Charts</h1>
        <h3>Thank you for voting {props.onUser.email}!</h3>

        <div className="VotesChart"
        style={{
          backgroundImage: `url(${votesChart.getUrl()})`
        }}>
 
        </div>

        <div className="PercentChart"
        style={{
          backgroundImage: `url(${percentChart.getUrl()})`
        }}>
 
        </div>
      </div>
    );
  }
  
  export default ChartPage;