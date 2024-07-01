import { useEffect } from "react";

// import styles
import styles from "./mainHeader.module.css";

// import assets
import brandLogo from "@assets/Meubel House_Logos-05.png";

// react router dom
import { NavLink, useNavigate } from "react-router-dom";

// bootstrap
import { Container, Dropdown, NavItem, OverlayTrigger, Tooltip } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

// react icons
import { FaRegUserCircle } from "react-icons/fa";
import CartIcon from "../../../../ecommerce/cart/CartIcon";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { actGetWishList } from "@store/wishlist/wishlistSlice";
import WishlistIcon from "@components/ecommerce/wishlistIcon/WishlistIcon";
import SearchField from "@components/custom/gallary/SearchField";

const { brandName, container, icon } = styles;

function MainHeader() {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAppSelector((state) => state.authSlice);

  const navigate = useNavigate();

  const handleLogout = (event) => {
    event.preventDefault();
    event.stopPropagation();
    dispatch(authLogout());
    navigate("/");
  };

  useEffect(() => {
    dispatch(actGetWishList("ProductIds"));
  }, [dispatch, accessToken]);


  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props} >
      sign in/up
    </Tooltip>
  );

  return (
    <Navbar expand="lg" className="bg-white ">
      <Container className={container}>
        <Navbar.Brand
          href="/"
          className={`${brandName} fw-bold  d-flex align-items-center  `}
        >
          <img alt="brand Logo" src={brandLogo} />
          Furniro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto fw-medium gap-5">
            <Nav.Link as={NavLink} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/shop">
              Shop
            </Nav.Link>
            <OverlayTrigger
              placement="right"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
            >
              <Nav.Link as={NavLink} to="/contact">
                Contact
              </Nav.Link>
            </OverlayTrigger>
          </Nav>
        </Navbar.Collapse>

        {accessToken && (
          <Dropdown as={NavItem}>
            <Dropdown.Toggle
              style={{
                color: "#000",
                textDecoration: "none",
                border: "none",
                backgroundColor: "transparent",
                boxShadow: "0 0 3px 0px #eee",
              }}
            >
              <FaRegUserCircle className={`mx-2 ${icon}`} />
              <span>{user?.name}</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <NavDropdown.Item as={NavLink} to="/profile">
                Profile
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/orders">
                orders
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/checkout">
                Checkout
              </NavDropdown.Item>
              <Dropdown.Divider />
              <NavDropdown.Item as={NavLink} to={"/"} onClick={handleLogout}>
                Logout
              </NavDropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        <SearchField iconClass={icon} />

        <WishlistIcon />
        <CartIcon />
      </Container>
    </Navbar>
  );
}

export default MainHeader;
