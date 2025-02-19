import {
  PencilIcon,
  TrashIcon,
  LockClosedIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

const UserRow = ({ user }) => {
  return (
    <div className="flex flex-col items-start py-4 space-y-2 border-b md:flex-row md:items-center md:space-y-0">
      <div className="flex items-center flex-1 gap-3">
        <div className="flex-shrink-0 w-10 h-10 overflow-hidden rounded-full">
          <img
            src={
              user?.image ||
              "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
            }
            alt={user?.userName}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <div className="font-medium">{user?.userName}</div>
          <div className="text-sm text-gray-500">{user?.profession}</div>
        </div>
      </div>
      <div className="flex flex-col w-full text-sm md:w-1/4 md:flex-row md:items-center">
        <span className="md:mr-4">{user?.email}</span>
        <div className="mt-2 text-left md:mt-0 md:w-24 md:text-center">
          <span
            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
              user?.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user?.isActive ? "Aktif" : "Engelli"}
          </span>
        </div>
      </div>
      <div className="flex justify-end w-full gap-2 md:w-24">
        <button className="p-1 rounded hover:bg-gray-100" aria-label="Düzenle">
          <PencilIcon className="w-4 h-4" />
        </button>
        <button
          className="p-1 rounded hover:bg-gray-100"
          aria-label="Kilitle/Aç"
        >
          <LockClosedIcon className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-gray-100" aria-label="Sil">
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default UserRow;
