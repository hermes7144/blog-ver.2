// Views.js
import React from 'react';
import Router from './routes/Router';
import './Views.css';

function Views() {
  return (
    <div>
      <div id="content" className="content">
        <Router />
      </div>
    </div>
  );
}

export default Views;