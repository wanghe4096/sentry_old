import React from 'react';

const PSNotifications = React.createClass({
  render() {
    return (
      <div className="col-md-10">
        <h2>Notifications</h2>
        <form action="" method="POST" className="form-stacked">
          <div className="box">
            <div className="box-header">
              <h3>Rules</h3>
            </div>
            <div className="box-content with-padding">
              <p>
                LogInsight will notify you based on the
                <a href="/test11/events/hello/settings/rules/">
                  rules configured for this project
                </a>.
              </p>
            </div>
          </div>
          <div className="box hide">
            <div className="box-header">
              <h3>General</h3>
            </div>
            <div className="box-content with-padding">
              <div id="div_id_general-subject_prefix" className="form-group">
                <label htmlFor="id_general-subject_prefix" className="control-label ">
                  Mail Subject Prefix
                </label>
                <div className="controls ">
                  <input className="textinput textInput form-control"
                  id="id_general-subject_prefix"
                  name="general-subject_prefix"
                  type="text"
                  defaultValue="[LogInsight] " />
                  <p id="hint_id_general-subject_prefix" className="help-block">
                    Choose a custom prefix for emails from this project.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <h3>Digests</h3>
            </div>
            <div className="box-content with-padding">
              <p>
                LogInsight will automatically digest notifications sent by some
                services to avoid flooding your inbox with individual issue
                notifications. To control how frequently notifications are
                delivered, use the sliders below.
              </p>
              <div className="row">
                <div className="col-md-6">
                  <div id="div_id_digests-minimum_delay" className="form-group">
                    <label htmlFor="id_digests-minimum_delay" className="control-label">
                      Minimum delivery frequency
                    </label>
                    <div className="controls ">
                      <p
                        id="hint_id_digests-minimum_delay"
                        className="help-block">
                        Notifications will be delivered at most this often.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div id="div_id_digests-maximum_delay" className="form-group">
                    <label htmlFor="id_digests-maximum_delay" className="control-label ">
                      Maximum delivery frequency
                    </label>
                    <div className="controls ">
                      <p
                        id="hint_id_digests-maximum_delay"
                        className="help-block">
                        Notifications will be delivered at least this often.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <fieldset className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg">Save Changes</button>
          </fieldset>
        </form>
        <div className="box">
          <div className="box-header">
            <h3>Inactive Integrations</h3>
          </div>
          <div className="box-content with-padding">
            <ul className="integration-list">
              <li>
                <form method="POST">
                  <button type="submit">WebHooks</button>
                </form>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
});

export default PSNotifications;
