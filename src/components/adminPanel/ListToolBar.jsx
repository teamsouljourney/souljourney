const ListToolbar = ({
  title,
  searchTerm,
  onSearchChange,
  placeholder = "Search...",
  actions,
}) => {
  return (
    <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
      <h2 className="text-lg font-bold text-navy">{title}</h2>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {onSearchChange && (
          <div className="w-full sm:w-72">
            <input
              type="text"
              placeholder={placeholder}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-navy focus:outline-none"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
    </div>
  );
};

export default ListToolbar;
