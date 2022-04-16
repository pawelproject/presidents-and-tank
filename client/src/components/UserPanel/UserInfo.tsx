import { FC } from "react";
import { Table } from "react-bootstrap";

import { Tank } from "../../types/Tank";
import { useAppSelector } from "../../hooks/redux";

interface IUserInfoProps {
  tank?: Tank;
}

export const UserInfo: FC<IUserInfoProps> = ({ tank }) => {
  const user = useAppSelector((state) => state.auth);

  return (
    <>
      <h1>User info</h1>
      <Table striped bordered hover size="sm">
        <tbody>
          <tr>
            <td>Name</td>
            <td>{user.fullName}</td>
          </tr>
          <tr>
            <td>Email</td>
            <td>{user.email}</td>
          </tr>
          <tr>
            <td>Country</td>
            <td>{user.country}</td>
          </tr>
          <tr>
            <td>Has nuclear Bomb</td>
            <td>{user.hasNuclearBomb ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Creation date</td>
            <td>
              {new Date(user.createdAt ? user.createdAt : "").toDateString()}
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
