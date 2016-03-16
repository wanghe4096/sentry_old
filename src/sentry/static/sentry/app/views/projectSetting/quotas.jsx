import React from 'react';

const PSQuotas = React.createClass({
  render() {
    return (
      <div>
        <h2>Rate Limits</h2>
        <form action="" method="post" className="form-stacked">
          <p>With the nature of LogInsight, sometimes the amount of data collected can be overwhelming. You can set rate limits per-project to ensure that a single flood of errors won't affect any other projects utilizing LogInsight.</p>
          <p>Rate limits apply on a per-minute basis, which means that they rollover at the start of a new minute. When you attempt to send an event and the project is over its quota, the client will receive an HTTP 429 (Too Many Requests) response.</p>
          <div className="box">
            <div className="box-content with-padding">
              <div id="div_id_per_minute" className="form-group">
                <label htmlFor="id_per_minute" className="control-label ">
                  Maximum events per minute
                </label>
                <div className="controls ">
                  <input
                    className="textinput textInput form-control"
                    id="id_per_minute"
                    name="per_minute"
                    placeholder="e.g. 90% or 100"
                    type="text"
                    defaultValue="90%" />
                  <p id="hint_id_per_minute" className="help-block">This cannot be higher than the team (or system) allotted maximum. The value can be either a fixed number, or a percentage that is relative to the team's overall quota.</p>
                </div>
              </div>
            </div>
          </div>
          <fieldset className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg">Save Changes</button>
          </fieldset>
        </form>
      </div>
    )
  }
});

export default PSQuotas;
