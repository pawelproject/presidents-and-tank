import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { Field } from "react-final-form";

interface selectOption {
  value: any;
  name: string;
}

interface IInputProps {
  name: string;
  label: string;
  type?: string;
  selectOptions?: selectOption[];
}

export const Input: FC<IInputProps> = ({
  name,
  label,
  type,
  selectOptions,
}) => {
  return (
    <Form.Group className="mb-3" controlId={name}>
      <Form.Label>{label}</Form.Label>
      <Field
        name={name}
        required
        render={({ input, meta }) => {
          return (
            <>
              {type === "select" ? (
                selectOptions && (
                  <Form.Select
                    {...input}
                    required
                    isInvalid={
                      (meta.error || meta.submitError) && meta.touched && true
                    }
                    isValid={meta.valid && meta.touched && true}
                  >
                    <option disabled value="">
                      Select
                    </option>
                    {selectOptions.map((option, i) => {
                      return (
                        <option key={i} value={option.value}>
                          {option.name}
                        </option>
                      );
                    })}
                  </Form.Select>
                )
              ) : (
                <>
                  <Form.Control
                    {...input}
                    type={type}
                    isInvalid={
                      (meta.error || meta.submitError) && meta.touched && true
                    }
                    isValid={meta.valid && meta.touched && true}
                  />
                </>
              )}

              <Form.Control.Feedback type="invalid">
                {meta.error} {meta.submitError}
              </Form.Control.Feedback>
            </>
          );
        }}
      />
    </Form.Group>
  );
};

export default Input;
