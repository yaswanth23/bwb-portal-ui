import { Outlet } from "react-router-dom";
import HomePage from "../../pages/homepage/homepage.component";

const Home = () => {
  return (
    <div>
      <HomePage />
      <Outlet />
    </div>
  );
};

export default Home;
