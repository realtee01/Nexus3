import { Link, useNavigate, useLocation } from "react-router-dom";
import { useWeb3 } from "@/lib/web3";
import { formatAddress } from "@/lib/utils";
import { LogOut, Wallet, MessageSquare, LayoutDashboard, User, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { CpuArchitecture } from "@/components/ui/cpu-architecture";

export function TopNav() {
  const { address, connectWallet, disconnectWallet, isConnecting } = useWeb3();
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <>
      {/* Desktop & Mobile Header */}
      <nav className="h-16 border-b border-white/10 flex items-center justify-between px-4 md:px-6 bg-black/60 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 p-0.5 rounded-lg border border-white/20 group-hover:border-white/40 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden bg-black flex-shrink-0">
            <CpuArchitecture className="w-[120%] h-[120%]" text="Nexus3" lineMarkerSize={12} animateMarkers={false} showCpuConnections={false} />
          </div>
          <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Nexus3</span>
        </Link>

        <div className="flex items-center gap-3">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 mr-4">
            <Link to="/dashboard" className={`text-sm font-medium transition-colors ${isActive('/dashboard') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>Dashboard</Link>
            <Link to="/chat" className={`text-sm font-medium transition-colors ${isActive('/chat') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>Chat</Link>
            <Link to="/profile" className={`text-sm font-medium transition-colors ${isActive('/profile') ? 'text-white' : 'text-neutral-400 hover:text-white'}`}>Profile</Link>
          </div>
          
          {address ? (
            <Dialog>
              <DialogTrigger className="flex items-center gap-2 bg-neutral-900 border border-neutral-700 hover:border-neutral-500 px-3 md:px-4 py-2 rounded-full transition-all shadow-md group">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                <span className="text-sm font-medium text-neutral-200 group-hover:text-white">{formatAddress(address)}</span>
              </DialogTrigger>
              <DialogContent className="bg-neutral-950/95 backdrop-blur-xl border-neutral-800 text-white sm:max-w-md rounded-2xl shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl">Your Wallet</DialogTitle>
                  </DialogHeader>
                  <div className="py-8 flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-3xl font-extrabold border-4 border-neutral-800 shadow-xl relative">
                       <div className="absolute inset-0 bg-white/20 rounded-full mix-blend-overlay"></div>
                      {address.slice(2, 4).toUpperCase()}
                    </div>
                    <div className="text-center">
                      <p className="text-xl font-mono text-white bg-neutral-900 px-4 py-2 rounded-xl mb-1">{formatAddress(address)}</p>
                      <p className="text-sm text-neutral-400 font-medium tracking-wide pb-2">MetaMask Connected</p>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <button 
                      onClick={() => navigate('/profile')} 
                      className="flex-1 bg-white text-black py-3 rounded-xl font-semibold hover:bg-neutral-200 transition-colors shadow-lg"
                    >
                      View Profile
                    </button>
                    <button 
                      onClick={disconnectWallet}
                      className="flex items-center justify-center gap-2 px-5 py-3 bg-red-500/10 text-red-500 rounded-xl hover:bg-red-500/20 transition-colors font-medium border border-red-500/20"
                    >
                      <LogOut className="w-5 h-5" />
                    </button>
                  </div>
                </DialogContent>
              </Dialog>
          ) : (
            <Dialog>
            <DialogTrigger 
              disabled={isConnecting}
              className={`flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-full font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] disabled:opacity-80 disabled:cursor-wait ${!isConnecting ? "hover:bg-neutral-200" : ""}`}
            >
              {isConnecting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Wallet className="w-4 h-4" />}
              {isConnecting ? "Connecting..." : "Connect Wallet"}
            </DialogTrigger>
            <DialogContent className="bg-neutral-950/95 backdrop-blur-xl border-neutral-800 text-white sm:max-w-md rounded-2xl shadow-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl text-center">Connect a Wallet</DialogTitle>
              </DialogHeader>
              <div className="py-6 flex flex-col space-y-3">
                <button
                  onClick={() => connectWallet()}
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-6 h-6" />
                    </div>
                    <span className="font-semibold text-lg">MetaMask</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Popular</span>
                </button>
                <button
                  onClick={() => alert("Coinbase Wallet integration coming soon.")}
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                    </div>
                    <span className="font-semibold text-lg">Coinbase Wallet</span>
                  </div>
                </button>
                <button
                  onClick={() => alert("WalletConnect integration coming soon.")}
                  className="flex items-center justify-between p-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-800 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-sky-500/10 flex items-center justify-center border border-sky-500/20">
                      <svg className="w-6 h-6 text-sky-500" viewBox="0 0 40 40" fill="currentColor">
                        <path d="M12.261 14.5492C16.5364 10.3752 23.4636 10.3752 27.739 14.5492L28.1883 14.9878C28.4619 15.255 28.4619 15.6881 28.1883 15.9552L25.3344 18.7412C25.1976 18.8748 24.9758 18.8748 24.8391 18.7412L24.3216 18.2361C21.9392 15.9103 18.0608 15.9103 15.6784 18.2361L15.1609 18.7412C15.0242 18.8748 14.8024 18.8748 14.6656 18.7412L11.8117 15.9552C11.5381 15.6881 11.5381 15.255 11.8117 14.9878L12.261 14.5492ZM31.4921 18.2127L36.31 22.9161C36.5836 23.1833 36.5836 23.6163 36.31 23.8835L33.4561 26.6695C33.3193 26.803 33.0975 26.803 32.9608 26.6695L25.4055 19.2941C25.2687 19.1606 25.047 19.1606 24.9102 19.2941L20.4952 23.6041C20.2215 23.8712 19.7785 23.8712 19.5048 23.6041L15.0898 19.2941C14.953 19.1606 14.7313 19.1606 14.5945 19.2941L7.03923 26.6695C6.90248 26.803 6.68071 26.803 6.54396 26.6695L3.69006 23.8835C3.41643 23.6163 3.41643 23.1833 3.69006 22.9161L8.50785 18.2127C14.8569 12.0145 25.1431 12.0145 31.4921 18.2127Z" />
                      </svg>
                    </div>
                    <span className="font-semibold text-lg">WalletConnect</span>
                  </div>
                </button>
              </div>
            </DialogContent>
          </Dialog>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation Component */}
      {/* Background Gradient fade for floating pill */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none z-40" />
      
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 h-16 w-[90%] max-w-[340px] bg-neutral-900/90 backdrop-blur-xl border border-neutral-700/50 rounded-full flex items-center justify-around z-50 px-4 shadow-[0_10px_40px_rgba(0,0,0,0.8)]">
        <Link to="/dashboard" className={`flex flex-col items-center justify-center h-full px-4 space-y-1 ${isActive('/dashboard') ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>
          <LayoutDashboard className={`w-5 h-5 ${isActive('/dashboard') ? 'text-white' : ''}`} />
          <span className="text-[10px] font-medium">Dashboard</span>
        </Link>
        <Link to="/chat" className={`flex flex-col items-center justify-center h-full px-4 space-y-1 relative ${isActive('/chat') ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>
          <MessageSquare className={`w-5 h-5 ${isActive('/chat') ? 'text-white' : ''}`} />
          <span className="text-[10px] font-medium">Chat</span>
          <div className="absolute top-3 right-3.5 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.8)]"></div>
        </Link>
        <Link to="/profile" className={`flex flex-col items-center justify-center h-full px-4 space-y-1 ${isActive('/profile') ? 'text-white' : 'text-neutral-500 hover:text-neutral-300'}`}>
          <User className={`w-5 h-5 ${isActive('/profile') ? 'text-white' : ''}`} />
          <span className="text-[10px] font-medium">Profile</span>
        </Link>
      </div>

      {/* Global Connecting Overlay */}
      {isConnecting && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all">
          <div className="bg-neutral-900 border border-neutral-800 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-2xl">
            <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
            <span className="text-white font-medium text-lg">Awaiting Wallet Confirmation...</span>
          </div>
        </div>
      )}
    </>
  );
}
