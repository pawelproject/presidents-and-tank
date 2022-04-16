import React, { useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route, Navigate, HashRouter } from "react-router-dom";

import "./App.css";
import { AuthForm } from "./components/Auth/AuthForm";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import TopBar from "./components/UI/TopBar";
import { useVerifyTokenMutation } from "./services/auth";
import { clearState, setUser } from "./store/auth";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import { convertAuthResponse } from "./helpers/convertUserResponse";
import { TankList } from "./components/Tanks/TankList";
import { CreateOrEditTank } from "./components/Tanks/CreateOrEdit";
import { TankDetails } from "./components/Tanks/TankDetails";
import { TankWrapper } from "./components/Tanks/TankWrapper";
import { UserInfo } from "./components/UserPanel/UserInfo";

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const token = localStorage.getItem("token");

  let enableAutomaticRoute = useRef(!token);

  const [verifyToken, verification] = useVerifyTokenMutation();

  useEffect(() => {
    if (token) {
      verifyToken(token);
    }
  }, [token, verifyToken]);

  useEffect(() => {
    if (verification.isSuccess) {
      const userData = convertAuthResponse(verification.data.user);
      dispatch(setUser(userData));
      enableAutomaticRoute.current = true;
    }
  }, [verification.isSuccess, verification.data, dispatch]);

  if (verification.isError) {
    dispatch(clearState());
    enableAutomaticRoute.current = true;
  }

  return (
    <div className="app">
      {verification.isLoading && <LoadingSpinner />}

      <Container className="main-container">
        <HashRouter>
          {isLoggedIn && <TopBar />}
          <Routes>
            {isLoggedIn && (
              <>
                <Route path="/profile" element={<UserInfo />} />
                <Route path="/tanks" element={<TankList />} />
                <Route path="/tanks/create" element={<CreateOrEditTank />} />
                <Route
                  path="/tanks/:id/edit"
                  element={
                    <TankWrapper>
                      <CreateOrEditTank />
                    </TankWrapper>
                  }
                />
                <Route
                  path="/tanks/:id"
                  element={
                    <TankWrapper>
                      <TankDetails />
                    </TankWrapper>
                  }
                />
              </>
            )}
            {!isLoggedIn && (
              <>
                <Route path="/auth" element={<AuthForm />} />
              </>
            )}

            {enableAutomaticRoute.current && (
              <Route
                path="*"
                element={
                  isLoggedIn ? (
                    <Navigate to="/tanks" />
                  ) : (
                    <Navigate to="/auth" />
                  )
                }
              />
            )}
          </Routes>
        </HashRouter>
      </Container>
    </div>
  );
}

export default App;
