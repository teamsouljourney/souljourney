import { useSelector } from "react-redux";

export default function UserCard() {
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  return (
    <div className="w-full min-h-[200px] bg-gradient-to-bl from-navy-dark to-seaGreen-dark p-6 rounded-xl m-10 flex justify-between items-center">
      <div>
        <h1 className="text-3xl sm:text-5xl text-offWhite">
          {currentUser.firstName.toUpperCase()}{" "}
          {currentUser.lastName.toUpperCase()}
        </h1>
        <p className="text-offWhite-dark text-sm w-52 md:w-full mt-6">
          {currentUser.description}
        </p>
      </div>
      <div className="flex">
        <div className="shrink-1">
          <img
            src={
              currentUser.image ||
              "https://cdn-icons-png.flaticon.com/512/1053/1053244.png"
            }
            alt="Profile"
            className="sm:w-[150px] sm:h-[150px] min-w-[120px]  rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
