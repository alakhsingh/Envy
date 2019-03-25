import React, { Component } from "react";
import { Timeline, TimelineItem } from "vertical-timeline-component-for-react";
import ResultCard from "./resultCard";
import NotFound from "./NotFound";

export default class DisplaySearchResults extends Component {
  constructor(props) {
    super(props);
    const v = props.location.authorize;
    this.state = {
      searchid: v.searchid,
      remaining_results: [0],
      isLoading: false,
      data: ""
    };
  }
  setValue() {
    console.log(this.state.data);
  }
  componentWillMount() {
    console.log("Dsiplay results");
    const url =
      " http://149.165.157.242:8000/getiternary/?search_id=" +
      this.state.searchid;
    console.log("url", url);
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        console.log(response);
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.status.type === "success") {
          this.setState({ isLoading: true, data: data });
        }
      })
      .catch(error => console.error("Error:", error));
  }
  render() {
    let renderComponent = <NotFound />;

    if (this.props.isAuthenticated !== false) {
      renderComponent = this.state.isLoading && (
        <React.Fragment>
          <h3>Cheapest Itinerary</h3>
          <hr />
          <Timeline lineColor={"#ddd"}>
            <TimelineItem
              key="001"
              dateText={this.state.data.status.cheapest.cab_origin_time}
              dateInnerStyle={{ background: "#61b8ff" }}
              bodyContainerStyle={{
                background: "#eeeeee",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)"
              }}
            >
              <h5>{this.state.data.status.cheapest.cab_origin}</h5>
              <p>
                Ride from {this.state.data.status.origin} ->{" "}
                {this.state.data.status.cheapest.cab_origin_endpoint}
              </p>
              <p>
                Fare charge: {this.state.data.status.cheapest.cab_origin_fare}$
              </p>
            </TimelineItem>
            <TimelineItem
              key="002"
              dateText={this.state.data.status.cheapest.flight_time}
              dateInnerStyle={{ background: "#61b8ff" }}
              bodyContainerStyle={{
                background: "#eeeeee",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)"
              }}
            >
              <h5>Flight - {this.state.data.status.cheapest.flight}</h5>
              <p>
                {this.state.data.status.cheapest.cab_origin_endpoint} ->{" "}
                {this.state.data.status.cheapest.cab_destination_startpoint}
              </p>
              <p>
                Fare charge:{" "}
                {this.state.data.status.cheapest.total_price -
                  this.state.data.status.cheapest.cab_origin_fare -
                  this.state.data.status.cheapest.cab_destination_fare}
                $
              </p>
            </TimelineItem>
            <TimelineItem
              key="003"
              dateText={this.state.data.status.cheapest.cab_destination_time}
              dateInnerStyle={{ background: "#61b8ff" }}
              bodyContainerStyle={{
                background: "#eeeeee",
                padding: "10px",
                borderRadius: "8px",
                boxShadow: "0.5rem 0.5rem 2rem 0 rgba(0, 0, 0, 0.2)"
              }}
            >
              <h5>{this.state.data.status.cheapest.cab_destination}</h5>
              <p>
                Ride from{" "}
                {this.state.data.status.cheapest.cab_destination_startpoint} ->{" "}
                {this.state.data.status.destination}
              </p>
              <p>
                Fare charge{" "}
                {this.state.data.status.cheapest.cab_destination_fare}$
              </p>
            </TimelineItem>
          </Timeline>
          <h3>More Results</h3>
          <hr />

          <div className="display-result">
            {this.state.data.status.remaining_results.map(n => {
              let props = {
                data: n,
                origin: this.state.data.status.origin,
                destination: this.state.data.status.destination
              };
              console.log(props);
              return <ResultCard value={props} />;
            })}
          </div>
        </React.Fragment>
      );
    }
    return <div className="Home">{renderComponent}</div>;
  }
}
