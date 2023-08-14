import { Fragment, memo, useEffect } from "react";
import "./homepage.styles.css";

const HomePage = () => {
  useEffect(() => {
    document.body.style.backgroundColor = "#fbfbfb";
    return () => {
      document.body.style.backgroundColor = "#fbfbfb";
    };
  }, []);
  return (
    <Fragment>
      <div>welcome to home page</div>
    </Fragment>
  );
};

export default memo(HomePage);
