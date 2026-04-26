import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Web3Provider, useWeb3 } from "@/lib/web3";
import { TopNav } from "@/components/TopNav";
import { Landing } from "./pages/Landing";
import { Dashboard } from "./pages/Dashboard";
import { Chat } from "./pages/Chat";
import { Profile } from "./pages/Profile";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
        <Route path="/dashboard" element={<PageTransition><Dashboard /></PageTransition>} />
        <Route path="/chat/:id?" element={<PageTransition><Chat /></PageTransition>} />
        <Route path="/profile" element={<PageTransition><Profile /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  return (
    <Web3Provider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-sans selection:bg-white/30 bg-black text-white pb-16 md:pb-0">
          <TopNav />
          <main className="flex-1 flex flex-col relative overflow-x-hidden overflow-y-auto">
            <AnimatedRoutes />
          </main>
        </div>
      </BrowserRouter>
    </Web3Provider>
  );
}
