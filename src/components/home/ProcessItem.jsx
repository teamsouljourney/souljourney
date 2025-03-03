const ProcessItem = ({ title, description, image }) => (
  <li className="dark:bg-background-dark p-5 pb-10 text-center ">
    <div className="flex flex-col items-center">
      <div className="flex-shrink-0 relative top-0">
        <div className="flex items-center justify-center w-full h-10 w-30 md:h-34 md:w-34 py-6 px-4 rounded-full bg-seaGreen-dark text-offWhite border-none text-[0.75rem] xl:text-sm font-bold">
          {title}
        </div>
        <img
          src={image}
          alt={title}
          className="w-full h-64 object-cover mt-4 rounded-lg"
          style={{
            width: "300px",
          }}
        />
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
