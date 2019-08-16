
import React from 'react';

import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

import './Header.scss';

const Header = observer(() => {
    let store = useStore();

    return (
        <header
            className="Header"
        >
            {store.primaryMenu && store.primaryMenu.items.map((item, i) => (
                <Link 
                    className="Header__Link"
                    key={i} 
                    to={item.url}
                >
                    {item.title}
                </Link>
            ))}
        </header>
    );
}); 

export default Header; 