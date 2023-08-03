import React, { Component } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import "./App.css";
import Particle from "./components/Particles/Particle";
import Signin from "./components/Signin/Signin";


const returnClarifaiRequestOptions = (imageUrl) => {
  const PAT = "3788c96223d04c8691da62b67bf746e6";
  const USER_ID = "dhia88";
  const APP_ID = "face";
  const IMAGE_URL = imageUrl;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };

  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.onButtonSubmit = this.onButtonSubmit.bind(this);
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {      
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
      leftCol: clarifaiFace.left_col * width,
    };
  };

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({ box: box });
  };

  onInputChange(event) {
    this.setState({ input: event.target.value });
    console.log(this.state.input);
  }

  onButtonSubmit() {
    this.setState({ imageUrl: this.state.input }, () => {
      console.log(this.state.imageUrl);
    });

    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      returnClarifaiRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => this.displayFaceBox(this.calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
      <div className="App">
        <Signin />
        <Particle />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition box ={this.state.box} imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
