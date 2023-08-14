import { Fragment, lazy, Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "./store/user/user.selector";

// const Navigation = lazy(() =>
//   import("./routes/navigation/navigation.component")
// );
const Home = lazy(() => import("./routes/home/home.component"));
const LoginPage = lazy(() => import("./pages/login/loginpage.component"));

// const randomLoaderTexts = [
//   "The greatest wealth is health.",
//   "Happiness is the best medicine.",
//   "Wellness starts with you.",
//   "Healthcare is about caring, not just curing.",
//   "Wellness is a journey, not a destination.",
//   "Medicine is a science, and healing is an art.",
// ];

const App = () => {
  // const [loading, setLoading] = useState(true);
  const isUserLoggedIn = useSelector(selectIsUserLoggedIn);
  // const circleLoader = document.getElementById("preloader");
  // const randomIndex = Math.floor(Math.random() * randomLoaderTexts.length);
  // const randomLoaderText = randomLoaderTexts[randomIndex];
  // const textElement = document.getElementById("rnd-loader-text");
  // if (textElement) {
  //   textElement.innerHTML = randomLoaderText;
  // }

  // if (circleLoader) {
  //   setTimeout(() => {
  //     circleLoader.style.display = "none";
  //     setLoading(false);
  //   }, 6000);
  // }

  return (
    // !loading && (
    <Fragment>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={isUserLoggedIn ? <Navigate to="/home" /> : <LoginPage />}
          />
          <Route
            path="/home"
            element={isUserLoggedIn ? <Home /> : <Navigate to="/" />}
          />
          {/* <Route path="/" element={<Navigation />}>
            <Route index element={<Home />} />
          </Route> */}
        </Routes>
      </Suspense>
    </Fragment>
    // )
  );
};

export default App;
