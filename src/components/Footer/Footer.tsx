import { RiGithubLine } from "@react-icons/all-files/ri/RiGithubLine";

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
