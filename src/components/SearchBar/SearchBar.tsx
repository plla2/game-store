import { motion, useAnimation } from "framer-motion";
import Button from "../Button/Button";
import { AiOutlineSearch } from "@react-icons/all-files/ai/AiOutlineSearch";
import { FormEvent, useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const formControls = useAnimation();
  const setFormMaxWidth = (width: number) => {
    formControls.start({ maxWidth: width });
  };

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue) return;
    const searchParam = createSearchParams({ search: inputValue });
    navigate({
      pathname: "/games",
      search: searchParam.toString(),
    });
  };

  return (
    <motion.form
      className="SearchBar"
      initial={{ maxWidth: 400 }}
      animate={formControls}
      onSubmit={search}
    >
      <input
        type="text"
        placeholder="게임 이름을 입력해주세요."
        onFocus={() => setFormMaxWidth(700)}
        onBlur={() => setFormMaxWidth(400)}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button type="submit" title="Search">
        <AiOutlineSearch />
      </Button>
    </motion.form>
  );
};

export default SearchBar;
