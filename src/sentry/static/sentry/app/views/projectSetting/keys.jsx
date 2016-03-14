import React from 'react';

const PSKeys = React.createClass({
  render() {
    return(
      <div>
        <form method="post" className="pull-right" action="/test11/events/hello/settings/keys/new/">
          <button type="submit" className="btn btn-primary">
            Generate New Key
          </button>
        </form>
        <h2>Client Keys</h2>
        <p>
          To send data to LogInsight you will need to configure an SDK
          with a client key (usually referred to as the
          <code>SENTRY_DSN</code>
           value). For more information on integrating LogInsight with
           your application take a look at our
         <a href="https://docs.getsentry.com">documentation</a>.
        </p>
        <div className="client-key-list">
          <div className="client-key-item">
            <div className="pull-right">
              <a className="btn btn-default btn-sm"
                href="/test11/events/hello/settings/keys/2/edit/">
                Info
              </a>
              <form method="POST" action="/test11/events/hello/settings/keys/2/disable/">
                <input type="submit" className="btn btn-default btn-sm" value="Disable" />
              </form>
              <form method="POST" action="/test11/events/hello/settings/keys/2/remove/">
                <input type="submit" className="btn btn-default btn-sm btn-revoke" value="Revoke" />
              </form>
            </div>
            <h5><a href="/test11/events/hello/settings/keys/2/edit/">Default</a></h5>
            <div className="form-control disabled auto-select">
              http://3ae02eef7c21480a90e6362eba9d4787:73950180251e48fe8d0e757043654728@192.168.1.69:9000/2
            </div>
          </div>
        </div>
      </div>
    )
  }
});

export default PSKeys;
