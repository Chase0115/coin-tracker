import { useEffect, useState } from "react";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: number;
  time_close: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
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
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: "Price",
              data: data?.map((price) => price.close)! as number[],
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
            theme: {
              mode: "dark",
            },
            stroke: {
              curve: "smooth",
              width: 5,
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
                new Date(price.time_close*1000).toISOString()
              ),
            },
            grid: { show: false },
            fill: {
              type: "gradient",
              
              gradient: { gradientToColors: ["#1A73E8"], stops: [0, 100] },
            },
            colors: ["#B32824"],
            tooltip: {
              x: {
                format: 'dd/MM/yy',
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
