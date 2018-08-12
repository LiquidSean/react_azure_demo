import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const columns = [{
  dataField: 'name',
  text: 'Name',
  sort: true,
}, {
  dataField: 'version',
  text: 'Version',
  sort: true,
}];

export class SoftwareList extends Component {
  constructor(props) {
    super(props);
    this.state = { softwareList: [], loading: true };
    const { majorVersion, minorVersion, releaseVersion } = this.props.location.state;

    fetch('api/SoftwareManager/GetAllSoftware')
      .then(response => response.json())
      .then(data => {
        const filtered = data.filter((item) => {
          let keep = false;
          if (item) {
            const versions = item.version.split(".");
            const itemMajor = parseInt(versions[0], 10);
            const itemMinor = parseInt(versions[1], 10);
            const itemRelease = parseInt(versions[2], 10);

            if (itemMajor > majorVersion) { // 12 > 10
              keep = true;
            } else {
              if (majorVersion === 0) {
                if (minorVersion === 0  && releaseVersion === 0) {
                  keep = true; // nothing returned
                } else {
                  if (itemMinor > minorVersion) { // 12 > 10
                    keep = true;
                  } else {
                    if (minorVersion === 0) {
                      if (itemRelease >= releaseVersion) {
                        keep = true;
                      } else {
                        keep = false;
                      }
                    } else {
                      if (itemMinor === minorVersion) {
                        if (itemRelease >= releaseVersion) {
                          keep = true;
                        } else {
                          keep = false;
                        }
                      } else {
                        keep = false;
                      }
                    }
                  }
                }
              } else {
                if (majorVersion === itemMajor) {
                  if (itemMinor > minorVersion) { // 12 > 10
                    keep = true;
                  } else {
                    if (minorVersion === 0) {
                      if (itemRelease >= releaseVersion || releaseVersion === 0) {
                        keep = true;
                      } else {
                        keep = false;
                      }
                    } else {
                      if (itemMinor === minorVersion) {
                        if (itemRelease >= releaseVersion || releaseVersion === 0) {
                          keep = true;
                        } else {
                          keep = false;
                        }
                      } else {
                        keep = false;
                      }
                    }
                  }
                }
              }
            }
          }
          return keep;
        });
        this.setState({ softwareList: filtered, loading: false });
      });
  }

  static renderSoftwareTable(softwareList) {
    return (
      <BootstrapTable bordered hover striped condensed keyField='name' data={ softwareList } columns={ columns } noDataIndication="Table is Empty" />
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : SoftwareList.renderSoftwareTable(this.state.softwareList);

    return (
      <div>
        {contents}
      </div>
    );
  }
}
