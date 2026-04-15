import { useState, useRef } from "react";
import styled from "styled-components";

const PlayerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  background: #0d0d0d;
  border: 1px solid #1e1e1e;
  border-radius: 10px;
  padding: 1.2rem 1.6rem;
`;

const PlayBtn = styled.button`
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  border: none;
  background: var(--gradient-primary);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.15s;

  &:hover {
    opacity: 0.85;
  }

  svg {
    width: 1.4rem;
    height: 1.4rem;
  }
`;

const ProgressWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const ProgressTrack = styled.div`
  width: 100%;
  height: 3px;
  background: #1e1e1e;
  border-radius: 999px;
  cursor: pointer;
  position: relative;
`;

const ProgressFill = styled.div`
  height: 100%;
  border-radius: 999px;
  background: var(--gradient-primary);
  width: ${(p) => p.$pct}%;
  transition: width 0.1s linear;
`;

const TimeRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Time = styled.span`
  font-size: 1.1rem;
  color: #444;
`;

const SpeedBtn = styled.button`
  background: transparent;
  border: 1px solid #1e1e1e;
  border-radius: 6px;
  color: #555;
  font-size: 1.1rem;
  padding: 0.3rem 0.7rem;
  cursor: pointer;
  flex-shrink: 0;
  transition: border-color 0.15s, color 0.15s;

  &:hover {
    border-color: #333;
    color: #888;
  }
`;

const formatTime = (s) => {
  if (isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const SPEEDS = [0.75, 1, 1.25, 1.5];

export default function AudioPlayer({ src }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(1);

  const toggle = () => {
    const audio = audioRef.current;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    setCurrent(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setPlaying(false);
    setCurrent(0);
  };

  const handleTrackClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const newTime = ratio * duration;
    audioRef.current.currentTime = newTime;
    setCurrent(newTime);
  };

  const cycleSpeed = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    audioRef.current.playbackRate = SPEEDS[next];
  };

  const pct = duration ? (current / duration) * 100 : 0;

  return (
    <PlayerWrapper>
      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      />

      <PlayBtn onClick={toggle}>
        {playing ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </PlayBtn>

      <ProgressWrapper>
        <ProgressTrack onClick={handleTrackClick}>
          <ProgressFill $pct={pct} />
        </ProgressTrack>
        <TimeRow>
          <Time>{formatTime(current)}</Time>
          <Time>{formatTime(duration)}</Time>
        </TimeRow>
      </ProgressWrapper>

      <SpeedBtn onClick={cycleSpeed}>{SPEEDS[speedIdx]}x</SpeedBtn>
    </PlayerWrapper>
  );
}