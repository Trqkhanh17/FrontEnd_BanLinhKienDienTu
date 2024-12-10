import { Col, Container, Image, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { BsSearchHeart } from "react-icons/bs";
import { TbShoppingBagHeart } from "react-icons/tb";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { handleMenuBar } from "../../../redux/features/menuBarSlice";
import Logo from "../../../assets/images/logo.jpg";

const navigateRoute = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Store",
    route: "/product",
  },
  {
    name: "About",
    route: "/about",
  },
  {
    name: "Contact",
    route: "/contact",
  },
];

const Header = () => {
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart.dataCart);
  const statusBar = useAppSelector((state) => state.menuStatus.value);
  const navigate = useNavigate();
  useEffect(() => {
    navRefs.current.forEach((ref) => {
      if (ref?.classList[1] === "active") {
        ref.classList.add(`${style.active}`);
      }
    });
  }, [navRefs]);

  const handleClick = () => {
    dispatch(handleMenuBar(!statusBar));
  };

  return (
    <Container fluid className={`${style.containerHeader} `}>
      <Row onClick={() => handleClick()} className={style.iconBarHeader}>
        <Col>
          <FaBars />
        </Col>
      </Row>
      <Row className={`${style.boxLogo}`}>
        <Col>
          <Image className={style.logo} src={Logo} fluid width={"100px"} />
        </Col>
      </Row>
      <Row
        className={`${style.boxNavigate} ${statusBar ? style.showMenubar : ""}`}
      >
        {navigateRoute &&
          navigateRoute.map((item, index) => (
            <Col
              onClick={() => handleClick()}
              className={style.navigate}
              md={statusBar ? 3 : undefined}
              key={index}
            >
              <NavLink
                ref={(el) => {
                  navRefs.current[index] = el;
                }}
                className={style.routeName}
                to={item.route}
              >
                {item.name}
              </NavLink>
            </Col>
          ))}
      </Row>
      <Row className={`${style.boxIcon}`}>
        <Col className={style.itemIcon1}>
          <BsSearchHeart className={style.icon} />
        </Col>
        <Col className={style.itemIcon2}>
          <TbShoppingBagHeart
            onClick={() => navigate("/cart")}
            className={style.icon}
          />
          <div className={style.quantityCart}>{cart?.listCart.length}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
