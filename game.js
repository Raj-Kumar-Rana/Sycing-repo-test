import React, { useState, useEffect, useRef } from 'react';

const Game = () => {
  const [playerY, setPlayerY] = useState(0); // vertical offset
  const [isJumping, setIsJumping] = useState(false);
  const [score, setScore] = useState(0);
  const [coinCollected, setCoinCollected] = useState(false);
  const playerRef = useRef(null);
  const coinRef = useRef(null);

  // Jump logic
  const handleJump = () => {
    if (isJumping) return;
    setIsJumping(true);
    let jumpHeight = 0;
    const jumpInterval = setInterval(() => {
      jumpHeight += 5;
      setPlayerY(-jumpHeight);
      if (jumpHeight >= 100) {
        clearInterval(jumpInterval);
        const fallInterval = setInterval(() => {
          jumpHeight -= 5;
          setPlayerY(-jumpHeight);
          if (jumpHeight <= 0) {
            clearInterval(fallInterval);
            setPlayerY(0);
            setIsJumping(false);
          }
        }, 20);
      }
    }, 20);
  };

  // Collision detection
  useEffect(() => {
    const checkCollision = () => {
      if (!playerRef.current || !coinRef.current || coinCollected) return;
      const playerRect = playerRef.current.getBoundingClientRect();
      const coinRect = coinRef.current.getBoundingClientRect();

      const isColliding = !(
        playerRect.top > coinRect.bottom ||
        playerRect.bottom < coinRect.top ||
        playerRect.right < coinRect.left ||
        playerRect.left > coinRect.right
      );

      if (isColliding) {
        setScore((prev) => prev + 1);
        setCoinCollected(true);
        setTimeout(() => setCoinCollected(false), 2000); // Reset coin after 2s
      }
    };

    const interval = setInterval(checkCollision, 100);
    return () => clearInterval(interval);
  }, [coinCollected]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handleJump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.score}>Score: {score}</h1>
      <div style={styles.gameArea}>
        <div
          ref={playerRef}
          style={{ ...styles.player, transform: `translateY(${playerY}px)` }}
        />
        {!coinCollected && <div ref={coinRef} style={styles.coin} />}
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  gameArea: {
    position: 'relative',
    margin: 'auto',
    marginTop: '30px',
    width: '600px',
    height: '300px',
    background: '#a3d9a5',
    border: '2px solid #000',
    overflow: 'hidden',
  },
  player: {
    position: 'absolute',
    bottom: '0',
    left: '100px',
    width: '50px',
    height: '50px',
    backgroundColor: 'red',
    borderRadius: '10px',
    transition: 'transform 0.1s linear',
  },
  coin: {
    position: 'absolute',
    bottom: '0',
    left: '400px',
    width: '30px',
    height: '30px',
    backgroundColor: 'gold',
    borderRadius: '50%',
    animation: 'bounce 1s infinite',
  },
  score: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
};

export default Game;
