import React, { FC } from "react";
import { Form, Button } from "react-bootstrap";

import { Form as FinalForm } from "react-final-form";
import { Tank } from "../../types/Tank";

import ErrorText from "../UI/ErrorText";
import Input from "../UI/Input";
import LoadingSpinner from "../UI/LoadingSpinner";
import {
  checkDate,
  checkLength,
  checkNumber,
} from "../../helpers/forms/formValidationHelpers";
import "./TankForm.css";

interface ITankFormProps {
  initialValues?: Tank;
  onSubmit: any;
  errorMessage: string;
  isLoading: boolean;
}

export const TankForm: FC<ITankFormProps> = ({
  onSubmit,
  initialValues,
  errorMessage,
  isLoading,
}) => {
  const submitHandler = (data: Tank) => {
    onSubmit(data);
  };

  const currentYear = new Date().getFullYear();

  const formValidation = (values: Tank) => {
    let errors: Partial<Tank> = {};

    errors.nr = checkLength(values.nr, 3, 10);
    errors.producer = checkLength(values.producer, 3, 30);
    errors.model = checkLength(values.model, 3, 30);
    errors.version = checkLength(values.version, 3, 30);
    errors.producer = checkLength(values.producer, 3, 30);
    errors.tankYear = checkNumber(values.tankYear, 1900, currentYear);
    errors.releaseDate = checkDate(
      values.releaseDate,
      new Date(1970),
      new Date()
    );
    errors.mileage = checkNumber(values.mileage, 1);
    errors.ammo = checkNumber(values.ammo, 1);
    errors.armor = checkNumber(values.armor, 1);

    return errors;
  };

  return (
    <>
      <FinalForm
        onSubmit={submitHandler}
        validate={formValidation}
        initialValues={initialValues}
        render={({ handleSubmit, valid, values }) => (
          <Form onSubmit={handleSubmit} className="tank-form">
            <Input name="nr" label="Side Number" type="text" />
            <Input name="producer" label="Producer" type="text" />
            <Input name="model" label="Model" type="text" />
            <Input name="version" label="Version" type="text" />
            <Input name="tankYear" label="Tank year" type="number" />
            <Input name="releaseDate" label="Release Date" type="date" />
            <Input name="mileage" label="Mileage" type="number" />
            <Input name="ammo" label="Ammo" type="number" />
            <Input name="armor" label="Armor" type="number" />
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}

            {isLoading && <LoadingSpinner />}

            <Button variant="primary" type="submit" disabled={!valid}>
              Submit
            </Button>
          </Form>
        )}
      />
    </>
  );
};
