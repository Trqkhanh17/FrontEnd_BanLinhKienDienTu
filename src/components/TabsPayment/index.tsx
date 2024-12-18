import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useState } from "react";
import style from "./style.module.css";
export interface Tab {
  title: string;
  content: React.ReactNode;
}

interface Props {
  render: Tab[];
}

const Tabs: React.FC<Props> = ({ render }) => {
  const negative = useNavigate();
  const [active, setActive] = useState(0);

  return (
    <Container>
      <Row>
        <Col className="d-flex align-items-center justify-content-start p-0">
          <div className={style.tabTitle} onClick={() => negative("/cart")}>
            Cart
          </div>
          {render &&
            render.length > 0 &&
            render.map((item, index) => (
              <div key={index}>
                <IoIosArrowForward />
                <span
                  style={{ fontWeight: active === index ? "600" : "" }}
                  className={style.tabTitle}
                  onClick={() => setActive(index)}
                >
                  {item.title}
                </span>
              </div>
            ))}
        </Col>
      </Row>
      {render &&
        render.length > 0 &&
        render.map((item, index) => (
          <Row hidden={index === active ? false : true} key={index}>
            {item.content}
          </Row>
        ))}
      <Row className="d-flex justify-content-between align-items-center">
        <Col className="text-end">
          {active === 0 ? (
            <Button
              onClick={()=>{}}
              className={style.buttonPaymentContinue}
            >
              Payment Continue
            </Button>
          ) : null}
        </Col>
      </Row>
    </Container>
  );
};

export default Tabs;
