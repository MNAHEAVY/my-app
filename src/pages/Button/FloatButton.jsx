import React, { useState } from "react";
import { IoMdContacts } from "react-icons/io";
import { MdCompare } from "react-icons/md";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";
import "./styles.css";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { Link } from "react-router-dom";

const Icon = ({ children }) => (
  <span className="material-symbols-outlined">{children}</span>
);

export default function FloatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`fab ${isOpen ? "open" : ""}`}>
      <button onClick={() => setIsOpen(!isOpen)}>
        <Icon>+</Icon>
      </button>
      <div className="menu">
        <button>
          <Link to="/contactanos">
            <Icon>
              Contactanos
              <IoMdContacts />
            </Icon>
          </Link>
        </button>
        <button>
          <Link to="/comparar">
            <Icon>
              Comparativas
              <MdCompare />
            </Icon>
          </Link>
        </button>
        <button>
          <Link to="/techservice">
            <Icon>
              Servicio tecnico
              <HiOutlineWrenchScrewdriver />
            </Icon>
          </Link>
        </button>
        <button>
          <Link to="/faq">
            <Icon>
              FAQ
              <AiOutlineQuestionCircle />
            </Icon>
          </Link>
        </button>
      </div>
    </div>
  );
}
