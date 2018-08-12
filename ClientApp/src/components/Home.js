import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';

function hasErrors(major, minor, release) {
  return {
    major: major.length === 0 || major < 0 ? "error" : "success",
    minor: minor < 0 ? "error" : "success",
    release: release < 0 ? "error" : "success"
  };
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      majorVersion: 0,
      minorVersion: 0,
      releaseVersion: 0,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleMajorChange = this.handleMajorChange.bind(this);
    this.handleMinorChange = this.handleMinorChange.bind(this);
    this.handleReleaseChange = this.handleReleaseChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { history } = this.props;
    const { majorVersion, minorVersion, releaseVersion } = this.state;
    const errors = hasErrors(majorVersion, minorVersion, releaseVersion);
    if (errors.major === "success" && errors.minor === "success" && errors.release === "success") {
      history.push("/software", { ...this.state } );
    }
    return;
  };

  handleMajorChange(e) {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    this.setState({ majorVersion : value })
  };

  handleMinorChange(e) {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    this.setState({ minorVersion : value })
  };

  handleReleaseChange(e) {
    const value = e.target.value === "" ? 0 : parseInt(e.target.value, 10);
    this.setState({ releaseVersion : value })
  };

  render() {
    const { majorVersion, minorVersion, releaseVersion } = this.state;
    const errors = hasErrors(majorVersion, minorVersion, releaseVersion);
    return (
      <div>
        <form className='form-horizontal'>
          <fieldset>
            <div className='form-group form-group-md col-xs-12 col-sm-6 col-md-6 col-lg-6'>
              <FormGroup validationState={errors.major} controlId="formMajorVersion" >
                <ControlLabel>Major Version</ControlLabel>
                  <FormControl
                    type="number"
                    value={this.state.majorVersion}
                    placeholder="Enter Major Version"  
                    onChange={this.handleMajorChange}
                  />
              </FormGroup>
              <FormGroup controlId="formMinorVersion" >
                <ControlLabel>Minor Version</ControlLabel>
                  <FormControl
                    type="number"
                    value={this.state.minorVersion}
                    placeholder="Enter Minor Version"  
                    onChange={this.handleMinorChange}
                  />
              </FormGroup>
              <FormGroup controlId="formReleaseVersion" >
                <ControlLabel>Release Version</ControlLabel>
                  <FormControl
                    type="number"
                    value={this.state.releaseVersion}
                    placeholder="Enter Release Version"  
                    onChange={this.handleReleaseChange}
                  />
              </FormGroup>
              <FormGroup controlId="formReleaseVersion" >
                <Button onClick={this.handleSubmit} bsStyle="primary">Submit</Button>
              </FormGroup>
            </div>
          </fieldset>
        </form>
      </div>
    );
  };
}

export default withRouter(Home);
