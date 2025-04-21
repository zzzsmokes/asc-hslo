document.addEventListener("DOMContentLoaded", () => {
  console.log("hslo-features.js loaded");

  // Wait for the canvas to be ready
  let canvas = document.getElementById("game-display");
  let ctx = null;
  const checkCanvas = setInterval(() => {
    canvas = document.getElementById("game-display");
    ctx = canvas ? canvas.getContext("2d") : null;
    if (ctx) {
      console.log("Canvas ready");
      clearInterval(checkCanvas);
      drawStats();
    } else {
      console.log("Canvas not ready yet...");
    }
  }, 100);

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

  // Look for the game's WebSocket (we need to find the correct variable)
  let ws = null;
  const checkWebSocket = setInterval(() => {
    // This is a guess; we need to find the actual WebSocket variable in main.bundle.js
    if (window.WebSocketInstance) { // Replace with the actual variable name
      ws = window.WebSocketInstance;
      clearInterval(checkWebSocket);
      setupWebSocketListeners();
    } else {
      console.log("WebSocket not found yet...");
    }
  }, 100);

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
      }
      setTimeout(measurePing, 2000); // Measure every 2 seconds
    }

    // Store the original onmessage handler
    const originalOnMessage = ws.onmessage || (() => {});
    ws.onmessage = (event) => {
      console.log("WebSocket message received:", event.data);
      originalOnMessage(event);

      const data = JSON.parse(event.data);
      if (data.type === "pong") {
        ping = Math.round(performance.now() - pingStartTime);
      }

      // Calculate STE (Server Tick Efficiency)
      const now = performance.now();
      serverTicks++;
      if (now - lastServerUpdate >= 1000) {
        ste = Math.round((serverTicks * 1000) / (now - lastServerUpdate));
        serverTicks = 0;
        lastServerUpdate = now;
      }
    };

    measurePing();
  }

  // Display FPS, ping, STE, and names on the canvas
  function drawStats() {
    if (!ctx) return;
    ctx.font = "16px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "left";
    ctx.fillText(`FPS: ${fps}`, 10, 30);
    ctx.fillText(`Ping: ${ping} ms`, 10, 50);
    ctx.fillText(`STE: ${ste} ticks/s`, 10, 70);
    ctx.fillText(`Name: ${nickname} [${tag}]`, 10, 90);
    requestAnimationFrame(drawStats);
  }

  // Start calculating FPS
  calculateFPS();
});
