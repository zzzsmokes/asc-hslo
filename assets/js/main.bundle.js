( () => {
    "use strict";
    class t {
        constructor() {
            this.events = {}
        }
        on(t, e) {
            this.events[t] || (this.events[t] = []),
            this.events[t].push(e)
        }
        once(t, e) {
            const i = (...s) => {
                e(...s),
                this.off(t, i)
            };
            this.on(t, i)
        }
        emit(t, ...e) {
            this.events[t] && this.events[t].forEach((t => {
                t(...e)
            }))
        }
        off(t, e) {
            this.events[t] && (this.events[t] = this.events[t].filter((t => t !== e)))
        }
        removeAllListeners(t) {
            this.events[t] && delete this.events[t]
        }
        listeners(t) {
            return this.events[t] || []
        }
        resetEvents() {
            this.events = {}
        }
    }
    class e {
        constructor() {
            this.buffer = new Uint8Array(16),
            this.offset = 0
        }
        ensureCapacity(t) {
            const e = this.offset + t;
            if (e > this.buffer.length) {
                let t = 2 * this.buffer.length;
                for (; t < e; )
                    t *= 2;
                const i = new Uint8Array(t);
                i.set(this.buffer),
                this.buffer = i
            }
        }
        writeInt8(t) {
            this.ensureCapacity(1),
            new DataView(this.buffer.buffer).setInt8(this.offset, t),
            this.offset += 1
        }
        writeUInt8(t) {
            this.ensureCapacity(1),
            new DataView(this.buffer.buffer).setUint8(this.offset, t),
            this.offset += 1
        }
        writeInt16(t) {
            this.ensureCapacity(2),
            new DataView(this.buffer.buffer).setInt16(this.offset, t, !0),
            this.offset += 2
        }
        writeUInt16(t) {
            this.ensureCapacity(2),
            new DataView(this.buffer.buffer).setUint16(this.offset, t, !0),
            this.offset += 2
        }
        writeInt32(t) {
            this.ensureCapacity(4),
            new DataView(this.buffer.buffer).setInt32(this.offset, t, !0),
            this.offset += 4
        }
        writeUInt32(t) {
            this.ensureCapacity(4),
            new DataView(this.buffer.buffer).setUint32(this.offset, t, !0),
            this.offset += 4
        }
        writeFloat(t) {
            this.ensureCapacity(4),
            new DataView(this.buffer.buffer).setFloat32(this.offset, t, !0),
            this.offset += 4
        }
        writeDouble(t) {
            this.ensureCapacity(8),
            new DataView(this.buffer.buffer).setFloat64(this.offset, t, !0),
            this.offset += 8
        }
        writeString8(t) {
            this.writeUInt8(t.length);
            for (let e = 0; e < t.length; e++)
                this.writeUInt8(t.charCodeAt(e))
        }
        writeLongString8(t) {
            this.writeUInt16(t.length);
            for (let e = 0; e < t.length; e++)
                this.writeUInt8(t.charCodeAt(e))
        }
        writeString16(t) {
            this.writeUInt8(t.length);
            for (let e = 0; e < t.length; e++)
                this.writeUInt16(t.charCodeAt(e))
        }
        writeLongString16(t) {
            this.writeUInt16(t.length);
            for (let e = 0; e < t.length; e++)
                this.writeUInt16(t.charCodeAt(e))
        }
        getBuffer() {
            return this.buffer.subarray(0, this.offset)
        }
    }
    class i {
        constructor(t) {
            this.view = new DataView(t),
            this.index = 0,
            this.maxIndex = t.byteLength
        }
        readInt8() {
            const t = this.view.getInt8(this.index, !0);
            return this.index += 1,
            t
        }
        readUInt8() {
            const t = this.view.getUint8(this.index, !0);
            return this.index += 1,
            t
        }
        readInt16() {
            const t = this.view.getInt16(this.index, !0);
            return this.index += 2,
            t
        }
        readUInt16() {
            const t = this.view.getUint16(this.index, !0);
            return this.index += 2,
            t
        }
        readInt32() {
            const t = this.view.getInt32(this.index, !0);
            return this.index += 4,
            t
        }
        readUInt32() {
            const t = this.view.getUint32(this.index, !0);
            return this.index += 4,
            t
        }
        readFloat() {
            const t = this.view.getFloat32(this.index, !0);
            return this.index += 4,
            t
        }
        readDouble() {
            const t = this.view.getFloat64(this.index, !0);
            return this.index += 8,
            t
        }
        readString8() {
            const t = this.readUInt8();
            let e = "";
            for (let i = 0; i < t && !this.end; i++) {
                const t = this.readUInt8();
                e += String.fromCharCode(t)
            }
            return e
        }
        readLongString8() {
            const t = this.readUInt16();
            let e = "";
            for (let i = 0; i < t && !this.end; i++) {
                const t = this.readUInt8();
                e += String.fromCharCode(t)
            }
            return e
        }
        readUTF8StringZero() {
            let t = "";
            for (; this.index < this.maxIndex; ) {
                const e = this.readUInt8();
                if (!e)
                    break;
                t += String.fromCharCode(e)
            }
            return decodeURIComponent(escape(t))
        }
        readString16() {
            const t = this.readUInt8();
            let e = "";
            for (let i = 0; i < t && !this.end; i++) {
                const t = this.readUInt16();
                e += String.fromCharCode(t)
            }
            return e
        }
        readLongString16() {
            const t = this.readUInt16();
            let e = "";
            for (let i = 0; i < t && !this.end; i++) {
                const t = this.readUInt16();
                e += String.fromCharCode(t)
            }
            return e
        }
        decodeString(t) {
            return decodeURI(t)
        }
        get bytesLeft() {
            return this.maxIndex - this.index
        }
        get end() {
            return this.index === this.maxIndex
        }
    }
    class s {
        constructor() {
            this.left = -8e3,
            this.top = -8e3,
            this.right = 8e3,
            this.bottom = 8e3,
            this.width = 16e3,
            this.height = 16e3
        }
        update(t, e, i, s) {
            this.left = t,
            this.top = e,
            this.right = i,
            this.bottom = s,
            this.width = i - t,
            this.height = s - e
        }
    }
    class n {
        constructor(t=255, e=255, i=255) {
            this.value = n.rgb2Hex(t, e, i),
            this.darkerValue = n.darken(t, e, i)
        }
        static rgb2Hex(t, e, i) {
            if (t < 0 || t > 255 || e < 0 || e > 255 || i < 0 || i > 255)
                throw new Error("Each color component must be between 0 and 255");
            return `#${(1 << 24 | t << 16 | e << 8 | i).toString(16).slice(1)}`
        }
        static randomColor() {
            const t = [255, Math.floor(100 * Math.random()), Math.floor(256 * Math.random())];
            return t.sort(( () => Math.random() - .5)),
            n.rgb2Hex(...t)
        }
        static darken(t, e, i, s=1) {
            return t = t * (1 - (s /= 10)) | 0,
            e = e * (1 - s) | 0,
            i = i * (1 - s) | 0,
            n.rgb2Hex(t, e, i)
        }
    }
    const a = new class {
        constructor() {
            this.clients = [],
            this.activeClient = null,
            this.maxClientsAllowed = 2
        }
        addClient(t) {
            if (!(this.clients.length > this.maxClientsAllowed))
                return this.clients.push(t),
                1 === this.clients.length ? (this.setClient(t),
                this.log("Added Parent:", t)) : 2 === this.clients.length && this.log("Added Child:", t),
                t;
            this.log(`Cannot add client. Max clients (${this.maxClientsAllowed}) reached.`)
        }
        removeClient(t) {
            const e = this.clients.indexOf(t);
            if (-1 !== e) {
                if (this.activeClient === t) {
                    const e = this.getNextClient(t);
                    e ? (this.setClient(e),
                    this.log("Active client set to:", this.activeClient)) : (this.activeClient = null,
                    this.log("No available clients left."))
                }
                this.clients.splice(e, 1),
                this.log("Deleted client:", t)
            }
        }
        getNextClient(t) {
            if (this.clients.length > 1) {
                const e = (this.clients.indexOf(t) + 1) % this.clients.length;
                return this.clients[e]
            }
            return null
        }
        setClient(t) {
            this.activeClient = t
        }
        getActiveClient() {
            return this.activeClient
        }
        getClients() {
            return this.clients
        }
        resetToParent() {
            const t = this.clients.find((t => "parent" === t.clientType));
            t && this.setClient(t)
        }
        totalPlaying() {
            return this.clients.reduce(( (t, e) => t + (e.playing ? 1 : 0)), 0)
        }
        getParent() {
            return this.clients.find((t => "parent" === t.clientType)) || null
        }
        getChild() {
            return this.clients.find((t => "child" === t.clientType)) || null
        }
        eachClientByPriority(t) {
            if (0 === this.clients.length)
                return;
            let e = null
              , i = null;
            for (let s = 0, n = 0; s < this.clients.length; s++,
            n++)
                i = this.clients[s],
                i && (t(i, e, n, s),
                e = i)
        }
        findClientOrigin(t=null, e=null) {
            if (t)
                return this.clients.find((e => e.clientID === t));
            if (e)
                for (const t of this.clients)
                    for (const i of Object.values(t.stores.cellsByID))
                        if (i.id === e)
                            return t;
            return null
        }
        log(t, ...e) {
            console.log("%c[Multibox]", "color: #3d8fb3; font-weight: bold;", t, ...e)
        }
    }
      , o = new class {
        constructor() {
            this.canvas = null,
            this.ctx = null,
            this.graphicsQualityFactor = 1,
            this.camera = {
                x: 0,
                y: 0,
                viewScale: 1,
                zoom: .55
            },
            this.mouse = {
                worldX: 0,
                worldY: 0,
                clientX: 0,
                clientY: 0
            },
            this.botsFocusClientID = null,
            this.removedCells = [],
            this.pelletsFrame = [],
            this.cellsFrame = [],
            this.stats = {
                lastFrameTime: 0,
                frameCount: 0
            }
        }
        start() {
            this.canvas = document.getElementById("game-display"),
            this.ctx = this.canvas.getContext("2d"),
            this.minimapCanvas = document.getElementById("minimap-canvas"),
            this.minimapCtx = this.minimapCanvas.getContext("2d"),
            this.statsElement = document.getElementById("stats"),
            this.canvas.addEventListener("wheel", (t => {
                this.setZoom(t)
            }
            ), {
                passive: !0
            }),
            window.addEventListener("resize", ( () => {
                this.setScreenSize()
            }
            ), {
                passive: !0
            }),
            this.canvas.addEventListener("mousemove", (t => {
                this.mouse.clientX = t.clientX,
                this.mouse.clientY = t.clientY
            }
            )),
            this.setScreenSize(),
            this.loop()
        }
        setScreenSize() {
            this.canvas.width = window.innerWidth * this.graphicsQualityFactor,
            this.canvas.height = window.innerHeight * this.graphicsQualityFactor,
            this.drawMinimap(),
            this.drawLeaderboard()
        }
        setZoom(t) {
            const e = (t.wheelDelta ? t.wheelDelta / 120 : -t.detail / 3) || 0;
            let i = this.camera.zoom * 1.1 ** e;
            this.camera.zoom = Math.max(.0014, Math.min(i, 2))
        }
        updateZoom() {
            const t = Math.max(this.canvas.width / 1920, this.canvas.height / 1080) * this.camera.zoom;
            this.camera.viewScale = (9 * this.camera.viewScale + t) / 10
        }
        updateMouseWorld() {
            const t = a.getActiveClient()
              , e = a.getNextClient(t);
            this.mouse.worldX = (this.mouse.clientX - this.canvas.width / 2) / this.camera.viewScale + this.camera.x,
            this.mouse.worldY = (this.mouse.clientY - this.canvas.height / 2) / this.camera.viewScale + this.camera.y,
            g.stopMoving ? a.clients.forEach((t => {
                let e = 0
                  , i = 0;
                t.playing ? (e = t.playerPoint.x,
                i = t.playerPoint.y) : (e = t.spectatePoint.x,
                i = t.spectatePoint.y),
                t.sendCursorPosition(e, i)
            }
            )) : (t && t.sendCursorPosition(this.mouse.worldX, this.mouse.worldY),
            e && !e.playing && e.sendCursorPosition(this.mouse.worldX, this.mouse.worldY),
            g.bots.length && g.bots.forEach((t => {
                t.sendCursorPosition(this.mouse.worldX, this.mouse.worldY)
            }
            )))
        }
        setCamera() {
            this.ctx.translate(this.canvas.width / 2, this.canvas.height / 2),
            this.ctx.scale(this.camera.viewScale, this.camera.viewScale),
            this.ctx.translate(-this.camera.x, -this.camera.y)
        }
        updateCamera() {
            this.updateZoom();
            const t = a.getActiveClient()
              , e = a.getClients()
              , i = a.totalPlaying();
            let s = 0
              , n = 0;
            e.forEach((t => {
                t.calculatePlayerPositionAndMass(),
                t.stores.ownedCells.length && (s += t.playerPoint.x / i,
                n += t.playerPoint.y / i)
            }
            )),
            i > 0 && (this.camera.x = (this.camera.x + s) / 2,
            this.camera.y = (this.camera.y + n) / 2),
            t && 0 === i && (this.camera.x = (29 * this.camera.x + t.spectatePoint.x) / 30,
            this.camera.y = (29 * this.camera.y + t.spectatePoint.y) / 30)
        }
        clearCanvas() {
            this.ctx.fillStyle = "#111111",
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
        }
        drawGrid() {
            this.ctx.save(),
            this.ctx.lineWidth = 1,
            this.ctx.strokeStyle = "#282828";
            const t = this.canvas.width / this.camera.viewScale
              , e = this.canvas.height / this.camera.viewScale
              , i = (-this.camera.x + t / 2) % 50
              , s = (-this.camera.y + e / 2) % 50;
            this.ctx.scale(this.camera.viewScale, this.camera.viewScale),
            this.ctx.beginPath();
            for (let s = i; s < t; s += 50)
                this.ctx.moveTo(s, 0),
                this.ctx.lineTo(s, e);
            for (let i = s; i < e; i += 50)
                this.ctx.moveTo(0, i),
                this.ctx.lineTo(t, i);
            this.ctx.stroke(),
            this.ctx.restore()
        }
        drawSectors() {
            const t = a.getActiveClient();
            let e = {
                left: -8e3,
                top: -8e3,
                right: 8e3,
                bottom: 8e3
            };
            t && (e = t.border);
            const i = (e.right - e.left) / 5
              , s = (e.bottom - e.top) / 5;
            this.ctx.strokeStyle = "#222222",
            this.ctx.lineWidth = 26,
            this.ctx.lineCap = "round",
            this.ctx.lineJoin = "round";
            for (let t = 0; t <= 5; t++) {
                const s = e.left + t * i;
                this.ctx.beginPath(),
                this.ctx.moveTo(s, e.top),
                this.ctx.lineTo(s, e.bottom),
                this.ctx.stroke()
            }
            for (let t = 0; t <= 5; t++) {
                const i = e.top + t * s;
                this.ctx.beginPath(),
                this.ctx.moveTo(e.left, i),
                this.ctx.lineTo(e.right, i),
                this.ctx.stroke()
            }
            this.ctx.fillStyle = "#222222",
            this.ctx.font = "700 740px ubuntu",
            this.ctx.textAlign = "center",
            this.ctx.textBaseline = "middle";
            for (let t = 0; t < 5; t++)
                for (let n = 0; n < 5; n++) {
                    const a = String.fromCharCode(65 + t) + (n + 1)
                      , o = e.left + (n + .5) * i
                      , l = e.top + (t + .5) * s;
                    this.ctx.fillText(a, o, l)
                }
        }
        drawMapBorder() {
            const t = a.getActiveClient();
            let e = {
                left: -8000,
                top: -8000,
                right: 8000,
                bottom: 8000
            };
            if (t) e = t.border;
        
            const i = 50;
            this.ctx.lineWidth = i;
            this.ctx.lineCap = "round";
            this.ctx.lineJoin = "round";
            this.ctx.strokeStyle = "#DDDDDD";
            
            this.ctx.beginPath();
            this.ctx.moveTo(e.left - i, e.bottom + i);
            this.ctx.lineTo(e.right + i, e.bottom + i);
            this.ctx.lineTo(e.right + i, e.top - i);
            this.ctx.lineTo(e.left - i, e.top - i);
            this.ctx.closePath();
            this.ctx.stroke();
        }
        
        drawMapImage() {
            let canvas = document.getElementById('c'),ctx = canvas.getContext('2d');
            const image = new Image();
            image.onload = () => {
              ctx.imageSmoothingEnabled = false;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(image, 50, 50,500,500);
            };
            image.src = 'https://i.imgur.com/un4GhNJ.jpg';
        }        
        drawMinimap() {
            const t = a.getActiveClient()
              , e = (t, e, i) => t + (e - t) * i
              , i = this.minimapCanvas
              , s = this.minimapCtx
              , n = .2 * Math.min(window.innerWidth, window.innerHeight);
            i.width = n,
            i.height = n,
            s.clearRect(0, 0, i.width, i.height);
            const o = i.width / 5
              , l = i.height / 5;
            s.strokeStyle = "#DDD",
            s.fillStyle = "#A2A2A2",
            s.textBaseline = "middle",
            s.textAlign = "center";
            const r = Math.min(o, l) / 3;
            s.font = `500 ${r}px Ubuntu`;
            for (let t = 0; t < 5; t++) {
                const e = (t + .5) * o;
                for (let i = 0; i < 5; i++) {
                    const n = (i + .5) * l;
                    s.fillText("ABCDE"[i] + "12345"[t], e, n)
                }
            }
            let h = {
                left: -8e3,
                top: -8e3,
                right: 8e3,
                bottom: 8e3
            };
            t && (h = t.border);
            const c = this.camera.x
              , d = this.camera.y
              , u = i.width / (h.right - h.left)
              , g = i.height / (h.bottom - h.top)
              , m = (c - h.left) * u
              , f = (d - h.top) * g
              , p = Math.floor(m / o)
              , w = Math.floor(f / l);
            s.fillStyle = "rgba(255, 255, 255, 0.13)",
            s.fillRect(p * o, w * l, o, l),
            s.fillStyle = "red",
            s.beginPath(),
            s.arc(m, f, 5, 0, 2 * Math.PI),
            s.fill();
            let y = [];
            t && (y = t.stores.minimap),
            y.forEach((t => {
                t.prevX = e(t.prevX, t.x, .01),
                t.prevY = e(t.prevY, t.y, .01);
                const i = (t.prevX - h.left) * u
                  , n = (t.prevY - h.top) * g;
                s.fillStyle = t.color || "#00F",
                s.beginPath(),
                s.arc(i, n, 5, 0, 2 * Math.PI),
                s.fill(),
                s.font = "12px Ubuntu",
                s.textAlign = "center",
                s.textBaseline = "bottom",
                s.strokeStyle = "#000",
                s.lineWidth = 1,
                s.strokeText(t.nickname, i, n - 8),
                s.fillStyle = "#FFFFFF",
                s.fillText(t.nickname, i, n - 8)
            }
            ))
        }
        drawLeaderboard() {
            const t = a.getActiveClient();
            if (!t)
                return;
            const e = {
                items: t.stores.leaderboard.map((t => ({
                    name: t.nickname,
                    pos: t.position,
                    mass: t.totalMass,
                    isMe: t.isMe
                })))
            }
              , i = document.getElementById("leaderboard-canvas")
              , s = i.getContext("2d")
              , n = .23 * Math.min(window.innerWidth, window.innerHeight);
            i.width = n;
            const o = Math.min(10, e.items.length)
              , l = 47 + 23 * o
              , r = i.width / 250
              , h = l / (32 + 23 * o + 15 + 15)
              , c = Math.min(r, h) * 1;
            const widthAlign = i.width
            i.height = l * c,
            s.clearRect(0, 0, i.width, i.height),
            s.fillStyle = "#FFFFFF",
            s.font = `500 ${30 * c}px Ubuntu`;
            s.textAlign = "right"
            s.fillText(" vsczy - Ascending", widthAlign, 32 * c)
            s.font = `500 ${20 * c}px Ubuntu`,
            s.textAlign = "right",
            s.textBaseline = "top",
            e.items.slice(0, 10).forEach(( (t, e) => {
                
                const massWidth = s.measureText(t.mass).width + 10;
                const i = 32 * c + 15 * c + e * (23 * c);
                var n;
                s.fillStyle = t.isMe ? "#FFD700" : "#FFFFFF",
                s.fillText(`[${n = t.mass,
                    n >= 1e3 ? (n / 1e3).toFixed(1) + "k" : n.toString()}]`, widthAlign, i);
                s.fillText(t.name, widthAlign - massWidth - 10 * c, i); // adjust spacing                
            }
            ))
        }
        drawActivePlayers() {
            const canvas = document.getElementById("active-players-canvas");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            const width = canvas.width;
            const height = canvas.height;
            
            // Dynamic height based on number of players
            const numPlayers = g.activePlayers.length;
            const itemHeight = 23;
            const totalHeight = 32 + 15 + numPlayers * itemHeight + 15; // Similar to leaderboard
            const scale = Math.min(width / 200, totalHeight / (32 + numPlayers * itemHeight + 15));
            
            canvas.height = totalHeight * scale;
            ctx.clearRect(0, 0, width, canvas.height);
            
            ctx.fillStyle = "#FFFFFF";
            ctx.font = `500 ${30 * scale}px Ubuntu`;
            ctx.textAlign = "right";
            ctx.fillText("Active Players", width - 10, 32 * scale);
            
            ctx.font = `500 ${20 * scale}px Ubuntu`;
            ctx.textBaseline = "top";
            g.activePlayers.slice(0, 10).forEach((player, index) => {
                const y = 32 * scale + 15 * scale + index * (23 * scale);
                const massWidth = ctx.measureText(player.mass).width + 10;
                ctx.fillStyle = "#FFFFFF";
                ctx.fillText(`[${player.mass >= 1000 ? (player.mass / 1000).toFixed(1) + "k" : player.mass}]`, width - 10, y);
                ctx.fillText(player.nickname, width - massWidth - 20 * scale, y);
            });
        }
        loop() {
            const now = Date.now();
            const delta = now - this.stats.lastFrameTime;
        
            // Calculate FPS
            this.stats.frameCount++;
            if (delta >= 1000) {
                g.stats.fps = Math.round((this.stats.frameCount * 1000) / delta);
                this.stats.frameCount = 0;
                this.stats.lastFrameTime = now;
            }
        
            // Update stats
            this.updateMouseWorld(),
            this.updateCamera(),
            this.updateScene(now),
            this.updateStatsDisplay(),
            this.drawMinimap(),
            this.drawLeaderboard(),
            this.drawActivePlayers(), // Add this to render active players
            this.drawChatMessages(),  // Add this to render chat messages
            requestAnimationFrame(( () => this.loop()))
        }
        drawChatMessages() {
            const canvas = document.getElementById("chat-canvas");
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            const width = canvas.width;
            const height = canvas.height;
            
            ctx.clearRect(0, 0, width, height);
            
            ctx.fillStyle = "#FFFFFF";
            ctx.font = "500 20px Ubuntu";
            ctx.textAlign = "left";
            ctx.textBaseline = "top";
            
            const lineHeight = 25;
            const maxLines = Math.floor(height / lineHeight);
            const startIndex = Math.max(0, g.chatMessages.length - maxLines);
            
            g.chatMessages.slice(startIndex).forEach((msg, index) => {
                const client = a.findClientOrigin(msg.clientID);
                const nickname = client ? client.stores.clientsByID[msg.clientID]?.nickname : "Unknown";
                const text = `${nickname}: ${msg.message}`;
                const y = index * lineHeight;
                
                // Split long messages into multiple lines
                const maxWidth = width - 20;
                let line = "";
                let lines = [];
                const words = text.split(" ");
                
                for (let word of words) {
                    const testLine = line + word + " ";
                    const metrics = ctx.measureText(testLine);
                    if (metrics.width > maxWidth) {
                        lines.push(line.trim());
                        line = word + " ";
                    } else {
                        line = testLine;
                    }
                }
                if (line) lines.push(line.trim());
                
                lines.forEach((lineText, lineIndex) => {
                    const lineY = y + lineIndex * lineHeight;
                    if (lineY + lineHeight <= height) {
                        ctx.fillStyle = msg.color;
                        ctx.fillText(lineText, 10, lineY);
                    }
                });
            });
        }
        drawViewport(t, e, i, s, n, a, o, l) {
            t.strokeStyle = o,
            t.lineWidth = l,
            t.fillStyle = "white",
            t.font = "100px sans-serif",
            t.textAlign = "end",
            t.textBaseline = "hanging",
            t.fillText(e, n, s),
            t.beginPath(),
            t.moveTo(i, s),
            t.lineTo(n, s),
            t.lineTo(n, a),
            t.lineTo(i, a),
            t.closePath(),
            t.stroke()
        }
        drawCursorTracking() {
            const t = a.getActiveClient();
            if (t && t.playing) {
                const e = t.stores.ownedCells;
                this.ctx.lineWidth = 4,
                this.ctx.globalAlpha = .75,
                this.ctx.strokeStyle = "#FFFFFF",
                this.ctx.beginPath();
                for (let t = 0; t < e.length; t++)
                    this.ctx.moveTo(e[t].x, e[t].y),
                    this.ctx.lineTo(this.mouse.worldX, this.mouse.worldY);
                this.ctx.stroke(),
                this.ctx.globalAlpha = 1
            }
        }
        isInDisplay(t, e, i) {
            const s = this.canvas.width / 2 / this.camera.viewScale
              , n = this.canvas.height / 2 / this.camera.viewScale
              , a = this.camera.x
              , o = this.camera.y;
            return !(t + i < a - s || e + i < o - n || t - i > a + s || e - i > o + n)
        }
        reverseCheckView(t, e) {
            return a.clients.slice(0, e).some((e => e.isInView(t)))
        }
        updateScene(t) {
            a.getClients().forEach(( (e, i) => {
                e.updateBound(),
                e.stores.cellsToRemove.forEach((e => {
                    e.flags.isPellet && !g.settings.showPellets || (e.animate(t),
                    this.removedCells.push(e))
                }
                )),
                e.stores.cellsToRender.forEach((s => {
                    s.flags.isPellet && !g.settings.showPellets || (s.animate(t),
                    e.updateStaticBound(s),
                    this.reverseCheckView(s, i) || (s.flags.isPellet && this.pelletsFrame.push(s),
                    s.flags.isPellet || this.cellsFrame.push(s)))
                }
                ))
            }
            )),
            this.cellsFrame.sort(( (t, e) => t.size == e.size ? t.id - e.id : t.size - e.size)),
            this.clearCanvas(),
            g.settings.showGrid && this.drawGrid(),
            this.ctx.save(),
            this.setCamera(),
            g.settings.showSectors && this.drawSectors(),
            this.drawMapBorder(),
            g.settings.cursorTracking && this.drawCursorTracking(),
            this.removedCells.forEach((t => {
                this.isInDisplay(t.targetX, t.targetY, t.size) && t.draw(this.ctx)
            }
            )),
            this.pelletsFrame.forEach((t => {
                t.draw(this.ctx)
            }
            )),
            this.cellsFrame.forEach((t => {
                this.isInDisplay(t.targetX, t.targetY, t.size) && t.draw(this.ctx)
            }
            )),
            this.removedCells = [],
            this.pelletsFrame = [],
            this.cellsFrame = [],
            g.settings.showDebug && a.clients.forEach((t => {
                this.drawViewport(this.ctx, `${t.clientType} viewport`, t.bound.left, t.bound.top, t.bound.right, t.bound.bottom, "parent" === t.clientType ? "red" : "blue", 15)
            }
            )),
            g.settings.showDebug && g.spectators.forEach((t => {
                this.drawViewport(this.ctx, `${t.clientType} viewport`, t.bound.left, t.bound.top, t.bound.right, t.bound.bottom, "yellow", 15)
            }
            )),
            this.ctx.restore(),
            this.drawMinimap(),
            this.drawLeaderboard()
        }
        updateStatsDisplay() {
            // Calculate mass
            const client = a.getActiveClient();
            if (client) {
                g.stats.mass = client.stores.ownedCells.reduce((total, cell) => total + cell.mass, 0);
            } else {
                g.stats.mass = 0;
            }

            // Update the stats display
            if (this.statsElement) {
                this.statsElement.textContent = `Ping: ${g.stats.ping}ms | FPS: ${g.stats.fps} | STE: ${g.stats.ste.toFixed(1)}% | Mass: ${g.stats.mass}`;
            }
        }
        loop() {
            const now = Date.now();
            const delta = now - this.stats.lastFrameTime;

            // Calculate FPS
            this.stats.frameCount++;
            if (delta >= 1000) {
                g.stats.fps = Math.round((this.stats.frameCount * 1000) / delta);
                this.stats.frameCount = 0;
                this.stats.lastFrameTime = now;
            }

            // Update stats
            this.updateMouseWorld(),
            this.updateCamera(),
            this.updateScene(now),
            this.updateStatsDisplay(),
            requestAnimationFrame(( () => this.loop()))
        }
    }
      , l = new class {
        constructor() {
            this.downloads = new Map,
            this.canvas = document.createElement("canvas"),
            this.ctx = this.canvas.getContext("2d"),
            this.gifCanvas = document.createElement("canvas"),
            this.gifCtx = this.gifCanvas.getContext("2d"),
            this.initialize()
        }
        initialize() {
            this.canvas.width = 512,
            this.canvas.height = 512,
            this.canvas.style.imageRendering = "pixelated",
            this.canvas.imageSmoothingEnabled = !1,
            this.canvas.imageSmoothingQuality = "low",
            this.ctx.beginPath(),
            this.ctx.arc(256, 256, 256, 0, 2 * Math.PI, !0),
            this.ctx.closePath(),
            this.ctx.clip(),
            this.gifCanvas.width = 512,
            this.gifCanvas.height = 512,
            this.gifCanvas.style.imageRendering = "pixelated",
            this.gifCtx.imageSmoothingEnabled = !1,
            this.gifCtx.imageSmoothingQuality = "low"
        }
        setOrGetSkin(t) {
            if ("no-skin" === t)
                return !1;
            if (!t)
                return !1;
            const e = this.downloads.get(t);
            return "downloading" !== e && "error" !== e && (void 0 !== e ? e : void (t.endsWith(".gif") || this.download(t)))
        }
        download(t) {
            this.downloads.set(t, "downloading");
            const e = new Image;
            e.crossOrigin = "anonymous",
            e.onload = () => {
                this.ctx.clearRect(0, 0, 512, 512),
                this.ctx.drawImage(e, 0, 0, 512, 512);
                const i = this.canvas.toDataURL();
                e.onload = null,
                e.src = i,
                this.downloads.set(t, e),
                this.log("Successfully added skin:", t)
            }
            ,
            e.onerror = () => {
                this.downloads.set(t, "error")
            }
            ,
            e.src = t
        }
        downloadGif(t) {
            this.downloads.set(t, "downloading");
            try {
                gifler(t).get((e => {
                    e.animateInCanvas(this.gifCanvas),
                    this.downloads.set(t, this.gifCanvas),
                    this.log("Successfully added GIF skin:", t)
                }
                ), (e => {
                    this.downloads.set(t, "error")
                }
                ))
            } catch (e) {
                this.downloads.set(t, "error"),
                this.log("Unexpected error during GIF loading:", t, e)
            }
        }
        log(t, ...e) {
            console.log("%c[Skins]", "color: rgb(176, 39, 69); font-weight: bold;", t, ...e)
        }
    }
      , r = new class {
        constructor() {
            this.fontFamily = "Ubuntu",
            this.fontWeight = "600",
            this.textColor = "#FFFFFF",
            this.textStrokeColor = "#000000",
            this.nickCaches = new Map,
            this.massCaches = new Map,
            this.maxCacheLife = 1e3,
            this.massUpdateInterval = 500,
            this.quality = .38,
            this.canvasPool = [],
            this.nickShadowCtx = this.createShadowContext(),
            this.massShadowCtx = this.createShadowContext(),
            this.initializePool(100),
            this.startCleaner()
        }
        drawNickname(t, e, i, s) {
            if (!t.nickname)
                return;
            const n = Date.now()
              , a = t.targetSize * e * i;
            if (a < 20)
                return;
            const o = this.nickCaches.get(t.nickname) || this.createNickCache(t.nickname);
            o.lastUsedAt = n;
            const l = Math.min(Math.floor(a / 50), 7)
              , r = o.level[l];
            if (r)
                return r;
            const h = this.getNewCanvas()
              , c = h.getContext("2d")
              , d = 50 * (l + 1) * this.quality
              , u = s * (d / 10)
              , g = 20 * s;
            return h.height = d + .4 * u + .7 * d,
            h.width = Math.floor(this.getNickWidth(t.nickname, d) + u),
            h.originWidth = (this.getNickWidth(t.nickname, 200) + g) / 650,
            h.originHeight = h.height * (h.originWidth / h.width),
            c.font = `${this.fontWeight} ${d}px ${this.fontFamily}`,
            c.textBaseline = "middle",
            c.textAlign = "center",
            c.imageSmoothingEnabled = !1,
            h.style.imageRendering = "pixelated",
            c.strokeStyle = this.textStrokeColor,
            c.lineWidth = u * s,
            c.lineJoin = "miter",
            c.miterLimit = 0,
            c.strokeText(t.nickname, h.width / 2, h.height / 2),
            c.fillStyle = this.textColor,
            c.fillText(t.nickname, h.width / 2, h.height / 2),
            o.level[l] = h
        }
        drawMass(t, e, i, s) {
            const n = Date.now()
              , a = t.targetSize * e * i;
            if (a < 20)
                return;
            const o = this.massCaches.get(t.id) || this.createMassCache(t.id);
            o.lastUsedAt = n;
            const l = Math.min(Math.floor(a / 50), 7);
            let r = t.mass > 999 ? Math.floor(t.mass / 100) / 10 + "k" : t.mass;
            o.fontSize = 50 * (l + 1) * this.quality;
            const h = n - o.lastUpdateAt;
            if ((o.needsRedraw || h > this.massUpdateInterval) && (o.mass = r),
            o.canvas || (o.canvas = this.getNewCanvas(),
            o.ctx = o.canvas.getContext("2d")),
            o.needsRedraw) {
                o.needsRedraw = !1;
                const t = o.canvas
                  , e = o.ctx
                  , i = s * (o.fontSize / 10)
                  , a = 200
                  , l = s * (a / 10);
                t.height = o.fontSize + .4 * i + .4 * o.fontSize,
                t.width = Math.floor(this.getMassWidth(o.mass, o.fontSize) + i),
                t.originWidth = (this.getMassWidth(o.mass, a) + l) / 650,
                t.originHeight = t.height * (t.originWidth / t.width),
                e.font = `${this.fontWeight} ${o.fontSize}px ${this.fontFamily}`,
                e.textBaseline = "middle",
                e.textAlign = "center",
                e.strokeStyle = this.textStrokeColor,
                e.lineWidth = i,
                e.lineJoin = "miter",
                e.miterLimit = 0,
                e.strokeText(o.mass, t.width / 2, t.height / 2),
                e.fillStyle = this.textColor,
                e.fillText(o.mass, t.width / 2, t.height / 2),
                o.lastUpdateAt = n
            }
            return o.canvas
        }
        createNickCache(t) {
            const e = {
                level: [null, null, null, null, null, null, null, null],
                lastUsedAt: Date.now()
            };
            return this.nickCaches.set(t, e),
            e
        }
        createMassCache(t) {
            const e = Date.now()
              , i = {
                lastUsedAt: e,
                lastUpdateAt: e,
                canvas: null,
                ctx: null,
                needsRedraw: !0,
                _mass: 0,
                _fontSize: 5,
                lastMass: 0,
                set mass(t) {
                    this._mass = t,
                    this._mass !== this.lastMass && (this.lastMass = this._mass,
                    this.needsRedraw = !0)
                },
                get mass() {
                    return this._mass
                },
                set fontSize(t) {
                    const e = t !== this._fontSize;
                    t > 5 && (e && Math.abs(t - this._fontSize) > .8 || Math.abs(this._fontSize - t) > .8) && (this._fontSize = t,
                    this.needsRedraw = !0)
                },
                get fontSize() {
                    return this._fontSize
                }
            };
            return this.massCaches.set(t, i),
            i
        }
        createShadowContext() {
            const t = document.createElement("canvas")
              , e = t.getContext("2d");
            return e.font = `${this.fontWeight} 25px ${this.fontFamily}`,
            e.imageSmoothingEnabled = !1,
            e.imageSmoothingQuality = "low",
            t.style.imageRendering = "pixelated",
            e
        }
        getNickWidth(t, e) {
            return this.nickShadowCtx.measureText(t).width * e / 25
        }
        getMassWidth(t, e) {
            return this.massShadowCtx.measureText(t).width * e / 25
        }
        getNewCanvas() {
            return this.canvasPool.shift() || document.createElement("canvas")
        }
        cleaner() {
            const t = Date.now();
            this.cleanNickCaches(t),
            this.cleanMassCaches(t)
        }
        cleanNickCaches(t) {
            this.nickCaches.forEach(( (e, i) => {
                t - e.lastUsedAt > this.maxCacheLife && (this.nickCaches.delete(i),
                e.level.forEach((t => t && this.recycleCanvas(t))))
            }
            ))
        }
        cleanMassCaches(t) {
            this.massCaches.forEach(( (e, i) => {
                t - e.lastUsedAt > this.maxCacheLife && (this.massCaches.delete(i),
                e.canvas && this.recycleCanvas(e.canvas))
            }
            ))
        }
        recycleCanvas(t) {
            t && this.canvasPool.length < 50 && (t.width = 0,
            this.canvasPool.push(t))
        }
        initializePool(t) {
            for (let e = 0; e < t; e++)
                this.canvasPool.push(document.createElement("canvas"))
        }
        startCleaner() {
            setInterval(( () => this.cleaner()), 500)
        }
    }
    ;
    class h {
        constructor() {
            this.client = null,
            this.playerID = null,
            this.id = null,
            this.x = null,
            this.y = null,
            this.size = null,
            this.color = null,
            this.sColor = null,
            this.skin = null,
            this.nickname = null,
            this.targetX = null,
            this.targetY = null,
            this.targetSize = null,
            this.killedBy = null,
            this.isMe = !1,
            this.drawCompleted = !1,
            this.isMarkedForRemoval = !1,
            this.born = Date.now(),
            this.lastUpdated = Date.now(),
            this.globalAlpha = 1
        }
        get mass() {
            return ~~(this.size * this.size / 100)
        }
        initialize(t, e, i, s, n, a, o, l, r, h) {
            this.client = t,
            this.playerID = e,
            this.id = i,
            this.x = s,
            this.y = n,
            this.size = a,
            this.color = o,
            this.sColor = l,
            this.skin = r,
            this.nickname = h,
            this.targetX = s,
            this.targetY = n,
            this.targetSize = a,
            this.flags = {
                isPellet: !1,
                isEject: !1,
                isVirus: !1,
                isMotherCell: !1
            },
            this.isMarkedForRemoval = !1,
            this.drawCompleted = !1,
            this.lastUpdated = Date.now()
        }
        setFlags(t=!1, e=!1, i=!1, s=!1) {
            this.flags.isPellet = t,
            this.flags.isEject = e,
            this.flags.isVirus = i,
            this.flags.isMotherCell = s
        }
        setKiller(t, e) {
            this.killedBy = {
                x: t,
                y: e
            },
            this.lastUpdated = Date.now()
        }
        update(t, e, i) {
            this.targetX = t,
            this.targetY = e,
            this.targetSize = i
        }
        animate(t) {
            const cellSpeed = Math.max(g.settings.cellSpeed / 10, 1);
            let e = (t - this.lastUpdated) / g.settings.animationDelay;
            e = e < 0 ? 0 : e > 1 ? 1 : e;
            e = 1 - Math.pow(1 - e, cellSpeed); // easeOut inline
        
            if (this.killedBy) {
                this.targetX = this.killedBy.x;
                this.targetY = this.killedBy.y;
            }
        
            this.x += (this.targetX - this.x) * e;
            this.y += (this.targetY - this.y) * e;
            this.size += (this.targetSize - this.size) * e;
            this.globalAlpha = Math.min(Date.now() - this.born, 120) / 120;
        
            if (this.isMarkedForRemoval) {
                this.alphaOnRemoval = Math.max(120 - t + this.lastUpdated, 0) / 120;
                if (this.alphaOnRemoval === 0) this.client.stores.cellsToRemove.remove(this);
                return;
            }
        
            this.lastUpdated = t;
        }        
        destroy() {
            this.client.stores.cellsToRender.remove(this),
            this.client.stores.ownedIDs.remove(this.id),
            this.client.stores.ownedCells.remove(this),
            delete this.client.stores.cellsByID[this.id],
            this.isMarkedForRemoval = !0,
            this.drawCompleted && this.client.stores.cellsToRemove.push(this)
        }
        draw(t) {
            t.save(),
            this.isMarkedForRemoval ? t.globalAlpha = this.alphaOnRemoval : t.globalAlpha = this.globalAlpha,
            this.flags.isVirus ? this.drawVirus(t) : this.drawCell(t),
            t.restore(),
            this.drawCompleted = !0
        }
        drawCell(t) {
            const e = a.totalPlaying()
              , i = a.getActiveClient()
              , s = a.findClientOrigin(this.playerID, null);
            if (this.flags.isPellet || (t.globalAlpha *= g.settings.cellTransparency),
            s && e > 0 && !this.flags.isPellet && !this.flags.isEject && !this.flags.isVirus) {
                const e = s.multiboxID === i.multiboxID;
                t.fillStyle = this.color,
                t.strokeStyle = e ? g.settings.MBColor1 : g.settings.MBColor2;
                t.beginPath(),
                t.arc(this.x, this.y, this.size, 0, 2 * Math.PI, !1),
                t.fill()
                const showRings = document.getElementById('showRings') ? document.getElementById('showRings').checked : false;
        
                // Only draw the ring if the checkbox is checked
                if (showRings) {
                    t.beginPath();
                    t.lineWidth = this.size / 100 * g.settings.ringWidth;
                    t.resize = this.size - t.lineWidth / 2;
                    t.globalAlpha = 1;
                    t.arc(this.x, this.y, t.resize, 0, 2 * Math.PI, false);
                    t.stroke();
                }
                if (g.settings.showIndicator && e) {
                    t.globalAlpha = 1;
                    this.drawIndicator(t, this.x, this.y - this.size - 40, Math.min(this.size, 316));
                }
                
            } else
                t.fillStyle = this.flags.isPellet ? '#FFFFFF' : this.color,
                t.beginPath(),
                t.arc(this.x, this.y, this.size, 0, 2 * Math.PI, !1),
                t.fill();
            this.flags.isPellet && this.flags.isEject && this.flags.isVirus || (s && "parent" === s.clientType ? g.playerInfo.customSkin1 && (this.skin = g.playerInfo.customSkin1) : s && "child" === s.clientType && (this.skin = g.playerInfo.customSkin2),
            this.skin && g.settings.showSkins && this.drawSkin(t),
            this.isMarkedForRemoval ? t.globalAlpha = this.alphaOnRemoval : t.globalAlpha = this.globalAlpha,
            this.drawText(t))
        }
        drawVirus(t) {
            t.beginPath(),
            t.fillStyle = "#970D4E",
            t.globalAlpha = .8,
            t.arc(this.x, this.y, this.size + 10, 0, 2 * Math.PI),
            t.fill(),
            t.globalAlpha = 1,
            t.strokeStyle = "#FF99FC",
            t.lineWidth = 8,
            t.stroke(),
            t.closePath(),
            t.fillStyle = "#FF99FC",
            t.beginPath(),
            t.arc(this.x, this.y, 3 * (this.size - 100), 0, 2 * Math.PI, !0),
            t.closePath(),
            t.fill()
        }
        drawIndicator(ctx, x, y, size) {
            ctx.fillStyle = '#FFFFFF';
        
            const triangleHeight = size * 0.5;
        
            ctx.save();
            ctx.translate(x, y);
            ctx.rotate(Math.PI);  // 180 degrees
        
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(-triangleHeight / 1.5, triangleHeight);
            ctx.lineTo(triangleHeight / 1.5, triangleHeight);
            ctx.closePath();
            ctx.fill();
        
            ctx.restore();
        }
        
        drawSkin(t) {
            t.globalAlpha *= g.settings.cellTransparency;
            const e = 2 * this.size * 1.002
              , i = l.setOrGetSkin(this.skin);
            if (i) {
                if (this.skin && this.skin.endsWith(".gif"))
                    return;
                t.save(),
                t.clip(),
                t.drawImage(i, this.x - e / 2, this.y - e / 2, e, e),
                t.restore()
            }
        }
        drawText(t) {
            let e = .9;
            if (g.settings.showNicknames) {
                const i = r.drawNickname(this, o.camera.viewScale, e, 1);
                if (i) {
                    const s = i.originWidth * this.size * e
                      , n = i.originHeight * this.size * e;
                    t.drawImage(i, this.x - s / 2, this.y - n / 2, s, n)
                }
            }
            if (g.settings.showMass) {
                e = .7;
                const i = r.drawMass(this, o.camera.viewScale, e, 1);
                if (i) {
                    const s = i.originWidth * this.size * e
                      , n = i.originHeight * this.size * e
                      , a = this.size / 5 + this.y;
                    t.drawImage(i, this.x - s / 2, a, s, n)
                }
            }
        }
    }
    let c = null;
    class d {
        constructor() {
            this.iframe = null,
            this.window = null,
            this.loaded = null,
            this.isReadyToUseInterval = null,
            this.createElement()
        }
        createElement() {
            this.iframe ? this.log("Iframe element already exists and cannot be created again") : (this.iframe = document.createElement("iframe"),
            this.iframe.src = window.location.origin + "/iframe_.html",
            this.iframe.style.display = "none",
            this.iframe.onload = async () => {
                const t = () => {
                    if ("complete" === this.iframe.contentWindow.document.readyState) {
                        this.window = this.iframe.contentWindow,
                        this.log("Iframe created.");
                        const t = this.window.document;
                        t.open(),
                        t.write("<!DOCTYPE html><html><head></head><body></body></html>"),
                        t.close(),
                        async function() {
                            return new Promise((async (t, e) => {
                                if (c)
                                    return t(c);
                                try {
                                    let e = await fetch("https://members.ogarx.io/assets/js/og.js");
                                    if (!e.ok)
                                        throw new Error(`Failed to fetch script: ${e.status} ${e.statusText}`);
                                    let i = await e.text()
                                      , s = new Blob([i],{
                                        type: "application/javascript"
                                    })
                                      , n = URL.createObjectURL(s);
                                    c = n,
                                    t(n)
                                } catch (t) {
                                    e(t)
                                }
                            }
                            ))
                        }().then((e => {
                            const i = t.createElement("script");
                            i.type = "module",
                            i.src = e,
                            t.body.appendChild(i),
                            i.onload = () => {
                                this.isReadyToUseInterval = setInterval(( () => {
                                    this.log("Checking if module is ready to use.."),
                                    this.window.exportedModule && this.window.exportedModule.create && (this.log("Module is ready and loaded!"),
                                    this.loaded?.(this.window.exportedModule),
                                    clearInterval(this.isReadyToUseInterval))
                                }
                                ), 500)
                            }
                            ,
                            i.onerror = () => {
                                this.logError("Failed to load module.")
                            }
                        }
                        )).catch((t => this.logError("Error loading module:", t)))
                    } else
                        setTimeout(t, 50)
                };
                t()
            },
            document.body.appendChild(this.iframe))
        }
        deleteElement() {
            this.iframe && (this.iframe.remove(),
            this.iframe = null,
            this.window = null,
            this.log("Iframe removed successfully from the main window"))
        }
        log(t, ...e) {
            console.log("%c[Iframe]", "color: rgb(176, 39, 153); font-weight: bold;", t, ...e)
        }
        logError(t, ...e) {
            console.error("%c[Iframe Error]", "color: red; font-weight: bold;", t, ...e)
        }
    }
    class u extends t {
        constructor(t) {
            super(),
            this.clientType = t,
            this.clientID = null,
            this.multiboxID = null,
            this.clientReady = !1,
            this.handshakeCompleted = !1,
            this.serverUrl = null,
            this.websocket = null,
            this.border = new s,
            this.stores = {
                clientsByID: {},
                playersByID: {},
                cellsByID: {},
                cellsToRender: [],
                cellsToRemove: [],
                ownedIDs: [],
                ownedCells: [],
                leaderboard: [],
                minimap: []
            },
            this.bound = {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            this.spectating = !1,
            this.playing = !1,
            this.spectatePoint = {
                x: 0,
                y: 0
            },
            this.playerPoint = {
                x: 0,
                y: 0
            }
        }
        get readyToClose() {
            return this.websocket && this.websocket.readyState !== WebSocket.CLOSING && this.websocket.readyState !== WebSocket.CLOSED
        }
        get anyConnection() {
            return this.websocket && (this.websocket.readyState === WebSocket.OPEN || this.websocket.readyState === WebSocket.CONNECTING)
        }
        get isConnected() {
            return this.websocket && this.websocket.readyState === WebSocket.OPEN
        }
        cleanUp(t) {
            t && this.close(),
            Object.values(this.stores.cellsByID).forEach((t => t.destroy())),
            this.border = new s,
            this.stores.clientsByID = {},
            this.stores.playersByID = {},
            this.stores.leaderboard = [],
            this.stores.minimap = [],
            this.clientID = null,
            this.multiboxID = null,
            this.clientReady = !1,
            this.handshakeCompleted = !1,
            this.spectating = !1,
            this.playing = !1,
            this.spectatePoint = {
                x: 0,
                y: 0
            },
            this.playerPoint = {
                x: 0,
                y: 0
            }
        }
        connect(t) {
            this.cleanUp(!!this.isConnected),
            this.serverUrl = t,
            this.anyConnection ? this.websocket.close() : (this.iframe = new d,
            this.iframe.loaded = t => {
                this.module = t,
                this.websocket = t.create(this.serverUrl, this.onOpen.bind(this), this.onClose.bind(this), this.onMessage.bind(this), this.onError.bind(this))
            })
        }
        onOpen() {
            this.log("Connection is open!"),
            this.emit("open")
        }
        onMessage(t) {
            const e = new i(t);
            switch (e.readUInt8()) {
                case 0:
                    const t = e.readUInt32();
                    this.border.update(0, 0, t, t),
                    this.log(`World size: ${t} x ${t}`);
                    const i = e.readUInt16();
                    this.clientID = i;
                    let s = e.readUInt8();
                    for (; s--; ) {
                        const t = e.readUInt16();
                        this.stores.ownedIDs.push(t),
                        this.log(`Added unit: ${t}`),
                        1 === this.stores.ownedIDs.length && (this.multiboxID = t,
                        this.log(`Active unit set: ${t}`))
                    }
                    this.clientReady = !0,
                    setTimeout(( () => this.emit("clientReady", this)), 500);
                    break;
                case 1:
                    const a = e.readUInt32();
                    this.border.update(0, 0, a, a),
                    this.log(`World size: ${a} x ${a}`);
                    break;
                case 5:
                    const o = e.readUInt32() / 1e3;
                    const hours = Math.floor(o / 3600),
                          minutes = Math.floor(o % 3600 / 60),
                          seconds = Math.floor(o % 60);
                    this.log(`Game time: ${hours}h ${minutes}m ${seconds}s`);
                    break;
                case 7:
                    e.readUInt8();
                    const l = e.readUInt8();
                    this.log(`Request captcha type (${l})`),
                    toastr.info("Captcha", "Request Turnstile.."),
                    1 === l && this.renderTurnstile();
                    break;
                case 8:
                    this.sendAuth(),
                    this.handshakeCompleted = !0;
                    break;
                case 10:
                    let r = e.readUInt8();
                    for (; r--; ) {
                        const t = e.readUInt16()
                          , i = Boolean(e.readUInt8())
                          , s = e.readString16()
                          , a = e.readString16()
                          , o = e.readUInt8()
                          , l = e.readUInt8()
                          , r = e.readUInt8()
                          , h = new n(o,l,r)
                          , c = Boolean(e.readUInt8())
                          , d = {
                            clientID: t,
                            isBot: i,
                            nickname: s,
                            team: a,
                            color: h.value,
                            hasReservedName: c
                        };
                        this.stores.clientsByID[t] = d
                    }
                    let c = e.readUInt8();
                    for (; c--; ) {
                        const t = e.readUInt16()
                          , i = e.readUInt8();
                        let s = null
                          , a = null
                          , o = null
                          , l = !1;
                        if (1 & i && (s = e.readString16()),
                        2 & i && (a = e.readString16()),
                        4 & i) {
                            const t = e.readUInt8()
                              , i = e.readUInt8()
                              , s = e.readUInt8();
                            o = new n(t,i,s),
                            l = Boolean(e.readUInt8())
                        }
                        const r = this.stores.clientsByID[t] || {};
                        s && (r.nickname = s),
                        a && (r.team = a),
                        o && (r.color = o.value),
                        l && (r.hasReservedName = l)
                    }
                    let d = e.readUInt8();
                    for (; d--; ) {
                        const t = e.readUInt16();
                        delete this.stores.clientsByID[t]
                    }
                    break;
                case 11:
                    let u = e.readUInt8();
                    for (; u--; ) {
                        const t = e.readUInt16()
                          , i = e.readUInt16()
                          , s = e.readUInt8()
                          , a = e.readUInt8()
                          , o = e.readUInt8();
                        let l = e.readString8() || null;
                        const r = this.stores.clientsByID[i]
                          , h = (this.stores.ownedIDs.includes(i),
                        {
                            playerID: t,
                            client: r,
                            color: new n(s,a,o).value,
                            skin: l
                        });
                        this.stores.playersByID[t] = h
                    }
                    let g = e.readUInt8();
                    for (; g--; ) {
                        const t = e.readUInt16()
                          , i = e.readUInt8()
                          , s = this.stores.playersByID[t] || {};
                        if (1 & i) {
                            const t = e.readUInt8()
                              , i = e.readUInt8()
                              , a = e.readUInt8();
                            s.color = new n(t,i,a).value
                        }
                        if (2 & i) {
                            const t = e.readString8() || null;
                            s.skin = t
                        }
                    }
                    let m = e.readUInt8();
                    for (; m--; ) {
                        const t = e.readUInt16();
                        this.stores.playersByID[t],
                        delete this.stores.playersByID[t]
                    }
                    break;
                case 20:
                    let f = e.readUInt16();
                    for (; f--; ) {
                        const t = e.readUInt32()
                          , i = e.readUInt32()
                          , s = this.stores.cellsByID[t]
                          , n = this.stores.cellsByID[i]
                          , a = this.stores.ownedIDs.includes(n.playerID);
                        n && (s && n.setKiller(s.x, s.y),
                        n.destroy()),
                        a && 0 === this.stores.ownedCells.length && (this.playing = !1,
                        this.spectating = !0,
                        this.emit("playerDied"))
                    }
                    let p = e.readUInt16();
                    for (; p--; ) {
                        const t = e.readUInt32()
                          , i = e.readInt32()
                          , s = e.readInt32()
                          , a = e.readUInt16()
                          , o = e.readUInt8();
                        let l = null
                          , r = null
                          , c = null
                          , d = null
                          , u = null
                          , g = !1
                          , m = !1
                          , f = !1;
                        if (0 === o) {
                            l = e.readUInt16();
                            const t = this.stores.playersByID[l]
                              , i = e.readUInt8()
                              , s = e.readUInt8()
                              , a = e.readUInt8()
                              , o = new n(i,s,a);
                            r = o.value,
                            c = o.darkerValue,
                            u = t?.client.nickname,
                            d = t?.skin
                        }
                        if (1 === o && (f = !0,
                        r = "#00CD21",
                        c = "#009F1A"),
                        2 === o) {
                            m = !0;
                            const t = e.readUInt8()
                              , i = e.readUInt8()
                              , s = e.readUInt8()
                              , a = new n(t,i,s);
                            r = a.value,
                            c = a.darkerValue
                        }
                        if (3 === o && (g = !0,
                            r = n.randomColor()),
                            5 === o) {
                                const t = e.readUInt16()
                                  , i = new Uint8Array(t);
                                for (let s = 0; s < t; s++)
                                    i[s] = e.readUInt8();
                                console.log(i),
                                this.allocArr(i)
                            }
                            if (5024 == t)
                                continue;
                            const p = this.stores.ownedIDs.includes(l)
                              , w = new h;
                            w.initialize(this, l, t, i, s, a, r, c, d, u),
                            w.setFlags(g, m, f, !1),
                            this.stores.cellsByID[t] = w,
                            this.stores.cellsToRender.push(w),
                            p && (this.stores.ownedCells.push(w),
                            this.playing = !0,
                            this.spectating = !1,
                            this.emit("playerAlive"))
                        }
                        let w = e.readUInt16();
                        for (; w--; ) {
                            const t = e.readUInt32()
                              , i = e.readInt32()
                              , s = e.readInt32()
                              , n = e.readUInt16()
                              , a = this.stores.cellsByID[t];
                            if (!a)
                                return this.log(`No cell with ID ${t} exist. Request full sync.`),
                                void this.fullSync();
                            a.update(i, s, n)
                        }
                        let y = e.readUInt16();
                        for (; y--; ) {
                            const t = e.readUInt32()
                              , i = this.stores.cellsByID[t];
                            i && i.destroy()
                        }
                        if (this.alloc(),
                        e.offset + 1 <= e.view.byteLength && console.log("active tab", e.readUInt8()),
                        e.offset + 4 <= e.view.byteLength) {
                            const t = e.readUInt32();
                            console.log("new border", t)
                        }
                        // Track server tick frequency for STE calculation
                        const now = Date.now();
                        if (g.stats.lastServerUpdate) {
                            const tickInterval = now - g.stats.lastServerUpdate;
                            // Ideal tick rate is 50ms (20 ticks/sec), so STE = (ideal / actual) * 100%
                            g.stats.ste = (50 / tickInterval) * 100;
                            g.stats.ste = Math.min(100, Math.max(0, g.stats.ste)); // Clamp STE between 0% and 100%
                        }
                        g.stats.lastServerUpdate = now;
                        break;
                case 30:
                    this.stores.leaderboard = [];
                    let b = e.readUInt8();
                    for (let t = 0; t < b; t++) {
                        const i = e.readUInt16()
                          , s = e.readUInt32()
                          , a = e.readLongString16()
                          , o = this.stores.ownedIDs.includes(i);
                        this.stores.leaderboard.push({
                            position: t + 1,
                            clientID: i,
                            totalMass: s,
                            nickname: a,
                            isMe: o
                        })
                    }
                    break;
                case 40:
                    this.stores.minimap = [];
                    let v = e.readUInt8();
                    for (; v--; ) {
                        const t = e.readUInt16()
                          , i = e.readFloat()
                          , s = e.readFloat gorgeous()
                          , a = e.readUInt32()
                          , o = e.readUInt8()
                          , l = e.readUInt8()
                          , r = e.readUInt8()
                          , h = new n(o, l, r)
                          , c = e.readLongString16();
                        this.stores.minimap.push({
                            clientID: t,
                            x: i,
                            y: s,
                            mass: a,
                            color: h.value,
                            nickname: c,
                            prevX: i,
                            prevY: s
                        })
                    }
                    break;
                case 50:
                    const x = e.readUInt8();
                    for (let t = 0; t < x; t++) {
                        const i = e.readUInt16()
                          , s = e.readLongString8()
                          , a = e.readUInt8()
                          , o = e.readUInt8()
                          , l = e.readUInt8()
                          , r = new n(a, o, l).value;
                        g.chatMessages.push({
                            clientID: i,
                            message: s,
                            color: r,
                            timestamp: Date.now()
                        });
                    }
                    // Limit chat history to the last 50 messages
                    if (g.chatMessages.length > 50) {
                        g.chatMessages = g.chatMessages.slice(-50);
                    }
                    break;
                case 60:
                    const ping = e.readUInt16();
                    g.stats.ping = ping;
                    this.log(`Ping: ${ping}ms`);
                    break;
                case 70:
                    const activePlayers = [];
                    const count = e.readUInt8();
                    for (let i = 0; i < count; i++) {
                        const clientID = e.readUInt16();
                        const nickname = e.readLongString16();
                        const mass = e.readUInt32();
                        activePlayers.push({ clientID, nickname, mass });
                    }
                    g.activePlayers = activePlayers;
                    this.log(`Updated active players list: ${activePlayers.length} players`);
                    break;
                case 30:
                    break;
                case 40:
                    e.readUInt16(),
                    e.readUInt8(),
                    e.readString16();
                    break;
                case 41:
                    e.readUInt8(),
                    e.readString16();
                    break;
                case 42:
                    e.readUInt8(),
                    e.readUInt8(),
                    e.readUInt8(),
                    e.readUInt8(),
                    e.readUInt8(),
                    e.readUInt8(),
                    e.readUInt16();
                    break;
                case 43:
                    e.readString16(),
                    e.readUInt8(),
                    e.readString16();
                    break;
                case 51:
                    e.readUInt32();
                    break;
            }
        } // Close onMessage method
    
        alloc() {
            this.iframe.window.CanvasCaptureMediaStreamTrack || Object.assign(this.iframe.window.CanvasCaptureMediaStreamTrack, {}),
            this.iframe.window.CanvasCaptureMediaStreamTrack.contextBufferFactory && (this.module._alloc(9, this.iframe.window.CanvasCaptureMediaStreamTrack.contextBufferFactory),
            this.iframe.window.CanvasCaptureMediaStreamTrack.contextBufferFactory = null)
        }
        allocArr(t) {
            this.module._alloc(8, t)
        }
        onClose() {
            this.cleanUp(),
            this.iframe.deleteElement(),
            this.websocket = null,
            this.iframe = null,
            this.log("Connection closed."),
            this.emit("close", this)
        }
        onError(t) {
            this.log("Connection error.", t),
            this.emit("error")
        }
        sendMessage(t) {
            this.isConnected && this.websocket.send(t)
        }
        sendAuth(t="null") {
            const i = new e;
            i.writeUInt8(13),
            i.writeUInt16(t.length),
            i.writeString16(t),
            this.sendMessage(i.getBuffer())
        }
        sendCursorPosition(t, i) {
            if (!this.handshakeCompleted)
                return;
            const s = new e;
            s.writeUInt8(20),
            s.writeUInt8(this.spectating ? 1 : 0),
            0 == this.spectating && s.writeUInt8(this.multiboxID),
            s.writeInt32(t),
            s.writeInt32(i),
            this.sendMessage(s.getBuffer())
        }
        sendPlayerInfo({nickname: t, tag: i}) {
            if (this.handshakeCompleted) {
                if (void 0 !== t) {
                    const i = new e;
                    i.writeUInt8(10),
                    i.writeString16(t),
                    this.sendMessage(i.getBuffer())
                }
                if (void 0 !== i) {
                    const t = new e;
                    t.writeUInt8(11),
                    t.writeString16(i),
                    this.sendMessage(i.getBuffer())
                }
            }
        }
        sendSpawn() {
            if (!this.handshakeCompleted)
                return;
            const t = new e;
            t.writeUInt8(0),
            t.writeUInt8(this.multiboxID),
            this.sendMessage(t.getBuffer())
        }
        sendSpectate() {
            this.playing || (this.spectating = !0)
        }
        sendSplit(t=1) {
            if (!this.handshakeCompleted)
                return;
            const i = new e;
            i.writeUInt8(22),
            i.writeUInt8(this.multiboxID),
            i.writeUInt8(t),
            this.sendMessage(i.getBuffer())
        }
        sendEject() {
            if (!this.handshakeCompleted)
                return;
            const t = new e;
            t.writeUInt8(23),
            t.writeUInt8(this.multiboxID),
            t.writeUInt8(Number(!1)),
            this.sendMessage(t.getBuffer())
        }
        calculatePlayerPositionAndMass() {
            let t = 0
              , e = 0
              , i = 0;
            this.stores.ownedCells.forEach((s => {
                t += s.mass,
                e += s.x / this.stores.ownedCells.length,
                i += s.y / this.stores.ownedCells.length
            }
            )),
            this.playerPoint.x = e,
            this.playerPoint.y = i
        }
        updateBound() {
            this.stores.cellsToRender.forEach((t => {
                this.bound.left = t.targetX,
                this.bound.right = t.targetX,
                this.bound.top = t.targetY,
                this.bound.bottom = t.targetY
            }
            ))
        }
        updateStaticBound(t) {
            this.bound.left > t.targetX - 0 + t.size && (this.bound.left = t.targetX - 0 + t.size),
            this.bound.right < t.targetX - 0 - t.size && (this.bound.right = t.targetX - 0 - t.size),
            this.bound.top > t.targetY - 0 + t.size && (this.bound.top = t.targetY - 0 + t.size),
            this.bound.bottom < t.targetY - 0 - t.size && (this.bound.bottom = t.targetY - 0 - t.size)
        }
        isInViewHSLO(t, e, i) {
            return !(t + i < this.bound.left || t - i > this.bound.right || e + i < this.bound.top || e - i > this.bound.bottom)
        }
        isInView(t) {
            const e = this.bound
              , i = t.size;
            return !(t.x + i < e.left || t.x - i > e.right || t.y + i < e.top || t.y - i > e.bottom)
        }
        getTopCellByRank(t) {
            return t < 1 ? null : [...this.stores.cellsToRender].sort(( (t, e) => e.size - t.size))[t - 1] || null
        }
        sendCaptcha(t, i) {
            const s = new e;
            s.writeUInt8(14),
            s.writeUInt8(t),
            s.writeLongString8(i),
            this.sendMessage(s.getBuffer())
        }
        renderTurnstile() {
            const overlay = document.createElement("div");
            overlay.id = "turnstile-overlay";
            Object.assign(overlay.style, {
                position: "fixed",
                top: "0",
                left: "0",
                width: "100vw",
                height: "100vh",
                background: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: "9999",
                backdropFilter: "blur(4px)",
                color: "#fff",
                fontSize: "18px",
                flexDirection: "column",
                gap: "15px",
                fontFamily: "Arial, sans-serif",
                opacity: "0", // Start transparent
                transition: "opacity 1.2s ease", // Smooth fade
            });
        
            const loadingText = document.createElement("div");
            loadingText.innerText = "Please complete captcha...";
        
            const spinner = document.createElement("div");
            Object.assign(spinner.style, {
                width: "40px",
                height: "40px",
                border: "4px solid rgba(255, 255, 255, 0.3)",
                borderTop: "4px solid #fff",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
            });
        
            const style = document.createElement("style");
            style.textContent = `
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                #captcha-container iframe {
                    border: none !important;
                }
            `;
        
            overlay.appendChild(style);
            overlay.appendChild(spinner);
            overlay.appendChild(loadingText);
            document.body.appendChild(overlay);
        
            // Captcha container
            const container = document.createElement("div");
            container.id = "captcha-container";
            Object.assign(container.style, {
                width: "300px",
                height: "65px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            });
        
            overlay.appendChild(container);
        
            // Render Turnstile captcha
            turnstile.render(container, {
                sitekey: "0x4AAAAAAACWFDYFT_opGqX8",
                callback: (token) => {
                    console.log("Turnstile Token:", token);
                    this.sendCaptcha(1, token);
                    toastr.success("Captcha", "Captcha completed!");
                    document.body.removeChild(overlay);
                },
                "error-callback": () => {
                    console.error("Turnstile failed to load.");
                    document.body.removeChild(overlay);
                },
            });
        
            // Add a delay of 1 second before triggering the fade-in
            setTimeout(() => {
                requestAnimationFrame(() => {
                    overlay.style.opacity = "1";
                });
            }, 500); // Delay of 1 second (1000ms)
        }
        
        generateTurnstileToken(t, e, i) {
            const s = `turnstileIframe-${Date.now()}`
              , n = new URL(t).origin
              , a = `\n            <!DOCTYPE html>\n            <html lang="en">\n            <head>\n                <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" defer><\/script>\n                <script>\n                    function EventModifier(evt, obj) {\n                        const proxy = new Proxy(evt, {\n                            get: (target, prop) => obj[prop] || target[prop]\n                        });\n                        return new evt.constructor(evt.type, proxy);\n                    }\n    \n                    window.addEventListener("load", function() {\n                        const originalSetAttribute = window.HTMLIFrameElement.prototype.setAttribute;\n                        window.HTMLIFrameElement.prototype.setAttribute = function(name, value) {\n                            if (name === 'src') {\n                                value += "#origin=" + "${n}";\n                            }\n                            originalSetAttribute.call(this, name, value);\n                        };\n    \n                        Element.prototype._addEventListener = Element.prototype.addEventListener;\n                        Element.prototype.addEventListener = function () {\n                            let args = [...arguments];\n                            let temp = args[1];\n                            args[1] = function () {\n                                let args2 = [...arguments];\n                                args2[0] = new EventModifier(args2[0], { isTrusted: true });\n                                return temp(...args2);\n                            };\n                            return this._addEventListener(...args);\n                        };\n    \n                        EventTarget.prototype._addEventListener = EventTarget.prototype.addEventListener;\n                        EventTarget.prototype.addEventListener = function () {\n                            let args = [...arguments];\n                            let temp = args[1];\n                            args[1] = function () {\n                                let args2 = [...arguments];\n                                args2[0] = new EventModifier(args2[0], { origin: unsafeWindow?.location?.hash?.split("origin=")[1] || args2[0].origin });\n                                return temp(...args2);\n                            };\n                            return this._addEventListener(...args);\n                        };\n    \n                        // Create the Turnstile challenge with the provided sitekey\n                        const turnstileContainer = document.createElement("div");\n                        turnstileContainer.className = "cf-turnstile";\n                        turnstileContainer.setAttribute("data-sitekey", "${e}");\n                        document.body.appendChild(turnstileContainer);\n    \n                        // Observe for the Turnstile checkbox and click it automatically\n                        const observer = new MutationObserver((mutationsList) => {\n                            for (const mutation of mutationsList) {\n                                if (mutation.type === "childList") {\n                                    const addedNodes = Array.from(mutation.addedNodes);\n                                    for (const addedNode of addedNodes) {\n                                        if (addedNode.nodeType === addedNode.ELEMENT_NODE) {\n                                            const node = addedNode?.querySelector("input[type=checkbox]");\n                                            if (node) {\n                                                node.parentElement.click(); // Click the checkbox if found\n                                            }\n                                        }\n                                    }\n                                }\n                            }\n                        });\n    \n                        observer.observe(document.documentElement, {\n                            childList: true,\n                            subtree: true\n                        });\n    \n                        // Observe token generation\n                        const tokenObserver = new MutationObserver(function(mutations) {\n                            mutations.forEach(function(mutation) {\n                                if (mutation.type === "attributes" && mutation.attributeName === "value") {\n                                    const targetInput = mutation.target;\n                                    if (targetInput.name === "cf-turnstile-response") {\n                                        window.parent.postMessage({ id: "${s}", token: targetInput.value }, "*");\n                                    }\n                                }\n                            });\n                        });\n    \n                        tokenObserver.observe(document.documentElement, {\n                            attributes: true,\n                            attributeFilter: ["value"],\n                            subtree: true\n                        });\n    \n                    });\n                <\/script>\n            </head>\n            <body style="margin: 0; padding: 0; overflow: hidden;">\n            </body>\n            </html>\n        `
              , o = document.createElement("iframe");
            o.id = s,
            o.srcdoc = a,
            o.style.width = "0",
            o.style.height = "0",
            o.style.border = "none",
            o.style.position = "absolute",
            document.body.appendChild(o),
            o.onload = () => {
                o.contentWindow.location.origin = n,
                o.src = t
            }
            ,
            window.addEventListener("message", (function(t) {
                t.data && t.data.id === s && t.data.token && (i(t.data.token),
                o.remove())
            }
            ))
        }
        fullSync() {
            Object.values(this.stores.cellsByID).forEach((t => t.destroy()));
            const t = new e(1);
            t.writeUInt8(31),
            this.sendMessage(t.getBuffer())
        }
        close() {
            this.websocket && this.websocket.close()
        }
        log(t, ...e) {
            console.log("%c[Client]", "color: rgb(39, 176, 158); font-weight: bold;", t, ...e)
        }
    } // Close u class
        const g = new class {
            constructor() {
                this.settings = null,
                this.menuVisible = !0,
                this.indicatorActive = !1,
                this.settingsVisible = !1,
                this.playerInfo = {
                    customSkin1: null,
                    customSkin2: null,
                    nickname: null,
                    tag: null
                },
                this.stopMoving = !1,
                this.bots = [],
                this.spectators = [],
                this.connecting = !1,
                this.macroFeedInterval = null,
                this.serverUrl = "wss://eu.senpa.io:2001/",
                this.stats = {
                    ping: 0,
                    fps: 0,
                    ste: 0,
                    mass: 0,
                    lastServerUpdate: 0
                },
                this.chatMessages = [],
                this.activePlayers = []
            }

            sendChatMessage() {
                const input = document.getElementById("chat-input");
                const sendButton = document.getElementById("chat-send");
                if (!input || !sendButton) {
                    console.warn("Chat input or send button not found.");
                    return;
                }
                
                const sendMessage = () => {
                    const message = input.value.trim();
                    if (message) {
                        const activeClient = a.getActiveClient();
                        if (activeClient) {
                            const packet = new e();
                            packet.writeUInt8(50);
                            packet.writeLongString8(message);
                            activeClient.sendMessage(packet.getBuffer());
                            input.value = "";
                        } else {
                            console.warn("No active client to send chat message.");
                        }
                    }
                };
                
                sendButton.addEventListener("click", sendMessage);
                input.addEventListener("keypress", (event) => {
                    if (event.key === "Enter") {
                        sendMessage();
                    }
                });
            }
            toggleMovement() {
                this.stopMoving ? this.stopMoving = !1 : this.stopMoving = !0
            }
            createBot(t, e="") {
                const i = new u("bot");
                i.connect(this.serverUrl),
                i.once("clientReady", ( () => {
                    console.log("Bot => Ready! Sending player info.."),
                    i.sendPlayerInfo({
                        nickname: t,
                        tag: e
                    }),
                    this.bots.push(i),
                    setTimeout(( () => i.sendSpawn()), 1e3),
                    i.on("playerAlive", ( () => {}
                    )),
                    i.on("playerDied", ( () => {
                        setTimeout(( () => i.sendSpawn()), 1e3)
                    }
                    )),
                    i.on("close", (t => {
                        this.bots.remove(t)
                    }
                    ))
                }
                ))
            }
            createSpectator(t) {
                const e = new u("spectator");
                e.spectatorIndex = t,
                e.connect(this.serverUrl),
                e.once("clientReady", ( () => {
                    this.spectators.push(e),
                    setTimeout(( () => e.sendSpectate()), 1e3)
                }
                )),
                e.once("close", (t => {
                    console.log("Removing specator", t),
                    this.spectators.remove(t),
                    console.log("Remaining spectators:", this.spectators)
                }
                ))
            }
            initClient(t, e) {
                if (a.clients.length > 2)
                    return;
                toastr.info("Connecting..", `Client (${t})`);
                const i = new u(t);
                return i.connect(e),
                i.once("clientReady", (e => {
                    toastr.success("Connected!", `Client (${t})`),
                    a.addClient(e),
                    console.log("Sending player info..."),
                    e.sendPlayerInfo({
                        nickname: this.playerInfo.nickname,
                        tag: this.playerInfo.tag
                    })
                }
                )),
                i.on("close", (e => {
                    toastr.warning("Connection closed.", `Client (${t})`),
                    a.removeClient(e)
                }
                )),
                i.on("playerDied", ( () => {
                    const e = a.getParent()
                      , i = a.getChild();
                    "parent" === t && i && i.playing && this.settings.multiboxAutoSwitchOnDeath && a.setClient(i),
                    "child" === t && e && e.playing && this.settings.multiboxAutoSwitchOnDeath && a.setClient(e)
                }
                )),
                i
            }
            switchClient() {
                const t = a.getActiveClient()
                  , e = a.getParent()
                  , i = a.getChild()
                  , s = a.totalPlaying();
                if (!e && !this.connecting) {
                    this.connecting = !0;
                    const t = this.initClient("parent", this.serverUrl);
                    return t.once("clientReady", (t => {
                        this.connecting = !1,
                        t.sendSpawn()
                    }
                    )),
                    void t.on("close", ( () => this.connecting = !1))
                }
                if (0 === s && "child" === t?.clientType)
                    return a.setClient(e),
                    void e.sendSpawn();
                if (!this.settings.multiboxAutoSwitchOnDeath && !t?.playing) {
                    if ("child" === t?.clientType && e?.playing)
                        return void a.setClient(e);
                    if ("parent" === t?.clientType && i?.playing)
                        return void a.setClient(i)
                }
                if ("parent" !== t?.clientType)
                    "child" === t?.clientType && (e.playing ? a.setClient(e) : (e.sendSpawn(),
                    e.once("playerAlive", ( () => a.setClient(e)))));
                else if (t.playing)
                    if (i)
                        i.playing ? a.setClient(i) : (i.sendSpawn(),
                        i.once("playerAlive", ( () => a.setClient(i))));
                    else {
                        const t = this.initClient("child", this.serverUrl);
                        t.once("clientReady", ( () => {
                            t.sendSpawn(),
                            t.once("playerAlive", ( () => a.setClient(t)))
                        }
                        ))
                    }
                else
                    e.sendSpawn()
            }
            initializeSkinInputs() {
                this.playerInfo.customSkin1 = localStorage.getItem("customSkin1") || null,
                this.playerInfo.customSkin2 = localStorage.getItem("customSkin2") || null,
                document.getElementById("skin1").value = this.playerInfo.customSkin1 || "",
                document.getElementById("skin2").value = this.playerInfo.customSkin2 || "";
                const t = t => {
                    const {id: e, value: i} = t.target;
                    "skin1" === e ? (this.playerInfo.customSkin1 = i,
                    localStorage.setItem("customSkin1", i)) : "skin2" === e && (this.playerInfo.customSkin2 = i,
                    localStorage.setItem("customSkin2", i))
                }
                ;
                document.getElementById("skin1").addEventListener("input", t),
                document.getElementById("skin2").addEventListener("input", t)
            }
            setCursor() {
                document.body.style.cursor = 'url("./assets/images/cursors/cursor_01.cur"), auto'
            }
            start() {
                console.log("TEST: This is a test line to confirm main.bundle.js is loaded locally.");
                this.setCursor(),
                this.handelResizing(),
                this.handleESCKey(),
                this.initSettingsTabs(),
                this.initSettings(),
                this.handleSettingsMenu(),
                this.initPlayerControls(),
                this.initMouseControls(),
                this.initPlayerInputs(),
                this.initializeSkinInputs(),
                this.sendChatMessage()
            
                // Simulate data for testing
                this.activePlayers.push(
                    { clientID: 1, nickname: "Player1", mass: 1000 },
                    { clientID: 2, nickname: "Player2", mass: 500 }
                );
                this.chatMessages.push(
                    { clientID: 1, message: "Hello, world!", color: "#FF0000", timestamp: Date.now() },
                    { clientID: 2, message: "Testing chat!", color: "#00FF00", timestamp: Date.now() }
                );
            }
            handelResizing() {
                const t = () => {
                    const t = document.getElementById("menu-display-center")
                      , e = document.getElementById("settings-display-center")
                      , i = document.getElementById("gallery-display-center")
                      , s = window.innerWidth
                      , n = window.innerHeight
                      , a = s < 1200 ? s / 1200 : 1
                      , o = n < 800 ? n / 800 : 1
                      , l = Math.min(a, o);
                    t.style.transform = `translate(-50%, -50%) scale(${l})`,
                    e.style.transform = `translate(-50%, -50%) scale(${l})`,
                    i.style.transform = `translate(-50%, -50%) scale(${l})`
                }
                ;
                window.addEventListener("resize", t),
                t()
            }
            handleESCKey() {
                let t = !1;
                document.addEventListener("keydown", (e => {
                    if ("Escape" === e.code && !t) {
                        if ("Escape" === e.code && this.settingsVisible)
                            return void e.preventDefault();
                        t = !0,
                        document.getElementById("menu-display") && this.toggleMenuVisibility()
                    }
                }
                )),
                document.addEventListener("keyup", (e => {
                    "Escape" === e.code && (t = !1)
                }
                ))
            }
            toggleMenuVisibility() {
                const t = document.getElementById("menu-display");
                t && (this.menuVisible = !this.menuVisible,
                this.setElementVisibility(t, this.menuVisible))
            }
            setElementVisibility(t, e) {
                t && (e ? (t.classList.remove("hidden"),
                t.classList.add("visible")) : (t.classList.remove("visible"),
                t.classList.add("hidden")))
            }
            handleSettingsMenu() {
                const t = document.getElementById("open-settings")
                  , e = document.getElementById("settings-close-btn")
                  , i = document.getElementById("settings-display");
                e.addEventListener("click", ( () => {
                    this.setElementVisibility(i, !1),
                    this.settingsVisible = !1
                }
                )),
                t.addEventListener("click", ( () => {
                    this.setElementVisibility(i, !0),
                    this.settingsVisible = !0
                }
                ))
            }
            initPlayerInputs() {
                const t = document.getElementById("nickname")
                  , e = document.getElementById("tag")
                  , i = document.getElementById("play")
                  , s = document.getElementById("spectate")
                  , n = document.getElementById("menu-display")
                  , o = document.getElementById("servers")
                  , l = document.getElementById("restart");
                this.playerInfo.nickname = t.value = localStorage.getItem("ogarx:nickname") || "",
                this.playerInfo.tag = e.value = localStorage.getItem("ogarx:tag") || "";
                const r = localStorage.getItem("ogarx:server") || o.options[0].value;
                o.value = r,
                this.serverUrl = r,
                this.initClient("parent", this.serverUrl),
                t.addEventListener("input", ( () => {
                    this.playerInfo.nickname = t.value,
                    a.clients.length && a.clients.forEach((t => {
                        t.sendPlayerInfo({
                            nickname: this.playerInfo.nickname
                        })
                    }
                    )),
                    localStorage.setItem("ogarx:nickname", t.value)
                }
                )),
                e.addEventListener("input", ( () => {
                    this.playerInfo.tag = e.value,
                    a.clients.forEach((t => {
                        t.sendPlayerInfo({
                            tag: this.playerInfo.tag
                        })
                    }
                    )),
                    localStorage.setItem("ogarx:tag", e.value)
                }
                )),
                o.addEventListener("change", ( () => {
                    const t = o.value;
                    localStorage.setItem("ogarx:server", t),
                    this.serverUrl = t,
                    a.clients.length ? a.clients.forEach((t => {
                        t.close(),
                        t.on("close", ( () => this.initClient("parent", this.serverUrl)))
                    }
                    )) : this.initClient("parent", this.serverUrl)
                }
                )),
                l.addEventListener("click", ( () => {
                    a.clients.length ? a.clients.forEach((t => {
                        t.close(),
                        t.on("close", ( () => this.initClient("parent", this.serverUrl)))
                    }
                    )) : this.initClient("parent", this.serverUrl)
                }
                )),
                i.addEventListener("click", ( () => {
                    const t = a.getActiveClient();
                    t && t.sendSpawn(),
                    this.setElementVisibility(n, !1),
                    this.menuVisible = !1
                }
                )),
                s.addEventListener("click", ( () => {
                    const t = a.getActiveClient();
                    t && t.sendSpectate(),
                    this.setElementVisibility(n, !1),
                    this.menuVisible = !1
                }
                ))
            }
            initPlayerControls() {
                const t = document.querySelectorAll(".hotkey-input");
                let e = null;
                const i = new Set;
                let s, n = null;
                t.forEach((t => {
                    const e = localStorage.getItem(t.id);
                    e ? t.value = e : localStorage.setItem(t.id, t.value)
                }
                )),
                t.forEach((t => {
                    t.addEventListener("focus", ( () => {
                        e && e !== t && (e.classList.remove("selected"),
                        e = null),
                        e = t,
                        t.classList.add("selected"),
                        t.value = "",
                        t.addEventListener("keydown", (function(i) {
                            if (i.preventDefault(),
                            "Escape" === i.code)
                                return i.preventDefault(),
                                t.classList.remove("selected"),
                                void (e = null);
                            "Tab" === i.code && i.preventDefault();
                            const s = i.code;
                            t.value = s,
                            localStorage.setItem(t.id, s),
                            t.classList.remove("selected"),
                            e = null
                        }
                        ))
                    }
                    ))
                }
                )),
                document.addEventListener("keydown", (e => {
                    "Escape" !== e.code ? i.has(e.code) || (i.add(e.code),
                    t.forEach((t => {
                        localStorage.getItem(t.id) === e.code && this.triggerAction(t.id, e)
                    }
                    )),
                    t.forEach((t => {
                        t.value !== e.code || "macroFeedKey" !== t.id || n || (n = setInterval(( () => {
                            const t = a.getActiveClient();
                            t && t.sendEject()
                        }
                        ), 40)),
                        t.value === e.code && "botFeed" === t.id && !s && this.bots.length && (s = setInterval(( () => {
                            this.bots.forEach((t => {
                                t.sendEject()
                            }
                            ))
                        }
                        ), 40))
                    }
                    ))) : e.preventDefault()
                }
                )),
                document.addEventListener("keyup", (e => {
                    i.delete(e.code),
                    t.forEach((t => {
                        t.value === e.code && "macroFeedKey" === t.id && n && (clearInterval(n),
                        n = null),
                        t.value === e.code && "botFeed" === t.id && s && (clearInterval(s),
                        s = null)
                    }
                    ))
                }
                ))
            }
            triggerAction(t, e) {
                if (this.menuVisible)
                    return;
                if (this.settingsVisible)
                    return;
                const i = a.getActiveClient()
                  , s = a.totalPlaying();
                switch (t) {
                case "macroFeedKey":
                case "botFeed":
                    break;
                case "splitKey":
                    if (!i)
                        return;
                    i.sendSplit(1);
                    break;
                case "doubleSplitKey":
                    if (!i)
                        return;
                    i.sendSplit(2);
                    break;
                case "tricksplitKey":
                    if (!i)
                        return;
                    i.sendSplit(4);
                    break;
                case "DualSplit16key":
                    if (!i)
                        return;
                    s > 1 && a.clients.forEach((t => t.sendSplit(4)));
                    break;
                case "switchPlayerkey":
                    e.preventDefault(),
                    this.switchClient();
                    break;
                case "botSplit":
                    this.bots.length && this.bots.forEach((t => {
                        t.sendSplit(1)
                    }
                    ));
                    break;
                case "cellPause":
                    this.toggleMovement();
                    break;
                default:
                    console.log(`Action for ${t} not defined`)
                }
            }
            initMouseControls() {
                const t = document.getElementById("leftClick")
                  , e = document.getElementById("middleClick")
                  , i = document.getElementById("rightClick");
                t.addEventListener("change", ( () => {
                    this.setMouseAction("leftClick", t.value)
                }
                )),
                e.addEventListener("change", ( () => {
                    this.setMouseAction("middleClick", e.value)
                }
                )),
                i.addEventListener("change", ( () => {
                    this.setMouseAction("rightClick", i.value)
                }
                )),
                this.setupMouseListeners()
            }
            setMouseAction(t, e) {
                localStorage.setItem(`${t}Action`, e)
            }
            triggerMouseAction(t) {
                const e = localStorage.getItem(`${t}Action`)
                  , i = a.getActiveClient()
                  , s = a.totalPlaying();
                "macroFeed" === e ? i && (this[`macroFeedInterval_${t}`] || (this[`macroFeedInterval_${t}`] = setInterval(( () => {
                    a.getActiveClient().sendEject()
                }
                ), 40))) : "split" === e ? i && i.sendSplit(1) : "doubleSplit" === e ? i && i.sendSplit(2) : "tricksplit" === e ? i && i.sendSplit(4) : "switchPlayer" === e ? this.switchClient() : "DualSplit16" === e && s > 1 && a.clients.forEach((t => t.sendSplit(4)))
            }
            clearMacroFeed(t) {
                this[`macroFeedInterval_${t}`] && (clearInterval(this[`macroFeedInterval_${t}`]),
                this[`macroFeedInterval_${t}`] = null)
            }
            setupMouseListeners() {
                localStorage.getItem("leftClickAction") || localStorage.setItem("leftClickAction", "tricksplit"),
                localStorage.getItem("middleClickAction") || localStorage.setItem("middleClickAction", "noAction"),
                localStorage.getItem("rightClickAction") || localStorage.setItem("rightClickAction", "noAction"),
                document.addEventListener("mousedown", (t => {
                    if (this.menuVisible || this.settingsVisible)
                        return;
                    const e = 0 === t.button ? "leftClick" : 1 === t.button ? "middleClick" : "rightClick";
                    this.triggerMouseAction(e)
                }
                )),
                document.addEventListener("mouseup", (t => {
                    const e = 0 === t.button ? "leftClick" : 1 === t.button ? "middleClick" : "rightClick";
                    this.clearMacroFeed(e)
                }
                )),
                document.addEventListener("contextmenu", (t => {
                    t.preventDefault()
                }
                ))
            }
            initSettingsTabs() {
                const t = document.querySelectorAll(".tab")
                  , e = document.querySelectorAll(".tab-content");
                function i(i) {
                    const s = i.currentTarget;
                    t.forEach((t => t.classList.remove("active"))),
                    e.forEach((t => t.classList.remove("active"))),
                    s.classList.add("active");
                    const n = s.getAttribute("data-tab")
                      , a = document.getElementById(n);
                    a && a.classList.add("active")
                }
                t.forEach((t => {
                    t.addEventListener("click", i)
                }
                ))
            }
            initSettings() {
                this.settings = JSON.parse(localStorage.getItem("ogarx:settings")) || {
                    animationDelay: 140,
                    cellTransparency: 1,
                    showNicknames: !0,
                    showMass: !0,
                    showSkins: !0,
                    showGrid: !0,
                    showSectors: !1,
                    showPellets: !0,
                    cursorTracking: !1,
                    showDebug: !1,
                    multiboxAutoSwitchOnDeath: !0,
                    MBColor1: "#FFFFFF",
                    MBColor2: "#00B9E8",
                    ringWidth: 10,
                    cellSpeed: 0,
                    showIndicator: !1,
                    showRings: !0
                },
                this.bindSlider("animationDelay", "animationDelay", "animationDelayValue"),
                this.bindSlider("cellTransparency", "cellTransparency", "cellTransparencyValue"),
                this.bindSlider("ringWidth", "ringWidth", "ringWidthValue"),
                this.bindSlider("cellSpeed", "cellSpeed", "cellSpeedValue"),
                this.bindToggleSwitch("showNicknames", "showNicknames"),
                this.bindToggleSwitch("showRings", "showRings"),
                this.bindToggleSwitch("showIndicator", "showIndicator"),
                this.bindToggleSwitch("showMass", "showMass"),
                this.bindToggleSwitch("showSkins", "showSkins"),
                this.bindToggleSwitch("showGrid", "showGrid"),
                this.bindToggleSwitch("showSectors", "showSectors"),
                this.bindToggleSwitch("showPellets", "showPellets"),
                this.bindToggleSwitch("cursorTracking", "cursorTracking"),
                this.bindToggleSwitch("showDebug", "showDebug"),
                this.bindToggleSwitch("multiboxAutoSwitchOnDeath", "multiboxAutoSwitchOnDeath"),
                this.bindColorInput("MBColor1", "MBColor1"),
                this.bindColorInput("MBColor2", "MBColor2");
            }
            bindSlider(t, e, i) {
                const s = document.getElementById(e),
                      n = document.getElementById(i);
                if (!s)
                    return void console.warn(`Slider with id "${e}" not found.`);
                if (!n)
                    return void console.warn(`Display element with id "${i}" not found.`);
                
                const a = this.settings[t];
                s.value = a;
                n.textContent = a; // Display normal value
            
                s.addEventListener("input", (e) => {
                    const value = parseFloat(e.target.value);
                    this.settings[t] = value;
                    n.textContent = value;
            
                    localStorage.setItem("ogarx:settings", JSON.stringify(this.settings));
                });
            }
            bindColorInput(settingKey, inputId) {
                const input = document.getElementById(inputId);
                if (!input) {
                    console.warn(`Color input with id "${inputId}" not found.`);
                    return;
                }
    
                // Load saved color if available
                if (this.settings[settingKey]) {
                    input.value = this.settings[settingKey];
                }
    
                // Save color changes when input updates
                input.addEventListener("input", (event) => {
                    this.settings[settingKey] = event.target.value;
                    localStorage.setItem("ogarx:settings", JSON.stringify(this.settings));
                });
            }
            bindToggleSwitch(t, e) {
                const i = document.getElementById(e);
                i ? (i.checked = this.settings[t],
                i.addEventListener("change", (e => {
                    this.settings[t] = e.target.checked,
                    localStorage.setItem("ogarx:settings", JSON.stringify(this.settings))
                }
                ))) : console.warn(`Element with id "${e}" not found.`)
            }
        }
        ;
        
        Array.prototype.remove = function(t) {
            const e = this.indexOf(t);
            return -1 !== e && this.splice(e, 1),
            -1 !== e
        }
        ,
        document.addEventListener("DOMContentLoaded", ( () => {
            console.log("Document is ready, initializing OgarX Engine..."),
            g.start(),
            o.start(),
            window.app = g,
            window.skins = l,
            window.renderer = o,
            window.multibox = a,
            window.textCache = r
        }
        ))
    }
    )();
