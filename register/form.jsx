'use strict';

// header that contains the logo
function Header(props) {
  return (
    <div id="header">
      <div className="container">
        <img src="omg.png" id="logo"/>
      </div>
    </div>
  );
}

// caption that contains the description of company services
function Caption() {
  return (
    <div id="caption">
      <p>VIDEO MANAGEMENT AND INTEGRATED SUPPORT SYSTEM</p>
    </div>
  );
}

// customise the input type, placeholder, and Form state attribute that it will amend
function Input(props) {
  return (
    <div className="input-group mb-3">
      <input type={props.type} className="form-control inputs" placeholder={props.placeholder} onChange={(event) => props.changeHandler(event, props.att)}></input>
    </div>
  );
}

// login button
function Button(props) {
  return (
    <button id="button" className="btn btn-success" onClick={props.clickHandler}><img id="unlock" src="unlock.png"/>LOGIN</button>
  );
}

// customise links textContent and id
function Link(props) {
  return (
    <p id={props.id} className="links" onClick={props.linkHandler}>{props.textContent}</p>
  );
}

// form component that houses all states, functions, inputs, buttons and footer
class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email : "",
      password : "",

      // confirm password
      cpassword : "",

      // proceed will be true if password === cpassword
      proceed : false,

      // any messages to display when ajax request is fulfilled, rejected or if password and cpassword do not tally
      messages: [],
      link: "Login"
    };

    // binds functions to this
    this.changeHandler = this.changeHandler.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.linkHandler = this.linkHandler.bind(this);
  }

  // function called when inputs are changed
  changeHandler(event, att) {
    this.state[att] = event.target.value;

    // proceed is false by default
    let proceed = false;

    // if password === cpassword, proceed = true
    if (this.state.password === this.state.cpassword) {
      proceed = true
    }
    this.setState({ proceed : proceed });
  }

  // function called when login button is clicked 
  clickHandler() {
    let msg;
    let arr = [];
    if (this.state.link === "Register") {

      // send post request to login
      axios.post('http://localhost:3000/v1/auth/login', {

        // send email and password params
        "email": this.state.email,
        "password": this.state.password
      })
      .then(response => {

        // get email and display on another page
        let email = response.data.user.email;
        window.location = '/v1/login?email=' + email;
      })
      .catch(error => {

        // display error message if incorrect email or password
        arr = [error.response.data.message];
        this.setState({ messages : arr });
      });
    }
    else if (this.state.link === "Login" && this.state.proceed === true) {

      // send post request to register
      axios.post('http://localhost:3000/v1/auth/register', {

        // send email and password params
        "email": this.state.email,
        "password": this.state.password
      })

      // if request fulfilled and email and password is saved
      .then(response => {

        // display account created message
        msg = "Account " + this.state.email + " created!";
        arr = [msg];
        this.setState({ messages : arr })
      })
      .catch(error => {

        // json parse the error response request responseText
        msg = JSON.parse(error.response.request.responseText);

        // display every error message
        msg.errors.forEach(el => {
          arr.push(el.messages[0]);
        })
        this.setState({ messages : arr });
      });
    } else {

      // display only if password is not equal to cpassword
      msg = '"password" and "confirm password" do not match';
      arr = [msg];
      this.setState({ messages : arr });
    }
  }

  linkHandler() {

    // if link is "Login", change link to "Register"
    let link = this.state.link;
    if (link === "Login") {
      this.setState({ link : "Register" });
    } else {
      this.setState({ link : "Login" });
    }
  }

  render() {
    let flash, test;

    // displays messages
    if (this.state.messages.length > 0) {
      flash = this.state.messages.map((el, i) => {
        return(
          <p key={i} className="flash">{el}</p>
        );
      })
    }

    return (
      <div id="form">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col col-lg-9">
              {flash}
              {this.state.link === "Login"
              ?
                <div>
                  <Input type="text" placeholder="Email" att="email" changeHandler={this.changeHandler}/>
                  <Input type="password" placeholder="Password" att="password" changeHandler={this.changeHandler}/>
                  <Input type="password" placeholder="Confirm Password" att="cpassword" changeHandler={this.changeHandler}/>
                </div>
              :
                <div>
                  <Input type="text" placeholder="Email" att="email" changeHandler={this.changeHandler}/>
                  <Input type="password" placeholder="Password" att="password" changeHandler={this.changeHandler}/>
                </div>
              }
              <Button clickHandler={this.clickHandler}/>
              <div style={{marginTop:"3vh", width:"100%"}}>
                <Link textContent={this.state.link} linkHandler={this.linkHandler}/>
                <Link id="rightLink" textContent="Forgot your password?"/>
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
}

function Reactdiv() {
  return (
    <div>
      <Header />
      <Caption />
      <Form />
    </div>
  );
}

let domContainer = document.querySelector('#reactdiv');
ReactDOM.render(<Reactdiv />, domContainer);