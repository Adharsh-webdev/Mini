import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import "./Home.css";
import Navbar from "../../components/header/Header";
import logoo from "../../assets/Logo/SBI-Logo.png";
import CircleIcon from "@mui/icons-material/Circle";
import { FcSimCardChip } from "react-icons/fc";
import Footer from "../../components/Footer/Footer";
import AccountCreateForm from "../AccountCreation/AccountCreateForm";

const Home = () => {
  const [open, setOpen] = useState(false);

  // ✅ AOS INIT (smooth & bank-style)
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 80,
    });
  }, []);

  return (
    <>
      <div className="homewhole-container">
        <Navbar setOpen={setOpen} />

        <div className="homeContainer">
          {/* LEFT SIDE */}
          <div className="homeSubContainer" data-aos="fade-right">
            <div className="homePillBadge" data-aos="zoom-in">
              NEXT-GEN DIGITAL BANKING
            </div>

            <div className="homeContentBox">
              <h1 className="home-bankc" data-aos="fade-up">
                Banking Built For <br />
                <span className="homesmart">Smart</span> <br />
                <span className="homefin">Financials.</span>
              </h1>
            </div>

            <div
              className="homeSmallContent"
              data-aos="fade-up"
              data-aos-delay="150"
            >
              <p>
                Experience the future of finance with AI-driven <br />
                insights, zero fees on transfers, and bank-grade <br />
                security for your digital assets.
              </p>
            </div>

            <div
              className="homeButtonContent"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <button
                className="homeOpenBtn"
                onClick={() => setOpen(true)}
              >
                Open Account Free
              </button>
            </div>
          </div>

          {/* RIGHT SIDE CARD */}
          <div
            className="homeCardContainer"
            data-aos="fade-left"
            data-aos-delay="200"
          >
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

        {/* MODAL */}
        {open && (
          <div>
            <AccountCreateForm closemodal={() => setOpen(false)} />
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Home;
