import React from 'react';
import { useWeb3 } from '@/lib/web3';
import { formatAddress } from '@/lib/utils';
import { LogOut, Copy, ExternalLink, Settings, Shield, Bell, Key, Image as ImageIcon } from 'lucide-react';

export function Profile() {
  const { address, disconnectWallet } = useWeb3();

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto w-full max-w-5xl mx-auto px-4 py-8 pb-24 md:pb-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Left Column - Profile Card */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 relative overflow-hidden shadow-2xl">
            {/* Banner */}
            <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-30"></div>
            
            <div className="relative flex flex-col items-center z-10 pt-10">
              <div className="w-28 h-28 bg-black rounded-full border-4 border-neutral-900 flex items-center justify-center relative overflow-hidden shadow-xl mb-5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 animate-pulse opacity-40"></div>
                <span className="text-3xl font-bold text-white relative z-10">
                  {address ? address.slice(2, 4).toUpperCase() : '?'}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2">User Profile</h2>
              <div className="flex items-center gap-2 text-neutral-400 bg-black/50 px-4 py-2 rounded-full border border-white/10 mb-8 shadow-inner">
                <span className="font-mono text-sm">{address ? formatAddress(address) : 'Not Connected'}</span>
                {address && (
                  <button onClick={copyToClipboard} className="text-neutral-500 hover:text-white transition-colors">
                    <Copy className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="w-full flex flex-col gap-3">
                <button className="flex justify-center items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-2xl font-medium hover:bg-neutral-700 transition">
                  <Settings className="w-4 h-4" /> Edit Profile
                </button>
                <button className="flex justify-center items-center gap-2 bg-neutral-800 text-white px-6 py-3 rounded-2xl font-medium hover:bg-neutral-700 transition">
                  <ExternalLink className="w-4 h-4" /> View on Etherscan
                </button>
              </div>
            </div>
          </div>

          <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-3xl flex flex-col justify-between">
             <div className="mb-6">
               <h3 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-2">
                 <Shield className="w-5 h-5" /> Danger Zone
               </h3>
               <p className="text-sm text-neutral-400 leading-relaxed">
                 {address ? 'Disconnecting will remove your active session and require signing in again.' : 'You must connect a wallet first.'}
               </p>
             </div>
             {address && (
             <button 
               onClick={disconnectWallet}
               className="flex items-center justify-center gap-2 w-full bg-red-500/10 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500/20 transition-colors border border-red-500/20 shadow-sm"
             >
               <LogOut className="w-5 h-5" /> Disconnect Wallet
             </button>
             )}
          </div>
        </div>

        {/* Right Column - Details and Preferences */}
        <div className="w-full lg:w-2/3 flex flex-col gap-8">
          
          {/* Connected Assets */}
          <div>
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-white">
              <ImageIcon className="w-5 h-5 text-indigo-400" /> Digital Collectibles
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { name: "Nexus Pass", col: "bg-indigo-500" },
                { name: "Genesis Badge", col: "bg-emerald-500" },
                { name: "Early Access", col: "bg-purple-500" }
              ].map((nft, i) => (
                <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-2xl p-4 overflow-hidden group hover:border-neutral-700 transition-colors cursor-pointer">
                  <div className={`w-full aspect-square rounded-xl ${nft.col} bg-opacity-20 flex items-center justify-center mb-3 relative overflow-hidden`}>
                    <div className={`absolute inset-0 ${nft.col} opacity-40 group-hover:scale-110 transition-transform duration-500 blur-xl`}></div>
                    <ImageIcon className={`w-8 h-8 text-white relative z-10 opacity-70`} />
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-200">{nft.name}</h4>
                  <p className="text-xs text-neutral-500">ERC-721</p>
                </div>
              ))}
            </div>
          </div>

          {/* Settings & Security */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 sm:p-8 rounded-3xl">
             <h3 className="text-xl font-bold mb-2 text-white flex items-center gap-2">
               <Settings className="w-5 h-5 text-indigo-400" /> Preferences
             </h3>
             <p className="text-sm text-neutral-500 mb-8 max-w-md">Manage your cross-chain settings, notification preferences, and privacy controls.</p>
             
             <div className="space-y-6 divide-y divide-neutral-800/50">
               <div className="flex items-center justify-between pt-2">
                 <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                     <Bell className="w-5 h-5 text-neutral-400" />
                   </div>
                   <div>
                     <span className="text-base font-medium text-neutral-200 block">Push Notifications</span>
                     <span className="text-xs text-neutral-500">Alerts for inbound transfers and messages</span>
                   </div>
                 </div>
                 <div className="w-12 h-7 bg-indigo-600 rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(79,70,229,0.3)]">
                   <div className="w-5 h-5 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                 </div>
               </div>
               
               <div className="flex items-center justify-between pt-6">
                 <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                     <Settings className="w-5 h-5 text-neutral-400" />
                   </div>
                   <div>
                     <span className="text-base font-medium text-neutral-200 block">Read Receipts</span>
                     <span className="text-xs text-neutral-500">Let senders know when you read a message</span>
                   </div>
                 </div>
                 <div className="w-12 h-7 bg-neutral-700 rounded-full relative cursor-pointer border border-neutral-600">
                   <div className="w-5 h-5 bg-neutral-400 rounded-full absolute top-0.5 left-1 shadow-sm"></div>
                 </div>
               </div>

               <div className="flex items-center justify-between pt-6">
                 <div className="flex gap-4 items-center">
                   <div className="w-10 h-10 rounded-full bg-neutral-800 flex items-center justify-center">
                     <Key className="w-5 h-5 text-neutral-400" />
                   </div>
                   <div>
                     <span className="text-base font-medium text-neutral-200 block">Sign Messages</span>
                     <span className="text-xs text-neutral-500">Require signature when entering chats</span>
                   </div>
                 </div>
                 <div className="w-12 h-7 bg-indigo-600 rounded-full relative cursor-pointer shadow-[0_0_10px_rgba(79,70,229,0.3)]">
                   <div className="w-5 h-5 bg-white rounded-full absolute top-1 right-1 shadow-sm"></div>
                 </div>
               </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
