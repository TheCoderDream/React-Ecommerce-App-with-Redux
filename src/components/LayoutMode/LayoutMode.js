import React from 'react';
import './LayoutMode.scss';

const LayoutMode = (
    {
        len,
        click,
        isActive
    }
) => {

    let items = [];

    let classess = 'layout-mode__item';

    if(isActive) {
        classess += ' layout-mode__item--active'
    }

    for(let i = 0; i < len; i ++) {
        items.push(<div  className={classess} />);
    };


    return (
        <div className="layout-mode" onClick={() => {click(len)}}>
            {items}
        </div>
    );
};

export default LayoutMode;
