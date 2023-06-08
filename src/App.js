import React from "react";
import Style from "./App.module.css"

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
    } else {
      setWrongWords((wrongWords) => wrongWords + 1)
      if(totalWords>0){
        const playBeep = () => {
          const audio = new Audio('beep-03.mp3');
          audio.play();
        };
        playBeep();
      }
    }
  }, [totalWords]);

  return (
    <div className={Style.main}>
      <h1>Touch Typing</h1>
      <h1>Timer: {seconds} seconds</h1>
      {(seconds === 0) ? (
        <div className={Style.result}>
        {totalWords===0?(
          <p>Accuracy: 0%</p>
        ):(
          <p>Accuracy: {Math.floor(((totalWords - wrongWords) / totalWords) * 100)}%</p>
        )}
          
          <p>Letter Per Min: {totalWords}</p>
        </div>) : (
        <div className={Style.text}><span className={Style.cursor}>_</span>{sentence}</div>)}
    </div>
  );
}

export default App;
