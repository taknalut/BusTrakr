import React from "react";
import "./Footer.css";
import { Link } from 'react-router-dom'

const Footer = () => (
  <footer id="foot">
    <p>© Copyright 2018 BUSTRAKR | <Link className='mapLink' to="/about">About Us</Link> </p>
    <p></p>
    <div className='line'></div>
    <p className="mt-3">Metro Bus Maps:</p>
    <div className='row'>
    <div className='col'>
    <a className='mapLink' href='https://www.wmata.com/schedules/maps/upload/WEB_DC-Metrobus-System-Map-FINAL.pdf' target='_blank'>DC Metro</a>
    </div>
    <div className='col'>
    <a className='mapLink' href='https://www.wmata.com/schedules/maps/upload/Mo-County-System-Map-Web-version.pdf' target='_blank'>Montgomery County, MD</a>
    </div>
    <div className='col'>
    <a className='mapLink' href='https://www.wmata.com/schedules/maps/upload/WEB_PG-County-Metrobus-System-Map-FINAL.pdf' target='_blank'>Prince George's County, MD</a>
    </div>
    <div className='col'>
    <a className='mapLink' href='https://www.wmata.com/schedules/maps/upload/ShirlingtonTransitCenter.pdf' target='_blank'>Shirlington Transit Center</a>
    </div>
    <div className='col'>
    <a className='mapLink' href='https://www.wmata.com/schedules/maps/upload/Takoma_Langley_Crossroads_TC_Map.pdf' target='_blank'>Takoma Langely Crossroads Transit Center</a>
    </div>
    <div className='col'>
    <a className='mapLink' href='https://www.wmata.com/schedules/maps/upload/VA-System-Map-Web-version.pdf' target='_blank'>Virginia</a>
    </div>
    </div>
  </footer>
);

export default Footer;
