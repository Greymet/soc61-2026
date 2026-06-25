import { useState } from "react";

type PipelineStage = "waiting" | "running" | "error" | "complete";

interface PipelineEvent {
  id: number;
  timestamp: string;
  message: string;
  isError: boolean;
}

interface DetectionResult {
  id: number;
  label: string;
  confidence: number;
  box: string;
}

export default function PipelineDashboard() {
  const [stage, setStage] = useState<PipelineStage>("waiting");
  const [events, setEvents] = useState<PipelineEvent[]>([]);
  const [results, setResults] = useState<DetectionResult[]>([]);

  const getTime = () => new Date().toLocaleTimeString();

  const handleStart = () => {
    setStage("running");
    setEvents([
      { id: Date.now(), timestamp: getTime(), message: "Pipeline started.", isError: false },
      { id: Date.now() + 1, timestamp: getTime(), message: "Capturing camera frame...", isError: false },
    ]);
    setResults([]);
  };

  const handleSimulateDetection = () => {
    if (stage !== "running") return;
    
    const newResult: DetectionResult = {
      id: Date.now(),
      label: Math.random() > 0.5 ? "Batman" : "Hulk",
      confidence: parseFloat((Math.random() * (0.99 - 0.5) + 0.5).toFixed(2)),
      box: "[140, 210, 100, 190]"
    };
    
    setResults((prev) => [...prev, newResult]);
    
    setEvents((prev) => [
      ...prev,
      { id: Date.now() + 1, timestamp: getTime(), message: `Detected ${newResult.label} (${newResult.confidence})`, isError: false }
    ]);
  };

  const handleReset = () => {
    setStage("waiting");
    setEvents([]);
    setResults([]);
  };

  return (
    <div style={{ padding: "70px", fontFamily: "sans-serif", maxWidth: "1200px", margin: "0 auto" }}>
      <header style={{ marginBottom: "40px", borderBottom: "2px solid #333", paddingBottom: "50px" }}>
        <h1>Univision dashboard</h1>
        <div style={{ display: "flex", gap: "120px" }}>
          <button onClick={handleStart} disabled={stage === "running"} style={{ padding: "8px 16px", cursor: "pointer" }}>
            Start Pipeline
          </button>
          <button onClick={handleSimulateDetection} disabled={stage !== "running"} style={{ padding: "8px 16px", cursor: "pointer" }}>
            Simulate Detection
          </button>
          <button onClick={handleReset} style={{ padding: "8px 16px", cursor: "pointer" }}>
            Reset System
          </button>
        </div>
      </header>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
        <div style={{ border: "1px solid #ccc",padding: "15px", backgroundColor: "#fafafa" }}>
          <h3>1. Input Stage</h3>
          <div style={{ 
            width: "100%", 
            height: "200px", 
            backgroundColor: stage === "error" ? "#ffebee" : "#e0e0e0", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            border: "2px dashed #aaa"
          }}>
            {stage === "waiting" && <span>Waiting for feed...</span>}
            {stage === "running" && <span style={{ color: "green", fontWeight: "bold" }}>[ Live Feed Active ]</span>}
            {stage === "error" && <span style={{ color: "red", fontWeight: "bold" }}>[ NO SIGNAL ]</span>}
          </div>
        </div>
        <div style={{ border: "1px solid #ccc",padding: "15px", backgroundColor: "#fafafa" }}>
          <h3>2. Detection Stage</h3>
          <p>Current Status: 
            <strong style={{ 
              marginLeft: "8px",
              color: stage === "running" ? "green" : stage === "error" ? "red" : "gray" 
            }}>
              {stage.toUpperCase()}
            </strong>
          </p>
          
          <div style={{ borderTop: "1px solid #eee", paddingTop: "10px", marginTop: "10px" }}>
            <h4>Event Log</h4>
            <div style={{ height: "150px", overflowY: "auto", backgroundColor: "#1e1e1e", color: "#00ff00", padding: "10px", fontFamily: "monospace", fontSize: "14px" }}>
              {events.length === 0 ? <span style={{ color: "#888" }}>No events yet...</span> : null}
              {events.map((evt) => (
                <div key={evt.id} style={{ color: evt.isError ? "#ff5555" : "#00ff00", marginBottom: "4px" }}>
                  <span style={{ color: "#888" }}>[{evt.timestamp}]</span> {evt.message}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ border: "1px solid #ccc", padding: "15px", backgroundColor: "#fafafa" }}>
          <h3>3. Output Stage</h3>
          {results.length === 0 ? (
            <p style={{ fontStyle: "italic", color: "#666" }}>No detections yet.</p>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
              <thead>
                <tr style={{ backgroundColor: "#eee", textAlign: "left" }}>
                  <th style={{ padding: "8px", borderBottom: "2px solid #ccc" }}>Label</th>
                  <th style={{ padding: "8px", borderBottom: "2px solid #ccc" }}>Conf</th>
                  <th style={{ padding: "8px", borderBottom: "2px solid #ccc" }}>Box</th>
                </tr>
              </thead>
              <tbody>
                {results.map((res) => (
                  <tr key={res.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "8px" }}><strong>{res.label}</strong></td>
                    <td style={{ padding: "8px" }}>{res.confidence}</td>
                    <td style={{ padding: "8px", fontSize: "12px", color: "#666" }}>{res.box}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}