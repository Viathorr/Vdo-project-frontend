import { FaGithub, FaTelegram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="footer">
      <div>
        <a href="mailto:theuseful13@gmail.com" target="_blank" rel="noopener noreferrer">
          <MdEmail className="icon" />
        </a>
        <p>Email</p>
      </div>
      <div>
        <a href="https://github.com/Viathorr" target="_blank" rel="noopener noreferrer">
          <FaGithub className="icon" />
        </a>
        <p>GitHub</p>
      </div>
      <div>
        <a href="https://t.me/viathorr" target="_blank" rel="noopener noreferrer">
          <FaTelegram className="icon"/>
        </a>
        <p>Telegram</p>
      </div>
    </footer>
  )
};

export default Footer;
