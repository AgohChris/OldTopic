const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-16 justify-between">
            {/* Left section - Logo and description */}
            <div className="flex flex-col gap-6 max-w-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-gradient-to-r from-green-300 to-green-900">
                  <div className="w-full h-full bg-[url('/api/placeholder/40/40')] opacity-50"></div>
                </div>
                <span className="text-green-800 text-3xl md:text-5xl tracking-wider font-bold">Old</span>
                <span className="text-black text-4xl md:text-3xl font-bold">Topic</span>
              </div>
  
              <p className="text-sm">
                Apprenez plus vite, réfléchissez en profondeur et devenez plus intelligent avec OldTopic.
              </p>
  
              {/* Social media icons */}
              <div className="flex gap-3">
                <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
                    <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
                    <i className="fa-solid fa-globe"></i>
                </a>
                <a href="#" className="mx-2 hover:bg-green-800 hover:text-white transition-colors rounded-full px-5 py-2 text-xl">
                    <i className="fa-brands fa-facebook-f"></i>
                </a>
              </div>
            </div>
  
            {/* Navigation menus */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {/* First column */}
              <div>
                <h3 className="text-white font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li> {/* Added Contact Us Here */}
                </ul>
              </div>
            </div>
          </div>
          {/* Copyright */}
          <div className="mt-12 text-center text-sm text-gray-400 border-t border-gray-800 pt-6">
            &copy; {new Date().getFullYear()} OldTopic. All rights reserved.
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  