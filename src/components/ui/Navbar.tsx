"use client";
import { Variants } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState(pathname);

  // Keep hover state in sync with current route
  useEffect(() => {
    setHoveredPath(pathname);
  }, [pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants: Variants = {
    closed: {
      opacity: 0,
      y: "-100%",
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const linkVariants: Variants = {
    closed: { y: 20, opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <>
      <header className="fixed top-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-fit px-4 md:px-0 transition-all duration-300">
        <div className="bg-[#1a1a1a] border border-white/10 rounded-full p-2 flex items-center justify-between gap-6 shadow-2xl backdrop-blur-md">

          {/* Logo / Icon */}
          <Link href="/" className="relative z-50 flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center hover:scale-105 transition-transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-black"
              >
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM6.262 6.072a8.25 8.25 0 1010.562-.766 4.5 4.5 0 01-1.318 1.357L14.25 7.5l.165.33a.809.809 0 01-1.086 1.085l-.604-.302a1.125 1.125 0 00-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.65.03.893.232l.545.454c.186.155.43.208.66.142.203-.058.411-.08.623-.08.125 0 .25.011.373.031a8.246 8.246 0 00-4.66-2.128c-.288-.04-.575-.116-.848-.225a5.25 5.25 0 01-2.91-2.91 5.26 5.26 0 01-.226-.848zm3.626 5.864l-.326-.326a1.125 1.125 0 00-1.591 0l-.132.132a.809.809 0 01-1.086 1.085l-.33-.165a4.5 4.5 0 01-1.357 1.318 8.25 8.25 0 001.042 10.457c.288.04.575.116.848.225a5.25 5.25 0 012.91 2.91c.07.186.15.367.238.544a8.25 8.25 0 004.81-2.421 1.125 1.125 0 00-.21-1.298l-.302-.604a.809.809 0 011.085-1.086l.33.165c.44-.439 1.152-.439 1.591 0l.132.132a1.125 1.125 0 001.298.21l.604-.302a.809.809 0 011.086 1.085l.165.33a4.5 4.5 0 011.318-1.357 8.25 8.25 0 00-1.042-10.457c-.288-.04-.575-.116-.848-.225a5.25 5.25 0 01-2.91-2.91c-.07-.186-.15-.367-.238-.544a8.25 8.25 0 00-4.81 2.421 1.125 1.125 0 00.21 1.298l.302.604a.809.809 0 01-1.085 1.086l-.33-.165a1.125 1.125 0 00-1.591 0z" clipRule="evenodd" />
              </svg>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-2 pr-4 relative"
            onMouseLeave={() => setHoveredPath(pathname)}
          >
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isHovered = hoveredPath === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onMouseEnter={() => setHoveredPath(link.href)}
                  className={`relative px-4 py-1.5 text-[15px] transition-colors duration-300 font-medium z-10 ${isActive || isHovered ? "text-white" : "text-neutral-400"
                    }`}
                >
                  {isHovered && (
                    <motion.div
                      layoutId="navbar-hover"
                      className="absolute inset-0 bg-white/10 rounded-full -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden relative z-50 w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none pr-2"
            aria-label="Toggle Menu"
          >
            <span
              className={`block w-5 h-[2px] bg-white transition-transform duration-300 ${isOpen ? "rotate-45 translate-y-[8px]" : ""
                }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-opacity duration-300 ${isOpen ? "opacity-0" : "opacity-100"
                }`}
            />
            <span
              className={`block w-5 h-[2px] bg-white transition-transform duration-300 ${isOpen ? "-rotate-45 -translate-y-[8px]" : ""
                }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 bg-brand-darker/95 backdrop-blur-xl z-40 flex flex-col justify-center items-center"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
              }}
              className="flex flex-col items-center gap-8"
            >
              {navLinks.map((link) => (
                <motion.div key={link.name} variants={linkVariants}>
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-3xl font-bold tracking-tight transition-colors ${pathname === link.href ? "text-cyan-400" : "text-white hover:text-cyan-300"
                      }`}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
