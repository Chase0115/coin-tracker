import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IHistorical, ChartProps } from "./Chart";

const PriceList = styled.ul`
  text-align: center;
`;

const Price = ({ coinId }: ChartProps) => {
  const [data, setData] = useState<IHistorical[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      });
  }, [coinId]);

  return (
    <PriceList>
      {isLoading
        ? "Loading price ..."
        : data?.map((price) => <li key={price.time_open}>{price.close}</li>)}
    </PriceList>
  );
};
export default Price;
