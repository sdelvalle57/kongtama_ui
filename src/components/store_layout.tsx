import React, {Component} from 'react';
import Head from 'next/head'
import Favicon from 'react-favicon';

class StoreLayout extends Component {

    render() {
        return (
            <div >
                <div>
                    <Favicon url="/static/img/LOGO.png" />
                    <Head>
                        
                        <link
                            rel="stylesheet"
                            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
                            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
                            crossOrigin="anonymous" />
                    </Head>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default StoreLayout;

