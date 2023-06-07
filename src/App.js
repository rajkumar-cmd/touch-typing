import './App.css';
import React from "react";

function App() {
  const [pressedKey, setPressedKey] = React.useState(0);
  const vowels = ['a', 's', 'd', 'f', 'j', 'k', 'l'];
  const [sentence, setSentence] = React.useState('');
  const [seconds, setSeconds] = React.useState(300);
  const [totalWords, setTotalWords] = React.useState(0);
  const [wrongWords, setWrongWords] = React.useState(-2);

  const generateSentence = () => {
    let newSentence = '';
    for (let i = 0; i < 10000; i++) {
      const randomWordLength = Math.floor(Math.random() * 10) + 1; // Random word length between 1 and 5
      let randomWord = '';
      for (let j = 0; j < randomWordLength; j++) {
        const randomIndex = Math.floor(Math.random() * vowels.length);
        randomWord += vowels[randomIndex];
      }
      newSentence += randomWord + ' ';
    }
    setSentence(newSentence.trim());
  }

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          clearInterval(interval);
          return prevSeconds;
        }
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
    generateSentence();
    function handleKeyPress(event) {
      console.log(event.key)
      setPressedKey(event.key);
      setTotalWords((totalWords) => totalWords + 1);
    };
    window.addEventListener('keydown', handleKeyPress);
  }, []);

  React.useEffect(() => {
    
    if (pressedKey == sentence[0]) {
      let newSentence = sentence.split("");
      console.log(newSentence)
      newSentence.shift();
      setSentence(newSentence.join(""))
    }else{
      setWrongWords((wrongWords)=>wrongWords+1)
    }
  }, [totalWords]);

  return (
    <div style={{"backgroundColor":"#FFE79B","height":"100vh"}} className="App">
      <h1>Touch Typing</h1>
      <h1>Timer: {seconds} seconds</h1>
      {(seconds === 0) ? (<div style={{
        "fontSize": "2rem",
        "border": "3px solid #9336B4",
        "borderRadius": "10px",
        "margin": "0px 5rem",
        "padding": "2rem",
        "backgroundColor": "#40128B",
        "color": "#DD58D6"
      }}>
        <p>Accuracy:{Math.floor(((totalWords-wrongWords)/totalWords)*100)}%</p>
        <p>Word Per Min:{totalWords/5}</p>
      </div>) : (<div style={{
        "fontSize": "2rem",
        "border": "3px solid #9336B4",
        "margin": "0px 5rem",
        "borderRadius": "10px",
        "padding": "2rem",
        "whiteSpace": "nowrap",
        "overflow": "hidden",
        "backgroundColor": "#40128B",
        "color": "#DD58D6"
      }}>{sentence}</div>)}
    </div>
  );
}

export default App;
