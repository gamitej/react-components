import { Link } from "react-router-dom";
import { pagesData } from "./data";

const Home = () => {
  /**
   * TSX
   */
  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-100 to-blue-200 flex justify-center">
      <div className="w-[1020px] h-[50vh] grid grid-cols-12 gap-8 justify-center items-center">
        {pagesData.map(({ description, title, url }) => (
          <Link key={url} to={url} className="col-span-4">
            <div className="bg-gradient-to-tr from-blue-50 to-blue-100 px-6 py-4 shadow-md flex flex-col gap-2 rounded-md cursor-pointer ring-2 ring-blue-300 duration-200 ease-in-out">
              <h3 className="text-2xl font-[550] text-blue-500 capitalize">
                {title}
              </h3>
              <span className="text-gray-500">{description}!</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
