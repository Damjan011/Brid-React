import React, { useEffect, useState } from 'react';

const App = () => {
  const [gameInit, setGameInit] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [winner, setWinner] = useState(false);

  const winArr = [];
  const initArr = ['P', 'O', 'S', 'A', 'O'];

  const winChecker = (e) => {
    winArr.push(e.target.textContent);
    console.log(winArr)
    if (winArr.length === 5) {
      if (JSON.stringify(winArr) === JSON.stringify(initArr)) {
        console.log('jestee');
        setWinner(true);
        setAnimate(false)
      } else {
        setAnimate(false);
        winArr.length = 0
      }
    }
  }

  const generateRandomPos = (count, min, max, interval) => {
    let arr = [];
    let randomX;
    while (count > 0) {
      randomX = (Math.floor(Math.random() * (max - (min + interval)) / interval)) * interval + 'px';
      if (arr.indexOf(randomX) === -1) {
        arr.push(randomX);
        count--;
      }
    }
    return arr;
  }

  let fontSize = window.innerWidth / 10;

  console.log(fontSize)

  let letterHeight = fontSize * 1.325;
  let letterWidth = fontSize * 0.75;

  console.log(letterHeight, letterWidth)

  let randomX = generateRandomPos(5, 0, window.innerWidth, letterWidth);
  let randomY = generateRandomPos(5, 0, window.innerHeight, letterHeight);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 1000)
  }, []);

  return (
    <div style={{ fontSize: fontSize + 'px' }} className="main-container">
      {
        !winner &&
      <div className={`letters-container`}>
        {
          initArr.map((el, index) => (
            <div onClick={winChecker} className="letter" style={animate ? { left: randomX[index], top: randomY[index] } : {}}>
              {el}
            </div>
          ))
        }
      </div>
}

      { winner &&
        <div className="winner-container">
          <div className="winner-text">
            <p>BRAVO</p>
          </div>
          <button className="play-again-button" onClick={setWinner(false)}>Igraj Ponovo</button>
        </div>
      }
    </div>
  );
}

export default App;
