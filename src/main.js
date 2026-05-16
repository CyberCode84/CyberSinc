/**
 * CyberSinc - Vanilla JS Version
 * Optimized for low-end hardware (TV Boxes)
 */

const STATE = {
    LANDING: 'LANDING',
    SETUP: 'SETUP',
    SEARCHING: 'SEARCHING',
    MIRRORING: 'MIRRORING'
};

let currentState = STATE.LANDING;
let latency = 2;
let fps = 60;
let statsInterval = null;

// DOM Elements
const mainContent = document.getElementById('main-content');
const statsBar = document.getElementById('stats-bar');
const fpsCounter = document.getElementById('fps-counter');
const latencyCounter = document.getElementById('latency-counter');

// Templates
const templates = {
    [STATE.LANDING]: `
        <div class="landing-view">
            <span class="badge">O Futuro do Mirroring Gamer</span>
            <h2>Jogue no Monitor com <span class="highlight">Zero Delay</span></h2>
            <p>Espelhe sua tela via USB com qualidade 4K, controle via teclado, mouse ou joystick. Sem root, sem delay, apenas performance pura.</p>
            <div class="btn-group">
                <button class="btn btn-primary" onclick="changeState('SETUP')">
                    Conectar Dispositivo ➜
                </button>
                <button class="btn btn-secondary">
                    🕹️ Configurar Controles
                </button>
            </div>
            <div class="features-grid">
                <div class="feature-item">
                    <span class="feature-icon">⚡</span>
                    <div class="feature-title">Ultra Latência</div>
                    <div class="feature-desc">Protocolo CyberFlux</div>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🖱️</span>
                    <div class="feature-title">Controle Total</div>
                    <div class="feature-desc">K/M & Joysticks</div>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">🛡️</span>
                    <div class="feature-title">Sem Root</div>
                    <div class="feature-desc">Seguro e Plug&Play</div>
                </div>
                <div class="feature-item">
                    <span class="feature-icon">💻</span>
                    <div class="feature-title">Multiplayer</div>
                    <div class="feature-desc">Até 4 Telas</div>
                </div>
            </div>
        </div>
    `,
    [STATE.SETUP]: `
        <div class="setup-card">
            <div style="display: flex; justify-content: space-between; align-items: start;">
                <div>
                    <h2>Preparando Conexão</h2>
                    <p>Siga os passos abaixo para começar.</p>
                </div>
                <button onclick="changeState('LANDING')" style="background:none; border:none; color:rgba(255,255,255,0.3); cursor:pointer; font-family:monospace; font-size:10px; letter-spacing:0.1em;">VOLTAR</button>
            </div>
            
            <div class="step-list">
                <div class="step-item">
                    <div class="step-icon" style="color:var(--cyber-cyan)">🔌</div>
                    <div class="step-info">
                        <h3>1. Conecte o Cabo USB</h3>
                        <p>Use um cabo de alta velocidade.</p>
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-icon" style="color:var(--cyber-pink)">⚙️</div>
                    <div class="step-info">
                        <h3>2. Ative o USB Debugging</h3>
                        <p>Menu Opções do Desenvolvedor no Android.</p>
                    </div>
                </div>
                <div class="step-item">
                    <div class="step-icon" style="color:var(--cyber-yellow)">🛡️</div>
                    <div class="step-info">
                        <h3>3. Confirme no Telefone</h3>
                        <p>Permita o acesso à tela e áudio.</p>
                    </div>
                </div>
            </div>

            <button class="btn btn-primary" style="width: 100%; justify-content: center;" onclick="changeState('SEARCHING')">
                📺 Iniciar Varredura
            </button>
        </div>
    `,
    [STATE.SEARCHING]: `
        <div style="text-align: center;">
            <div style="width: 80px; height: 80px; border: 2px solid var(--cyber-cyan); border-radius: 50%; margin: 0 auto 2rem; display: flex; align-items: center; justify-content: center;" class="animate-spin">
                <span style="font-size: 2rem;">🔄</span>
            </div>
            <h2 style="letter-spacing: 0.2em; text-transform: uppercase;">Buscando Dispositivos</h2>
            <p style="font-family: 'JetBrains Mono', monospace; font-size: 10px; color: var(--text-dim); margin-top: 1rem;">
                VARRENDO PORTAS USB: BUS 001 DEVICE 004...
            </p>
        </div>
    `,
    [STATE.MIRRORING]: `
        <div class="mirror-container">
            <img src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop" class="game-content" />
            
            <div class="overlay-ui">
                <div class="control-pill">
                    <div class="pill-title">Controles Detectados</div>
                    <div class="pill-icons">
                        <span>⌨️</span> <span>🖱️</span> <span>🎮</span>
                    </div>
                </div>
                
                <div class="control-pill">
                    <div class="pill-title">Lobby Multiplayer</div>
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <div style="background: rgba(255,255,255,0.1); border-radius: 99px; padding: 2px 8px; font-size: 8px; color: var(--cyber-yellow); font-weight: bold;">P1</div>
                        <div style="background: rgba(255,255,255,0.1); border-radius: 99px; padding: 2px 8px; font-size: 8px; color: var(--cyber-yellow); font-weight: bold;">P2</div>
                        <span style="font-size: 8px; color: var(--text-dim);">AGUARDANDO...</span>
                    </div>
                </div>
            </div>

            <div style="position: absolute; bottom: 0; width: 100%; background: linear-gradient(transparent, rgba(0,0,0,0.8)); padding: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center; gap: 0.75rem;">
                    <span style="color: var(--cyber-pink); font-size: 1.25rem;">⚡</span>
                    <span style="font-weight: bold; font-size: 0.875rem; letter-spacing: 0.05em;">XIAOMI POCO F3</span>
                </div>
                <button onclick="changeState('LANDING')" class="btn" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; border: 1px solid rgba(239, 68, 68, 0.4); padding: 0.5rem 1rem; font-size: 0.75rem; text-transform: uppercase;">
                    Encerrar
                </button>
            </div>
        </div>
    `
};

// Functions
function render() {
    mainContent.innerHTML = templates[currentState];
    
    if (currentState === STATE.MIRRORING) {
        statsBar.style.display = 'flex';
        startStats();
    } else {
        statsBar.style.display = 'none';
        stopStats();
    }
}

function changeState(newState) {
    currentState = newState;
    render();
    
    if (newState === STATE.SEARCHING) {
        setTimeout(() => {
            changeState(STATE.MIRRORING);
        }, 3000);
    }
}

function startStats() {
    stopStats();
    statsInterval = setInterval(() => {
        latency = 2 + Math.floor(Math.random() * 2);
        fps = 60 - Math.floor(Math.random() * 2);
        
        fpsCounter.textContent = `${fps} FPS`;
        latencyCounter.textContent = `${latency}ms DELAY`;
    }, 2000);
}

function stopStats() {
    if (statsInterval) clearInterval(statsInterval);
}

// Global click handling for older browsers that might block inline onclick occasionally 
// (though most are fine with it)
window.changeState = changeState;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    render();
});
