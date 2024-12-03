import { Col, Container, Row } from "react-bootstrap";
import style from "./style.module.css";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { FaYoutube } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
import { CgCopyright } from "react-icons/cg";
import { FaArrowRightLong } from "react-icons/fa6";
const Footer = () => {
  return (
    <Container fluid className={`${style.containerFooter}`}>
      <Row className={`${style.introductFooter}`}>
        <Col md={4} className={`${style.intro}`}>
          <Row>
            <Col>
              <h5>JOYFULL LETTER</h5>
            </Col>
          </Row>
          <Row className={`${style.boxParaghap}`}>
            <Col>
              <p>
                The letter-writing shop specializes in creating and sending
                handwritten letters, offering a personal touch for occasions.
                Each letter is designed to convey heartfelt messages.
              </p>
            </Col>
          </Row>
          <Row className="mb-4">
            <Col>
              <NavLink className={style.readMore} to={"/about"}>
                read more <FaArrowRightLong />
              </NavLink>
            </Col>
          </Row>
        </Col>

        <Col md={8} className={`${style.social}`}>
          <Row>
            <Col className="d-flex gap-2">
              <h5>My Team:</h5>
              <span>Cao Vi</span>
              <span>Quoc Hao</span>
              <span>Huynh Huong</span>
              <span>My Dieu</span>
              <span>Uyen Quan</span>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="d-flex  gap-2">
              <h5>Address:</h5>
              <p>
                600 Nguyễn Văn Cừ Nối Dài, An Bình, Ninh Kiều, Cần Thơ 900000,
                Vietnam
              </p>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="d-flex gap-2">
              <h5>Phone:</h5>
              <p>0123456789</p>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col className="d-flex gap-2 align-items-center">
              <h5>Social:</h5>
              <FaFacebook className={style.iconSocial} />
              <AiFillInstagram className={style.iconSocial} />
              <FaYoutube className={style.iconSocial} />
              <FaTwitterSquare className={style.iconSocial} />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <p>
            Copyright <CgCopyright />
            2024 by Joyfull Letter Team
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
