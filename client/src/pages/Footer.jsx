import Navbar from "../components/NavBar";

const Footer = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  );
};

export default Footer;
