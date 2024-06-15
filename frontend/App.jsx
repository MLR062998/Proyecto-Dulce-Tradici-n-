// src/App.jsx
import React from 'react';
import Slider from "react-slick";
import logo from "./assets/dfinity.svg";

import { createClient } from "@connect2ic/core";
import { InternetIdentity } from "@connect2ic/core/providers/internet-identity";
import { ConnectButton, ConnectDialog, Connect2ICProvider } from "@connect2ic/react";
import "@connect2ic/core/style.css";

// Import canister definitions like this:
import * as dulcesTradicionales from "../.dfx/local/canisters/dulcestradicionales_backend";

import CrearProducto from "./components/CrearProducto";
import CrearUsuario from "./components/CrearUsuario";
import { Encabezado } from "./components/Encabezado";

// Importa los estilos de slick-carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  { url: "/path/to/your/image1.jpg", alt: "Image 1" },
  { url: "/path/to/your/image2.jpg", alt: "Image 2" },
  { url: "/path/to/your/image3.jpg", alt: "Image 3" },
];

function App() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="App">
      <div>
        <Encabezado />
        <img src={logo} className="App-logo" alt="logo" />
        <div className="auth-section">
          <ConnectButton />
        </div>
        <ConnectDialog />
      </div>

      <header className="App-header">
        <br />
        <CrearProducto />
        <br />
        <CrearUsuario />
      </header>

      <Slider {...settings} className="background-slider">
        {images.map((image, index) => (
          <div key={index}>
            <div
              className="background-image"
              style={{
                backgroundImage: `url(${image.url})`,
                height: "100vh",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              alt={image.alt}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

const client = createClient({
  canisters: {
    dulcesTradicionales,
  },
  providers: [
    new InternetIdentity({
      providerUrl: "http://127.0.0.1:8000/?canisterId=be2us-64aaa-aaaaa-qaabq-cai",
    }),
  ],
  globalProviderConfig: {
    dev: true,
  },
});

export default () => (
  <Connect2ICProvider client={client}>
    <App />
  </Connect2ICProvider>
);
