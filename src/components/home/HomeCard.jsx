import Card from "../../components/Card";


const HomeCard = ({ blogs }) => {

  return (

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-10 lg:gap-14">
      {blogs?.map((blog) => (
        <Card key={blog._id} blog={blog} variant="detailed" />
      ))}
    </div>
  );
};

export default HomeCard;
