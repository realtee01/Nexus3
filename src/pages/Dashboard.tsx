import React from "react";
import { useWeb3 } from "@/lib/web3";
import { formatAddress } from "@/lib/utils";
import { ArrowUpRight, ArrowDownLeft, Clock, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const { address } = useWeb3();

  return (
    <div className="flex-1 overflow-y-auto w-full max-w-5xl mx-auto px-4 py-8 pb-20 md:pb-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 font-sans">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="col-span-1 md:col-span-2 bg-gradient-to-br from-indigo-900 to-purple-900 border border-indigo-500/30 rounded-2xl p-6 md:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
          <p className="text-indigo-200 font-medium mb-1 drop-shadow-sm">Total Balance</p>
          <div className="flex items-baseline gap-2">
            <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight drop-shadow-md">{address ? '4.20' : '0.00'}</h2>
            <span className="text-xl md:text-2xl text-indigo-200 font-medium">ETH</span>
          </div>
          <div className="mt-8 flex gap-3">
            <Link to="/chat" className="bg-white text-black px-4 py-3 rounded-xl font-semibold flex-1 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors shadow-lg">
              <Send className="w-4 h-4" /> Send Crypto
            </Link>
          </div>
        </div>

        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col justify-center items-center relative overflow-hidden shadow-lg">
          <div className="absolute inset-0 bg-neutral-800/10 backdrop-blur-[2px]"></div>
          <div className="relative z-10 w-full flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-black rounded-full flex items-center justify-center mb-4 border border-neutral-700 shadow-xl">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center font-bold text-xl md:text-2xl text-black shadow-inner">
                {address ? address.slice(2,4).toUpperCase() : '?'}
              </div>
            </div>
            <p className="font-mono text-center text-lg bg-neutral-950 px-4 py-2 rounded-full border border-neutral-800 break-all">{address ? formatAddress(address) : 'Not Connected'}</p>
            <p className="text-center text-sm text-neutral-500 mt-2 font-medium">{address ? 'Active Wallet' : 'Connect to activate'}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-neutral-400" /> Recent Chats
            </h3>
            <Link to="/chat" className="text-sm text-indigo-400 hover:text-indigo-300">View all</Link>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden divide-y divide-neutral-800">
            {/* Mock Chat Items */}
            {[
              { addr: "0x12..ef9", msg: "Hey! Did you send the ETH?", time: "2h ago", unread: true },
              { addr: "0x89..4a2", msg: "Thanks for the payment ð", time: "1d ago", unread: false },
            ].map((chat, i) => (
              <Link to={`/chat/${chat.addr}`} key={i} className="flex items-center gap-4 p-4 hover:bg-neutral-800/50 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center font-bold text-xs ring-2 ring-transparent group-hover:ring-indigo-400 transition-all">
                  {chat.addr.slice(2,4)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-mono text-sm leading-tight">{chat.addr}</h4>
                    <span className="text-xs text-neutral-500">{chat.time}</span>
                  </div>
                  <p className={`text-sm mt-1 truncate max-w-[200px] ${chat.unread ? 'text-white font-medium' : 'text-neutral-400'}`}>
                    {chat.msg}
                  </p>
                </div>
                {chat.unread && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <Clock className="w-5 h-5 text-neutral-400" /> Recent Transactions
            </h3>
          </div>
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden divide-y divide-neutral-800">
            {/* Mock Transactions */}
            {[
              { type: 'Sent', addr: "0x12..ef9", amount: "0.5 ETH", time: "2h ago" },
              { type: 'Received', addr: "0x89..4a2", amount: "1.2 ETH", time: "1d ago" },
              { type: 'Sent', addr: "0x44..bb1", amount: "0.1 ETH", time: "3d ago" },
            ].map((tx, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-neutral-800/20 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${tx.type === 'Sent' ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    {tx.type === 'Sent' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownLeft className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">{tx.type}</h4>
                    <p className="text-xs text-neutral-500 font-mono">To {tx.addr}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{tx.type === 'Sent' ? '-' : '+'}{tx.amount}</p>
                  <p className="text-xs text-neutral-500">{tx.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
