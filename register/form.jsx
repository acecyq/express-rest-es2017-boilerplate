'use strict';

function Header(props) {
  return (
    <div id="header">
      <div className="container">
        <img src="omg.png" id="logo"/>
      </div>
    </div>
  );
}

function Caption() {
  return (
    <div id="caption">
      <h1>VIDEO MANAGEMENT AND INTEGRATED SUPPORT SYSTEM</h1>
    </div>
  );
}

function Input(props) {
  return (
    <div className="input-group mb-3">
      <input type={props.type} className="form-control inputs" placeholder={props.placeholder}></input>
    </div>
  );
}

function Button() {
  return (
    <button id="button" className="btn btn-success"><img id="unlock" src="unlock.png"/>LOGIN</button>
  );
}

function Link(props) {
  return (
    <a id={props.id} className="links" href="#">{props.value}</a>
  );
}

function Form() {
  return (
    <div id="form">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col col-lg-9">
            <Input type="text" placeholder="Name"/>
            <Input type="password" placeholder="Password"/>
            <Button/>
            <div style={{marginTop:"3vh", width:"100%"}}>
              <Link value="Register"/>
              <Link id="rightLink" value="Forgot your password?"/>
            </div>
            <div id="footer" style={{marginTop:"20vh", width:"100%"}}>
              <hr/>
              <p>Copyright 2018 Onwards Media Group Pte Ltd</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

class Reactdiv extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    
    return (
      <div>
        <Header />
        <Caption />
        <Form />
      </div>
    );
  }
}

let domContainer = document.querySelector('#reactdiv');
ReactDOM.render(<Reactdiv />, domContainer);