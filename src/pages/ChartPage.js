import { useState, useEffect } from "react";
import QuickChart from "quickchart-js";
import { getDatabase, ref, onValue} from "firebase/database";

function ChartPage() {

  const db = getDatabase();
  const myCatVoteCountRef = ref(db, 'my-cat/votes');
  const randomCatVoteCountRef = ref(db, 'api-cat/votes')
  let votesChart = new QuickChart()
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

    return (
      <div className="ChartPage">
        <h1>Chart Page</h1>
        <h1>{myCatVotes}</h1>

        <div className="TestChart"
        style={{
          backgroundImage: `url(${votesChart.getUrl()})`
        }}>

        </div>
      </div>
    );
  }
  
  export default ChartPage;