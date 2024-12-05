// import React, { useState, useEffect } from 'react';

// interface TimerState {
//   startTime: number | null;
//   elapsedTime: number;
// }

// const StudyTimer: React.FC = () => {
//   const [timer, setTimer] = useState<TimerState>({ startTime: null, elapsedTime: 0 });
//   const [isStudying, setIsStudying] = useState(false);
//   const [showChillGuy, setShowChillGuy] = useState(false);

//   useEffect(() => {
//     const now = new Date();
//     const remainingTimeToday =
//       new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

//     const dailyReset = setTimeout(() => {
//       setTimer({ startTime: null, elapsedTime: 0 });
//       setIsStudying(false);
//       setShowChillGuy(false);
//     }, remainingTimeToday);

//     return () => clearTimeout(dailyReset);
//   }, []);

//   useEffect(() => {
//     let interval: NodeJS.Timeout | null = null;
//     if (isStudying && timer.startTime) {
//       interval = setInterval(() => {
//         setTimer((prev) => ({
//           ...prev,
//           elapsedTime: prev.elapsedTime + 1,
//         }));
//       }, 1000);
//     } else if (!isStudying && interval) {
//       clearInterval(interval);
//     }
//     return () => {
//       if (interval) clearInterval(interval);
//     };
//   }, [isStudying, timer.startTime]);

//   const handleStartStudy = () => {
//     setIsStudying(true);
//     setShowChillGuy(false);
//     if (!timer.startTime) {
//       setTimer((prev) => ({ ...prev, startTime: Date.now() }));
//     }
//   };

//   const handleStopStudy = () => {
//     setIsStudying(false);
//     setShowChillGuy(true);
//   };

//   const formatTime = (seconds: number) => {
//     const hrs = Math.floor(seconds / 3600);
//     const mins = Math.floor((seconds % 3600) / 60);
//     const secs = seconds % 60;
//     return `${hrs.toString().padStart(2, '0')}:${mins
//       .toString()
//       .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   return (
//     <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
//       <h1>Study Timer</h1>
//       <p>Time Studied Today: {formatTime(timer.elapsedTime)}</p>
//       <button
//         onClick={handleStartStudy}
//         style={{
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           padding: '10px 20px',
//           margin: '10px',
//           border: 'none',
//           cursor: 'pointer',
//           fontSize: '16px',
//         }}
//       >
//         Studying
//       </button>
//       <button
//         onClick={handleStopStudy}
//         style={{
//           backgroundColor: '#f44336',
//           color: 'white',
//           padding: '10px 20px',
//           margin: '10px',
//           border: 'none',
//           cursor: 'pointer',
//           fontSize: '16px',
//         }}
//       >
//         Dying
//       </button>
//       {showChillGuy && (
//         <div style={{ marginTop: '20px', animation: 'fadeIn 1s' }}>
//           <h2>Take a break, chill guy!</h2>
//           <img
//             src="https://v.wpimg.pl/MmJhNjg4YgwrCjhZSE9vGWhSbAMOFmFPP0p0SEgFf1V6EGEMDlgoHy8YIUQARjgdKx8-RBdYYgw6AWEcVhspBDkYIgseGygAKA0qRVdXfQwrXH9eSlB5XX1Fel5QBWBVcg16R1QFeF8oCXhSXw14C2gV" // Replace with a fun chill guy image URL
//             alt="Chill Guy"
//             style={{ maxWidth: '200px', borderRadius: '10px' }}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudyTimer;

import React, { useState, useEffect } from 'react';

interface TimerState {
  startTime: number | null;
  elapsedTime: number;
}

const StudyTimer: React.FC = () => {
  const [timer, setTimer] = useState<TimerState>({ startTime: null, elapsedTime: 0 });
  const [isStudying, setIsStudying] = useState(false);
  const [showChillGuy, setShowChillGuy] = useState(false);

  useEffect(() => {
    const now = new Date();
    const remainingTimeToday =
      new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1).getTime() - now.getTime();

    const dailyReset = setTimeout(() => {
      setTimer({ startTime: null, elapsedTime: 0 });
      setIsStudying(false);
      setShowChillGuy(false);
    }, remainingTimeToday);

    return () => clearTimeout(dailyReset);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isStudying && timer.startTime) {
      interval = setInterval(() => {
        setTimer((prev) => ({
          ...prev,
          elapsedTime: prev.elapsedTime + 1,
        }));
      }, 1000);
    } else if (!isStudying && interval) {
      clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isStudying, timer.startTime]);

  const handleStartStudy = () => {
    setIsStudying(true);
    setShowChillGuy(false);
    if (!timer.startTime) {
      setTimer((prev) => ({ ...prev, startTime: Date.now() }));
    }
  };

  const handleStopStudy = () => {
    setIsStudying(false);
    setShowChillGuy(true);
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1>Study Timer</h1>
      <p>Time Studied Today: {formatTime(timer.elapsedTime)}</p>
      <button
        onClick={handleStartStudy}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          margin: '10px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Studying
      </button>
      <button
        onClick={handleStopStudy}
        style={{
          backgroundColor: '#f44336',
          color: 'white',
          padding: '10px 20px',
          margin: '10px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
        }}
      >
        Dying
      </button>
      {showChillGuy && (
        <div
          style={{
            marginTop: '20px',
            animation: 'fadeIn 1s',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <h2 style={{ fontSize: '2rem' }}>Take a break, chill guy!</h2>
          <img
            src="https://v.wpimg.pl/MmJhNjg4YgwrCjhZSE9vGWhSbAMOFmFPP0p0SEgFf1V6EGEMDlgoHy8YIUQARjgdKx8-RBdYYgw6AWEcVhspBDkYIgseGygAKA0qRVdXfQwrXH9eSlB5XX1Fel5QBWBVcg16R1QFeF8oCXhSXw14C2gV" // Replace with a fun chill guy image URL
            alt="Chill Guy"
            style={{ maxWidth: '300px', borderRadius: '10px', marginBottom: '20px' }}
          />
        </div>
      )}
    </div>
  );
};

export default StudyTimer;
