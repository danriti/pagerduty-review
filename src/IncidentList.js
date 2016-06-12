import React from 'react';
import moment from 'moment-timezone';

import pagerduty from './pagerduty';


export default class IncidentList extends React.Component {
  render() {
    return (
      <div>
        <div>{moment().format('YYYY-MM-DD')} YourName -> NextName</div>

        <ul>
          {this.props.incidents.map((incident, i) => {
            return <IncidentItem incident={incident}
                                 key={i}
                                 {...this.props} />;
          })}
        </ul>
      </div>
    );
  }
}


class IncidentItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: null
    };
  }

  fetchNotes() {
    let { subdomain, token } = this.props.params,
        incident = this.props.incident;

    pagerduty.getIncidentNotes(subdomain, token, incident.id).then(results => {
      this.setState({
        notes: results.notes
      });
    });
  }

  format(note, incident) {
    let later = moment(note.created_at).from(moment(incident.created), true);
    return `(${later} after) ${note.content}`
  }

  notes() {
    let incident = this.props.incident,
        timeOpenNote = `open for ${incident.timeOpen()}`;

    if (!this.state.notes) {
      return [
        timeOpenNote,
        <a onClick={() => this.fetchNotes()}>Load notes</a>
      ];
    }

    return [timeOpenNote].concat(
      this.state.notes
        .sort((a, b) => moment(a.created_at) - moment(b.created_at))
        .map(n => this.format(n, this.props.incident))
    );
  }

  render() {
    let incident = this.props.incident;

    return (
      <div>
        <li>
          {incident.createdTimestamp()} - ({incident.number}) {incident.key}
        </li>
        <ul>
          {this.notes().map((note, i) => {
            return <li key={i}>{note}</li>;
          })}
        </ul>
      </div>
    );
  }
}
