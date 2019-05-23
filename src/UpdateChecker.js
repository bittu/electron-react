import React, { Component } from 'react';
const electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default class UpdateChecker extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    ipcRenderer.on('console', (event, consoleMsg) => {
      console.log(consoleMsg)
    })

    ipcRenderer.on('message', (event, data) => {
      this.setState(state => ({
        data: [...state.data, data]
      }))
    })
  }

  render() {
    const {
      data
    } = this.state;

    return (
      <div>
        <ul>
          {
            data.map((v, i) => <li key={i}>{v.msg}</li>)
          }
        </ul>
      </div>
    )
  }
}