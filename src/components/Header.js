import React, { Component } from "react";
import Typical from "react-typical";

class Header extends Component {
  titles = [];

  render() {
    if (this.props.sharedData) {
      var name = this.props.sharedData.name;
      this.titles = this.props.sharedData.titles.map(x => [x.toUpperCase(), 1500]).flat();
    }

    const HeaderTitleTypeAnimation = React.memo(() => {
      return <Typical className="title-styles" steps={this.titles} loop={50} />;
    }, (props, prevProp) => true);

    return (
      <header id="home" style={{ height: window.innerHeight - 140, display: 'block' }}>
        <div className="row aligner" style={{ height: '100%' }}>
          <div className="col-md-12">
            <div>
              <img src="/images/beary.png" alt="My Image" className="header-icon" />
              <br />
              <h1 className="mb-0">
                <Typical steps={[name]} wrapper="p" />
              </h1>
              <div className="title-container">
                <HeaderTitleTypeAnimation />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;