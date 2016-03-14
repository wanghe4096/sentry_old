import React from 'react';

const PSRules = React.createClass({
  render() {
    return (
      <div>
        <a href="/test11/events/hello/settings/rules/new/" className="btn pull-right btn-primary btn-sm">
          <span className="icon-plus"></span> New Rule
        </a>
        <h2>Rules</h2>
        <div className="rules-list">
          <div className="box">
            <div className="box-header">
              <div className="pull-right">
                <a href="/test11/events/hello/settings/rules/3/edit/" className="btn btn-sm btn-default">Edit Rule</a>
                <form method="POST" action="/test11/events/hello/settings/rules/3/remove/">
                  <button type="submit" className="btn btn-sm btn-default" onclick="confirm('Are you sure you want to remove this rule?')">
                    <span className="icon-trash"></span>
                  </button>
                </form>
              </div>
              <h3><a href="/test11/events/hello/settings/rules/3/edit/">Send a notification for new events</a></h3>
            </div>
            <div className="box-content with-padding">
              <div className="row">
                <div className="col-md-6">
                  <h6>When <strong>all</strong> of these conditions are met:</h6>
                  <table className="conditions-list table">
                    <tbody>
                      <tr>
                        <td>An event is first seen</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <h6>Take these actions:</h6>
                  <table className="actions-list table">
                    <tbody>
                      <tr>
                        <td>Send a notification (for all enabled services)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <div className="pull-right">
                <a href="/test11/events/hello/settings/rules/4/edit/" className="btn btn-sm btn-default">Edit Rule</a>
                <form method="POST" action="/test11/events/hello/settings/rules/4/remove/">
                  <button type="submit" className="btn btn-sm btn-default" onclick="confirm('Are you sure you want to remove this rule?')">
                    <span className="icon-trash"></span>
                  </button>
                </form>
              </div>
              <h3><a href="/test11/events/hello/settings/rules/4/edit/">Send a notification for regressions</a></h3>
            </div>
            <div className="box-content with-padding">
              <div className="row">
                <div className="col-md-6">
                  <h6>When <strong>all</strong> of these conditions are met:</h6>
                  <table className="conditions-list table">
                    <tbody>
                      <tr>
                        <td>An event changes state from resolved to unresolved</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-6">
                  <h6>Take these actions:</h6>
                  <table className="actions-list table">
                    <tbody>
                      <tr>
                        <td>Send a notification (for all enabled services)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default PSRules;
