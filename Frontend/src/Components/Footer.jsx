import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/frontend_assets/assets.js";

function Footer() {
  return (
    <footer className=" border-t border-gray-200 bg-[#faf9f7] text-gray-600 sm:bg-transparent sm:border-none">
      <div className=" grid grid-cols-1 gap-10 px-5 py-12 sm:px-8 md:grid-cols-2 md:px-10 lg:grid-cols-[1.45fr_0.8fr_0.8fr_1.25fr] lg:gap-8 lg:px-12 lg:py-16">
        <div>
          <Link to="/" aria-label="Forever home">
            <img src={assets.logo} alt="Forever" className="w-32" />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-6 text-gray-500">
            Thoughtfully selected essentials for every day, delivered with care.
          </p>
          <div className="mt-6 flex items-center gap-4">
            <a href="#instagram" aria-label="Instagram" className="transition hover:text-black">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 0 1 12 7.5Zm0 2A2.5 2.5 0 1 0 14.5 12 2.5 2.5 0 0 0 12 9.5ZM17.7 6.3a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" /></svg>
            </a>
            <a href="#facebook" aria-label="Facebook" className="transition hover:text-black">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden="true"><path d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9a22 22 0 0 0-2.5-.1c-2.5 0-4.2 1.5-4.2 4.3V10H7.5v3h2.8v8h3.4Z" /></svg>
            </a>
            <a href="#x" aria-label="X" className="transition hover:text-black">
              <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current" aria-hidden="true"><path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3L12 15.6 6.4 22H3.2l7.2-8.3L2.7 2H9l4.4 5.8L18.9 2Zm-1.1 18h1.7L8.1 3.9H6.3L17.8 20Z" /></svg>
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-900">Shop</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/" className="transition hover:text-black">Home</Link></li>
            <li><Link to="/collection" className="transition hover:text-black">Collection</Link></li>
            <li><Link to="/about" className="transition hover:text-black">About us</Link></li>
            <li><Link to="/contact" className="transition hover:text-black">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-900">Help</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li><Link to="/orders" className="transition hover:text-black">Track order</Link></li>
            <li><Link to="/contact" className="transition hover:text-black">Shipping &amp; returns</Link></li>
            <li><Link to="/contact" className="transition hover:text-black">FAQs</Link></li>
            <li><Link to="/contact" className="transition hover:text-black">Privacy policy</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-gray-900">Stay in the know</h3>
          <p className="mt-5 text-sm leading-6 text-gray-500">Get first access to new arrivals, offers, and more.</p>
          <form className="mt-5 flex border-b border-gray-900" onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="footer-email" className="sr-only">Email address</label>
            <input id="footer-email" type="email" placeholder="Your email address" className="min-w-0 flex-1 bg-transparent py-2.5 text-sm outline-none placeholder:text-gray-400" />
            <button type="submit" className="px-1 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-gray-900 transition hover:text-gray-500">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-200 px-5 py-5 sm:px-8 md:px-10 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 text-center text-xs text-gray-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Forever. All rights reserved.</p>
          <p>Secure payments · Easy returns · Friendly support</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
