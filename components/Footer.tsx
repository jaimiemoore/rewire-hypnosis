"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-forest text-white" role="contentinfo" aria-label="Site footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* 3-Column Grid */}
        <div className="grid md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Column 1: About Us */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-sage">About Us</h3>
            <p className="text-white/90 leading-relaxed text-sm md:text-base">
              Evidence-based clinical hypnosis helping you achieve lasting change in Northumberland County and virtually.
              Experience the power of your subconscious mind and discover the depths of transformation.
            </p>
          </div>

          {/* Column 2: Important Links */}
          <div>
            <h3 className="text-xl font-heading font-bold mb-4 text-sage">Important Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-white/90 hover:text-sage transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-white/90 hover:text-sage transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-white/90 hover:text-sage transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded">
                  Services
                </Link>
                <ul className="pl-4 mt-2 space-y-2">
                  <li>
                    <Link href="/services/weight-loss" className="text-white/70 hover:text-sage transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded">
                      Weight Loss
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/smoking-cessation" className="text-white/70 hover:text-sage transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded">
                      Stop Smoking
                    </Link>
                  </li>
                  <li>
                    <Link href="/services/stress-management" className="text-white/70 hover:text-sage transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded">
                      Stress Management
                    </Link>
                  </li>
                </ul>
              </li>
              <li>
                <a
                  href="https://www.businessculturesolution.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/90 hover:text-sage transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded inline-flex items-center gap-1"
                >
                  Corporate Services
                  <span className="text-xs">↗</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-white/90 hover:text-sage transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Logo and Contact */}
          <div className="flex flex-col items-start md:items-end justify-between h-full">
            <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-sage focus:ring-offset-2 focus:ring-offset-forest rounded" aria-label="Return to homepage">
              <Image
                src="/images/logo-navbar.webp"
                alt="Rewire Hypnosis"
                width={360}
                height={144}
                className="h-16 sm:h-20 md:h-24 lg:h-[115px] w-auto mb-4 brightness-0 invert hover:opacity-80 hover:scale-105 transition-all duration-300 cursor-pointer"
              />
            </Link>
            <div className="text-white/90 text-sm space-y-2 mb-6">
              <p className="font-semibold text-white text-base">Contact</p>
              <p>257 Division Street, Cobourg, ON</p>
            </div>

            {/* Divider before CTA */}
            <div className="hidden md:block w-full border-t border-white/10 my-6"></div>

            {/* Footer CTA */}
            <button
              onClick={() => document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full md:w-auto px-6 py-3 bg-sage text-white rounded-full font-semibold text-sm glow-sage hover:shadow-[0_0_40px_rgba(86,134,115,0.6)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-forest"
              aria-label="Book your free screening consultation"
            >
              Book Free Screening
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8">
          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} Rewire Hypnosis. All rights reserved.
            </p>
            <p className="text-white/50 text-xs mt-3">
              Clinical hypnosis for self-help. Not a medical facility.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
