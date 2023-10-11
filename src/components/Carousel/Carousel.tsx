/* eslint-disable react-hooks/exhaustive-deps */
import Button from "../Button/Button";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { motion } from "framer-motion";
import { Children, useEffect, useRef, useState } from "react";

interface Props {
  duration: number;
  children: React.ReactNode;
  useDots?: boolean;
}

const Carousel = ({ duration, children, useDots = true }: Props) => {
  const [index, setIndex] = useState(0);
  const childrenArray = Children.toArray(children);
  const timeout = useRef<number>();

  useEffect(() => {
    if (index >= childrenArray.length) {
      setIndex(0);
    } else if (index < 0) {
      setIndex(childrenArray.length - 1);
    }
    timeout.current = setTimeout(() => {
      setIndex((index) => index + 1);
    }, duration * 1000);
    return () => clearTimeout(timeout.current);
  }, [index]);

  return (
    <div className="Carousel">
      <Button handleClick={() => setIndex((index) => index - 1)}>
        <AiOutlineLeft />
      </Button>
      <motion.div
        className="Items"
        initial={{ x: 0 }}
        animate={{ x: `${-index * 100}%` }}
        transition={{ duration: 0.75 }}
      >
        {children}
      </motion.div>
      {useDots && (
        <div className="Dots">
          {childrenArray.map((_, i) => (
            <motion.div
              className="Dot"
              key={`dot-${i}`}
              initial={false}
              animate={{ scale: +(index !== i) }}
              transition={{ type: "spring", duration: 0.01 }}
              onClick={() => setIndex(i)}
            />
          ))}
          <motion.div
            className="Dot Active"
            layout
            initial={false}
            animate={{ x: index * 22 }}
            transition={{ type: "spring", duration: 0.01 }}
          />
        </div>
      )}
      <Button handleClick={() => setIndex((index) => index + 1)}>
        <AiOutlineRight />
      </Button>
    </div>
  );
};

export default Carousel;
