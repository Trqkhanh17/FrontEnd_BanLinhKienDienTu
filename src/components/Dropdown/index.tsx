import { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
interface Props {
  toggole: string;
  menuItem: string[];
}
const DropdownCustomize: React.FC<Props> = ({ menuItem, toggole }) => {
  const [active, setActive] = useState(toggole);
  const [indexActive, setIndexActive] = useState(0);
  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        {active}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {menuItem &&
          menuItem.length > 0 &&
          menuItem.map((item, index) => (
            <Dropdown.Item
              style={{ color: indexActive === index ? "#cfab68" : "" }}
              onClick={() => {
                setActive(item);
                setIndexActive(index);
              }}
              key={index}
            >
              {item}
            </Dropdown.Item>
          ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownCustomize;
