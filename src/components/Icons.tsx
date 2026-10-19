import type { SVGProps } from 'react';

const base = { viewBox: '0 0 20 20', 'aria-hidden': true, fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

export const IconRule = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M3 4.5C5.5 3.5 8 3.5 10 5c2-1.5 4.5-1.5 7-.5v11c-2.5-1-5-1-7 .5-2-1.5-4.5-1.5-7-.5z" /><path d="M10 5v11" /></svg>;
export const IconCoach = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M3 4h14v9H9l-4 3v-3H3z" /></svg>;
export const IconWarn = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><path d="M10 3l8 14H2z" /><path d="M10 8v4" /><circle cx="10" cy="14.6" r=".6" fill="currentColor" /></svg>;
export const IconCard = (p: SVGProps<SVGSVGElement>) => <svg {...base} {...p}><rect x="5" y="2.5" width="10" height="15" rx="1.6" /><path d="M8 7h4M8 10h4" /></svg>;
export const IconPlay = (p: SVGProps<SVGSVGElement>) => <svg viewBox="0 0 12 12" aria-hidden="true" {...p}><path d="M3 1.5l7 4.5-7 4.5z" fill="currentColor" /></svg>;
export const IconSun = (p: SVGProps<SVGSVGElement>) => <svg {...base} viewBox="0 0 16 16" {...p}><circle cx="8" cy="8" r="3" /><path d="M8 1v2M8 13v2M1 8h2M13 8h2M3 3l1.4 1.4M11.6 11.6L13 13M3 13l1.4-1.4M11.6 4.4L13 3" /></svg>;
export const IconMoon = (p: SVGProps<SVGSVGElement>) => <svg {...base} viewBox="0 0 16 16" {...p}><path d="M13.5 10.2A5.5 5.5 0 0 1 5.8 2.5a5.5 5.5 0 1 0 7.7 7.7z" /></svg>;
export const IconMenu = (p: SVGProps<SVGSVGElement>) => <svg {...base} viewBox="0 0 16 16" {...p}><path d="M2.5 4h11M2.5 8h11M2.5 12h11" /></svg>;
export const IconInstall = (p: SVGProps<SVGSVGElement>) => <svg {...base} viewBox="0 0 16 16" {...p}><path d="M8 2v8M4.5 6.5L8 10l3.5-3.5M3 13h10" /></svg>;
export const Logo = (p: SVGProps<SVGSVGElement>) => <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" {...p}><path d="M11 2 L20 11 L11 20 L2 11 Z" fill="none" stroke="currentColor" strokeWidth="1.6" /><path d="M11 7 L15 11 L11 15 L7 11 Z" fill="var(--accent)" /></svg>;
