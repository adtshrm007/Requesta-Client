export default function Footer() {
  return (
    <footer className="w-full bg-[#0D0D0D] py-10">
      <div className="max-w-[960px] mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-[Aboreto] text-white tracking-[-0.01em] mb-2">Quick Links</h3>
          <p className="font-mooxy text-[#777777] cursor-pointer mb-1">Student Login</p>
          <p className="font-mooxy text-[#777777] cursor-pointer mb-1">Admin Login</p>
        </div>

        <div>
          <h3 className="font-[Aboreto] text-white tracking-[-0.01em] mb-2">Follow</h3>
          <p className="font-mooxy text-[#777777] cursor-pointer mb-1">LinkedIn</p>
          <p className="font-mooxy text-[#777777] cursor-pointer mb-1">X</p>
          <p className="font-mooxy text-[#777777] cursor-pointer mb-1">GitHub</p>
        </div>

        <div>
          <h3 className="font-[Aboreto] text-white tracking-[-0.01em] mb-2">Contact</h3>
          <p className="font-mooxy text-[#777777] cursor-pointer mb-1">demo@demo.com</p>
          
        </div>

        
      </div>
    </footer>
  );
}