import React, { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";

import { useNavigate, useParams } from "react-router-dom";

// import { ProductForm } from "./ProductForm";
import { errorHelper } from "../../helpers/errorHelper";
import {
  useCreateTankMutation,
  useEditTankMutation,
} from "../../services/tanks";
import { Tank } from "../../types/Tank";
import { TankForm } from "./TankForm";

interface ICreateOrEditTankProps {
  tank?: Tank;
}

export const CreateOrEditTank: FC<ICreateOrEditTankProps> = ({ tank }) => {
  const params = useParams();
  const tankId: string = params.id ? params.id : "";
  const isEditingMode = !!tankId;

  const navigate = useNavigate();

  const [createTank, tankCreation] = useCreateTankMutation();

  const [editTank, tankEdition] = useEditTankMutation();

  const submitingError = tankCreation.error ?? tankEdition.error;

  const submittingIsSuccess = isEditingMode
    ? tankEdition.isSuccess
    : tankCreation.isSuccess;
  const submittingIsLoading = isEditingMode
    ? tankEdition.isLoading
    : tankCreation.isLoading;

  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => setShowModal((prev) => !prev);

  let errorMessage = errorHelper(tankCreation.isError, submitingError);

  useEffect(() => {
    if (submittingIsSuccess) {
      toggleModal();
    }
  }, [submittingIsSuccess]);

  const onSubmit = (data: Tank) => {
    if (isEditingMode) {
      editTank({ ...data, id: tank?.id });
    } else {
      createTank(data);
    }
  };

  return (
    <>
      <Modal show={showModal} onHide={toggleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isEditingMode
            ? "Tank has been successfully edited"
            : "New Tank has been successfully added."}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              navigate("/tanks");
            }}
          >
            Go back to Tank list
          </Button>
          <Button variant="primary" onClick={toggleModal}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>

      <TankForm
        onSubmit={onSubmit}
        errorMessage={errorMessage}
        isLoading={submittingIsLoading}
        initialValues={tank}
      />
    </>
  );
};
