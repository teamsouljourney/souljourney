const ProcessItem = ({ title, description, image }) => (
  <li className="bg-offWhite p-5 pb-10 text-center">
    <div className="flex flex-col items-center">
      <div className="flex-shrink-0 relative top-0 -mt-16">
        <div className="flex items-center justify-center h-20 w-30 md:h-34 md:w-34 rounded-full bg-gradient-to-r from-offWhite to-seaGreen-light text-customBlack border-4 border-white text-xl font-semibold transform transition-transform duration-300 ease-in-out hover:scale-110 hover:shadow-lg cursor-pointer mt-4">
          {title}
        </div>
        <img src={image} alt={title} className="w-full h-64 object-cover mt-4 rounded-lg" />
      </div>
      <div className="mt-4">
        <p className="mt-2 text-base leading-6 text-gray-500">{description}</p>
      </div>
    </div>
  </li>
);

export default ProcessItem;
