import React, { useState } from "react";
import "./Home.css";
import Navbar from "../../components/header/Header";
import logoo from "../../assets/Logo/SBI-Logo.png";
import CircleIcon from "@mui/icons-material/Circle";
import { FcSimCardChip } from "react-icons/fc";
import Footer from "../../components/Footer/Footer";
import AccountCreateForm from "../AccountCreation/AccountCreateForm";

const Home = () => {
    const [open,  setOpen] = useState(false);
    console.log(open);
  return (
    <>
   
    <div className="homewhole-container">
      <Navbar setOpen={setOpen}/>
      
   

      <div className="homeContainer">
        {/* Left Side */}
        <div className="homeSubContainer">
          <div className="homePillBadge">NEXT-GEN DIGITAL BANKING</div>

          <div className="homeContentBox">
            <h1 className="home-bankc">
              Banking Built For <br />
              <span className="homesmart">Smart</span> <br />
              <span className="homefin">Financials.</span>
            </h1>
          </div>

          <div className="homeSmallContent">
            <p>
              Experience the future of finance with AI-driven <br />
              insights, zero fees on transfers, and bank-grade <br />
              security for your digital assets.
            </p>
          </div>

          <div className="homeButtonContent">
            <button className="homeOpenBtn" onClick={()=>setOpen(true)}>Open Account Free</button>
              {/* {open ? (<AccountCreateForm closemodal={()=>setOpen(false)}/> ):null} */}
              {open && (
  <AccountCreateForm closemodal={() => setOpen(false)} />
)}
          </div>
        </div>

        {/* Right Side Card */}
        <div className="homeCardContainer">
          <div className="homeLogo">
            <img src={logoo} alt="logo" />

            <div className="homeCircle">
              <CircleIcon sx={{ color: "white", fontSize: 14 }} />
            </div>
          </div>

          <div className="homeChip">
            <FcSimCardChip size={35} />
          </div>
<div className="homeCardNumber">
  <h3>4421 8800 2491 5562</h3>
</div>


          <div className="homeCardLast">
            <div className="homeFirstContent">
              <p className="homeHolder">Card Holder</p>
              <p className="homeOwner">John Doe</p>
            </div>

            <div className="homeFirstContent">
              <p className="homeHolder">Expires</p>
              <p className="homeOwner">10/2030</p>
            </div>
          </div>
        </div>
      </div>


  <Footer/>
  </div>

    </>
  );
};

export default Home;
