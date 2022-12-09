import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Chart from './routes/Chart';
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import NotFound from './routes/NotFound';
import Price from './routes/Price';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: <Coins/>
      },
      {
        path: ":coinId",
        element: <Coin/>,
        children: [
          {
            path: "chart",
            element: <Chart/>,
          },
          {
            path: "price",
            element: <Price/>
          }
        ]
      }
    ],
    errorElement: <NotFound/>
  }
]) 

export default Router;
