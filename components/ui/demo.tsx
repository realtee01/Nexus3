'use client'

import React from "react";
import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
import { useWeb3 } from "@/lib/web3";
import { BookOpen, Wallet, Loader2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CpuArchitecture } from "@/components/ui/cpu-architecture";
 
export function SplineSceneBasic() {
  const { connectWallet, isConnecting } = useWeb3();

  return (
    <Card className="w-full flex flex-col md:flex-row min-h-[500px] bg-black/[0.96] relative overflow-hidden border-zinc-800">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex flex-col-reverse md:flex-row w-full h-full relative z-10">
        {/* Left content */}
        <div className="flex-1 p-6 md:p-8 relative z-10 flex flex-col justify-center pb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-500 leading-tight">
            The Future of <br className="hidden md:block" /> Web3 Chat
          </h1>
          <p className="mt-4 md:mt-6 text-neutral-400 max-w-lg text-base md:text-lg">
            Connect your wallet. Chat with anyone. Send and receive crypto instantly, natively inside DMs. Welcome to the new standard of decentralized messaging.
          </p>
          <div className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3">
            <Dialog>
              <DialogTrigger 
                disabled={isConnecting}
                className={`px-6 py-3 bg-white text-black font-semibold rounded-lg transition-all flex justify-center items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.3)] disabled:opacity-80 disabled:cursor-wait ${!isConnecting ? "hover:bg-neutral-200" : ""}`}
              >
                {isConnecting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wallet className="w-5 h-5" />}
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </DialogTrigger>
              <DialogContent className="bg-neutral-950/95 backdrop-blur-xl border-neutral-800 text-white sm:max-w-md rounded-2xl shadow-2xl z-[100]">
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
            <button 
              onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
              className="px-6 py-3 bg-neutral-800/50 backdrop-blur-md text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors border border-neutral-700 flex justify-center items-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              Explore Features
            </button>
          </div>

          <div className="mt-8 md:mt-12 w-full max-w-[200px] md:max-w-[280px] mx-auto md:mx-0 opacity-80 mix-blend-screen pointer-events-none">
            <CpuArchitecture />
          </div>
        </div>

        {/* Right content (Spline Robot) */}
        <div className="w-full md:w-1/2 h-[400px] md:h-auto relative z-0 mt-8 md:mt-0 pointer-events-auto">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full absolute inset-0"
          />
        </div>
      </div>
    </Card>
  )
}

