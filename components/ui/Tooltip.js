export default function Tooltip({ text }) {
  return (
    <div className="relative flex items-center group cursor-help ml-2">
      <svg className="w-4 h-4 text-gray-400 hover:text-orange-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex flex-col items-center z-50 w-48">
        <span className="relative z-10 p-2 text-xs leading-relaxed text-white text-center bg-gray-900 shadow-xl rounded-md">
          {text}
        </span>
        <div className="w-3 h-3 -mt-2 rotate-45 bg-gray-900"></div>
      </div>
    </div>
  );
}