import React from 'react';
import { connect } from 'react-redux';
import { initWeb3 } from 'src/store/actions';
import { StoreState } from 'src/types/store';

import { ToolbarContentContainer } from './common/toolbar/toolbar_content';
import { GeneralLayout } from './general_layout';
const toolbar = <ToolbarContentContainer />;

interface OwnProps {
    children: React.ReactNode;
}

interface StateProps {
}

interface DispatchProps {
    initWeb3: () => void
}

type Props = OwnProps & DispatchProps & StateProps;


class App extends React.Component<Props> {

    public componentDidMount = async () => {

        window.addEventListener("load", async ()=> {

            this.props.initWeb3()
            
            //if(!localStorage) localStorage = new LocalStorage(window.localStorage)
            
            //this.props.onConnectWallet();
        })
        
    };



    public render = () => {
        return(
            <GeneralLayout toolbar={toolbar} >
                {this.props.children}
            </GeneralLayout>
        )
    };

   
}

const mapStateToProps = (state: StoreState): StateProps => {
    return {
    };
};

const mapDispatchToProps = (dispatch: any): DispatchProps => {
    return {
      initWeb3: () => dispatch(initWeb3())
    };
};

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(App) as any;

export { App, AppContainer };
