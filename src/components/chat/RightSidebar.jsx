export default function RightSidebar({ isOpen, sidebarRef }) {
    return (
      <div
        ref={sidebarRef}
        className={`${
          isOpen ? "translate-x-0" : "translate-x-full"
        } fixed inset-y-0 right-0 z-30 w-80 bg-white border-l transition-transform duration-300 ease-in-out`}
      >
        <div className="p-6 text-center border-b">
          <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-blue-600 text-xl font-medium">SP</span>
          </div>
          <h3 className="font-semibold text-lg">Sarah Parker</h3>
          <p className="text-sm text-gray-500">Product Designer</p>
        </div>
  
        <div className="p-6 border-b">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium">Shared Media</h4>
            <button className="text-sm text-blue-500 hover:text-blue-600">
              View All
            </button>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-gray-100 overflow-hidden"
              >
                <div className="w-full h-full bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
  
        <div className="p-6">
          <h4 className="font-medium mb-4">Chat Settings</h4>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
              Notifications
            </button>
            <button className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg">
              Privacy
            </button>
          </div>
        </div>
      </div>
    );
  }
  