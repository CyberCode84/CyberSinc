/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { 
  Monitor, 
  Smartphone, 
  Usb, 
  Gamepad2, 
  Zap, 
  Settings, 
  ChevronRight, 
  Wifi, 
  Cpu, 
  ShieldCheck, 
  MousePointer2, 
  Keyboard,
  Maximize2,
  RefreshCw,
  Power
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

type AppState = 'LANDING' | 'SETUP' | 'SEARCHING' | 'MIRRORING';

export default function App() {
  const [state, setState] = useState<AppState>('LANDING');
  const [latency, setLatency] = useState(2);
  const [fps, setFps] = useState(60);
  const [selectedDevice, setSelectedDevice] = useState<string | null>(null);

  // Simulate latency fluctuations
  useEffect(() => {
    if (state === 'MIRRORING') {
      const interval = setInterval(() => {
        setLatency(Math.floor(Math.random() * 3) + 1);
        setFps(60 - Math.floor(Math.random() * 2));
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [state]);

  const handleStart = () => setState('SETUP');
  const handleConnect = () => setState('SEARCHING');

  useEffect(() => {
    if (state === 'SEARCHING') {
      const timer = setTimeout(() => {
        setSelectedDevice('Xiaomi Poco F3');
        setState('MIRRORING');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  return (
    <div className="min-h-screen font-sans cyber-grid relative overflow-hidden flex flex-col">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 border-b border-white/5 bg-cyber-bg/80 backdrop-blur-md px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-cyber-cyan/10 border border-cyber-cyan/30 flex items-center justify-center rounded-lg cyber-glow">
            <Zap className="text-cyber-cyan w-6 h-6 fill-cyber-cyan" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter text-white cyber-text-glow">
              CYBER<span className="text-cyber-cyan">SINC</span>
            </h1>
            <p className="text-[10px] uppercase tracking-widest text-white/40 font-mono">Ultra Low Latency v1.0</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 text-xs font-mono">
            {state === 'MIRRORING' && (
              <>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyber-cyan animate-pulse" />
                  <span className="text-cyber-cyan">{fps} FPS</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-gray-400">{latency}ms DELAY</span>
                </div>
                <div className="text-gray-500">USB-HID: ATIVO</div>
              </>
            )}
          </div>
          
          <button className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/60">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-24 pb-12 px-6 flex flex-col items-center justify-center max-w-7xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {state === 'LANDING' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-12 max-w-3xl"
            >
              <div className="space-y-4">
                <motion.span 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="px-3 py-1 bg-cyber-pink/20 border border-cyber-pink/30 text-cyber-pink text-[10px] rounded-full font-bold uppercase tracking-widest"
                >
                  O Futuro do Mirroring Gamer
                </motion.span>
                <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-tight">
                  Jogue no Monitor com <span className="text-cyber-cyan underline decoration-cyber-cyan/30 underline-offset-8">Zero Delay</span>
                </h2>
                <p className="text-lg text-white/50 max-w-xl mx-auto">
                  Espelhe sua tela via USB com qualidade 4K, controle via teclado, mouse ou joystick. Sem root, sem delay, apenas performance pura.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleStart}
                  className="group relative px-8 py-4 bg-cyber-cyan text-black font-bold text-lg rounded-xl flex items-center gap-3 overflow-hidden shadow-[0_0_30px_rgba(0,242,255,0.3)] transition-all hover:scale-105 active:scale-95"
                >
                  <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  Conectar Dispositivo
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white/5 border border-white/10 text-white font-bold text-lg rounded-xl flex items-center gap-3 transition-all hover:bg-white/10">
                  <Gamepad2 className="w-5 h-5" />
                  Configurar Controles
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 border-t border-white/5">
                <div className="space-y-2">
                  <div className="flex justify-center text-cyber-cyan"><Zap className="w-6 h-6" /></div>
                  <div className="text-sm font-bold text-white uppercase tracking-tighter">Ultra Latência</div>
                  <div className="text-xs text-white/30 truncate uppercase tracking-widest">Protocolo CyberFlux</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center text-cyber-pink"><MousePointer2 className="w-6 h-6" /></div>
                  <div className="text-sm font-bold text-white uppercase tracking-tighter">Controle Total</div>
                  <div className="text-xs text-white/30 truncate uppercase tracking-widest">K/M & Joysticks</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center text-cyber-yellow"><ShieldCheck className="w-6 h-6" /></div>
                  <div className="text-sm font-bold text-white uppercase tracking-tighter">Sem Root</div>
                  <div className="text-xs text-white/30 truncate uppercase tracking-widest">Seguro e Plug&Play</div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center text-white"><Cpu className="w-6 h-6" /></div>
                  <div className="text-sm font-bold text-white uppercase tracking-tighter">Multiplayer</div>
                  <div className="text-xs text-white/30 truncate uppercase tracking-widest">Até 4 Telas</div>
                </div>
              </div>
            </motion.div>
          )}

          {state === 'SETUP' && (
            <motion.div 
              key="setup"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="max-w-2xl w-full"
            >
              <div className="bg-cyber-card border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden scanline">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-bold text-white">Preparando Conexão</h2>
                    <p className="text-sm text-white/40">Siga os passos abaixo para começar o espelhamento.</p>
                  </div>
                  <button onClick={() => setState('LANDING')} className="text-xs font-mono text-white/30 hover:text-white uppercase tracking-widest">Voltar</button>
                </div>

                <div className="space-y-6">
                  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyber-cyan/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-cyber-cyan/10 flex items-center justify-center flex-shrink-0 text-cyber-cyan border border-cyber-cyan/30">
                      <Usb className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">1. Conecte o Cabo USB</h3>
                      <p className="text-sm text-white/40">Use um cabo de alta velocidade para melhor latência.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyber-pink/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-cyber-pink/10 flex items-center justify-center flex-shrink-0 text-cyber-pink border border-cyber-pink/30">
                      <Settings className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">2. Ative o USB Debugging</h3>
                      <p className="text-sm text-white/40 italic">(Apenas Android) Menu Opções do Desenvolvedor.</p>
                    </div>
                  </div>

                  <div className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:border-cyber-yellow/30 transition-colors">
                    <div className="w-10 h-10 rounded-xl bg-cyber-yellow/10 flex items-center justify-center flex-shrink-0 text-cyber-yellow border border-cyber-yellow/30">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white">3. Confirme no Telefone</h3>
                      <p className="text-sm text-white/40">Permita o acesso à tela e áudio no seu dispositivo.</p>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handleConnect}
                  className="w-full py-4 bg-cyber-cyan text-black font-bold rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(0,242,255,0.2)] hover:shadow-[0_0_40px_rgba(0,242,255,0.4)] transition-all"
                >
                  <Monitor className="w-5 h-5" />
                  Iniciar Varredura
                </button>
              </div>
            </motion.div>
          )}

          {state === 'SEARCHING' && (
            <motion.div 
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-8"
            >
              <div className="flex justify-center items-center relative">
                <div className="absolute w-48 h-48 border border-cyber-cyan/20 rounded-full animate-ping" />
                <div className="absolute w-32 h-32 border border-cyber-cyan/40 rounded-full animate-ping [animation-delay:0.5s]" />
                <div className="w-24 h-24 bg-cyber-cyan/10 border-2 border-cyber-cyan/50 rounded-full flex items-center justify-center cyber-glow">
                  <RefreshCw className="text-cyber-cyan w-10 h-10 animate-spin" />
                </div>
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Buscando Dispositivos</h2>
                <div className="flex items-center justify-center gap-2 text-xs font-mono text-white/40">
                  <span className="w-1 h-1 bg-cyber-cyan rounded-full animate-bounce" />
                  Varrendo portas USB: Bus 001 Device 004...
                </div>
              </div>
            </motion.div>
          )}

          {state === 'MIRRORING' && (
            <motion.div 
              key="mirroring"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl border border-white/5 relative shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden group"
            >
              {/* Virtual Mirror Screen */}
              <div className="absolute inset-0 flex items-center justify-center bg-zinc-900 overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Game Mockup */}
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-pink-900/40" />
                  
                  {/* Simulated Mobile Screen (Horizontal) */}
                  <div className="relative w-[80%] aspect-[20/9] bg-black rounded-3xl border-4 border-zinc-800 shadow-2xl flex items-center justify-center overflow-hidden">
                    <img 
                       src="https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop"
                       alt="Gaming Content"
                       className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4">
                       <div className="bg-black/80 px-6 py-3 rounded-full border border-white/10 backdrop-blur-md flex items-center gap-4">
                         <div className="flex items-center gap-2">
                           <Gamepad2 className="text-cyber-cyan w-6 h-6 animate-pulse" />
                           <span className="text-white font-bold tracking-widest text-sm uppercase">Gaming Mode: Ativo</span>
                         </div>
                       </div>
                       <div className="text-[10px] text-white/40 font-mono flex gap-4 bg-black/40 px-3 py-1 rounded-full border border-white/5">
                         <span>1920x1080 @ 60FPS</span>
                         <span>BUFFER: 0.1ms</span>
                         <span>ENC: H.264</span>
                       </div>
                    </div>

                    {/* Touch Indicators */}
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatDelay: 1 }}
                      className="absolute right-[15%] bottom-[20%] w-12 h-12 rounded-full border-2 border-cyber-pink"
                    />
                    <motion.div 
                      animate={{ scale: [1, 1.5, 1], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.5, repeatDelay: 1 }}
                      className="absolute left-[15%] bottom-[20%] w-12 h-12 rounded-full border-2 border-cyber-cyan"
                    />
                  </div>

                  {/* UI Overlays */}
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-black/60 p-3 rounded-xl border border-white/10 backdrop-blur-xl">
                      <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono mb-2">Controles Detectados</div>
                      <div className="flex gap-3">
                        <Keyboard className="w-5 h-5 text-cyber-cyan" />
                        <MousePointer2 className="w-5 h-5 text-cyber-pink" />
                        <Gamepad2 className="w-5 h-5 text-cyber-yellow" />
                      </div>
                    </div>
                    
                    <div className="bg-black/60 p-3 rounded-xl border border-white/10 backdrop-blur-xl">
                      <div className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-mono mb-2">Lobby Multiplayer</div>
                      <div className="flex items-center gap-2">
                         <div className="flex -space-x-2">
                            {[1, 2, 3].map(i => (
                              <div key={i} className="w-6 h-6 rounded-full border border-black bg-zinc-800 flex items-center justify-center text-[10px] font-bold text-cyber-yellow">
                                P{i}
                              </div>
                            ))}
                            <div className="w-6 h-6 rounded-full border border-black bg-cyber-pink/20 flex items-center justify-center text-[10px] font-bold text-cyber-pink">+</div>
                         </div>
                         <span className="text-[10px] text-white/60 font-mono tracking-tighter">AGUARDANDO...</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 flex items-center gap-4">
                     <button className="p-3 bg-cyber-cyan text-black rounded-lg hover:scale-110 transition-transform">
                       <Maximize2 className="w-5 h-5" />
                     </button>
                     <button className="p-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors">
                       <Smartphone className="w-5 h-5" />
                     </button>
                  </div>
                </div>
              </div>

              {/* Toolbar Hidden till hover */}
              <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform flex justify-between items-center backdrop-blur-md">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded bg-cyber-pink/20 border border-cyber-pink/40 flex items-center justify-center text-cyber-pink">
                      <Zap className="w-4 h-4 fill-cyber-pink" />
                    </div>
                    <span className="text-white font-bold text-sm tracking-widest">{selectedDevice}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setState('LANDING')} className="flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-500 border border-red-500/30 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all">
                    <Power className="w-4 h-4" />
                    Encerrar
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer Meta */}
      <footer className="p-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 opacity-40">
        <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.2em]">
          <span>© 2024 CyberSinc Labs</span>
          <span className="w-1 h-1 bg-white/40 rounded-full" />
          <span>Segurança Ponta-a-Ponta</span>
        </div>
        <div className="flex gap-6 uppercase text-[10px] tracking-widest font-bold">
          <a href="#" className="hover:text-cyber-cyan transition-colors">Suporte</a>
          <a href="#" className="hover:text-cyber-pink transition-colors">Termos</a>
          <a href="#" className="hover:text-cyber-yellow transition-colors">Docs API</a>
        </div>
      </footer>

      {/* Decorative Blur Elements */}
      <div className="fixed -top-24 -left-24 w-96 h-96 bg-cyber-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed -bottom-24 -right-24 w-96 h-96 bg-cyber-pink/10 rounded-full blur-[120px] pointer-events-none" />
    </div>
  );
}
