export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6 border-t-4 border-orange-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Organization Info */}
          <div>
            <h3 className="text-2xl font-bold text-orange-400 mb-4">Samrat Vikramaditya Samman</h3>
            <p className="text-gray-300 leading-relaxed">
              Organized by Maharaja Vikramaditya Shodhpeeth <br />
              Culture Department, Madhya Pradesh
            </p>
          </div>
          
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold text-orange-400 mb-4">Contact Address</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Director, Maharaja Vikramaditya Research Chair <br />
              Rabindra Sabhagam Kendra, First Floor, <br />
              Rabindra Bhavan Campus, Bhopal <br />
              <span className="block mt-2">
                <strong>Email:</strong> mvspujjain@gmail.com <br />
                <strong>Phone:</strong> 0755-4535064
              </span>
            </p>
          </div>

        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 mt-10 pt-6 text-center text-sm text-gray-500 flex flex-col items-center">
           <p>&copy; {new Date().getFullYear()} Maharaja Vikramaditya Shodhpeeth. All rights reserved.</p>
           <a href="https://mvspujjain.com/" target="_blank" rel="noopener noreferrer" className="mt-2 hover:text-orange-400 transition">
             Visit Official Website
           </a>
        </div>
      </div>
    </footer>
  );
}