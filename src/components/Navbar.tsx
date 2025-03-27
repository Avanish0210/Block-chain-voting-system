
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Logo from './Logo';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/lib/hooks/useAuth';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  const navLinks = [
    { text: 'Home', href: '/' },
    { text: 'About', href: '/about' },
    { text: 'Explorer', href: '/explorer' },
  ];

  const authLinks = isAuthenticated
    ? [
        { text: 'Dashboard', href: '/dashboard' },
        { text: 'Vote', href: '/vote' },
      ]
    : [
        { text: 'Login', href: '/login' },
        { text: 'Register', href: '/register' },
      ];

  const mobileMenuVariants = {
    closed: { opacity: 0, x: '100%' },
    open: { opacity: 1, x: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-background/80 border-b">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <div className="flex items-center space-x-1 mr-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm transition-colors",
                  location.pathname === link.href
                    ? "bg-primary/10 text-primary font-medium"
                    : "hover:bg-secondary"
                )}
              >
                {link.text}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {authLinks.map((link, index) => 
              link.text === 'Register' ? (
                <Button asChild key={link.href} variant="default" size="sm">
                  <Link to={link.href}>{link.text}</Link>
                </Button>
              ) : link.text === 'Login' ? (
                <Button asChild key={link.href} variant="outline" size="sm">
                  <Link to={link.href}>{link.text}</Link>
                </Button>
              ) : (
                <Button asChild key={link.href} variant="ghost" size="sm">
                  <Link to={link.href}>{link.text}</Link>
                </Button>
              )
            )}
            {isAuthenticated && (
              <Button variant="ghost" size="sm" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-secondary"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div
        className="md:hidden absolute w-full bg-background/95 backdrop-blur-md border-b"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="container mx-auto py-4 px-4 flex flex-col space-y-3">
          {navLinks.concat(authLinks).map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                "px-3 py-2 rounded-md transition-colors",
                location.pathname === link.href
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-secondary"
              )}
              onClick={() => setIsOpen(false)}
            >
              {link.text}
            </Link>
          ))}
          {isAuthenticated && (
            <Button variant="ghost" onClick={() => { logout(); setIsOpen(false); }}>
              Logout
            </Button>
          )}
        </div>
      </motion.div>
    </nav>
  );
};

export default Navbar;
