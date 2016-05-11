import DatePicker from 'react-datepicker';
import moment from 'moment-timezone';
import React from 'react';

import history from './history';
import Incident from './incident';
import IncidentTable from './IncidentTable';
import IncidentStatisticsTable from './IncidentStatistics';
import pagerduty from './pagerduty';


const HASH_FORMAT = 'YYYY-MM-DD';


export default class Incidents extends React.Component {
  constructor() {
    super();

    this.state = {
      incidents: [],
      startDate: moment().subtract(7, 'days'),
      excludeBusinessHours: false
    };
  }

  getQueryParam(param, defaultValue, func) {
    if (this.props.location.query[param]) {
      if (func) {
        return func(this.props.location.query[param]);
      }
      return this.props.location.query[param];
    }
    return defaultValue
  }

  componentWillMount() {
    let start,
        exclude;

    start = history.getQueryParam(
      this.props.location,
      'start',
      this.state.startDate,
      moment
    );

    exclude = history.getQueryParam(
      this.props.location,
      'exclude',
      0
    );

    this.handleDateChange(start);
    this.handleCheckbox(null, Boolean(Number(exclude)));
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
    this.fetchIncidents(date);

    history.navigateTo(this.props.location, {start: date.format(HASH_FORMAT)});
  }

  handleCheckbox(e, override=false) {
    let checked = (e && e.target && e.target.checked) || override;

    console.log('checked', checked);

    this.setState({
      excludeBusinessHours: checked
    });

    history.navigateTo(this.props.location, {exclude: Number(checked)});
  }

  fetchIncidents(startDate) {
    let { subdomain, token } = this.props.params;

    pagerduty.getIncidents(subdomain, token, startDate).then(results => {
      var incidents = results.incidents.map(i => new Incident(i));

      this.setState({
        incidents: incidents
      });
    });
  }

  incidents() {
    if (this.state.excludeBusinessHours) {
      return this.state.incidents.filter((incident) => {
        return incident.isAfterHours();
      });
    }

    return this.state.incidents;
  }

  render() {
    var incidents = this.incidents();

    return (
      <div className="container-fluid">

        <div className="page-header">
          <h1>On Call Review <small>Incident</small></h1>
        </div>

        <div className="row">

          <div className="col-md-3">
            <div className="form-group">
              <label>Start Date</label>
              <DatePicker selected={this.state.startDate}
                          onChange={(d) => this.handleDateChange(d)} />
            </div>

            <div className="checkbox">
              <label>
                <input type="checkbox"
                       checked={this.state.excludeBusinessHours}
                       onChange={(e) => this.handleCheckbox(e)} /> Exclude alerts during business hours
              </label>
            </div>
          </div>

        </div>

        <IncidentStatisticsTable incidents={incidents} {...this.props} />

        <IncidentTable incidents={incidents} {...this.props} />

      </div>
    );
  }
}
