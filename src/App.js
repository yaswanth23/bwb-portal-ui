import { Fragment, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsUserLoggedIn } from "./store/user/user.selector";

const Home = lazy(() => import("./routes/home/home.component"));
const LoginPage = lazy(() => import("./pages/login/loginpage.component"));
const BookDiagnosticsPage = lazy(() =>
  import("./pages/book-diagnostics/bookdiagnostics.component")
);
const CartPage = lazy(() => import("./pages/cartpage/cartpage.component"));
const BookingConfirmationPage = lazy(() =>
  import("./pages/booking-confirm/booking-confirm-page.component")
);
const MyBookingsPage = lazy(() =>
  import("./pages/my-bookings/my-bookings.component")
);
const DoctorConsultationPage = lazy(() =>
  import("./pages/doctor-consultation/doctor-consultation-page.component")
);
const MyAppointmentsPage = lazy(() =>
  import("./pages/my-appointments/my-appointments.component")
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
            <Route path="book-diagnostics" element={<BookDiagnosticsPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="my-bookings" element={<MyBookingsPage />} />
            <Route
              path="doctor-consultation"
              element={<DoctorConsultationPage />}
            />
            <Route path="my-appointments" element={<MyAppointmentsPage />} />
          </Route>
          <Route path="booking-confirm" element={<BookingConfirmationPage />} />
        </Routes>
      </Suspense>
      {/* </Suspense> */}
    </Fragment>
    // )
  );
};

export default App;
