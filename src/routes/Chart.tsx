import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";
import { useOutletContext } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

export interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = () => {
  const coinId = useOutletContext();
  const [data, setData] = useState<IHistorical[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isDark = useRecoilValue(isDarkAtom);

  useEffect(() => {
    fetch(`https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setIsLoading(false);
      });
  }, [coinId]);
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type='candlestick'
          series={[
            {
              name: "Price",
              data: data?.map((price) => [
                price.time_open,
                price.open,
                price.high,
                price.low,
                price.close,
              ]),
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#DF7D46",
                  downward: "#3C90EB",
                },
              },
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              labels: {
                show: false,
              },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            tooltip: {
              x: {
                format: "dd/MM/yy",
              },
              y: {
                formatter: (value) => `${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
};

export default Chart;
