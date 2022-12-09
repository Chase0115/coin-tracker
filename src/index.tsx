import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { RouterProvider } from 'react-router-dom';
import Router from './Router';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router}/>
      </QueryClientProvider>
    </RecoilRoot>
  </>
);
