import React, { FC, useEffect, useState } from "react";
import { Form, Row, Button } from "react-bootstrap";
import { Form as FinalForm } from "react-final-form";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "../../hooks/redux";
import { setUser } from "../../store/auth";
import { useAuthenticateMutation } from "../../services/auth";
import ErrorText from "../UI/ErrorText";
import LoadingSpinner from "../UI/LoadingSpinner";
import { errorHelper } from "../../helpers/errorHelper";
import { convertAuthResponse } from "../../helpers/convertUserResponse";
import Input from "../UI/Input";
import {
  checkEmail,
  checkLength,
  checkPassword,
  checkRequired,
} from "../../helpers/forms/formValidationHelpers";
import "./AuthForm.css";

interface AuthFormValues {
  email?: string;
  fullName?: string;
  country?: string;
  hasNuclearBomb?: string;
  password?: string;
}

interface IAuthFormProps {}

export const AuthForm: FC<IAuthFormProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [authenticate, { data, isLoading, error, isError, isSuccess, reset }] =
    useAuthenticateMutation();

  useEffect(() => {
    if (isSuccess) {
      const userData = convertAuthResponse(data);
      dispatch(setUser(userData));
      navigate("/tanks");
    }
  }, [isSuccess, dispatch, data, navigate]);

  let errorMessage = errorHelper(isError, error);

  const switchAuthModeHandler = () => {
    reset();
    setIsLoginMode((prevState) => !prevState);
  };

  const onSubmit = (data: AuthFormValues) => {
    authenticate({ isLoginMode, ...data });
  };

  const formValidation = (values: AuthFormValues) => {
    let errors: AuthFormValues = {};

    // checking registration only inputs
    if (!isLoginMode) {
      errors.password = checkPassword(values.password); // only here on purpose
      errors.fullName = checkLength(values.fullName, 4, 40);
      errors.country = checkRequired(values.country);
      errors.hasNuclearBomb = checkRequired(values.hasNuclearBomb);
    }

    // checking login and registration inputs
    errors.email = checkEmail(values.email);
    errors.email = errors.email
      ? errors.email
      : checkLength(values.email, 1, 255);
    errors.password = errors.password
      ? errors.password
      : checkLength(values.password, 6, 100);

    return errors;
  };

  return (
    <>
      <h1>{isLoginMode ? "Signing In" : "Registration"}</h1>
      <FinalForm
        onSubmit={onSubmit}
        validate={formValidation}
        render={({ handleSubmit, valid, form }) => (
          <Form onSubmit={handleSubmit} className="auth-form">
            <Input name="email" label="Email" type="email" />
            <Input name="password" label="Password" type="password" />
            {!isLoginMode && (
              <>
                <Input name="fullName" label="Full name" type="text" />
                <Input name="country" label="Country" type="text" />
                <Input
                  name="hasNuclearBomb"
                  label="Has nuclear bomb"
                  type="select"
                  selectOptions={[
                    { value: false, name: "No" },
                    { value: true, name: "Yes" },
                  ]}
                />
              </>
            )}
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            {isLoading && <LoadingSpinner />}
            <Row>
              <Button variant="primary" type="submit" disabled={!valid}>
                {isLoginMode ? "Login" : "Create Account"}
              </Button>
            </Row>
            or
            <Row>
              <Button variant="secondary" onClick={switchAuthModeHandler}>
                {isLoginMode
                  ? "Create new account"
                  : "Login with existing account"}
              </Button>
            </Row>
            <br />
            <Row>
              <Button
                variant="info"
                onClick={() => {
                  authenticate({
                    isLoginMode: true,
                    email: "demokonto@test.pl",
                    password: "demoHaslo1;",
                  });
                }}
              >
                Demo Login
              </Button>
            </Row>
          </Form>
        )}
      />
    </>
  );
};
