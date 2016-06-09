import _ from 'underscore';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';

import history from './history';
import Incident from './incident';
import pagerduty from './pagerduty';


export default class IncidentLogPage extends React.Component {
  constructor() {
    super();

    this.state = {
      incident: {},
      logEntries: []
    };
  }

  componentDidMount () {
    this.fetchIncident(this.props.params.id);
    this.fetchLogEntries(this.props.params.id);
  }

  fetchIncident(id) {
    let { subdomain, token } = this.props.params;

    pagerduty.getIncident(subdomain, token, id).then(results => {
      this.setState({
        incident: new Incident(results)
      });
    });
  }

  fetchLogEntries(id) {
    let { subdomain, token } = this.props.params;

    pagerduty.getIncidentLogEntries(subdomain, token, id).then(results => {
      this.setState({
        logEntries: results.log_entries
      });
    });
  }

  logEntries() {
    return _.sortBy(this.state.logEntries, 'created_at');
  }

  render() {
    return (
      <div className="container-fluid">

        <div className="page-header">
          <h1>On Call Review <small>Incident Log - {this.props.params.id}</small></h1>
        </div>

        <IncidentLogEntriesGrid logEntries={this.logEntries()} {...this.props} />

      </div>
    );
  }
}


class IncidentLogEntriesGrid extends React.Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-6">
            <h4 className="text-center">Events</h4>
          </div>
          <div className="col-md-6">
            <h4 className="text-center">Notes</h4>
          </div>
        </div>

        {this.props.logEntries.map((logEntry, i) => {
          let classes = classNames({
            'col-md-6': true,
            'col-md-offset-6': logEntry.type === 'annotate',
          })

          let panelClasses = classNames({
            'panel': true,
            'panel-default': true,
            'panel-primary': logEntry.type === 'annotate',
            'panel-success': logEntry.type === 'resolve',
            'panel-danger': logEntry.type === 'trigger',
            'panel-warning': logEntry.type === 'unacknowledge',
          })

          let user =
            (logEntry.user && logEntry.user.name) ||
            (logEntry.assigned_user && logEntry.assigned_user.name) ||
            (logEntry.channel && logEntry.channel.type);

          let summary = (logEntry.channel && logEntry.channel.summary);

          let panelBody;

          if (summary) {
            panelBody = (
              <div className="panel-body"
                   style={{wordWrap: 'break-word'}}>
                {summary}
              </div>
            );
          }

          return (
            <div className="row" key={i}>
              <div className={classes}>

                <div className={panelClasses}>
                  <div className="panel-heading">
                    <strong>
                      {Incident.formatTimestamp(logEntry.created_at)}
                    </strong>{' '}
                    <span>{logEntry.type}</span>{' '}
                    <span>{user}</span>
                  </div>

                  {panelBody}

                </div>

              </div>
            </div>
          );
        })}
      </div>
    );
  }
}


class IncidentLogEntriesTable extends React.Component {
  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>type</th>
              <th>id</th>
              <th>created</th>
            </tr>
          </thead>

          <tbody>
          {this.props.logEntries.map((logEntry, i) => {
            return (
              <tr key={i}>
                <td>{logEntry.type}</td>
                <td>{logEntry.id}</td>
                <td>{moment(logEntry.created_at).format('LLLL')}</td>
              </tr>
            );
          })}
          </tbody>
        </table>
      </div>
    );
  }
}
