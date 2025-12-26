import React, { useState } from "react";
import {
  SandpackProvider,
  SandpackPreview,
  SandpackLayout,
} from "@codesandbox/sandpack-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { atomDark } from "@codesandbox/sandpack-themes";
import "../styles/ChatMessage.css";

const ChatMessage = ({ role, text, explanation, component }) => {
  const [runCode, setRunCode] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const code = component?.code || "";

  const handleCopy = () => {
    if (code) navigator.clipboard.writeText(code);
  };

  const handleDownload = () => {
    if (!code) return;
    const blob = new Blob([code], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Component.jsx";
    a.click();
    URL.revokeObjectURL(url);
  };

  const toggleFullScreen = () => {
    setIsFullScreen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`fullscreen-overlay ${isFullScreen ? "show" : ""}`}
        onClick={toggleFullScreen}
      ></div>

      <div className={`chat-message ${role}`}>
        {text && (
          <div className="message-text-container">
            <p>{text}</p>
          </div>
        )}

        {role === "assistant" && explanation?.length > 0 && (
          <div className="explanation-box">
            {explanation.map((exp, i) => (
              <p key={i}>• {exp}</p>
            ))}
          </div>
        )}

        {role === "assistant" && code && (
          <div className={`component-box ${isFullScreen ? "fullscreen" : ""}`}>
            <div className="file-card">
              <div className="file-card-header">
                <h3>Component.jsx</h3>

                <div className="file-card-controls">
                  {!isFullScreen && (
                    <button onClick={toggleFullScreen}>Fullscreen</button>
                  )}

                  {isFullScreen && (
                    <button onClick={toggleFullScreen}>Exit Fullscreen</button>
                  )}

                  <button onClick={handleCopy}>Copy</button>
                  <button onClick={() => setRunCode((prev) => !prev)}>
                    {runCode ? "Stop" : "Run"}
                  </button>
                  <button onClick={handleDownload}>Download</button>
                </div>
              </div>
              <div className="file-card-body">
                <SyntaxHighlighter
                  className="code"
                  language="jsx"
                  style={oneDark}
                  wrapLongLines={true}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>
            {runCode && (
              <div
                className="output-box"
                style={{
                  width: "100%",
                  height: isFullScreen ? "80vh" : "50vh",
                  display: "flex",
                  borderRadius: "16px",
                  overflowX: "auto",
                  overflowY: "auto",
                }}
              >
                <SandpackProvider
                  template="react"
                  theme={atomDark}
                  files={{
                    "/App.js": `
import React from "react";
import Component from "./Component";
export default function App() {
  return <Component />;
}
        `,
                    "/Component.jsx": code,
                    "/index.js": `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
createRoot(document.getElementById("root")).render(<App />);
        `,
                    "/index.html": `<div id="root"></div>`,
                  }}
                >
                  <SandpackLayout
                    style={{
                      flex: 1,
                      height: "100%",
                      minWidth: "600px",
                      display: "flex",
                    }}
                  >
                    <SandpackPreview
                      style={{
                        flex: 1,
                        width: "100%",
                        height: isFullScreen ? "80vh" : "50vh",
                        border: 0,
                        minWidth: "600px",
                      }}
                    />
                  </SandpackLayout>
                </SandpackProvider>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ChatMessage;
