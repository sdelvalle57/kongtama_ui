import React, {PureComponent} from 'react'
import { NextRouter, withRouter } from 'next/router';
import { Button, Container } from "react-bootstrap"
import { connect } from 'react-redux';
import { StoreState } from 'src/types/store';
import { getHelloMessage } from 'src/store/ui/selectors';
import { setSayHelloMessage } from 'src/store/actions';

interface WithRouterProps {
    router: NextRouter
}

interface DispatchProps {
    sayHello: (message: string) => void
}

interface StateProps {
    helloMessage: string
}

type Props = StateProps & WithRouterProps & DispatchProps;



class Index extends PureComponent<Props>{

    // static getInitialProps = (ctx: any) => {
    //     if (ctx.res) {
    //         //ctx.res.writeHead(302, { Location: `/dashboard` });
    //         //ctx.res.end();
    //     }
    //     return { };
    // }

    componentDidMount = () => {
        //this.props.router.push("/dashboard")
    }

    sayHello = () => {
        this.props.sayHello("WAZUP!!")
    }

    render () {
        return (
            <Container>
                <br/>
                <br/>
                <div><Button onClick={this.sayHello}>Say Hello</Button> </div>
                <br/>
                <br/>
                <div>{this.props.helloMessage}</div>
            </Container>
        );
    }
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
        helloMessage: getHelloMessage(state)
    };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
        sayHello: (message: string) => dispatch(setSayHelloMessage(message))
      
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Index))