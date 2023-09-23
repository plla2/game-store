import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  title?: string;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button = ({
  children,
  className = "",
  type = "button",
  title,
  handleClick,
}: Props) => {
  return (
    <motion.button
      className={`Button ${className}`}
      type={type}
      title={title}
      onClick={handleClick}
    >
      {children}
    </motion.button>
  );
};

export default Button;
