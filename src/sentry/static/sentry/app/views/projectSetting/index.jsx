import React from 'react';

const PSIndex = React.createClass({
  render() {
    return (
      <div>
        <h2>Project Settings</h2>
        <form className="form-stacked" action="" method="post" id="project_settings">
          <div className="box">
            <div className="box-header">
              <h3>Project Details</h3>
            </div>
            <div className="box-content with-padding">
              <div id="div_id_name" className="form-group">
                <label htmlFor="id_name" className="control-label  requiredField">
                  Project Name<span className="asteriskField">*</span>
                </label>
                <div className="controls ">
                  <input className="textinput textInput form-control"
                    id="id_name"
                    name="name"
                    placeholder="Production"
                    type="text"
                    defaultValue="Hello" />
                </div>
              </div>
              <div id="div_id_slug" className="form-group">
                <label htmlFor="id_slug" className="control-label requiredField">
                  Short name<span className="asteriskField">*</span>
                </label>
                <div className="controls ">
                  <input
                    className="textinput textInput form-control"
                    id="id_slug"
                    name="slug"
                    type="text"
                    defaultValue="hello" />
                  <p id="hint_id_slug"
                    className="help-block">
                    A unique ID used to identify this project.
                  </p>
                </div>
              </div>
              <div id="div_id_team" className="form-group">
                <label htmlFor="id_team" className="control-label ">
                  Team
                </label>
                <div className="controls ">
                  <div className="select2-container select form-control" id="s2id_id_team">
                    <a href="javascript:void(0)"
                      className="select2-choice">
                      <span className="select2-chosen" id="select2-chosen-1">Hello (hello)</span>
                      <abbr className="select2-search-choice-close"></abbr>
                      <span className="select2-arrow" role="presentation">
                        <b role="presentation"></b>
                      </span>
                    </a>
                    <label htmlFor="s2id_autogen1" className="select2-offscreen">
                      Team
                    </label>
                    <input
                      className="select2-focusser select2-offscreen"
                      type="text"
                      aria-haspopup="true"
                      role="button"
                      defaultValue=""
                      aria-labelledby="select2-chosen-1"
                      id="s2id_autogen1" />
                    <div className="select2-drop select2-display-none select2-with-searchbox">
                      <div className="select2-search">
                        <label htmlFor="s2id_autogen1_search" className="select2-offscreen">
                          Team
                        </label>
                        <input
                          type="text"
                          id="s2id_autogen1_search"
                          defaultValue=""
                          placeholder="" />
                      </div>
                      <ul className="select2-results" role="listbox" id="select2-results-1"> </ul>
                    </div>
                  </div>
                  <select
                    className="select form-control select2-offscreen"
                    id="id_team"
                    name="team"
                    defaultValue="2"
                    title="Team">
                    <option value="2">Hello (hello)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <h3>Event Settings</h3>
            </div>
            <div className="box-content with-padding">
              <div id="div_id_resolve_age" className="form-group">
                <label htmlFor="id_resolve_age" className="control-label ">
                  Auto resolve
                </label>
                <div className="controls ">
                  <div className="slider" id="id_resolve_age-slider"></div>
                  <input
                    className="rangeinput form-control"
                    id="id_resolve_age"
                    max="168"
                    min="0"
                    name="resolve_age"
                    step="1"
                    type="range"
                    defaultValue="0" />
                  <p id="hint_id_resolve_age" className="help-block">
                    Treat an event as resolved if it hasn't been seen for
                    this amount of time.
                  </p>
                </div>
              </div>
              <div className="form-group">
                <div id="div_id_scrub_data" className="checkbox">
                  <label htmlFor="id_scrub_data" className="">
                    <input
                      defaultChecked="false"
                      className="checkboxinput checkbox"
                      id="id_scrub_data"
                      name="scrub_data"
                      defaultValue=""
                      type="checkbox" />
                    Data Scrubber
                    <p id="hint_id_scrub_data"
                      className="help-block">
                      Apply server-side data scrubbing to prevent things like
                      passwords and credit cards from being stored.
                    </p>
                  </label>
                </div>
              </div>
              <div id="div_id_sensitive_fields" className="form-group">
                <label htmlFor="id_sensitive_fields" className="control-label ">
                  Additional sensitive fields
                </label>
                <div className="controls ">
                  <textarea
                    className="span8 textarea form-control"
                    cols="40"
                    id="id_sensitive_fields"
                    name="sensitive_fields"
                    placeholder="例如：邮箱"
                    defaultValue=""
                    rows="3" />
                  <p id="hint_id_sensitive_fields" className="help-block">
                    Additional field names to match against when scrubbing data.
                     Separate multiple entries with a newline.
                   </p>
                </div>
              </div>
              <div className="form-group">
                <div id="div_id_scrub_ip_address" className="checkbox">
                  <label htmlFor="id_scrub_ip_address" className="">
                    <input
                      className="checkboxinput checkbox"
                      id="id_scrub_ip_address"
                      name="scrub_ip_address"
                      type="checkbox" />
                      Don't store IP Addresses
                    <p id="hint_id_scrub_ip_address"
                      className="help-block">
                      Prevent IP addresses from being stored for new events.
                    </p>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="box">
            <div className="box-header">
              <h3>Client Security</h3>
            </div>
            <div className="box-content with-padding">
              <p>
                Configure origin URLs which LogInsight should accept
                events from. This is used for communication with clients like
                <a href="https://github.com/getsentry/raven-js">raven-js</a>.
                <br /> This will restrict requests based on the
                <code>Origin</code> and
                <code>Referer</code> headers.
              </p>
              <div id="div_id_origins" className="form-group">
                <label htmlFor="id_origins" className="control-label ">
                  Allowed Domains
                </label>
                <div className="controls">
                  <textarea
                    className="span8 textarea form-control"
                    cols="40"
                    id="id_origins"
                    name="origins"
                    placeholder="例如example.com or https://example.com"
                    defaultValue="*"
                    rows="10" />
                  <p id="hint_id_origins" className="help-block">
                    Separate multiple entries with a newline.
                  </p>
                </div>
              </div>
              <div className="form-group">
                <div id="div_id_scrape_javascript" className="checkbox">
                  <label htmlFor="id_scrape_javascript" className="">
                    <input
                      defaultChecked="false"
                      className="checkboxinput checkbox"
                      id="id_scrape_javascript"
                      name="scrape_javascript"
                      type="checkbox" />
                      Enable JavaScript source fetching
                    <p id="hint_id_scrape_javascript" className="help-block">
                      Allow LogInsight to scrape missing JavaScript source context when possible.
                    </p>
                  </label>
                </div>
              </div>
              <div id="div_id_token" className="form-group">
                <label htmlFor="id_token" className="control-label requiredField">
                  Security token
                  <span className="asteriskField">*</span>
                </label>
                <div className="controls">
                  <input className="textinput textInput form-control"
                    id="id_token"
                    name="token"
                    type="text"
                    defaultValue="5093c026e99611e5a19ffa163ea5f88c" />
                  <p id="hint_id_token" className="help-block">
                    Outbound requests matching Allowed Domains will have the
                     header "X-LogInsight-Token: token" appended.
                  </p>
                </div>
              </div>
              <div id="div_id_blacklisted_ips" className="form-group">
                <label htmlFor="id_blacklisted_ips" className="control-label ">
                  Blacklisted IP Addresses
                </label>
                <div className="controls ">
                  <textarea className="span8 textarea form-control"
                    cols="40"
                    id="id_blacklisted_ips"
                    name="blacklisted_ips"
                    placeholder="例如，127.0.0.1 或 10.0.0.0/8"
                    defaultValue=""
                    rows="10" />
                  <p id="hint_id_blacklisted_ips" className="help-block">
                    Separate multiple entries with a newline.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="box-header">
              <h3>Remove Project</h3>
            </div>
            <div className="box-content with-padding">
              <p className="clearfix">
                <a href="/test11/events/hello/settings/remove/"
                  className="btn btn-danger pull-right">
                  Remove Project
                </a>
                Remove the
                <strong>hello</strong> project and all related data.
                <br /> Careful, this action cannot be undone.
              </p>
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    )
  }
});

export default PSIndex;
