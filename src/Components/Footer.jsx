export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0D] py-10">
      <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 text-sm">
        
        {/* Quick Links */}
        <div>
          <h3 className="font-[Aboreto] text-white text-lg mb-3 tracking-tight">Quick Links</h3>
          <ul className="space-y-1 text-[#aaaaaa] font-mooxy">
            <li className="cursor-pointer hover:text-white transition">Student Login</li>
            <li className="cursor-pointer hover:text-white transition">Admin Login</li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h3 className="font-[Aboreto] text-white text-lg mb-3 tracking-tight">Follow</h3>
          <ul className="space-y-1 text-[#aaaaaa] font-mooxy">
            <li className="cursor-pointer hover:text-white transition">LinkedIn</li>
            <li className="cursor-pointer hover:text-white transition">X (Twitter)</li>
            <li className="cursor-pointer hover:text-white transition">GitHub</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="font-[Aboreto] text-white text-lg mb-3 tracking-tight">Contact</h3>
          <ul className="space-y-1 text-[#aaaaaa] font-mooxy">
            <li className="cursor-pointer hover:text-white transition">demo@demo.com</li>
          </ul>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-[#555555] text-xs mt-10 font-mooxy">
        © {new Date().getFullYear()} Requesta. All rights reserved.
      </div>
    </footer>
  );
}
