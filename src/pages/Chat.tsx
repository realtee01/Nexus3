import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useWeb3 } from "@/lib/web3";
import { formatAddress } from "@/lib/utils";
import { Send, Wallet, MoreVertical, Paperclip, ChevronLeft, ArrowUpRight, MessageSquare, CheckCircle2, Clock, AlertTriangle, Info } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock Data
const MOCK_CONTACTS = [
  { id: '0x1234567890abcdef1234567890abcdef12345ef9', name: '', unread: 2, lastMessage: 'Hey! Did you send the ETH?' },
  { id: '0x89abcdef1234567890abcdef1234567890abc4a2', name: 'Vitalik', unread: 0, lastMessage: 'Thanks for the payment ðŸ™Œ' },
];

const MOCK_MESSAGES = [
  { id: 1, sender: '0x1234567890abcdef1234567890abcdef12345ef9', text: 'Hey there! Are we still doing the trade?', timestamp: '10:00 AM' },
  { id: 'sys-1', sender: 'system', type: 'system', text: 'You connected your wallet to the chat.', timestamp: '10:01 AM' },
  { id: 2, sender: 'me', text: 'Yes! Let me send the 0.5 ETH right now.', timestamp: '10:02 AM' },
  { id: 3, sender: 'me', type: 'tx', amount: '0.5 ETH', status: 'success', txHash: '0xabc...123', timestamp: '10:05 AM' },
  { id: 4, sender: '0x1234567890abcdef1234567890abcdef12345ef9', text: 'Got it. Thanks!', timestamp: '10:06 AM' },
  { id: 5, sender: 'me', type: 'tx', amount: '0.1 ETH', status: 'pending', txHash: '0xdef...456', timestamp: '10:10 AM' },
  { id: 'sys-2', sender: 'system', type: 'system', text: 'Transaction network is currently congested.', timestamp: '10:12 AM' },
  { id: 6, sender: 'me', type: 'tx', amount: '1.0 ETH', status: 'failed', txHash: '0xghi...789', timestamp: '10:15 AM' }
];

export function Chat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { address } = useWeb3();
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');

  const activeContact = MOCK_CONTACTS.find(c => c.id === id);

  return (
    <div className="flex-1 flex overflow-hidden w-full max-w-7xl mx-auto md:border-l md:border-r border-neutral-900 bg-black">
      {/* Sidebar - Contacts */}
      <div className={`w-full md:w-80 border-r border-neutral-900 flex-col ${id ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-neutral-900 flex items-center justify-between">
          <h2 className="font-semibold text-xl">Messages</h2>
          <button className="text-neutral-400 hover:text-white p-2">
             <div className="w-5 h-5 rounded-full border-2 border-current flex items-center justify-center">
                <span className="text-xl leading-none -mt-1">+</span>
             </div>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONTACTS.map((contact) => (
            <button
              key={contact.id}
              onClick={() => navigate(`/chat/${contact.id}`)}
              className={`w-full text-left p-4 flex items-center gap-3 transition-colors ${id === contact.id ? 'bg-neutral-900' : 'hover:bg-neutral-900/50'}`}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                 {contact.id.slice(2,4)}
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium truncate">{contact.name || formatAddress(contact.id)}</h3>
                  <span className="text-xs text-neutral-500">10:06 AM</span>
                </div>
                <p className="text-sm text-neutral-400 truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                 <div className="w-5 h-5 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                  {contact.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex-col relative h-full bg-black/50 ${!id ? 'hidden md:flex' : 'flex'}`}>
        {id ? (
          <>
            {/* Chat Header */}
            <div className="h-16 border-b border-neutral-900 flex items-center justify-between px-4 bg-black/80 backdrop-blur-md z-10 sticky top-0">
              <div className="flex items-center gap-3">
                <button className="md:hidden p-2 -ml-2 text-neutral-400 hover:text-white transition-colors" onClick={() => navigate('/chat')}>
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold shadow-md">
                  {id.slice(2,4)}
                </div>
                <div>
                  <h3 className="font-semibold leading-tight">{activeContact?.name || formatAddress(id)}</h3>
                  <p className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 block shadow-[0_0_8px_rgba(52,211,153,0.8)]"></span> Online
                  </p>
                </div>
              </div>
              <button className="text-neutral-400 hover:text-white p-2 transition-colors">
                <MoreVertical className="w-5 h-5" />
              </button>
            </div>

            {/* Messages List */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-5 pb-4">
               {MOCK_MESSAGES.map((msg) => {
                 if (msg.type === 'system') {
                   return (
                     <div key={msg.id} className="flex flex-col items-center justify-center my-2">
                       <div className="bg-neutral-900/60 border border-neutral-800 backdrop-blur-sm px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                         <Info className="w-4 h-4 text-neutral-400" />
                         <span className="text-xs font-medium text-neutral-300">{msg.text}</span>
                       </div>
                       <span className="text-[10px] text-neutral-500 mt-1">{msg.timestamp}</span>
                     </div>
                   );
                 }

                 return (
                 <div key={msg.id} className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                   {msg.type === 'tx' ? (
                     <div className={`p-0 rounded-2xl max-w-[85%] sm:max-w-md shadow-xl overflow-hidden ${msg.sender === 'me' ? 'bg-indigo-950/40 border border-indigo-900/50' : 'bg-neutral-900 border border-neutral-800'}`}>
                        <div className="p-4 flex flex-col items-center">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 shadow-[0_0_15px_rgba(0,0,0,0.2)] ${
                            msg.status === 'success' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            msg.status === 'pending' ? 'bg-amber-500/20 text-amber-500 border border-amber-500/30' :
                            'bg-red-500/20 text-red-500 border border-red-500/30'
                          }`}>
                            {msg.status === 'success' && <CheckCircle2 className="w-6 h-6" />}
                            {msg.status === 'pending' && <Clock className="w-6 h-6 animate-pulse" />}
                            {msg.status === 'failed' && <AlertTriangle className="w-6 h-6" />}
                          </div>
                          
                          <p className="text-sm text-neutral-400 font-medium tracking-wide mb-1 uppercase">
                            {msg.status === 'success' ? 'Transfer Complete' : msg.status === 'pending' ? 'Transfer Pending' : 'Transfer Failed'}
                          </p>
                          <p className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                            {msg.amount}
                          </p>
                        </div>
                        <div className={`px-4 py-3 text-xs flex items-center justify-between font-medium ${
                          msg.status === 'success' ? 'bg-emerald-500/10 border-t border-emerald-500/20' :
                          msg.status === 'pending' ? 'bg-amber-500/10 border-t border-amber-500/20' :
                          'bg-red-500/10 border-t border-red-500/20'
                        }`}>
                          <span className="text-neutral-300 font-mono tracking-wider">{msg.txHash}</span>
                          <a href="#" className="text-white hover:underline">View<ArrowUpRight className="inline w-3 h-3 ml-0.5" /></a>
                        </div>
                     </div>
                   ) : (
                     <div className={`px-4 py-3 rounded-2xl max-w-[85%] sm:max-w-md shadow-md text-[15px] leading-relaxed ${msg.sender === 'me' ? 'bg-indigo-600 text-white rounded-tr-sm' : 'bg-neutral-800 text-neutral-100 rounded-tl-sm'}`}>
                       <p>{msg.text}</p>
                     </div>
                   )}
                   <span className="text-[10px] text-neutral-500 mt-1.5 mx-1 font-medium">{msg.timestamp}</span>
                 </div>
                 );
               })}
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 bg-black border-t border-neutral-900 relative z-20 pb-safe">
              <div className="flex items-center gap-2">
                <Dialog>
                  <DialogTrigger className="p-3 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-full transition-colors flex-shrink-0 relative group">
                    <Wallet className="w-5 h-5 md:w-6 md:h-6" />

                    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-neutral-800 text-xs text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                      Send Crypto
                    </div>
                  </DialogTrigger>
                  <DialogContent className="bg-neutral-950 border-neutral-800 text-white sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Send via Chat</DialogTitle>
                    </DialogHeader>
                    <div className="py-4 space-y-4">
                       <div className="bg-neutral-900 p-4 rounded-xl border border-neutral-800">
                         <div className="flex justify-between text-sm text-neutral-400 mb-2">
                           <span>Amount (ETH)</span>
                           <span>Balance: 4.20 ETH</span>
                         </div>
                         <div className="flex items-center">
                           <input 
                             type="number" 
                             value={amount}
                             onChange={e => setAmount(e.target.value)}
                             placeholder="0.00"
                             className="bg-transparent text-4xl font-bold outline-none w-full appearance-none"
                           />
                           <span className="text-xl font-medium text-neutral-500">ETH</span>
                         </div>
                       </div>
                       <button 
                         className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50"
                         disabled={!address || !amount}
                       >
                         {address ? 'Send Transaction' : 'Connect Wallet to Send'}
                       </button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="flex-1 bg-neutral-900 rounded-full flex items-center border border-neutral-800 focus-within:border-neutral-600 transition-colors px-4">
                  <input 
                    type="text" 
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none py-3 outline-none text-white placeholder-neutral-500"
                  />
                  <button className="text-neutral-400 hover:text-white p-1">
                    <Paperclip className="w-5 h-5" />
                  </button>
                </div>
                
                <button className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors flex-shrink-0 disabled:opacity-50" disabled={!message.trim()}>
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-black/40">
            <div className="w-20 h-20 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-600 mb-6">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Web3 Messaging</h2>
            <p className="text-neutral-400 max-w-sm">Select a conversation from the sidebar or start a new chat using a wallet address.</p>
          </div>
        )}
      </div>
    </div>
  );
}
