"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 backdrop-blur-md border-b border-forest/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link href="/" className="flex items-center gap-2 py-2 group">
                <Image
                  src="/images/logo-navbar.webp"
                  alt="Rewire Hypnosis - Discover the Depths of Your Mind"
                  width={360}
                  height={144}
                  priority
                  className="h-14 w-auto min-h-[100px] group-hover:drop-shadow-lg transition-all"
                />
              </Link>
            </motion.div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link href="/" className={`text-base font-medium transition-colors relative group focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 rounded ${pathname === "/" ? "text-sage" : "text-forest hover:text-sage"}`}>
                  Home
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-sage transition-all duration-300 ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link href="/about" className={`text-base font-medium transition-colors relative group focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 rounded ${pathname === "/about" ? "text-sage" : "text-forest hover:text-sage"}`}>
                  About
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-sage transition-all duration-300 ${pathname === "/about" ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              </motion.div>
              <motion.div
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link href="/services" className={`text-base font-medium transition-colors relative flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 rounded ${pathname.startsWith("/services") ? "text-sage" : "text-forest hover:text-sage"}`}>
                  Services
                  <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`} />
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-sage transition-all duration-300 ${pathname.startsWith("/services") ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-sage/20 overflow-hidden z-50"
                    >
                      <Link href="/services/weight-loss" className="block px-6 py-3 text-forest hover:bg-sage/10 hover:text-sage transition-colors">
                        Weight Loss
                      </Link>
                      <Link href="/services/smoking-cessation" className="block px-6 py-3 text-forest hover:bg-sage/10 hover:text-sage transition-colors">
                        Stop Smoking
                      </Link>
                      <Link href="/services/stress-management" className="block px-6 py-3 text-forest hover:bg-sage/10 hover:text-sage transition-colors">
                        Stress Management
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <a
                  href="https://www.businessculturesolution.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base font-medium transition-colors relative group text-forest hover:text-sage focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 rounded"
                >
                  Corporate Services
                  <span className="absolute bottom-0 left-0 h-0.5 bg-sage transition-all duration-300 w-0 group-hover:w-full" />
                </a>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                className="relative"
              >
                <Link href="/contact" className={`text-base font-medium transition-colors relative group focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 rounded ${pathname === "/contact" ? "text-sage" : "text-forest hover:text-sage"}`}>
                  Contact
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-sage transition-all duration-300 ${pathname === "/contact" ? "w-full" : "w-0 group-hover:w-full"}`} />
                </Link>
              </motion.div>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              className="hidden md:block px-8 py-3 bg-sage text-white rounded-full font-semibold text-lg glow-sage"
              whileHover={{
                y: -4,
                boxShadow: "0 0 40px rgba(86, 134, 115, 0.6)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              Book Free Screening
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-charcoal"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-gray-soft/20"
          >
            <div className="px-4 py-4 space-y-4">
              <Link href="/" className={`block font-medium transition-colors ${pathname === "/" ? "text-sage" : "text-forest hover:text-sage"}`} onClick={() => setIsOpen(false)}>
                Home
              </Link>
              <Link href="/about" className={`block font-medium transition-colors ${pathname === "/about" ? "text-sage" : "text-forest hover:text-sage"}`} onClick={() => setIsOpen(false)}>
                About
              </Link>
              <div>
                <button
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  className={`w-full flex items-center justify-between font-medium transition-colors ${pathname.startsWith("/services") ? "text-sage" : "text-forest hover:text-sage"}`}
                >
                  <Link href="/services" onClick={() => setIsOpen(false)} className="flex-1 text-left">
                    Services
                  </Link>
                  <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {mobileServicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 mt-2 space-y-2"
                    >
                      <Link href="/services/weight-loss" className="block py-2 text-sm text-forest/80 hover:text-sage transition-colors" onClick={() => setIsOpen(false)}>
                        Weight Loss
                      </Link>
                      <Link href="/services/smoking-cessation" className="block py-2 text-sm text-forest/80 hover:text-sage transition-colors" onClick={() => setIsOpen(false)}>
                        Stop Smoking
                      </Link>
                      <Link href="/services/stress-management" className="block py-2 text-sm text-forest/80 hover:text-sage transition-colors" onClick={() => setIsOpen(false)}>
                        Stress Management
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <a
                href="https://www.businessculturesolution.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="block font-medium transition-colors text-forest hover:text-sage"
                onClick={() => setIsOpen(false)}
              >
                Corporate Services
              </a>
              <Link href="/contact" className={`block font-medium transition-colors ${pathname === "/contact" ? "text-sage" : "text-forest hover:text-sage"}`} onClick={() => setIsOpen(false)}>
                Contact
              </Link>
              <motion.button
                onClick={() => {
                  setIsOpen(false);
                  document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="w-full px-4 py-2 bg-sage text-white rounded-full font-medium"
                whileHover={{ backgroundColor: "rgba(123, 168, 136, 0.9)" }}
                whileTap={{ scale: 0.98 }}
              >
                Book Free Screening
              </motion.button>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}
