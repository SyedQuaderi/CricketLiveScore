import logo from './logo.svg';
import './App.css';
import Axios from 'axios';
import React from 'react';

function App() {
    const [allMatches, setMatches] = React.useState([]);
    const [liveScore, setLiveScore] = React.useState({});
    const [uniCode, setUniCode] = React.useState(0);

    React.useEffect(()=>{
        Axios.get("https://cricapi.com/api/matches?apikey=OzIorgnntpQDp6VdVxUiJiwybaM2")
            .then(response => {setMatches(response.data.matches) })
            .catch(error=> console.log(error.message));
    }, []);

    function getMatchScore (match) {
        Axios.get(`https://cricapi.com/api/cricketScore?apikey=OzIorgnntpQDp6VdVxUiJiwybaM2&unique_id=${match.unique_id}`)
        .then(response => setLiveScore(response.data))
        .catch(error=> console.log(error.message));
    }

    return (
        <div>
            <h1>Match between {liveScore["team-1"]} and {liveScore["team-2"]}</h1>
            <h2>Match Started : {liveScore.matchStarted ? "Yes" : "No"}</h2>
            <h3>Live Score: {liveScore.score}</h3>
            {allMatches.slice(0, 4).map((match, index)=>
                <button key={index} onClick={()=>getMatchScore(match)}>{match["team-1"]} v/s {match["team-2"]}</button>
            )}
        </div>
    )
}

export default App;
