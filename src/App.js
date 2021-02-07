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

  let randomX = generateRandomPos(5, 0, window.innerWidth, 90);
  let randomY = generateRandomPos(5, 0, window.innerHeight, 180);

  useEffect(() => {
    setTimeout(() => {
      setAnimate(true);
    }, 1000)
  }, []);

  return (
    <div className="main-container">
      <div className={`letters-container ${winner ? 'hidden' : ''}`}>
        {
          initArr.map((el, index) => (
            <div style={animate ? {  left: randomX[index], top: randomY[index] }: {}} onClick={winChecker} className={`letter 
            ${index === 0 ? 'first' : ''}
            ${index === 1 ? 'second' : ''}
            ${index === 2 ? 'third' : ''}
            ${index === 3 ? 'fourth' : ''}
            ${index === 4 ? 'fifth' : ''}`}>
              {el}
            </div>
          ))
        }
      </div>

      <div className={`win-container ${!winner ? 'hidden' : ''}`}>
        <div className="win-title">
          <p>Bravo!</p>
        </div>

        <button onClick={() => setWinner(false)} className="play-again-button">
          Play Again
        </button>
      </div>
    </div>
  );
}

export default App;
