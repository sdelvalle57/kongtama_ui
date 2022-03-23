import React from 'react';
import Link from 'next/link'

interface Props {
    image: React.ReactNode;
}

export const Logo: React.FC<Props> = props => {
    const { image, ...restProps } = props;
    return (
        <Link href='/' >
            <a className='logo-link' {...restProps}>
                {image}
            </a>
        </Link>
    );
};
