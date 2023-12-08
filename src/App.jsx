import React from 'react';
import { lazy, Suspense } from "react";
import { RouterProvider} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Buffer from './buffer/Buffer'
import router from './routers/Routers';

const App = () => {

  return (
    <Suspense fallback={<Buffer />}>
      <ToastContainer/>
    <RouterProvider router={router} />
  </Suspense>
);
};
export default App;
