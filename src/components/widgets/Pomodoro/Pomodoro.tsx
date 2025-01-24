// mhaziqrk

"use client";

import React, { useState, useEffect, useRef } from 'react';

const INITIAL_TIME = 25 * 60; // 25 minutes in seconds
const ALARM_SOUND_URL = 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3';

function App() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  
  const timerRef = useRef<number>();
  const audioRef = useRef<HTMLAudioElement>();
  
  useEffect(() => {
    // Initialize audio
    audioRef.current = new Audio(ALARM_SOUND_URL);
    audioRef.current.loop = true;
    
    // Request notification permission
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        setNotificationPermission(permission);
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStartPause = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
    } else {
      timerRef.current = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    setIsRunning(!isRunning);
  };

  const handleTimerComplete = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    
    // Play alarm sound
    if (audioRef.current) {
      audioRef.current.play();
    }
    
    // Show notification if permitted
    if (notificationPermission === 'granted') {
      new Notification('Notion Pomodoro', {
        body: 'Time to take a break!',
        icon: '/favicon.ico'
      });
    }
  };

  const handleReset = () => {
    clearInterval(timerRef.current);
    setTimeLeft(INITIAL_TIME);
    setIsRunning(false);
    
    // Stop alarm sound
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  return (
    <div className="mt-4 bg-white">
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-full px-4">
          <h1 className="text-xl font-bold text-center mb-3 text-gray-800">Pomodoro</h1>
          
          <div className="text-4xl font-mono text-center mb-4">
            {formatTime(timeLeft)}
          </div>
          
          <div className="flex gap-2 justify-center">
            <button
              onClick={handleStartPause}
              className={`px-4 py-1.5 rounded text-sm font-medium text-white ${
                isRunning 
                  ? 'bg-yellow-500 hover:bg-yellow-600' 
                  : 'bg-green-500 hover:bg-green-600'
              }`}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={handleReset}
              className="px-4 py-1.5 rounded text-sm font-medium text-white bg-red-500 hover:bg-red-600"
            >
              Reset
            </button>
          </div>
          
          {notificationPermission === 'denied' && (
            <p className="text-xs text-red-500 text-center mt-2">
              Enable notifications in Notion
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;