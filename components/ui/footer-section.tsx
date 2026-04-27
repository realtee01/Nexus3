'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Cpu, GithubIcon, TwitterIcon, DiscIcon as DiscordIcon } from 'lucide-react';
import { CpuArchitecture } from './cpu-architecture';

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Ecosystem',
		links: [
			{ title: 'Nexus3 Network', href: '#' },
			{ title: 'Smart Contracts', href: '#' },
			{ title: 'Decentralized Identity', href: '#' },
			{ title: 'Tokenomics', href: '#' },
		],
	},
	{
		label: 'Developers',
		links: [
			{ title: 'Documentation', href: '#' },
			{ title: 'Nexus CLI', href: '#' },
			{ title: 'Faucets', href: '#' },
			{ title: 'Bug Bounty', href: '#' },
		],
	},
	{
		label: 'Organization',
		links: [
			{ title: 'About Foundation', href: '#' },
			{ title: 'Careers', href: '#' },
			{ title: 'Blog', href: '#' },
			{ title: 'Privacy Policy', href: '#' },
		],
	},
	{
		label: 'Community',
		links: [
			{ title: 'Twitter', href: '#', icon: TwitterIcon },
			{ title: 'Discord', href: '#', icon: DiscordIcon },
			{ title: 'GitHub', href: '#', icon: GithubIcon },
		],
	},
];

export function Footer() {
	return (
		<footer className="md:rounded-t-[3rem] relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center rounded-t-[2rem] border-t border-white/10 bg-[radial-gradient(35%_128px_at_50%_0%,rgba(255,255,255,0.05),transparent)] px-6 py-12 lg:py-16 mt-20">
			<div className="bg-indigo-500/30 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur-sm" />

			<div className="grid w-full gap-8 xl:grid-cols-3 xl:gap-8">
				<AnimatedContainer className="space-y-4">
					<div className="flex items-center gap-2">
                        <div className="w-8 h-8 p-0.5 rounded-lg border border-white/20 flex items-center justify-center overflow-hidden bg-black flex-shrink-0">
                            <CpuArchitecture className="w-[120%] h-[120%]" text="N3" lineMarkerSize={12} animateMarkers={false} showCpuConnections={false} />
                        </div>
                        <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Nexus3</span>
                    </div>
					<p className="text-neutral-400 mt-8 text-sm md:mt-0 max-w-xs">
						Building the foundation for the decentralized web. Secure, scalable, and intuitive Web3 infrastructure.
					</p>
					<p className="text-neutral-500 text-sm mt-4">
						© {new Date().getFullYear()} Nexus3 Foundation.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-300">{section.label}</h3>
								<ul className="text-neutral-400 mt-4 space-y-3 text-sm">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-white inline-flex items-center transition-all duration-300 hover:translate-x-1"
											>
												{link.icon && <link.icon className="me-2 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
	key?: React.Key;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <div className={className}>{children}</div>;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};
