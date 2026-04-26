import React from "react";
import { SplineSceneBasic } from "@/components/ui/demo";
import { useWeb3 } from "@/lib/web3";
import { Navigate } from "react-router-dom";
import { Fingerprint, Send, Zap } from "lucide-react";
import CursorFollow from "@/components/ui/cursor-follow";

const web3Images = [
  {
    src: "https://plus.unsplash.com/premium_photo-1681488037743-e4c8718c079c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Explore Rare NFTs",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1675018587770-b40d4a0d59e0?q=80&w=435&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Trade Ethereum Assets",
  },
  {
    src: "https://images.unsplash.com/photo-1635347854620-b91e002bcdb2?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Step into the Metaverse",
  },
  {
    src: "https://images.unsplash.com/photo-1629339942248-45d4b10c8c2f?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    label: "Discover Web3 Art",
  }
];

export function Landing() {
  const { address } = useWeb3();

  return (
    <div className="flex-1 flex flex-col pt-12 items-center px-4 max-w-7xl mx-auto w-full">
      <SplineSceneBasic />
      
      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {[
          {
            title: "Wallet Native",
            description: "No email, no password. Your identity is your secure Ethereum address.",
            icon: Fingerprint,
            color: "from-blue-500 to-indigo-500",
            shadow: "shadow-[0_0_30px_rgba(99,102,241,0.2)]"
          },
          {
            title: "Crypto Payments",
            description: "Send ETH or USDC directly inside standard chat messages in seconds.",
            icon: Send,
            color: "from-emerald-400 to-teal-500",
            shadow: "shadow-[0_0_30px_rgba(52,211,153,0.2)]"
          },
          {
            title: "Real-time Messaging",
            description: "Lightning fast, encrypted P2P chat powered by robust web3 infrastructure.",
            icon: Zap,
            color: "from-amber-400 to-orange-500",
            shadow: "shadow-[0_0_30px_rgba(245,158,11,0.2)]"
          }
        ].map((feature, i) => {
          const Icon = feature.icon;
          return (
          <div key={i} className="group relative p-8 rounded-3xl bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300 hover:-translate-y-2">
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
            <div className={`w-14 h-14 mb-6 rounded-2xl bg-neutral-800/80 flex items-center justify-center border border-neutral-700 group-hover:border-neutral-500 transition-colors ${feature.shadow}`}>
              <Icon className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-tight">{feature.title}</h3>
            <p className="text-neutral-400 leading-relaxed font-medium">{feature.description}</p>
          </div>
          )
        })}
      </div>

      <div className="mt-32 mb-32 w-full text-center">
        <h2 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-zinc-100 to-zinc-500 mb-6">Build Your Digital Identity</h2>
        <p className="text-neutral-400 max-w-2xl mx-auto mb-16 text-lg">Hover over the artifacts below and follow the movement. Immerse yourself in the decentralized web ecosystem through our native portal.</p>
        
        <CursorFollow>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-center justify-center py-8">
            {web3Images.map((img, i) => (
              <div key={i} className="flex flex-col items-center group relative overflow-hidden rounded-2xl border border-neutral-800 hover:border-indigo-500/50 transition-colors duration-500">
                <img
                  src={img.src}
                  alt={img.label}
                  data-cursor-text={img.label}
                  className="h-64 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  style={{ cursor: "none" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        </CursorFollow>
      </div>
    </div>
  );
}
