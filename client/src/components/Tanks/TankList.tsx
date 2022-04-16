import { FC, useEffect, useState } from "react";
import { Card, Col, Row, Button } from "react-bootstrap";

import ErrorText from "../UI/ErrorText";
import { TankListItem } from "../../types/Tank";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import { useGetTanksQuery } from "../../services/tanks";
import { GiBattleTank } from "react-icons/gi";
import { AiOutlinePlus } from "react-icons/ai";
import { IconContext } from "react-icons";

interface ITankListProps {}

export const TankList: FC<ITankListProps> = (props) => {
  const navigate = useNavigate();

  const { data, isLoading, isSuccess, isError } = useGetTanksQuery("");

  const [tanks, setTanks] = useState<TankListItem[]>([]);

  useEffect(() => {
    if (isSuccess) {
      if (data.tanks) {
        setTanks(data.tanks);
      }
    }
  }, [data, isSuccess]);

  if (isError) {
    return <ErrorText />;
  }

  return (
    <>
      <h1>Your tanks</h1>
      {isLoading && <LoadingSpinner />}

      <Row className="justify-content-md-center">
        {tanks.map((tank: TankListItem) => {
          return (
            <Col key={tank.id} xs={6} sm={6} md={4} lg={3} className="p-2">
              <Card>
                <Card.Body>
                  <Card.Title>{tank.nr}</Card.Title>
                  <IconContext.Provider
                    value={{ color: "black", size: "100px" }}
                  >
                    <GiBattleTank />
                  </IconContext.Provider>
                  <br />
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate("" + tank.id);
                    }}
                  >
                    See details
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
        <Col xs={6} sm={6} md={4} lg={3} className="p-2">
          <Button
            className="w-100 h-100"
            onClick={() => {
              navigate("create");
            }}
          >
            <IconContext.Provider value={{ color: "white", size: "100px" }}>
              <AiOutlinePlus />
            </IconContext.Provider>
          </Button>
        </Col>
      </Row>
    </>
  );
};
