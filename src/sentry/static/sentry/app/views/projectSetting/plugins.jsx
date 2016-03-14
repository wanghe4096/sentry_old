import React from 'react';

const PSPlugins = React.createClass({
  render() {
    return (
      <div>
        <h2>Integrations</h2>
        <form method="POST">
          <table className="table integrations simple">
            <thead>
              <tr>
                <th colSpan="2">Integration</th>
                <th className="align-right">Enabled</th>
              </tr>
            </thead>
            <tbody>
              <tr className="auto-tag-browsers">
                <td colSpan="2">
                  <div className="integration-icon"></div>
                  <h5>
                    Auto Tag: Browsers
                    <span>v8.0.0rc1</span>
                  </h5>
                  <p>
                    <a href="https://github.com/getsentry/sentry">Sentry Team</a>
                  </p>
                </td>
                <td className="align-right">
                  <input type="checkbox" name="plugin" value="browsers" defaultChecked="checked" />
                </td>
              </tr>
              <tr className="auto-tag-device">
                <td colSpan="2">
                  <div className="integration-icon"></div>
                  <h5>Auto Tag: Device <span>v8.0.0rc1</span></h5>
                  <p>
                    <a href="https://github.com/getsentry/sentry">Sentry Team</a>
                  </p>
                </td>
                <td className="align-right">
                  <input type="checkbox" name="plugin" value="device" defaultChecked="checked" />
                </td>
              </tr>
              <tr className="auto-tag-interface-types">
                <td colSpan="2">
                  <div className="integration-icon"></div>
                  <h5>Auto Tag: Interface Types <span>v8.0.0rc1</span></h5>
                  <p> <a href="https://github.com/getsentry/sentry">Sentry Team</a>
                  </p>
                </td>
                <td className="align-right">
                  <input type="checkbox" name="plugin" defaultChecked="interface_types" />
                </td>
              </tr>
              <tr className="auto-tag-operating-systems">
                <td colSpan="2">
                  <div className="integration-icon"></div>
                  <h5>Auto Tag: Operating Systems <span>v8.0.0rc1</span></h5>
                  <p>
                    <a href="https://github.com/getsentry/sentry">Sentry Team</a>
                  </p>
                </td>
                <td className="align-right">
                  <input type="checkbox" name="plugin" value="os" defaultChecked="checked" />
                </td>
              </tr>
              <tr className="auto-tag-urls">
                <td colSpan="2">
                  <div className="integration-icon"></div>
                  <h5>Auto Tag: URLs <span>v8.0.0rc1</span></h5>
                  <p>
                    <a href="https://github.com/getsentry/sentry">Sentry Team</a>
                  </p>
                </td>
                <td className="align-right">
                  <input type="checkbox" name="plugin" value="urls" defaultChecked="checked" />
                </td>
              </tr>
              <tr className="javascriptplugin">
                <td colSpan="2">
                  <div className="integration-icon"></div>
                  <h5>JavascriptPlugin <span><em>n/a</em></span></h5>
                  <p></p>
                </td>
                <td className="align-right">
                  <input type="checkbox" name="plugin" value="javascriptplugin" defaultChecked="checked" />
                </td>
              </tr>
              <tr className="mail">
                <td colSpan="2">
                  <div className="integration-icon"></div>
                  <h5>Mail <span>v8.0.0rc1</span></h5>
                  <p> <a href="https://github.com/getsentry/sentry">Sentry Team</a>
                  </p>
                </td>
                <td className="align-right">
                  <input type="checkbox" name="plugin" value="mail" defaultChecked="checked" />
                </td>
              </tr>
              <tr className="webhooks">
                <td colSpan="2">
                  <div className="integration-icon"></div>
                  <h5>
                    WebHooks
                    <span>v8.0.0rc1</span>
                    </h5>
                  <p>
                    <a href="https://github.com/getsentry/sentry">Sentry Team</a> ·
                    <a href="/test11/events/hello/settings/plugins/webhooks/">Configure plugin</a>
                  </p>
                </td>
                <td className="align-right">
                  <input type="checkbox" name="plugin" defaultValue="webhooks" />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-actions">
            <input type="submit" className="btn btn-primary pull-right" defaultValue="Save Changes" />
          </div>
        </form>
      </div>
    )
  }
});

export default PSPlugins;
