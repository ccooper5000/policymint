// types/shadcn-shims.d.ts
// Ambient module shims for UI packages we are NOT actively using.
// Keeps TypeScript happy during CI builds without pulling heavy deps.
// If/when you actually use a component, install the real package and remove its shim.

declare module '@radix-ui/react-accordion';
declare module '@radix-ui/react-alert-dialog';
declare module '@radix-ui/react-aspect-ratio';
declare module '@radix-ui/react-avatar';
declare module '@radix-ui/react-checkbox';
declare module '@radix-ui/react-collapsible';
declare module '@radix-ui/react-context-menu';
declare module '@radix-ui/react-dialog';
declare module '@radix-ui/react-dropdown-menu';
declare module '@radix-ui/react-hover-card';
declare module '@radix-ui/react-label';
declare module '@radix-ui/react-menubar';
declare module '@radix-ui/react-navigation-menu';
declare module '@radix-ui/react-popover';
declare module '@radix-ui/react-progress';
declare module '@radix-ui/react-radio-group';
declare module '@radix-ui/react-scroll-area';
declare module '@radix-ui/react-separator';
declare module '@radix-ui/react-slider';
declare module '@radix-ui/react-switch';
declare module '@radix-ui/react-tabs';
declare module '@radix-ui/react-toast';
declare module '@radix-ui/react-tooltip';

// Non-Radix libs often used in shadcn UI files:
declare module 'cmdk';
declare module 'embla-carousel-react';
declare module 'react-day-picker';
declare module 'react-resizable-panels';
declare module 'recharts';
declare module 'sonner';
declare module 'vaul';

// If your UI files import these styling helpers:
declare module 'class-variance-authority';
declare module 'tailwind-variants';
