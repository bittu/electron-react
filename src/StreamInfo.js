import React, { PureComponent } from 'react';

export default class StreamInfo extends PureComponent {
  render() {
    const {
      streamURL,
      licenseURL,
      handleChange,
      handleSubmit
    } = this.props;

    return (
      <div className="stream-info">
        <h2>Widevine DRM Stream Info</h2>
        <div className="form">
          <div className="form-field">
            <label>Stream URL</label>
            <input type="text" value={streamURL} onChange={handleChange('streamURL')}/>
          </div>
          <div className="form-field">
            <label>DRM Licence URL</label>
            <input type="text" value={licenseURL} onChange={handleChange('licenseURL')}/>
          </div>
          <div className="">
            <button className="btn" onClick={handleSubmit}>Play</button>
          </div>
        </div>
      </div>
    )
  }
}