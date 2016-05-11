import React from 'react';

import history from './history';

export default class LoginPage extends React.Component {
  constructor() {
    super();

    this.state = {
      subdomain: '',
      apiKey: ''
    };
  }

  handleChange(e, property) {
    this.setState({
      [property]: e.target.value
    });
  }

  handleSubmitClick(e) {
    e.preventDefault();
    history.navigateTo({
      pathname: `/pd/${this.state.subdomain}/${this.state.apiKey}`
    });
  }

  render() {
    return (
      <div className="container-fluid">

        <div className="page-header">
          <h1>On Call Review <small>Login</small></h1>
        </div>

        <div className="row">

          <div className="col-md-4">
            <form>

              <div className="form-group">
                <label>Pagerduty Subdomain</label>
                <input type="text"
                       className="form-control"
                       placeholder="appneta"
                       value={this.state.subdomain}
                       onChange={e => this.handleChange(e, 'subdomain')} />
              </div>

              <div className="form-group">
                <label>Pagerduty API Key</label>
                <input type="text"
                       className="form-control"
                       placeholder="123abc"
                       value={this.state.apiKey}
                       onChange={e => this.handleChange(e, 'apiKey')} />
              </div>

              <button type="submit"
                      className="btn btn-default"
                      onClick={(e) => this.handleSubmitClick(e)}>
                Submit
              </button>

            </form>
          </div>

        </div>

      </div>
    );
  }
}


