import React from "react";

import Tak from '../../components/Images/tak.png';
import Angela from '../../components/Images/angela.png';
import Sean from '../../components/Images/sean.png';
import Wai from '../../components/Images/wai.png';

const About = () => (
  <div class="wrapper">
    <div id="main-header" class="about-banner">
      <div class="main-banner-overlay">
        <div id="headerText" class="container text-center">
          <h1 class="heading">About BusTrackr</h1>
          <h5 class="about-text">BusTrakr is an app that tracks buses.
          </h5>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row justify-content-center mt-5 mb-5">
        <div class="col text-center">
          <img src={Wai} alt={"Wai"}/> 
          <h5 class="mt-3 mb-3">Wai</h5>
          <a href="https://www.linkedin.com/in/wai-yan/"><i class="fab fa-linkedin"></i></a>
          <a href="https://github.com/Wai-Yan"><i class="fab fa-github-square"></i></a>
        </div>
        <div class="col text-center">
          <img src={Tak} alt={"Tak"}/> 
          <h5 class="mt-3 mb-3">Tak</h5>
          <a href="https://www.linkedin.com/in/nalut-tak/"><i class="fab fa-linkedin"></i></a>
          <a href="https://github.com/tak009"><i class="fab fa-github-square"></i></a>
        </div>
        <div class="col text-center">
          <img src={Sean} alt={"Sean"}/> 
          <h5 class="mt-3 mb-3">Sean</h5>
          <a href="https://www.linkedin.com/in/sean-andersen-12a78699/"><i class="fab fa-linkedin"></i></a>
          <a href="https://github.com/andersensm"><i class="fab fa-github-square"></i></a>
        </div>
        <div class="col text-center">
          <img src={Angela} alt={"Angela"}/> 
          <h5 class="mt-3 mb-3">Angela</h5>
          <a href="https://github.com/angkressin"><i class="fab fa-github-square"></i></a>
        </div>
      </div>
    </div>

    <div class="footer">
      <div class="container text-center">
        <p>© Copyright BusTrakr 2018</p>
      </div>
    </div>

  </div>
);

export default About;