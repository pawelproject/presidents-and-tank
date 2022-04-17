import { FC } from "react";
import { Col, Row, Button, Stack, Modal, Table } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import ErrorText from "../UI/ErrorText";

import { errorHelper } from "../../helpers/errorHelper";

import { useDeleteTankMutation } from "../../services/tanks";
import { Tank } from "../../types/Tank";

interface ITankDetailsProps {
  tank?: Tank;
}

export const TankDetails: FC<ITankDetailsProps> = ({ tank }) => {
  const navigate = useNavigate();

  const [deleteTank, tankDeletion] = useDeleteTankMutation();

  const deleteTankHandler = () => {
    deleteTank("" + tank?.id);
  };

  const closeModalHandler = () => {
    navigate("/tanks");
  };

  const deletionErrorMessage = errorHelper(
    tankDeletion.isError,
    tankDeletion.error
  );

  return (
    <>
      <Modal show={tankDeletion.isSuccess} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Product has been successfully deleted.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModalHandler}>
            Go back to tank list
          </Button>
        </Modal.Footer>
      </Modal>
      {tank && (
        <>
          <h1>Tank info</h1>
          <Table striped bordered hover size="sm">
            <tbody>
              <tr>
                <td>Side Number</td>
                <td>{tank.nr}</td>
              </tr>
              <tr>
                <td>Producer</td>
                <td>{tank.producer}</td>
              </tr>
              <tr>
                <td>Model</td>
                <td>{tank.model}</td>
              </tr>
              <tr>
                <td>Version</td>
                <td>{tank.version}</td>
              </tr>
              <tr>
                <td>Tank year</td>
                <td>{tank.tankYear.toString()}</td>
              </tr>
              <tr>
                <td>Release Date</td>
                <td>{tank.releaseDate}</td>
              </tr>
              <tr>
                <td>Mileage</td>
                <td>{tank.mileage.toString()}</td>
              </tr>
              <tr>
                <td>Ammo</td>
                <td>{tank.ammo.toString()}</td>
              </tr>
              <tr>
                <td>Armor</td>
                <td>{tank.armor.toString()}</td>
              </tr>
              <tr>
                <td>Last updated at</td>
                <td>{tank?.updatedAt?.toLocaleString()}</td>
              </tr>
              <tr>
                <td>Created At</td>
                <td>{tank?.createdAt?.toLocaleString()}</td>
              </tr>
            </tbody>
          </Table>
          <Row>
            <Col>
              <Stack className="col-md-5 mx-auto" gap={3}>
                <Button
                  variant="primary"
                  onClick={() => {
                    navigate("edit");
                  }}
                >
                  Edit
                </Button>

                {tankDeletion.isError && (
                  <ErrorText>{deletionErrorMessage}</ErrorText>
                )}
                <Button variant="danger" onClick={deleteTankHandler}>
                  Delete Product
                </Button>
              </Stack>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
