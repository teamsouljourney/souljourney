export default function LeftSidebar({ isOpen, toggleSidebar }) {
    return (
      <div
        className={`${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-30 w-80 bg-white border-r transition-transform duration-300 ease-in-out md:translate-x-0 md:static`}
      >
        <div className="p-4 border-b">
          <div className="relative">
            <svg
              className="absolute left-2 top-2.5 h-4 w-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search messages"
              className="w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="overflow-y-auto h-full">
          {/* Chat List */}
          <div className="p-4 hover:bg-slate-50 cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 font-medium">SP</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <p className="font-medium">Sarah Parker</p>
                  <span className="text-xs text-gray-500">12:30 PM</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  Sure, lets meet tomorrow at 10
                </p>
              </div>
            </div>
          </div>
          {/* More chat items would go here */}
        </div>
      </div>
    );
  }
  