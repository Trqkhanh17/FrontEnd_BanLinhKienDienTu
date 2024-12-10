import { ChangeEvent, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import style from "./style.module.css";
import { toast } from "react-toastify";

interface Props {
  onChange: (value: number) => void;
}
const MyCount: React.FC<Props> = ({ onChange }) => {
  const [value, setValue] = useState(1);
  const handleIncreaseValue = () => {
    setValue((state) => state + 1);
  };

  const handleDescreaseValue = () => {
    setValue((state) => state - 1);
  };

  const handleSetValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (Number.isNaN(value)) {
      setValue(1);
    } else {
      setValue(value);
    }
  };

  useEffect(() => {
    if (value <= 0) {
      toast.warning("Quantity must be is positive number!!!");
      setValue(1);
    }
    onChange(value);
  }, [value, onChange]);

  return (
    <Container fluid className={style.containerCount}>
      <Row>
        <Col className={style.boxDes} onClick={() => handleDescreaseValue()}>
          -
        </Col>
        <Col className={style.boxValue}>
          <input
            className={style.inputValue}
            type="number"
            onChange={(e) => handleSetValue(e)}
            value={value}
          />
        </Col>
        <Col className={style.boxInc} onClick={() => handleIncreaseValue()}>
          +
        </Col>
      </Row>
    </Container>
  );
};

export default MyCount;
