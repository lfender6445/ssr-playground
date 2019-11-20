import React, { Component } from 'react';
import Helmet from 'react-helmet';
import ReactDOM from 'react-dom'
import 'isomorphic-fetch'

import './app.styl';

import UniversalComponent from './components/UniversalComponent';
/*
https://developers.google.com/web/updates/2019/02/rendering-on-the-web
   (/)
   */
/*
ReactDOM.hydrate operates on a root node in the DOM, the node that it uses as a starting point for the hydration. That root node must contain a server-rendered DOM tree that matches your app’s components and state
 */

/**
 * The `App` component is the entry point for the react app.
 * It is rendered on the client as well as on the server.
 *
 * You can start developing your react app here.
 */
export default class App extends Component {
    constructor(props) {
      super(props)
      this.state = {
        html: '',
        stream: '',
      }
    }

    createMarkup(html) {
      return {__html:  html}
    }

    loadStream = async () => {
      const route = '/stream'
      const res = await fetch(route)
      console.log('res', res)
      const stream = await res.text()
      this.setState({ stream })
    }
    loadPartial = async () => {
      const route = '/html'
      const res = await fetch(route)
      console.log('res', res)
      const html = await res.text()
      this.setState({ html }, () => {
        ReactDOM.hydrate(document.getElementById('partial-root'))

      })
    }
    render() {
        return (
            <div>
                <Helmet>
                    <title>App Component | React Universal</title>
                </Helmet>

                <button onClick={this.loadPartial}>
                  Load Partial
                </button>
                <div
                  id="partial-root-html"
                  dangerouslySetInnerHTML={this.createMarkup(this.state.html)} >
                </div>

                <button onClick={this.loadStream}>
                  Load Stream
                </button>
                <div
                  id="partial-root-stream"
                  dangerouslySetInnerHTML={this.createMarkup(this.state.stream)} >
                </div>
                <h1>Welcome to React Fiber.</h1>
                <UniversalComponent name="getting-started" />
            </div>
        );
    }
}
