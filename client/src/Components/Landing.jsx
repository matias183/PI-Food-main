import React from "react";
import { Link } from "react-router-dom";
import './Estilos/Home.css'
export default function LandingPage() {
  return (
    <div className="landing">
      <header className="inicio"> Welcome to my Recipes project!</header>
      <Link to="/home">
        <button  className="button-landing">Ingresar</button>
      </Link>
    </div>
  );
}
