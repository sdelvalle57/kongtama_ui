import App from 'next/app'
import React from 'react'
import nextRedux, { Store } from '../store/redux-config';
import { Provider } from 'react-redux'
import StoreLayout from '../components/store_layout';
import { AppContainer } from '../components/app_container';

// Sass files
import '../../styles/global.scss'
import '../../styles/toolbar.scss'
import '../../styles/steps-modal.scss'
import '../../styles/index.scss'


interface StateProps {
  reduxStore: Store
}

class MyApp extends App<StateProps> {

  render () {
    const {Component, pageProps, reduxStore} = this.props
    return (
      <StoreLayout>
        <Provider store={reduxStore}>
          <AppContainer>
            <Component {...pageProps} />
          </AppContainer>
        </Provider>
      </StoreLayout>
    )
  }
}

export default nextRedux(MyApp)
