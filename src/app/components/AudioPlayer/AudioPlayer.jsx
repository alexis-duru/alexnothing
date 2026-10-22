"use client";

import React, { useEffect, useRef, useState } from "react";
import "./AudioPlayer.css";

const tracks = [
  { title: "Blessings", src: "/assets/audio/Alex-Nothing-Blessings.mp3" },
  {
    title: "Forever & Ever",
    src: "/assets/audio/Alex-Nothing-Forever-_-Ever.mp3",
  },
  {
    title: "Think About U",
    src: "/assets/audio/Alex-Nothing-Think-About-U.mp3",
  },
];

// L'élément audio vit hors de React : il n'est jamais démonté,
// la lecture continue donc entre les pages et au changement de langue.
let audio = null;
let currentIndex = 0;
const listeners = new Set();

const notify = () => listeners.forEach((listener) => listener());

const getAudio = () => {
  if (!audio) {
    audio = new Audio(tracks[currentIndex].src);
    audio.preload = "none";
    audio.addEventListener("play", notify);
    audio.addEventListener("pause", notify);
    audio.addEventListener("ended", () => loadTrack(currentIndex + 1, true));
  }
  return audio;
};

const loadTrack = (index, autoplay) => {
  const player = getAudio();
  currentIndex = (index + tracks.length) % tracks.length;
  player.src = tracks[currentIndex].src;
  if (autoplay) player.play().catch(() => {});
  notify();
};

const getState = () => ({
  index: currentIndex,
  isPlaying: !!audio && !audio.paused,
});

const PlayIcon = () => (
  <svg viewBox="0 0 10 12" aria-hidden="true">
    <path d="M0 0L10 6L0 12Z" />
  </svg>
);

const PauseIcon = () => (
  <svg viewBox="0 0 10 12" aria-hidden="true">
    <rect x="0" y="0" width="3" height="12" />
    <rect x="7" y="0" width="3" height="12" />
  </svg>
);

const NextIcon = () => (
  <svg viewBox="0 0 12 12" aria-hidden="true">
    <path d="M0 0L8 6L0 12Z" />
    <rect x="9.5" y="0" width="2.5" height="12" />
  </svg>
);

const formatIndex = (index) => String(index + 1).padStart(2, "0");

const AudioPlayer = () => {
  const [state, setState] = useState(getState);
  const [progress, setProgress] = useState(0);
  const [dragProgress, setDragProgress] = useState(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const listener = () => setState(getState());
    listeners.add(listener);
    listener();

    const player = getAudio();
    const updateProgress = () =>
      setProgress(player.duration ? player.currentTime / player.duration : 0);
    player.addEventListener("timeupdate", updateProgress);
    player.addEventListener("emptied", updateProgress);
    updateProgress();

    return () => {
      listeners.delete(listener);
      player.removeEventListener("timeupdate", updateProgress);
      player.removeEventListener("emptied", updateProgress);
    };
  }, []);

  const togglePlay = () => {
    const player = getAudio();
    if (player.paused) player.play().catch(() => {});
    else player.pause();
  };

  const nextTrack = () => loadTrack(currentIndex + 1, state.isPlaying);

  const getPointerProgress = (event) => {
    const rect = progressRef.current.getBoundingClientRect();
    return Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
  };

  // Pendant le glissement on ne fait qu'afficher la position,
  // le saut dans le morceau se fait au relâchement
  const handlePointerDown = (event) => {
    if (!getAudio().duration) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    setDragProgress(getPointerProgress(event));
  };

  const handlePointerMove = (event) => {
    if (dragProgress === null) return;
    setDragProgress(getPointerProgress(event));
  };

  const handlePointerUp = (event) => {
    if (dragProgress === null) return;
    const player = getAudio();
    const value = getPointerProgress(event);
    player.currentTime = value * player.duration;
    setProgress(value);
    setDragProgress(null);
  };

  const displayedProgress = dragProgress ?? progress;

  return (
    <div className={`audio-player ${state.isPlaying ? "is-playing" : ""}`}>
      <button
        className="audio-player-toggle"
        onClick={togglePlay}
        aria-label={state.isPlaying ? "Pause" : "Play"}
      >
        {state.isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>

      <div className="audio-player-info">
        <div className="audio-player-meta">
          <span className="audio-player-index">
            {formatIndex(state.index)}/{formatIndex(tracks.length - 1)}
          </span>
          <span className="audio-player-title" key={state.index}>
            {tracks[state.index].title}
          </span>
        </div>
        <div
          className={`audio-player-progress ${
            dragProgress !== null ? "is-dragging" : ""
          }`}
          ref={progressRef}
          role="slider"
          aria-label="Timeline"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(displayedProgress * 100)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={() => setDragProgress(null)}
        >
          <div className="audio-player-progress-track">
            <div
              className="audio-player-progress-bar"
              style={{ transform: `scaleX(${displayedProgress})` }}
            />
          </div>
          <div
            className="audio-player-progress-thumb"
            style={{ left: `${displayedProgress * 100}%` }}
          />
        </div>
      </div>

      <div className="audio-player-eq" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>

      <button
        className="audio-player-next"
        onClick={nextTrack}
        aria-label="Next track"
      >
        <NextIcon />
      </button>
    </div>
  );
};

export default AudioPlayer;
