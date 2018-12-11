import React, { Component } from 'react';
import './CSS/App.css';
import request from 'superagent';

// https://reactjs.org/docs/lists-and-keys.html


function ServicesInns (props) {
    var data = props.data;
        if (data != null ) {
            const inns = data.map( (inn) =>
              <ul className="noDec inns">
                <div className="Services">
                  <li> {inn.Name} </li>
                  <li className="Location"> Location: {inn.Location} </li>
                </div>
                <div className="iContent under">
                  <li> Owner: {inn.Owner} </li>
                  <li> Quality: {inn.Type} </li>
                  <li> Notes: {inn.Notes} </li>
                </div>
              </ul>
            )
            return <div className="iContentCon"> {inns} </div>
        } else {
            return <p> No Know Inns </p>
        }
}

function ServicesShops (props) {
    var data = props.data;
        if (data != null ) {
            const shops = data.map( (shop) =>
              <ul className="noDec inns">
              <div className="Services" >
                <li> {shop.Name} </li>
                <li className="Location"> Location: {shop.Location} </li>
                </div>
                <div className="iContent under">
                  <li> Owner: {shop.Owner} </li>
                  <li> Shop Type: {shop.Type} </li>
                  <li> Notes: {shop.Notes} </li>
                </div>
              </ul>
            )
            return <div className="iContentCon" > {shops} </div>
        } else {
            return <p> No Know Shops </p>
        }
}

function Towns (props) {
    var data = props.data.Towns;
    console.log(data)

        if (data != null) {

            const towns = data.map( (town) => {

              var note = town.Notes;

              if (note === "") {
                note = "No Notes on this Town"
              }

              console.log(note);

              return (
                  <ul key={town.Name} className="card noDec">
                  <div className="tHeader">
                    <li className="townName"> {town.Name} </li>
                    <li className="Location"> Location: {town.Country} </li>
                  </div>
                  <div className="iContent">
                    <li className="townDesc"> {town.Description} </li>
                    <li className="townNotes"> {note} </li>
                  </div>
                    <li className="Services"> Inns </li>
                    <ServicesInns data={town.Services.Inns} />
                    <li className="Services"> Shops </li>
                    <ServicesShops data={town.Services.Stores} />
                  </ul>
            )
            })



            console.log(towns)

            return (
              <div> {towns} </div>
            )
        }
        else {
            return <p> Data Didnt Load! </p>
        }

}

class App extends Component {

  constructor(props){
    super();
    this.state = ({
      notes: []
    })
  }

  componentDidMount() {
    request
      .get("https://api.jsonbin.io/b/5c0a79291deea01014bf1d32/latest")
      .set('secret-key', '$2a$10$2grg4TqBV8/1xtgERZ9Td.1qxuq4FuOXywCg073pAlFOtfNvMmqQS')
      .then( (res) => {
          this.setState({ notes: res.body });
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Aarons Crazy RGP TRACKER! </h1>
        </header>

        <section>
        <div>
          <div className="right side">
              Nav links shall be going here!
              <p>
              Including multiple ways to filter and search Data
              </p>
              Hope to also include a quest tracker and important npc do dah .... also to work on da looks - not exactly a desiner!
            </div>
        </div>
          <div className="container" >

            <Towns className="left" data={this.state.notes} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
