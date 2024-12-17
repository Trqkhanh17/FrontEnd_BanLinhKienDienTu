import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
interface Props {
  children: React.ReactNode;
  showP: boolean;
  handleClose: () => void;
}
const ModalCustomize: React.FC<Props> = ({ children, showP, handleClose }) => {
  return (
    <Container>
      <Modal show={showP} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Scan QR Code to Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ModalCustomize;
