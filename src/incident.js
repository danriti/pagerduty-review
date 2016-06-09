import moment from 'moment-timezone';
import React from 'react';


const TIMESTAMP_FORMAT = 'dddd YYYY/MM/DD LT zz';


export default class Incident {
  constructor(incident) {
    this.id = incident.id;
    this.number = incident.incident_number;
    this.key = incident.incident_key;
    this.created = incident.created_on;
    this.lastChange = incident.last_status_change_on;
    this.url = incident.html_url;
  }

  timeOpen() {
    let diff = moment(this.lastChange).diff(moment(this.created));
    return moment.duration(diff).humanize();
  }

  minutesOpen() {
    let diff = moment(this.lastChange).diff(moment(this.created));
    return moment.duration(diff).asMinutes();
  }

  idLink() {
    return <a href={this.url}>{this.number}</a>;
  }

  hipchatUrl() {
    var date = moment(this.created),
        href = `/hipchat/${date.format('YYYY/MM/DD')}`,
        text = date.tz('America/New_York').format(TIMESTAMP_FORMAT);

    return <a href={href}>{text}</a>;
  }

  isAfterHours() {
    let created = moment.utc(this.created),
        hour = created.hour(),
        min = created.minute(),
        dayOfWeek = created.day(),
        isWeekend,
        isAfter,
        isBefore;

    isWeekend = (dayOfWeek == 6) || (dayOfWeek == 0);
    isAfter = (hour == 22 && min >=30) || hour > 21; // after 530pm EST
    isBefore = hour < 13; // before 9am EST

    return isWeekend || (isAfter || isBefore);
  }

  createdTimestamp() {
    return Incident.formatTimestamp(this.created);
  }

  /**
   * intentially formatting of timestamps to EST due to team's operating
   * schedule. if someone has a good reason to change this, go ahead!
   */
  static formatTimestamp(timestamp) {
    return moment(timestamp)
      .tz('America/New_York')
      .format(TIMESTAMP_FORMAT);
  }
}
