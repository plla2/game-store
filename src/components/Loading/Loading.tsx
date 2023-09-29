import { CircularProgress } from "react-cssfx-loading";
import Transition from "../Transition/Transition";

const Loading = () => {
  return (
    <Transition className="Loading">
      <CircularProgress height="100px" width="100px" color="#A084DC" />
    </Transition>
  );
};

export default Loading;
