
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link to="/" className={cn("inline-flex items-center gap-2 transition-opacity hover:opacity-90", className)}>
      <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-primary">
        <span className="absolute left-0 top-0 h-full w-full animate-spin-slow bg-gradient-to-tr from-white/10 to-white/30 opacity-50"></span>
        <span className="relative z-10 block h-2.5 w-2.5 rounded-full bg-white"></span>
      </div>
      <span className="text-xl font-medium tracking-tight">BallotChain</span>
    </Link>
  );
};

export default Logo;
