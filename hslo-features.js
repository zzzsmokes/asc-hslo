document.addEventListener("DOMContentLoaded", () => {
  console.log("hslo-features.js loaded");

  // Wait for the canvas to be initialized
  const waitForCanvas = setInterval(() => {
    const canvas = document.getElementById("game-display");
    if (canvas && canvas.getContext) {
      clearInterval(waitForCanvas);
      initializeFeatures(canvas);
    } else {
      console.log("Canvas not ready yet...");
    }
  }, 500);

  function initializeFeatures(canvas) {
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

    // Variables for FPS, ping, and STE
    let lastFrameTime = performance.now();
    let frameCount = 0;
    let fps = 0;
    let pingStartTime = 0;
    let ping = 0;
    let lastServerUpdate = performance.now();
    let serverTicks = 0;
    let ste = 0;

    // Get nickname and tag from existing inputs
    const nicknameInput = document.getElementById("nickname");
    const tagInput = document.getElementById("tag");
    if (!nicknameInput || !tagInput) {
      console.error("Nickname or tag input not found");
      return;
    }
    let nickname = nicknameInput.value || "Player1";
    let tag = tagInput.value || "TAG";

    // Update names when inputs change
    nicknameInput.addEventListener("input", () => {
      nickname = nicknameInput.value || "Player1";
    });
    tagInput.addEventListener("input", () => {
      tag = tagInput.value || "TAG";
    });

    // Calculate FPS
    function calculateFPS() {
      const now = performance.now();
      frameCount++;
      if (now - lastFrameTime >= 1000) {
        fps = Math.round((frameCount * 1000) / (now - lastFrameTime));
        frameCount = 0;
        lastFrameTime = now;
      }
      requestAnimationFrame(calculateFPS);
    }

    // Find the game's WebSocket connection
    let ws = null;
    const checkWebSocket = setInterval(() => {
      // This is a guess; we need to inspect main.bundle.js to find the actual WebSocket
      if (window.WebSocketInstance) { // Placeholder; adjust based on main.bundle.js
        ws = window.WebSocketInstance;
        clearInterval(checkWebSocket);
        setupWebSocketListeners();
      } else {
        console.log("WebSocket not found yet...");
      }
    }, 1000);

    function setupWebSocketListeners() {
      if (!ws) {
        console.error("WebSocket not found");
        return;
      }

      // Measure ping
      function measurePing() {
        if (ws.readyState === WebSocket.OPEN) {
          pingStartTime = performance.now();
          ws.send(JSON.stringify({ type: "ping" }));
        } else {
          console.warn("WebSocket not open, state:", ws.readyState);
        }
        setTimeout(measurePing, 2000); // Measure every 2 seconds
      }

      // Override onmessage to track ping and STE
      const originalOnMessage = ws.onmessage || (() => {});
      ws.onmessage = (event) => {
        originalOnMessage(event);
        try {
          const data = JSON.parse(event.data);
          if (data.type === "pong") {
            ping = Math.round(performance.now() - pingStartTime);
          }

          // Calculate STE
          const now = performance.now();
          serverTicks++;
          if (now - lastServerUpdate >= 1000) {
            ste = Math.round((serverTicks * 1000) / (now - lastServerUpdate));
            serverTicks = 0;
            lastServerUpdate = now;
          }
        } catch (e) {
          console.error("Error parsing WebSocket message:", e);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket closed");
      };

      measurePing();
    }

    // Display FPS, ping, STE, and names on the canvas
    function drawStats() {
      if (!ctx) {
        console.error("Canvas context not available");
        return;
      }

      // Clear the top-left area to avoid overlapping text
      ctx.clearRect(0, 0, 200, 100);

      ctx.font = "16px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "left";
      ctx.fillText(`FPS: ${fps}`, 10, 30);
      ctx.fillText(`Ping: ${ping} ms`, 10, 50);
      ctx.fillText(`STE: ${ste} ticks/s`, 10, 70);
      ctx.fillText(`Name: ${nickname} [${tag}]`, 10, 90);

      requestAnimationFrame(drawStats);
    }

    // Start the features
    calculateFPS();
    drawStats();
  }
});
