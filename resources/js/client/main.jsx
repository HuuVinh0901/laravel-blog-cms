import React from 'react';
import ReactDOM from 'react-dom/client';

const ClientApp = () => {
    return <h1>Hello from Client React App!</h1>;
};

ReactDOM.createRoot(document.getElementById('client')).render(<ClientApp />);
