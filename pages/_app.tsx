import React from 'react';
import App, { AppContext } from 'next/app';
import { DefaultLayout } from '../components/DefaultLayout';

import { Store } from "redux";
import {Provider} from "react-redux";
import withRedux from "next-redux-wrapper";

import { makeStore } from '../store/makeStore'

interface Props {
  store: Store;
}

class MyApp extends App<Props> {
  static async getInitialProps({Component, ctx}: AppContext) {
    return {
      pageProps: (Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    }
  }
  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <DefaultLayout>
          <Component { ...pageProps } />
        </DefaultLayout>
      </Provider>
    );
  }
}

export default withRedux(makeStore)(MyApp)
