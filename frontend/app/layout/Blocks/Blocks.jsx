import React from 'react';

import { observer } from 'mobx-react-lite';
import { debug } from '../../utils';

import UnknownBlock from '../../blocks/UnknownBlock';
import BlurbFull from '../../blocks/BlurbFull';
import BlurbBg from '../../blocks/BlurbBg';

const blockComponents = {
    'blurb_full': BlurbFull,
    'blurb_bg': BlurbBg
};

//
const Blocks = observer(({ items }) => {
    debug('Blocks> passed block items: ', items);

    if(!items || !items.length) {
        return null; 
    }

    return (
        <div className="Blocks">
            {items.map((block, i) => {
                const { acfFcLayout, ...props } = block; 

                if (!(acfFcLayout in blockComponents)) {
                    return <UnknownBlock key={i} missingComponentId={acfFcLayout} />;
                }
                
                const Block = blockComponents[acfFcLayout];

                debug(`Blocks> found block component for ${acfFcLayout}: `, Block);
                debug('Blocks> passing block props: ', props); 

                return <Block key={i} {...props} />; 
            })}
        </div>
    );
}); 

export default Blocks; 