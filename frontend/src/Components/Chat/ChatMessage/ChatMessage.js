import React, { useState } from "react";
import { SandpackProvider, SandpackPreview, SandpackLayout } from "@codesandbox/sandpack-react";
import { atomDark } from "@codesandbox/sandpack-themes";
import './ChatMessage.css';

const ChatMessage = ({ role, text, explanation, component }) => {
  const [runCode, setRunCode] = useState(false);

  const code = component?.code || "";

  const handleCopy = () => {
    if (code) navigator.clipboard.writeText(code);
  };

  return (
    <div className={`chat-message ${role}`}>

      {/* Message Text */}
      {text && <div className="message-text-container"><p>{text}</p></div>}

      {/* Explanation */}
      {role === "assistant" && explanation?.length > 0 && (
        <div className="explanation-box">
          {explanation.map((exp, i) => <p key={i}>• {exp}</p>)}
        </div>
      )}

      {/* Component Box */}
      {role === "assistant" && code && (
        <div className="component-box">

          {/* Code Viewer */}
          <div className="file-card">
            <div className="file-card-header">
              <h3>Component.jsx</h3>
              <div className="file-card-controls">
                <button onClick={handleCopy}>Copy</button>
                <button onClick={() => setRunCode((prev) => !prev)} style={{ backgroundColor: "#ff0000ff" }}>
                  {runCode ? "Stop" : "Run"}
                </button>
              </div>
            </div>
            <div className="file-card-body">
              <pre>{code}</pre>
            </div>
          </div>

          {/* Live Preview */}
          {runCode && (
            <div className="output-box">
              <SandpackProvider
                template="react"
                theme={atomDark}
                files={{
                  "/App.js": { code },
                  "/index.js": {
                    code: `
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
                    `.trim(),
                  },
                  "/index.html": { code: `<div id="root"></div>` },
                }}
              >
                <SandpackLayout>
                  <SandpackPreview style={{ height: "60vh", border: "1px solid #444" }} />
                </SandpackLayout>
              </SandpackProvider>
            </div>
          )}

        </div>
      )}

    </div>
  );
};

export default ChatMessage;
