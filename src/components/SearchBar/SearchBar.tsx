import { motion, useAnimation } from "framer-motion";
import Button from "../Button/Button";
import { AiOutlineSearch } from "react-icons/ai";

const SearchBar = () => {
  const formControls = useAnimation();
  const setFormMaxWidth = (width: number) => {
    formControls.start({ maxWidth: width });
  };

  return (
    <motion.form
      className="SearchBar"
      initial={{ maxWidth: 400 }}
      animate={formControls}
    >
      <input
        type="text"
        placeholder="게임 이름을 입력해주세요."
        onFocus={() => setFormMaxWidth(700)}
        onBlur={() => setFormMaxWidth(400)}
      />
      <Button type="submit" title="Search">
        <AiOutlineSearch />
      </Button>
    </motion.form>
  );
};

export default SearchBar;
