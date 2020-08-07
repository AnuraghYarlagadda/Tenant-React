import React, { useEffect } from "react";
import $ from "jquery";
import Register from "../auth/Register";
import Login from "../auth/Login";

const Home = ({ location }) => {
  useEffect(() => {
    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
      if (
        location.pathname.replace(/^\//, "") ===
        this.pathname.replace(/^\//, "")
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          $("html, body").animate(
            {
              scrollTop: target.offset().top - 72,
            },
            1000,
            "easeInOutExpo"
          );
          return false;
        }
      }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function () {
      $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active className to navbar items on scroll
    $("body").scrollspy({
      target: "#mainNav",
      offset: 75,
    });

    // Collapse Navbar
    var navbarCollapse = function () {
      if ($("#mainNav").offset() !== undefined) {
        if ($("#mainNav").offset().top > 100) {
          $("#mainNav").addClass("navbar-scrolled");
        } else {
          $("#mainNav").removeClass("navbar-scrolled");
        }
      }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
  }, [location.hostname, location.pathname]);

  return (
    <div id="page-top">
      {/* <!-- Navigation--> */}
      <nav
        className="navbar navbar-expand-lg navbar-light fixed-top py-3"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand js-scroll-trigger" href="#page-top">
            Project
          </a>
          <button
            className="navbar-toggler navbar-toggler-right"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto my-2 my-lg-0">
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#about">
                  About
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#register">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#services">
                  Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link js-scroll-trigger" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* <!-- Masthead--> */}
      <header className="masthead">
        <div className="container-fluid h-100">
          <div className="row h-100 align-items-center justify-content-center text-center">
            <div className="col-lg-10 align-self-end">
              <h1 className="text-uppercase text-white font-weight-bold">
                Your Favorite Source of Free Bootstrap Themes
              </h1>
              <hr className="divider my-4" />
            </div>
            <div className="col-lg-8 align-self-baseline">
              <p className="text-white-50 font-weight-light mb-5">
                Start Bootstrap can help you build better websites using the
                Bootstrap framework! Just download a theme and start
                customizing, no strings attached!
              </p>
              <a
                className="btn btn-primary btn-xl js-scroll-trigger"
                href="#about"
              >
                Find Out More
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* <!-- About--> */}
      <section className="page-section bg-primary" id="about">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="text-white mt-0">We've got what you need!</h2>
              <hr className="divider light my-4" />
              <p className="text-white-50 mb-4">
                Start Bootstrap has everything you need to get your new website
                up and running in no time! Choose one of our open source, free
                to download, and easy to use themes! No strings attached!
              </p>
              <a
                className="btn btn-light btn-xl js-scroll-trigger"
                href="#register"
              >
                Get Started!
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Register--> */}
      <section className="page-section-custom bg-primary" id="register">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="text-white mt-0">Sign Up!</h2>
              <hr className="divider light my-4" />
              <Register />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Login--> */}
      <section className="page-section-custom bg-primary" id="login">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="text-white mt-0">Login!</h2>
              <hr className="divider light my-4" />
              <Login />
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Services--> */}
      <section className="page-section" id="services">
        <div className="container">
          <h2 className="text-center mt-0">At Your Service</h2>
          <hr className="divider my-4" />
          <div className="row">
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <i className="fas fa-4x fa-gem text-primary mb-4"></i>
                <h3 className="h4 mb-2">Sturdy Themes</h3>
                <p className="text-muted mb-0">
                  Our themes are updated regularly to keep them bug free!
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <i className="fas fa-4x fa-laptop-code text-primary mb-4"></i>
                <h3 className="h4 mb-2">Up to Date</h3>
                <p className="text-muted mb-0">
                  All dependencies are kept current to keep things fresh.
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <i className="fas fa-4x fa-globe text-primary mb-4"></i>
                <h3 className="h4 mb-2">Ready to Publish</h3>
                <p className="text-muted mb-0">
                  You can use this design as is, or you can make changes!
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 text-center">
              <div className="mt-5">
                <i className="fas fa-4x fa-heart text-primary mb-4"></i>
                <h3 className="h4 mb-2">Made with Love</h3>
                <p className="text-muted mb-0">
                  Is it really open source if it's not made with love?
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Contact--> */}
      <section className="page-section" id="contact">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="mt-0">Let's Get In Touch!</h2>
              <hr className="divider my-4" />
              <p className="text-muted mb-5">
                Ready to start your next project with us? Give us a call or send
                us an email and we will get back to you as soon as possible!
              </p>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-4 ml-auto text-center mb-5 mb-lg-0">
              <i className="fas fa-phone fa-3x mb-3 text-muted"></i>
              <div>+1 (555) 123-4567</div>
            </div>
            <div className="col-lg-4 mr-auto text-center">
              <i className="fas fa-envelope fa-3x mb-3 text-muted"></i>
              {/* <!-- Make sure to change the email address in BOTH the anchor text and the link target below!--> */}
              <a className="d-block" href="mailto:contact@yourwebsite.com">
                contact@yourwebsite.com
              </a>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- Footer--> */}
      <footer className="bg-light py-5">
        <div className="container">
          <div className="small text-center text-muted">
            Copyright © 2020 - Team CFG
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
