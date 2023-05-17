import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import './alert.css'

const notify = (text) => toast(text); 

export default function Alert1({ icon, text }) {
  return (
    <div>
      <button onClick={() => notify(text)}>Alerta</button> {}
      <Toaster
        toastOptions={{
          className: 'custom-toast',
          icon: icon,
        }}
      />
    </div>
  );
}

