import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./gaming.css";
import Square from './square';
import { io } from "socket.io-client";
import Swal from "sweetalert2";

const renderFrom = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

const MultiplayerGaming = () => {
  const [gameState, setGameState] = useState(renderFrom);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState(false);
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);
  const [playerName, setPlayerName] = useState("");
  const [opponentName, setOpponentName] = useState(null);
  const [playingAs, setPlayingAs] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    document.body.style.backgroundColor = '#1f1f2f';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  const checkWinner = () => {
    // row dynamic
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    // column dynamic
    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    ) {
      return gameState[0][0];
    }

    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    ) {
      return gameState[0][2];
    }

    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });

    if (isDrawMatch) return "draw";

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();
    if (winner) {
      setFinishedState(winner);
    }
  }, [gameState]);

  const takePlayerName = async () => {
    const result = await Swal.fire({
      title: "Enter your name",
      input: "text",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "You need to write something!";
        }
      },
    });

    return result;
  };

  useEffect(() => {
    if (socket) {
      socket.on("opponentLeftMatch", () => {
        alert('Opponent left the match :(');
        setFinishedState('opponentLeftMatch');
      });
      
      socket.on("playerMoveFromServer", (data) => {
        const id = data.state.id;
        setGameState((prevState) => {
          let newState = [...prevState];
          const rowIndex = Math.floor(id / 3);
          const colIndex = id % 3;
          newState[rowIndex][colIndex] = data.state.sign;
          return newState;
        });
        setCurrentPlayer(data.state.sign === "circle" ? "cross" : "circle");
      });
      
      socket.on("connect", () => {
        setPlayOnline(true);
      });

      socket.on("OpponentNotFound", () => {
        setOpponentName(false);
      });

      socket.on("OpponentFound", (data) => {
        setPlayingAs(data.playingAs);
        setOpponentName(data.opponentName);
      });
    }
    
    return () => {
      if (socket) socket.disconnect();
    };
  }, [socket]);

  async function playOnlineClick() {
    const result = await takePlayerName();
    if (!result.isConfirmed) {
      return;
    }
    const username = result.value;
    setPlayerName(username);
    const newSocket = io("http://localhost:5000", {
      autoConnect: true,
    });
    newSocket?.emit("request_to_play", {
      playerName: username,
    });
    setSocket(newSocket);
  }

  const handleBackToCalendar = () => {
    navigate('/calendar'); // Navigate to the calendar page
  };

  if (!playOnline) {
    return (
      <div className="main-div">
        <button onClick={playOnlineClick} className="playOnline">
          Play Online
        </button>
      </div>
    );
  }

  if (playOnline && !opponentName) {
    return (
      <div className="waiting">
        <p>Waiting for opponent...</p>
      </div>
    );
  }

  return (
    <div className='main-div'>
      <div className="move-detection">
        <div
          className={`left ${currentPlayer === playingAs ? 'current-move-' + currentPlayer : ''}`}>{playerName}
        </div>
        <div
          className={`right ${currentPlayer !== playingAs ? 'current-move-' + currentPlayer : ''}`}>{opponentName}
        </div>
      </div>
      <div>
        <h1 className='game-heading water-background'>Tic Tac Toe</h1>
        <div className='square-wrapper'>
          {gameState.map((arr, rowIndex) =>
            arr.map((e, colIndex) => (
              <Square 
                playingAs={playingAs}
                gameState={gameState} 
                socket={socket} 
                finishedArrayState={finishedArrayState} 
                finishedState={finishedState} 
                currentPlayer={currentPlayer} 
                setCurrentPlayer={setCurrentPlayer} 
                setGameState={setGameState} 
                id={rowIndex * 3 + colIndex} 
                key={rowIndex * 3 + colIndex} 
                currentElement={e}
              />
            ))
          )}
        </div>
        {finishedState && finishedState !== 'opponentLeftMatch' && finishedState !== 'draw' && (
          <h3 className='finished-state'>{finishedState} won the game</h3>
        )}
        {finishedState && finishedState !== 'opponentLeftMatch' && finishedState === 'draw' && (
          <h3 className='finished-state'>It's a Draw!</h3>
        )}
        {finishedState && (
          <button className='back-to-calendar-button' onClick={handleBackToCalendar}>
            Back to Calendar
          </button>
        )}
      </div>
      {!finishedState && opponentName && (
        <h2 className='against'>You are playing against {opponentName}</h2>
      )}
      {finishedState && finishedState === 'opponentLeftMatch' && (
        <h2 className='against'>Opponent Left, You Win</h2>
      )}
    </div>
  );
};

export default MultiplayerGaming;
