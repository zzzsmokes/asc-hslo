(function () {
  // Assuming there's a canvas element with id="canvas" (common for such games)
  const canvas = document.querySelector("canvas");
  const ctx = canvas ? canvas.getContext("2d") : null;

  // WebSocket connection (adjust URL if different)
  const ws = new WebSocket("wss://eu.senpa.io:2001/");

  // Variables for FPS, ping, and STE
  let lastFrameTime = performance.now();
  let frameCount = 0;
  let fps = 0;
  let pingStartTime = 0;
  let ping = 0;
  let lastServerUpdate = performance.now();
  let serverTicks = 0;
  let ste = 0;

  // Variables for two names
  let nickname = "Player1";
  let tag = "TAG";

  // Add input fields for two names
  function addNameInputs() {
    const inputDiv = document.createElement("div");
    inputDiv.style.position = "absolute";
    inputDiv.style.top = "10px";
    inputDiv.style.left = "10px";
    inputDiv.style.zIndex = "1000";
    inputDiv.style.background = "rgba(0, 0, 0, 0.5)";
    inputDiv.style.padding = "10px";
    inputDiv.style.borderRadius = "5px";
    inputDiv.style.color = "white";

    const nicknameInput = document.createElement("input");
    nicknameInput.type = "text";
    nicknameInput.value = nickname;
    nicknameInput.placeholder = "Nickname";
    nicknameInput.style.marginRight = "10px";

    const tagInput = document.createElement("input");
    tagInput.type = "text";
    tagInput.value = tag;
    tagInput.placeholder = "Tag";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Set Names";
    submitButton.style.marginLeft = "10px";

    submitButton.addEventListener("click", () => {
      nickname = nicknameInput.value || "Player1";
      tag = tagInput.value || "TAG";
      // Optionally send names to the server via WebSocket
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: "setNames", nickname, tag }));
      }
    });

    inputDiv.appendChild(nicknameInput);
    inputDiv.appendChild(tagInput);
    inputDiv.appendChild(submitButton);
    document.body.appendChild(inputDiv);
  }

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

  // Measure ping
  function measurePing() {
    if (ws.readyState === WebSocket.OPEN) {
      pingStartTime = performance.now();
      ws.send(JSON.stringify({ type: "ping" }));
    }
    setTimeout(measurePing, 2000); // Measure every 2 seconds
  }

  // Handle WebSocket messages
  ws.onopen = () => {
    console.log("Connected to server");
    measurePing(); // Start ping measurement
  };

  ws.onmessage = (event) => {
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

  // Initialize everything
  addNameInputs();
  calculateFPS();
  drawStats();
})();