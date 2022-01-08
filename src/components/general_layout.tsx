import React from 'react';


interface OwnProps {
    children: React.ReactNode;
    toolbar: React.ReactNode;
}

type Props = OwnProps;

export const GeneralLayout = (props: Props) => {
    const { children, toolbar, ...restProps } = props;
    return (
        <div className='parent' {...restProps}>
            {toolbar}
            <div className="scrollable">
                {children}
            </div>
        </div>
    );
};
