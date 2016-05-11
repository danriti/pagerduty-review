import math from 'mathjs';
import moment from 'moment-timezone';
import _ from 'moment-duration-format';
import React from 'react';


class IncidentStatisticsTable extends React.Component {
  constructor() {
    super();

    this.statistics = new IncidentStatistics([]);
  }

  componentWillUpdate(nextProps) {
    this.statistics = new IncidentStatistics(nextProps.incidents);
  }

  render() {
    return (
      <div>

        <h3>Statistics</h3>

        <div className="row">
          <div className="col-md-8">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Count</th>
                <th>Max</th>
                <th>Min</th>
                <th>Mean</th>
                <th>Median</th>
                <th>Std Dev</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{this.statistics.count()}</td>
                <td>{this.statistics.max()}</td>
                <td>{this.statistics.min()}</td>
                <td>{this.statistics.mean()}</td>
                <td>{this.statistics.median()}</td>
                <td>{this.statistics.std()}</td>
              </tr>
            </tbody>
          </table>
          </div>
        </div>

      </div>
    );
  }
}


class IncidentStatistics {
  constructor(incidents) {
    this.incidents = incidents;
  }

  count() {
    return this.incidents.length;
  }

  calculate(mathFunc) {
    let times = this.incidents.map(i => i.minutesOpen()),
        max;
    if (times.length) {
      max = mathFunc(times);
      return moment.duration(max, 'minutes').format("h [hrs], m [min], s [sec]");
    }
  }

  max() {
    return this.calculate(math.max);
  }

  min() {
    return this.calculate(math.min);
  }

  mean() {
    return this.calculate(math.mean);
  }

  median() {
    return this.calculate(math.median);
  }

  std() {
    return this.calculate(math.std);
  }
}


export default IncidentStatisticsTable;
