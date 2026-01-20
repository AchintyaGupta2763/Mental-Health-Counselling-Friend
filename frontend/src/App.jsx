import { useEffect, useRef, useState } from "react";
import "./App.css";

const BACKEND_URL = "https://mental-health-counselling-friend.onrender.com";

export default function App() {
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  // intro | idle | recording | speaking
  const [stage, setStage] = useState("intro");
  const [loading, setLoading] = useState(false);

  /* ================================
     VIDEO STATE CONTROLLER
     ================================ */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const play = (src) => {
      if (!video.src.includes(src)) {
        video.src = src;
        video.load();
      }
      video.loop = true;
      video.play().catch(() => {});
    };

    switch (stage) {
      case "intro":
        play("/videos/intro.mp4");
        break;

      case "idle":
      case "recording":
        play("/videos/idle.mp4"); // listening / thinking
        break;

      case "speaking":
        play("/videos/talk.mp4");
        break;

      default:
        break;
    }
  }, [stage]);

  /* ================================
     MIC CONTROL
     ================================ */
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = sendAudio;
    mediaRecorderRef.current.start();

    setStage("recording"); // → idle video (listening)
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state === "recording") {
      mediaRecorderRef.current.stop();
      setLoading(true);
      setStage("idle"); // → thinking (still idle video)
    }
  };

  /* ================================
     BACKEND COMMUNICATION
     ================================ */
  const sendAudio = async () => {
    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("file", audioBlob);

    const res = await fetch(`${BACKEND_URL}/converse-audio`, {
      method: "POST",
      body: formData,
    });

    const audioBuffer = await res.arrayBuffer();
    const audio = new Audio(
      URL.createObjectURL(new Blob([audioBuffer], { type: "audio/wav" }))
    );

    setStage("speaking");
    setLoading(false);

    audio.play();
    audio.onended = () => setStage("intro");
  };

  /* ================================
     UI
     ================================ */
  const onMicClick = () => {
    if (stage === "recording") {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <div className="container">
      <div className="left">
        <video ref={videoRef} muted autoPlay playsInline />

        <button
          className={`mic ${stage === "recording" ? "active" : ""}`}
          onClick={onMicClick}
          disabled={loading}
        >
          🎙
        </button>

        {loading && <div className="status">Thinking…</div>}
      </div>

      <div className="right">
        <h1>Mental Health Counselling Friend</h1>

        <p className="subtitle">
          A calm, voice-based companion designed to listen, understand,
          and gently support you during moments of stress.
        </p>

        <div className="instructions">
          <h2>How to use</h2>
          <ol>
            <li>Click the microphone button</li>
            <li>Speak freely about how you are feeling</li>
            <li>Click again to stop recording</li>
            <li>Listen to the response and take your time</li>
          </ol>
        </div>

        <p className="note">
          This application is not a replacement for professional help.
          If you are in danger, please seek immediate assistance.
        </p>
      </div>
    </div>
  );
}







// import { useEffect, useRef, useState } from "react";
// import "./App.css";

// const BACKEND_URL = "http://127.0.0.1:8000";

// export default function App() {
//   const videoRef = useRef(null);
//   const mediaRecorderRef = useRef(null);
//   const audioChunksRef = useRef([]);

//   const [stage, setStage] = useState("intro"); 
//   // intro | idle | recording | speaking
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     // Play intro once, then switch to idle
//     const video = videoRef.current;
//     if (!video) return;

//     if (stage === "intro") {
//       video.src = "/videos/intro.mp4";
//       video.loop = false;
//       video.play();

//       video.onended = () => setStage("idle");
//     }

//     if (stage === "idle") {
//       video.src = "/videos/idle.mp4";
//       video.loop = true;
//       video.play();
//     }

//     if (stage === "speaking") {
//       video.src = "/videos/talk.mp4";
//       video.loop = true;
//       video.play();
//     }
//   }, [stage]);

//   const startRecording = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

//     mediaRecorderRef.current = new MediaRecorder(stream);
//     audioChunksRef.current = [];

//     mediaRecorderRef.current.ondataavailable = (e) => {
//       if (e.data.size > 0) audioChunksRef.current.push(e.data);
//     };

//     mediaRecorderRef.current.onstop = sendAudio;
//     mediaRecorderRef.current.start();

//     setStage("recording");
//   };

//   const stopRecording = () => {
//     mediaRecorderRef.current?.stop();
//     setLoading(true);
//   };

//   const sendAudio = async () => {
//     const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" });
//     const formData = new FormData();
//     formData.append("file", audioBlob);

//     const res = await fetch(`${BACKEND_URL}/converse-audio`, {
//       method: "POST",
//       body: formData,
//     });

//     const audioBuffer = await res.arrayBuffer();
//     const audio = new Audio(URL.createObjectURL(new Blob([audioBuffer])));

//     setStage("speaking");
//     setLoading(false);

//     audio.play();
//     audio.onended = () => setStage("idle");
//   };

//   return (
//     <div className="container">
//       <div className="left">
//         <video ref={videoRef} muted autoPlay playsInline />

//         <button
//           className={`mic ${stage === "recording" ? "active" : ""}`}
//           onClick={stage === "recording" ? stopRecording : startRecording}
//           disabled={loading}
//         >
//           🎙
//         </button>

//         {loading && <div className="status">Thinking…</div>}
//       </div>

//       <div className="right">
//         <h1>Mental Health Counselling Friend</h1>

//         <p className="subtitle">
//           A calm, voice-based companion designed to listen, understand,
//           and gently support you during moments of stress.
//         </p>

//         <div className="instructions">
//           <h2>How to use</h2>
//           <ol>
//             <li>Click the microphone button</li>
//             <li>Speak freely about how you are feeling</li>
//             <li>Click again to stop recording</li>
//             <li>Listen to the response and take your time</li>
//           </ol>
//         </div>

//         <p className="note">
//           This application is not a replacement for professional help.
//           If you are in danger, please seek immediate assistance.
//         </p>
//       </div>
//     </div>
//   );
// }
