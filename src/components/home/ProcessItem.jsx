const ProcessItem = ({ title, description, image }) => (
  <li className="p-4 pb-8 text-center dark:bg-background-dark dark:rounded-xl sm:p-5 sm:pb-10">
    <div className="flex flex-col items-center">
      <div className="flex-shrink-0 w-full">
        <div className="flex items-center justify-center h-10 py-6 px-4 rounded-full bg-seaGreen-dark text-offWhite border-none text-[0.75rem] xl:text-sm font-bold">
          {title}
        </div>
        <div className="w-full mt-4">
          <img
            src={image || "/placeholder.svg"}
            alt={title}
            className="object-cover w-full h-64 rounded-lg sm:h-72 md:h-80"
          />
        </div>
      </div>
      <div className="mt-4">
        <p className="mt-2 text-base leading-6 text-customBlack-dark/60 dark:text-inherit">
          {description}
        </p>
      </div>
    </div>
  </li>
);

export default ProcessItem;
