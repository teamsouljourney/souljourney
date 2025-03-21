import React from "react";

const UserAvatar = ({ userData, toggleRightSidebar }) => {
  return (
    <div
      className="w-10 h-10 rounded-full border-2 border-seaGreen-light flex items-center justify-center"
      onClick={toggleRightSidebar}
    >
      {userData?.image ? (
        <img
          alt=""
          src={userData.image}
          className="rounded-full size-6 sm:size-8 object-cover overflow-hidden"
        />
      ) : (
        <div className="flex items-center justify-center rounded-full size-8 bg-navy text-offWhite">
          <span className="text-sm font-medium">
            {userData.firstName.charAt(0).toUpperCase() +
              userData.lastName.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
