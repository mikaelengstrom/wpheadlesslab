import React from 'react';

import Header from '../Header';
import Footer from '../Footer';

import { observer } from 'mobx-react-lite';

const Layout = observer(({ children }) => (
    <div className="Layout">
        <Header/>
        {children}
        <Footer/>
    </div>  
));

export default Layout; 