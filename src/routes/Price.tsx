import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import styled from "styled-components";
import { IHistorical } from "./Chart";

const PriceList = styled.ul`
  text-align: center;
`;

const PriceItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-bottom: 1px solid ${(props) => props.theme.accentColor};
  padding-bottom: 0.4em;
  margin-bottom: 1em;
  text-align: center;
`;

const Price = () => {
  const coinId = useOutletContext();
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
    <>
      <PriceItem as='div'>
        <span>Date</span>
        <span>Open Price</span>
        <span>Close Price</span>
      </PriceItem>
      <PriceList>
        {isLoading
          ? "Loading price ..."
          : data?.map((price) => {
              const date = new Date(price.time_open * 1000);
              const month = date.getMonth() + 1;
              const day = date.getDate();
              const year = date.getFullYear();

              const isPriceUp = price.open < price.close

              return (
                <PriceItem key={price.time_open}>
                  <span>
                    {year}/{month}/{day}
                  </span>
                  <span>{price.open}</span>
                  <span>{price.close} {isPriceUp? '🔺': '🔻'}</span>
                </PriceItem>
              );
            })}
      </PriceList>
    </>
  );
};
export default Price;
