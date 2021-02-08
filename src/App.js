import React, { useEffect, useState } from 'react';
import Win from './components/Win';

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
  let randomX = generateRandomPos(5, 0, window.innerWidth, 90);
  let randomY = generateRandomPos(5, 0, window.innerWidth, 180);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 1000)
  }, []);

  return (
    <div style={{ fontSize: fontSize + 'px' }} className="main-container">
      <div className={`letters-container`}>
        {
          initArr.map((el, index) => (
            <div onClick={winChecker} className="letter" style={ animate ? {left: randomX[index], top: randomY[index]} : {}}>
              {el}
            </div>
          ))
        }
      </div>
      <Win winner={winner} setWinner={setWinner} />
    </div>
  );
}

export default App;
