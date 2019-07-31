
import React, {
    useEffect,
} from 'react';

import { Link } from 'react-router-dom';

import { observer } from 'mobx-react-lite';
import { useStore } from '../../store';

const Header = observer(() => {
    let store = useStore();

    return (
        <header>
            {store.primaryMenu && store.primaryMenu.items.map((item, i) => (
                <Link key={i} to={item.url}>
                    {item.title}
                </Link>
            ))}
        </header>
    );
}); 

export default Header; 