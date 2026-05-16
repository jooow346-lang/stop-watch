import "./../styles/stopWatch.css";
import React from "react";
import backgrounds from "./../assets/back.js";

function StopWatch() {
  const { Back1, Back2, Back3, Back4, Back5 } = backgrounds;

  const backs = [Back1, Back2, Back3, Back4, Back5];

  // ===== BACKGROUND INDEX (LOCAL STORAGE) =====
  const [index, setIndex] = React.useState(() => {
    return Number(localStorage.getItem("bgIndex")) || 0;
  });

  React.useEffect(() => {
    localStorage.setItem("bgIndex", index);
  }, [index]);

  const next = () => setIndex((p) => (p + 1) % backs.length);
  const prev = () => setIndex((p) => (p - 1 + backs.length) % backs.length);

  const ActiveBack = backs[index];

  // ===== STOPWATCH STATE (LOCAL STORAGE) =====
  const [seconds, setSeconds] = React.useState(() => {
    return Number(localStorage.getItem("seconds")) || 0;
  });

  const [isRunning, setIsRunning] = React.useState(() => {
    return localStorage.getItem("isRunning") === "true";
  });

  React.useEffect(() => {
    localStorage.setItem("seconds", seconds);
  }, [seconds]);

  React.useEffect(() => {
    localStorage.setItem("isRunning", isRunning);
  }, [isRunning]);

  React.useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((p) => p + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (total) => {
    const hrs = String(Math.floor(total / 3600)).padStart(2, "0");
    const mins = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
    const secs = String(total % 60).padStart(2, "0");
    return `${hrs}:${mins}:${secs}`;
  };

  const reset = () => {
    setSeconds(0);
    setIsRunning(false);
    setIndex(0);

    localStorage.removeItem("seconds");
    localStorage.removeItem("isRunning");
    localStorage.removeItem("bgIndex");
  };

  return (
    <React.Fragment>
      <div className="relative w-screen h-screen overflow-hidden">

        {/* BACKGROUND */}
        <ActiveBack
          className="absolute inset-0 w-full h-full animate-fade"
          preserveAspectRatio="none"
        />

        {/* RIGHT ARROW */}
        <div className="absolute right-5 top-1/2 -translate-y-1/2">
          <button
            onClick={next}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition"
          >
            ❯
          </button>
        </div>

        {/* LEFT ARROW */}
        <div className="absolute left-5 top-1/2 -translate-y-1/2">
          <button
            onClick={prev}
            className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:scale-110 transition"
          >
            ❮
          </button>
        </div>

        {/* CLOCK CARD */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[45px] bg-[rgba(255,255,255,0.20)] w-[500px] h-[300px] flex flex-col items-center justify-center gap-6 backdrop-blur-md">

          <p className="text-white font-orbitron text-[90px] opacity-70">
            {formatTime(seconds)}
          </p>

          <p className="text-white font-orbitron text-2xl opacity-60">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div className="flex gap-4 mt-4">

            <button
              onClick={() => setIsRunning((p) => !p)}
              className="px-4 py-2 rounded-xl bg-white/10 text-white backdrop-blur-md hover:scale-105 transition"
            >
              {isRunning ? "Pause" : "Start"}
            </button>

            <button
              onClick={reset}
              className="px-4 py-2 rounded-xl bg-white/10 text-white backdrop-blur-md hover:scale-105 transition"
            >
              Reset
            </button>

          </div>

        </div>
      </div>
    </React.Fragment>
  );
}

export default StopWatch;