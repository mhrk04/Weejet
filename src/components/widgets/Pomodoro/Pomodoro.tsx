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
      new Notification('Pomodoro Timer', {
        body: 'Time is up! Take a break.',
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Pomodoro Timer</h1>
        
        <div className="text-6xl font-mono text-center mb-8">
          {formatTime(timeLeft)}
        </div>
        
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={handleStartPause}
            className={`px-6 py-2 rounded-lg font-semibold text-white ${
              isRunning 
                ? 'bg-yellow-500 hover:bg-yellow-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isRunning ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600"
          >
            Reset
          </button>
        </div>
        
        {notificationPermission === 'denied' && (
          <p className="text-red-500 text-sm text-center">
            Please enable notifications to receive timer alerts
          </p>
        )}
      </div>
    </div>
  );
}

export default App;