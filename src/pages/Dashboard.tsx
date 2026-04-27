import React from "react";
import { useWeb3 } from "@/lib/web3";
import { formatAddress } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, Clock, MessageSquare, Send, Activity, Wallet, BarChart3, TrendingUp, Coins, QrCode, Copy, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const CRYPTO_LIST = [
  { id: 'btc', name: 'Bitcoin', symbol: 'BTC', color: 'bg-orange-500', icon: 'â‚¿' },
  { id: 'eth', name: 'Ethereum', symbol: 'ETH', color: 'bg-indigo-500', icon: 'Îž' },
  { id: 'sol', name: 'Solana', symbol: 'SOL', color: 'bg-purple-500', icon: 'â—Ž' },
  { id: 'pi', name: 'Pi Network', symbol: 'PI', color: 'bg-yellow-600', icon: 'Ï€' },
  { id: 'sidra', name: 'Sidra Bank', symbol: 'SIDRA', color: 'bg-emerald-600', icon: 'S' },
  { id: 'matic', name: 'Polygon', symbol: 'MATIC', color: 'bg-violet-600', icon: 'M' },
];

const MOCK_BALANCE_DATA = [
  { name: 'Mon', balance: 2.1 },
  { name: 'Tue', balance: 2.4 },
  { name: 'Wed', balance: 2.2 },
  { name: 'Thu', balance: 2.8 },
  { name: 'Fri', balance: 3.5 },
  { name: 'Sat', balance: 3.2 },
  { name: 'Sun', balance: 4.2 },
];

export function Dashboard() {
  const { address } = useWeb3();

  return (
    <div className="flex-1 overflow-y-auto w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 pb-24 md:pb-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold font-sans">Overview</h1>
        <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm font-medium">
          <Activity className="w-4 h-4 text-emerald-400" />
          <span className="text-neutral-300">Network: Ethereum Mainnet</span>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Balance Card */}
        <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-900 via-indigo-950 to-neutral-900 border border-indigo-500/30 rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <p className="text-indigo-200/80 font-medium mb-2 flex items-center gap-2">
                <Wallet className="w-4 h-4" /> Total Portfolio Value
              </p>
              <div className="flex items-baseline gap-2">
                <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">
                  {address ? '4.20' : '0.00'}
                </h2>
                <span className="text-xl md:text-2xl text-indigo-300 font-medium">ETH</span>
              </div>
              <p className="text-emerald-400 text-sm font-medium flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4" /> +12.5% vs last week
              </p>
            </div>
            
            <div className="flex flex-col gap-3 min-w-[140px]">
              <Dialog>
                <DialogTrigger className="bg-white text-black px-4 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg">
                  <Send className="w-4 h-4" /> Send Crypto
                </DialogTrigger>
                <DialogContent className="bg-neutral-950/95 backdrop-blur-xl border-neutral-800 text-white sm:max-w-md rounded-3xl overflow-hidden shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                      <Coins className="w-5 h-5 text-indigo-400" /> Select Asset to Send
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-3 mt-4">
                    {CRYPTO_LIST.map((crypto) => (
                      <Link 
                        key={crypto.id}
                        to="/chat"
                        className="flex items-center justify-between p-4 rounded-2xl bg-neutral-900/50 border border-neutral-800 hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all group"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-full ${crypto.color} flex items-center justify-center font-bold text-white shadow-lg`}>
                            {crypto.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-white group-hover:text-indigo-300 transition-colors">{crypto.name}</h4>
                            <p className="text-xs text-neutral-500 uppercase tracking-widest">{crypto.symbol}</p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-neutral-600 group-hover:text-white transition-colors" />
                      </Link>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog>
                <DialogTrigger className="bg-neutral-800/80 backdrop-blur-sm text-white px-4 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-neutral-700 transition-colors border border-white/10 shadow-lg">
                  <ArrowDownLeft className="w-4 h-4" /> Receive Crypto
                </DialogTrigger>
                <DialogContent className="bg-neutral-950/95 backdrop-blur-xl border-neutral-800 text-white sm:max-w-md rounded-3xl overflow-hidden shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-bold flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-indigo-400" /> Receive Assets
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center py-6">
                    <div className="bg-white p-4 rounded-2xl mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                       {/* Mock QR Code Pattern */}
                       <div className="w-48 h-48 bg-white flex items-center justify-center relative p-2">
                         <div className="grid grid-cols-7 grid-rows-7 gap-1 w-full h-full">
                           {[...Array(49)].map((_, i) => {
                             const isBorder = i < 7 || i > 41 || i % 7 === 0 || i % 7 === 6;
                             const isInner = (i >= 8 && i <= 12) || (i >= 36 && i <= 40);
                             const random = Math.random() > 0.4;
                             return (
                               <div key={i} className={`w-full h-full rounded-[1px] ${(isBorder || isInner || random) ? 'bg-black' : 'bg-transparent'}`} />
                             );
                           })}
                         </div>
                         <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white p-1 rounded-lg">
                               <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white text-[10px]">N3</div>
                            </div>
                         </div>
                       </div>
                    </div>
                    
                    <p className="text-sm text-neutral-400 mb-2">Your Wallet Address</p>
                    <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-xl w-full mb-6 font-mono text-xs overflow-hidden">
                      <span className="truncate flex-1 text-neutral-300">{address || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e'}</span>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(address || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
                        }} 
                        className="text-indigo-400 hover:text-indigo-300 transition-colors p-2 hover:bg-indigo-500/10 rounded-lg"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="w-full grid grid-cols-2 gap-3">
                      <button 
                         onClick={() => {
                          navigator.clipboard.writeText(address || '0x742d35Cc6634C0532925a3b844Bc454e4438f44e');
                        }}
                        className="flex items-center justify-center gap-2 bg-neutral-800 py-3 rounded-xl text-sm font-bold hover:bg-neutral-700 transition-colors text-white"
                      >
                        <Copy className="w-4 h-4" /> Copy
                      </button>
                      <button className="flex items-center justify-center gap-2 bg-neutral-800 py-3 rounded-xl text-sm font-bold hover:bg-neutral-700 transition-colors text-white">
                        <Download className="w-4 h-4" /> Save Tag
                      </button>
                    </div>
                    
                    <p className="mt-6 text-[10px] text-neutral-500 text-center px-8 uppercase tracking-widest leading-relaxed">
                      Only send Ethereum (ETH) or ERC-20 tokens to this address. Sending other assets may result in permanent loss.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mt-8 h-32 w-full relative z-10 -mb-4 -mx-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MOCK_BALANCE_DATA}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Tooltip
                  contentStyle={{ backgroundColor: '#171717', borderColor: '#262626', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ color: '#a5b4fc', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="balance" stroke="#818cf8" strokeWidth={3} fillOpacity={1} fill="url(#colorBalance)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Connected Wallet Card */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden shadow-lg group hover:border-neutral-700 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent z-0"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-black rounded-full flex items-center justify-center mb-6 border-4 border-neutral-800 shadow-2xl relative">
              <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-full opacity-20 group-hover:opacity-40 blur-md transition-opacity"></div>
              <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center font-bold text-2xl md:text-3xl text-black shadow-inner">
                {address ? address.slice(2,4).toUpperCase() : '?'}
              </div>
            </div>
            <p className="font-mono text-center text-sm md:text-base bg-black px-4 py-2.5 rounded-full border border-neutral-800 break-all shadow-inner text-neutral-300">
              {address ? formatAddress(address) : 'Not Connected'}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm text-neutral-500 font-medium">
              <div className={`w-2 h-2 rounded-full ${address ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-neutral-600'}`}></div>
              {address ? 'Wallet Active' : 'Connect to activate'}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Transactions */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-indigo-400" /> Recent Transactions
            </h3>
            <button className="text-sm font-medium text-neutral-400 hover:text-white transition-colors">View Explorer</button>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-lg flex-1">
            <div className="divide-y divide-neutral-800/50">
              {[
                { type: 'Sent', addr: "0x12..ef9", amount: "0.5 ETH", time: "2h ago", status: "success", tx: "0xabc...def" },
                { type: 'Received', addr: "0x89..4a2", amount: "1.2 ETH", time: "1d ago", status: "success", tx: "0x987...210" },
                { type: 'Sent', addr: "0x44..bb1", amount: "0.1 ETH", time: "3d ago", status: "success", tx: "0x111...222" },
                { type: 'Swapped', addr: "Uniswap", amount: "1.0 ETH", time: "4d ago", status: "success", tx: "0x333...444" },
              ].map((tx, i) => (
                <div key={i} className="flex items-center justify-between p-5 hover:bg-neutral-800/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 flex items-center justify-center rounded-xl ${
                      tx.type === 'Sent' ? 'bg-indigo-500/10 text-indigo-400' : 
                      tx.type === 'Received' ? 'bg-emerald-500/10 text-emerald-400' :
                      'bg-purple-500/10 text-purple-400'
                    }`}>
                      {tx.type === 'Sent' ? <ArrowUpRight className="w-5 h-5" /> : 
                       tx.type === 'Received' ? <ArrowDownLeft className="w-5 h-5" /> :
                       <BarChart3 className="w-5 h-5" />}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-neutral-200">{tx.type}</h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-neutral-500 font-mono">{tx.type === 'Received' ? 'From' : 'To'} {tx.addr}</span>
                        <span className="text-xs text-neutral-600">•</span>
                        <span className="text-xs text-emerald-500">Confirmed</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-base font-bold ${tx.type === 'Received' ? 'text-emerald-400' : 'text-white'}`}>
                      {tx.type === 'Sent' ? '-' : '+'}{tx.amount}
                    </p>
                    <p className="text-xs text-neutral-500 mt-1">{tx.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Chats */}
        <div className="flex flex-col h-full mt-8 lg:mt-0">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-white">
              <MessageSquare className="w-5 h-5 text-indigo-400" /> Recent Dispatches
            </h3>
            <Link to="/chat" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">Open Chat</Link>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-lg flex-1">
            <div className="divide-y divide-neutral-800/50">
              {[
                { addr: "0x12..ef9", msg: "Hey! Did you send the ETH?", time: "2h ago", unread: 3 },
                { addr: "0x89..4a2", msg: "Thanks for the payment 🙏", time: "1d ago", unread: 0 },
                { addr: "0x74..4e4", msg: "The smart contract is deployed.", time: "2d ago", unread: 0 },
              ].map((chat, i) => (
                <Link to={`/chat`} key={i} className="flex items-center gap-4 p-5 hover:bg-neutral-800/40 transition-colors group">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-transparent group-hover:ring-indigo-400 transition-all text-white">
                    {chat.addr.slice(2,4).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-mono text-sm font-semibold text-neutral-200 truncate">{chat.addr}</h4>
                      <span className="text-xs text-neutral-500 whitespace-nowrap ml-2">{chat.time}</span>
                    </div>
                    <p className={`text-sm truncate ${chat.unread ? 'text-white font-medium' : 'text-neutral-400'}`}>
                      {chat.msg}
                    </p>
                  </div>
                  {chat.unread > 0 && (
                    <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-bold shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                      {chat.unread}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
