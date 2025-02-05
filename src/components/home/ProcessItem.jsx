const ProcessItem = ({ title, description, image }) => (
  <li className="bg-offWhite p-5 pb-10 text-center">
    <div className="flex flex-col items-center">
      <div className="flex-shrink-0 relative top-0 -mt-16">
        <div className="flex items-center justify-center h-10 w-30 md:h-34 md:w-34 rounded-full hover:bg-gradient-to-r bg-seaGreen-dark hover:bg-seaGreen-light text-offWhite border-4 border-none text-sm  font-urbanist transform transition-transform duration-300 ease-in-out   cursor-pointer mt-4 font-bold">
          {title}
        </div>
        <img src={image} alt={title} className="w-full h-64 object-cover mt-4 rounded-lg" style={{
          width:"300px"
        }}
        
        />
      </div>
      <div className="mt-4">
        <p className="mt-2 text-base leading-6 text-gray-500">{description}</p>
      </div>
    </div>
  </li>
);

export default ProcessItem;
