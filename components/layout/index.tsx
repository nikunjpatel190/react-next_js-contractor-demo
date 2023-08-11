import React, { useState } from 'react';

import Header from './Header';

function Layout(props:any) {
    console.log(1)
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