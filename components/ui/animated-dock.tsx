"use client" 

import * as React from "react"
import { useRef } from "react";
import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
 
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

import { Link } from "react-router-dom";
 
const cn = (...args: any[]) => twMerge(clsx(args));
 
export interface AnimatedDockProps {
  className?: string;
  items: DockItemData[];
}
 
export interface DockItemData {
  link: string;
  Icon: React.ReactNode;
  target?: string;
  badge?: string | number;
  isActive?: boolean;
}
 
export const AnimatedDock = ({ className, items }: AnimatedDockProps) => {
  const mouseX = useMotionValue(Infinity);
 
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 items-center gap-4 rounded-full bg-neutral-900/80 backdrop-blur-xl border border-white/10 shadow-2xl px-4",
        className,
      )}
    >
      {items.map((item, index) => (
        <DockItem key={index} mouseX={mouseX} isActive={item.isActive}>
          <Link
            to={item.link}
            target={item.target}
            className="relative flex items-center justify-center w-full h-full text-white"
          >
            {item.Icon}
            {item.badge !== undefined && (
              <div className="absolute -top-1 -right-1 min-w-[16px] h-[16px] bg-indigo-500 rounded-full flex items-center justify-center text-[9px] font-black text-white px-1 shadow-[0_2px_5px_rgba(99,102,241,0.5)] border border-neutral-900">
                {item.badge}
              </div>
            )}
          </Link>
        </DockItem>
      ))}
    </motion.div>
  );
};
 
interface DockItemProps {
  mouseX: MotionValue<number>;
  children: React.ReactNode;
  isActive?: boolean;
  key?: React.Key;
}
 
export const DockItem = ({ mouseX, children, isActive }: DockItemProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [44, 70, 44]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const iconScale = useTransform(width, [44, 70], [1, 1.4]);
  const iconSpring = useSpring(iconScale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      className={cn(
        "aspect-square rounded-full flex items-center justify-center transition-colors shadow-sm",
        isActive ? "bg-indigo-600 shadow-indigo-500/20" : "bg-neutral-800 hover:bg-neutral-700"
      )}
    >
      <motion.div
        style={{ scale: iconSpring }}
        className="flex items-center justify-center w-full h-full grow"
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
