import React from "react";
import Tak from '../../components/Images/tak.png';
import Angela from '../../components/Images/angela.png';
import Sean from '../../components/Images/sean.png';
import Wai from '../../components/Images/wai.png';

const About = () => (
  <div className="wrapper">
    <div id="main-header" className="about-banner">
      <div className="main-banner-overlay">
        <div id="headerText" className="container text-center">
          <h1 className="heading mt-3">About BUSTRAKR</h1>
          <h5 className="about-text">Never miss a bus in DC again. BusTrakr will allow you to easily see, in real-time, where buses are and how may minutes away is the nearest bus. You can also save the bus lines so you can have quick access to the buses that matter to you.
          </h5>
        </div>
      </div>
    </div>

    <div className="container">
      <div className="row justify-content-center mt-5 mb-5">
        <div className="col text-center">
          <img src={Wai} alt={"Wai"}/>
          <h5 className="mt-3 mb-3">Wai</h5>
          <a className="profLink mr-2" href="https://www.linkedin.com/in/wai-yan/"><i className="fab fa-linkedin"></i></a>
          <a className="profLink" href="https://github.com/Wai-Yan"><i className="fab fa-github-square"></i></a>
        </div>
        <div className="col text-center">
          <img src={Tak} alt={"Tak"}/>
          <h5 className="mt-3 mb-3">Tak</h5>
          <a className="profLink mr-2" href="https://www.linkedin.com/in/nalut-tak/"><i className="fab fa-linkedin"></i></a>
          <a className="profLink" href="https://github.com/tak009"><i className="fab fa-github-square"></i></a>
        </div>
        <div className="col text-center">
          <img src={Sean} alt={"Sean"}/>
          <h5 className="mt-3 mb-3">Sean</h5>
          <a className="profLink mr-2" href="https://www.linkedin.com/in/sean-andersen-12a78699/"><i className="fab fa-linkedin"></i></a>
          <a className="profLink" href="https://github.com/andersensm"><i className="fab fa-github-square"></i></a>
        </div>
        <div className="col text-center">
          <img src={Angela} alt={"Angela"}/>
          <h5 className="mt-3 mb-3">Angela</h5>
          <a className="profLink mr-2" href="https://www.linkedin.com/in/angelakressin/"><i className="fab fa-linkedin"></i></a>
          <a className="profLink" href="https://github.com/angkressin"><i className="fab fa-github-square"></i></a>
        </div>
      </div>
    </div>

  </div>
);

export default About;
