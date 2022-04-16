import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import LoadingSpinner from "../UI/LoadingSpinner";
import ErrorText from "../UI/ErrorText";
import { errorHelper } from "../../helpers/errorHelper";
import { Tank } from "../../types/Tank";
import { convertTankResponse } from "../../helpers/convertTankResponse";
import { useGetTankDetailsQuery } from "../../services/tanks";

interface ITankWrapperProps {
  children: any;
}

export const TankWrapper: FC<ITankWrapperProps> = (props) => {
  const params = useParams();
  const tankId: string = params.id ? params.id : "";

  const fetchingTankData = useGetTankDetailsQuery(tankId);

  const [tank, setTank] = useState<Tank | undefined>();

  const errorMessage = errorHelper(
    fetchingTankData.isError,
    fetchingTankData.error
  );

  useEffect(() => {
    if (fetchingTankData.isSuccess) {
      const tankData = convertTankResponse(fetchingTankData.data);
      setTank(tankData);
    }
  }, [fetchingTankData.data, fetchingTankData.isSuccess]);

  const childrenWithProps = React.Children.map(props.children, (child) => {
    return React.cloneElement(child, { tank });
  });

  return (
    <>
      {fetchingTankData.isLoading && <LoadingSpinner />}
      {fetchingTankData.isError && <ErrorText>{errorMessage}</ErrorText>}
      {tank && childrenWithProps}
    </>
  );
};
