import React from 'react';
import { useWeb3 } from '@/lib/web3';
import { formatAddress } from '@/lib/utils';
import { LogOut, Copy, ExternalLink, Settings } from 'lucide-react';

export function Profile() {
  const { address, disconnectWallet } = useWeb3();

  const copyToClipboard = () => {
    if (address) {
      navigator.clipboard.writeText(address);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto w-full max-w-3xl mx-auto px-4 py-12 flex flex-col items-center">
      <div className="w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-8 relative overflow-hidden">
        {/* Banner */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-20"></div>
        
        <div className="relative flex flex-col items-center z-10 pt-16">
          <div className="w-24 h-24 bg-black rounded-full border-4 border-neutral-900 flex items-center justify-center relative overflow-hidden shadow-xl mb-4">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-600 animate-pulse opacity-50"></div>
            <span className="text-2xl font-bold text-white relative z-10">
              {address ? address.slice(2, 4).toUpperCase() : '?'}
            </span>
          </div>

          <h2 className="text-2xl font-bold mb-1">User Profile</h2>
          <div className="flex items-center gap-2 text-neutral-400 bg-black/40 px-3 py-1.5 rounded-full border border-white/5 mb-8">
            <span className="font-mono">{address || 'Not Connected'}</span>
            {address && (
              <button onClick={copyToClipboard} className="text-neutral-500 hover:text-white transition-colors">
                <Copy className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="w-full flex justify-center gap-4 border-t border-neutral-800 pt-8 mt-4">
            <button className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-neutral-700 transition">
              <Settings className="w-4 h-4" /> Edit Profile
            </button>
            <button className="flex items-center gap-2 bg-neutral-800 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-neutral-700 transition">
              <ExternalLink className="w-4 h-4" /> View on Etherscan
            </button>
          </div>
        </div>
      </div>

      <div className="w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl">
           <h3 className="text-lg font-semibold mb-1">Preferences</h3>
           <p className="text-sm text-neutral-500 mb-6">Manage your chat and notification settings.</p>
           {/* Placeholder toggles */}
           <div className="space-y-4">
             <div className="flex items-center justify-between">
               <span className="text-sm font-medium">Email Notifications</span>
               <div className="w-10 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                 <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
               </div>
             </div>
             <div className="flex items-center justify-between">
               <span className="text-sm font-medium">Read Receipts</span>
               <div className="w-10 h-6 bg-neutral-700 rounded-full relative cursor-pointer">
                 <div className="w-4 h-4 bg-white rounded-full absolute top-1 left-1"></div>
               </div>
             </div>
           </div>
        </div>

        <div className="bg-red-500/5 border border-red-500/10 p-6 rounded-2xl flex flex-col justify-between">
           <div>
             <h3 className="text-lg font-semibold text-red-400 mb-1">Danger Zone</h3>
             <p className="text-sm text-neutral-500">
               {address ? 'Disconnecting will remove your active session from this device.' : 'You must connect a wallet first.'}
             </p>
           </div>
           {address && (
           <button 
             onClick={disconnectWallet}
             className="mt-6 flex items-center justify-center gap-2 w-full bg-red-500/10 text-red-500 py-3 rounded-xl font-medium hover:bg-red-500/20 transition border border-red-500/20"
           >
             <LogOut className="w-4 h-4" /> Disconnect Wallet
           </button>
           )}
        </div>
      </div>
    </div>
  );
}
