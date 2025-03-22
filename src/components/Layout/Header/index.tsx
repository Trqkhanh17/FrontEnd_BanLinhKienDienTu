import { Button, Col, Container, Dropdown, Image, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { BsSearchHeart } from "react-icons/bs";
import { TbShoppingBagHeart } from "react-icons/tb";
import style from "./style.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useRef, useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { handleMenuBar } from "../../../redux/features/menuBarSlice";
import Logo from "../../../assets/images/logo.jpg";
import { IoPersonCircleOutline } from "react-icons/io5";
import { fetchGetProfile } from "../../../redux/features/profileSlice";
import { deleteCookie, getCookie } from "../../../utils";

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
  const user = useAppSelector((state) => state.profile);
  const [checkLogin, setCheckLogin] = useState(false);
  const token = getCookie("token");
  const [hover, setHover] = useState(false);
  useEffect(() => {
    navRefs.current.forEach((ref) => {
      if (ref?.classList[1] === "active") {
        ref.classList.add(`${style.active}`);
      }
    });
  }, [navRefs]);


  useEffect(() => {
    if (token) {
      dispatch(fetchGetProfile());
      setCheckLogin(true);
    }
  }, [token, dispatch]);

  const handleClick = () => {
    dispatch(handleMenuBar(!statusBar));
  };

  return (
    <Container fluid className={`${style.containerHeader}`}>
      <Row onClick={() => handleClick()} className={style.iconBarHeader}>
        <Col>
          <FaBars />
        </Col>
      </Row>
      <Row className={`${style.boxLogo}`}>
        <Col>
          <Image style={{ cursor: hover ? 'pointer' : 'default' }}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)} className={style.logo} src={Logo} fluid width={"100px"} onClick={() => navigate("/")} />
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
          {cart && cart.listCart.length > 0 ? (
            <div className={style.quantityCart}>{cart?.listCart.length}</div>
          ) : null}
        </Col>
        <Col className={style.itemIcon2}>
          <Dropdown>
            <Dropdown.Toggle
              className={style.dropdownToggle}
              variant=""
              id="dropdown-basic"
            >
              <IoPersonCircleOutline className={style.icon} />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {!checkLogin ? (
                <Dropdown.Item>
                  <NavLink to={"/login"}>Login</NavLink>
                </Dropdown.Item>
              ) : (
                <>
                  <Dropdown.Item>
                    <NavLink to={"/profile"}>Thông tin cá nhân</NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <NavLink to={"/order"}>Lịch sử đặt hàng</NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Button onClick={() => {
                      deleteCookie("token");
                      navigate("/login");
                    }}>Đăng xuất</Button>
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <div>{user.dataProfile?.cus_name ? user.dataProfile.cus_name : "Loading"}</div>
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
