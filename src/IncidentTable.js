import _ from 'underscore';
import classNames from 'classnames';
import moment from 'moment-timezone';
import React from 'react';
import { Link } from 'react-router'

import pagerduty from './pagerduty';


export default class IncidentTable extends React.Component {
  render() {
    let { subdomain, token } = this.props.params;

    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <td><strong>incident</strong></td>
            <td><strong>created</strong></td>
            <td><strong>log</strong></td>
            <td><strong>time open</strong></td>
            <td><strong>key</strong></td>
          </tr>
        </thead>

        <tbody>
          {this.props.incidents.map((incident, i) => {
            let classes = classNames({
              'danger': incident.isAfterHours()
            });

            return (
              <tr className={classes} key={i}>
                <td>{incident.idLink()}</td>
                <td>{incident.hipchatUrl()}</td>
                <td>
                  <Link to={`/pd/${subdomain}/${token}/incident/${incident.id}`}>
                    Incident Log
                  </Link>
                </td>
                <td>{incident.timeOpen()}</td>
                <td>{incident.key}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}
