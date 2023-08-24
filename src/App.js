import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "./store/user/user.selector";

const Home = lazy(() => import("./routes/home/home.component"));
const LoginPage = lazy(() => import("./pages/login/loginpage.component"));
const BookDiagnosticsPage = lazy(() =>
  import("./pages/bookdiagnostics/bookDiagnostics.component")
);

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
      {/* <Suspense>
        {isUserLoggedIn ? <Home /> : null} */}
      <Suspense>
        <Routes>
          <Route path="/" element={isUserLoggedIn ? <Home /> : <LoginPage />}>
            <Route
              path="/book-diagnostics"
              element={<BookDiagnosticsPage />}
            ></Route>
          </Route>
        </Routes>
      </Suspense>
      {/* </Suspense> */}
    </Fragment>
    // )
  );
};

export default App;
