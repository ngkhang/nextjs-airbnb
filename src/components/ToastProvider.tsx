'use client';

import { Slide, ToastContainer } from 'react-toastify';
import type { ToastContainerProps } from 'react-toastify';

const ToastProvider = (props?: ToastContainerProps) => {
  const options: ToastContainerProps = {
    position: 'bottom-right',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnFocusLoss: true,
    draggable: true,
    theme: 'colored',
    transition: Slide,
    ...props,
  };

  return <ToastContainer {...options} />;
};

export default ToastProvider;
