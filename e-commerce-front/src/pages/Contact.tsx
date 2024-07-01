import PageHeader from "@components/common/layout/header/mainHeader/PageHeader";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { BsClockFill } from "react-icons/bs";
import { Button, Container } from "react-bootstrap";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSigning = (value: "login" | "register") => {
    navigate(`/contact/${value}`);
  };
  return (
    <div className="contact">
      <PageHeader pageName={'Contact'}/>
      <h2>Get In Touch With Us</h2>
      <p>
        For More Information About Our Product & Services. Please Feel Free To
        Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not
        Hesitate!
      </p>
      <Container className="container">
        <div className="contactInfo">
          <article>
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <h4>Address</h4>
            <p>236 5th SE Avenue, New York NY10000, United States</p>
          </article>
          <article>
            <div className="icon">
              <FaPhone />
            </div>
            <h4>Phone</h4>
            <p>
              Mobile: +(84) 546-6789
              <br />
              Hotline: +(84) 456-6789
            </p>
          </article>
          <article>
            <div className="icon">
              <BsClockFill />
            </div>
            <h4>Working Time</h4>
            <p>
              Monday-Friday: 9:00 - 22:00
              <br />
              Saturday-Sunday: 9:00 - 21:00
            </p>
          </article>
        </div>
        <div className="signBox">
          <Button
            className={`btn ${
              location.pathname.includes("login") ? "active" : ""
            }`}
            onClick={() => handleSigning("login")}
          >
            login
          </Button>

          <Button
            className={`btn ${
              location.pathname.includes("register") ? "active" : ""
            }`}
            onClick={() => handleSigning("register")}
          >
            register
          </Button>

          <Outlet />
        </div>
      </Container>
    </div>
  );
};

export default Contact;
