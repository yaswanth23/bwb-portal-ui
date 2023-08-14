import { Fragment, lazy, Suspense, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const Navigation = lazy(() =>
  import("./routes/navigation/navigation.component")
);
const Home = lazy(() => import("./routes/home/home.component"));
const LoginPage = lazy(() => import("./pages/login/loginpage.component"));

const randomLoaderTexts = [
  "The greatest wealth is health.",
  "Happiness is the best medicine.",
  "Wellness starts with you.",
  "Healthcare is about caring, not just curing.",
  "Wellness is a journey, not a destination.",
  "Medicine is a science, and healing is an art.",
];

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const circleLoader = document.getElementById("preloader");
  const randomIndex = Math.floor(Math.random() * randomLoaderTexts.length);
  const randomLoaderText = randomLoaderTexts[randomIndex];
  const textElement = document.getElementById("rnd-loader-text");
  if (textElement) {
    textElement.innerHTML = randomLoaderText;
  }

  if (circleLoader) {
    setTimeout(() => {
      circleLoader.style.display = "none";
      setLoading(false);
    }, 6000);
  }

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    // !loading && (
    <Fragment>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" />
              ) : (
                <LoginPage onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/home"
            element={isLoggedIn ? <Home /> : <Navigate to="/" />}
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
