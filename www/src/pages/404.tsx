import { FC } from "react";
import MainView from "../components/main-view/MainView";
import { Link } from "react-router-dom";
import Button from "../components/button/Button";

const NotFoundPage: FC = () => {
  return (
    <>
      <MainView title="404 - Oops, not found :(">
        <Link to={"/programs"}>
          <Button
            text={"Back to programs"}
            onClick={() => {}}
            type={"outlined"}
          ></Button>
        </Link>
      </MainView>
    </>
  );
};

export default NotFoundPage;
