"use client";
import React from "react";
import { Link } from "@nextui-org/react";
import { Divider } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer className="w-full py-8 px-8 mt-16">
      <div className="max-w-[1500px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Product Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Product</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" color="foreground" size="sm">
                Features
              </Link>
              <Link href="#" color="foreground" size="sm">
                Integrations
              </Link>
              <Link href="#" color="foreground" size="sm">
                Pricing
              </Link>
              <Link href="#" color="foreground" size="sm">
                Changelog
              </Link>
            </div>
          </div>

          {/* Company Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Company</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" color="foreground" size="sm">
                About
              </Link>
              <Link href="#" color="foreground" size="sm">
                Blog
              </Link>
              <Link href="#" color="foreground" size="sm">
                Careers
              </Link>
              <Link href="#" color="foreground" size="sm">
                Contact
              </Link>
            </div>
          </div>

          {/* Resources Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Resources</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" color="foreground" size="sm">
                Documentation
              </Link>
              <Link href="#" color="foreground" size="sm">
                Help Center
              </Link>
              <Link href="#" color="foreground" size="sm">
                Community
              </Link>
              <Link href="#" color="foreground" size="sm">
                API Reference
              </Link>
            </div>
          </div>

          {/* Legal Column */}
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold text-lg">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" color="foreground" size="sm">
                Privacy Policy
              </Link>
              <Link href="#" color="foreground" size="sm">
                Terms of Service
              </Link>
              <Link href="#" color="foreground" size="sm">
                Cookie Policy
              </Link>
              <Link href="#" color="foreground" size="sm">
                Security
              </Link>
            </div>
          </div>
        </div>

        <Divider className="my-6" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold">JIR</span>
          </div>
          <div className="text-sm text-gray-500">
            © {new Date().getFullYear()} JIR. All rights reserved.
          </div>
          <div className="flex gap-4">
            <Link href="#" color="foreground" size="sm">
              Twitter
            </Link>
            <Link href="#" color="foreground" size="sm">
              GitHub
            </Link>
            <Link href="#" color="foreground" size="sm">
              Discord
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
