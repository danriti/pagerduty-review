import $ from 'jquery';


function getIncidents(subdomain, token, since) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://${subdomain}.pagerduty.com/api/v1/incidents`,
      data: {
        since: since.toISOString(),
        limit: 100,
        sort_by: 'created_on:desc'
      },
      headers: {
        Authorization: `Token token=${token}`
      },
      success: resolve,
      error: reject
    });
  });
}


function getIncident(subdomain, token, id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://${subdomain}.pagerduty.com/api/v1/incidents/${id}`,
      headers: {
        Authorization: `Token token=${token}`
      },
      success: resolve,
      error: reject
    });
  });
}


function getIncidentNotes(subdomain, token, incident) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://${subdomain}.pagerduty.com/api/v1/incidents/${incident}/notes`,
      headers: {
        Authorization: `Token token=${token}`
      },
      success: resolve,
      error: reject
    });
  });
}


function getIncidentLogEntries(subdomain, token, id) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://${subdomain}.pagerduty.com/api/v1/incidents/${id}/log_entries`,
      headers: {
        Authorization: `Token token=${token}`
      },
      success: resolve,
      error: reject
    });
  });
}


export default {
  getIncident,
  getIncidents,
  getIncidentLogEntries,
  getIncidentNotes
};
