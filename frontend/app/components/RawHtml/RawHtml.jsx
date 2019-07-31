import React from 'react';

const RawHtml = ({html, ...props}) => (
    <div dangerouslySetInnerHTML={{__html: html}}></div>
);

export default RawHtml; 