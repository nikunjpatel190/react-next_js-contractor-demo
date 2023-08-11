import React, { useState } from 'react';

import Header from './Header';

function Layout(props:any) {
    return (
        <>
        <div className="min-h-full">
          <Header />
          <main>{props.children}</main>
        </div>
      </>
    );
}
export default Layout;