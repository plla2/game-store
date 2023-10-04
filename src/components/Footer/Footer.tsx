import { RiGithubLine } from "react-icons/ri";

const Footer = () => {
  return (
    <footer>
      <a
        href="https://github.com/plla2"
        className="Github Button"
        target="_blank"
      >
        <RiGithubLine /> Plla2
      </a>
      <a href="https://rawg.io/apidocs" className="Api Button" target="_blank">
        RAWG API
      </a>
    </footer>
  );
};

export default Footer;
