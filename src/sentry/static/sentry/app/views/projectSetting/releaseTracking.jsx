import React from 'react';

const PSReleaseTracking = React.createClass({
  render() {
    return (
      <div className="col-md-10" id="blk_main">
        <h2>Release Tracking</h2>
        <p>
          Configure release tracking for this project to automatically record
           new releases of your application.
        </p>
        <div className="box">
          <div className="box-header">
            <h3>Client Configuration</h3>
          </div>
          <div className="box-content with-padding">
            <p>
              Start by binding the
              <code>release</code>
              attribute in your application:
            </p>
            <pre dangerouslySetInnerHTML={{
                __html:`
// See SDK documentation for language specific usage.
Raven.config({
  release: '0e4fdef81448dcfa0e16ecc4433ff3997aa53572'
});
                `
              }}>

            </pre>
            <p>
              This will annotate each event with the version of your
              application, as well as automatically create a release
              entity in the system the first time it's seen.
            </p>
            <p> </p>
            <p>
              In addition you may configure a release hook
              (or use our API) to push a release and include
              additional metadata with it.
            </p>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <h3>Token</h3>
          </div>
          <div className="box-content with-padding">
            <form method="POST">
              <p>
                Your token is a unique secret which is used to generate
                deploy hook URLs. If a service becomes compromised, you
                should regenerate the token and re-configure any deploy
                hooks with the newly generated URL.
              </p>
              <p>
                <code className="auto-select">
                  2f8696f2e99a11e5a8c5fa163ea5f88c
                </code>
                <button type="submit"
                  className="btn btn-sm btn-danger"
                  name="op"
                  value="regenerate-token">
                  Regenerate Token
                </button>
              </p>
            </form>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <h3>Webhook</h3>
          </div>
          <div className="box-content with-padding">
            <form method="POST">
              <p>
                If you simply want to integrate with an existing system,
                sometimes its easiest just to use a webhook.
              </p>
              <pre className="auto-select">
                http://192.168.1.69:9000/api/hooks/release/builtin/2/e6961107575373695a1fe4213093443db4f1c3f4cab157a2e7e157927450b774/
              </pre>
              <p>
                The release webhook accepts the same parameters as
                the "Create a new Release" API endpoint, for example:
              </p>
              <pre className="auto-select"
                dangerouslySetInnerHTML={{
                  __html:`
curl http://192.168.1.69:9000/api/hooks/release/builtin/2/e6961107575373695a1fe4213093443db4f1c3f4cab157a2e7e157927450b774/ \
-X POST \
-H 'Content-Type: application/json' \
-d '{"version": "abcdefg"}'
                  `
                }}>

              </pre>
            </form>
          </div>
        </div>
        <div className="box">
          <div className="box-header">
            <h3>API</h3>
          </div>
          <div className="box-content with-padding">
            <p>
              You can notify LogInsight when you release new versions of your
              application via our HTTP API.
            </p>
            <p>
              See the
              <a href="https://docs.getsentry.com/hosted/api/releases/">
                Releases API documentation
              </a>
              for more information.
            </p>
          </div>
        </div>
      </div>
    )
  }
});

export default PSReleaseTracking;
