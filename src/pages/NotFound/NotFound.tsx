import { useEffect } from "react";
import Transition from "../../components/Transition/Transition";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const duration = 3;

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, duration * 1000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <Transition className="NotFound" direction="up" distance={100}>
      <h1>404</h1>
      <p>유효하지 않는 페이지입니다.</p>
      <div className="Redirect">
        <p>홈으로 돌아갑니다...</p>
        <motion.div
          className="ProgressBar"
          initial={{ width: 0 }}
          animate={{ width: "100%", transition: { duration } }}
        />
      </div>
    </Transition>
  );
};

export default NotFound;
