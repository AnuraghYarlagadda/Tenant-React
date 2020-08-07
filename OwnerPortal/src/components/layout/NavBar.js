import React, { useEffect, Fragment } from "react";
import CustomLink from "../ui/CustomLink";
import $ from "jquery";
import { Route, Switch, Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  logOut,
  changePassword,
  editProfile,
  deleteAccountPassword,
  deleteAccountGoogle,
} from "../../store/actions/authActions";
import PropTypes from "prop-types";
import { RiAccountCircleLine } from "react-icons/ri";
import Swal from "sweetalert2/dist/sweetalert2.all.min.js";
import "sweetalert2/src/sweetalert2.scss";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import Routes from "../routing/Routes";

const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-danger m-2",
    cancelButton: "btn btn-success m-2",
  },
  buttonsStyling: false,
});

const NavBar = ({
  profile,
  logOut,
  changePassword,
  editProfile,
  deleteAccountPassword,
  deleteAccountGoogle,
  providerId,
}) => {
  useEffect(() => {
    // Toggle the side navigation
    $("#sidebarToggle, #sidebarToggleTop").on("click", function (e) {
      $("body").toggleClass("sidebar-toggled");
      $(".sidebar").toggleClass("toggled");
      if ($(".sidebar").hasClass("toggled")) {
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Close any open menu accordions when window is resized below 768px
    $(window).resize(function () {
      if ($(window).width() < 768) {
        $(".sidebar .collapse").collapse("hide");
      }

      // Toggle the side navigation when window is resized below 480px
      if ($(window).width() < 480 && !$(".sidebar").hasClass("toggled")) {
        $("body").addClass("sidebar-toggled");
        $(".sidebar").addClass("toggled");
        $(".sidebar .collapse").collapse("hide");
      }
    });

    // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
    $("body.fixed-nav .sidebar").on(
      "mousewheel DOMMouseScroll wheel",
      function (e) {
        if ($(window).width() > 768) {
          var e0 = e.originalEvent,
            delta = e0.wheelDelta || -e0.detail;
          this.scrollTop += (delta < 0 ? 1 : -1) * 30;
          e.preventDefault();
        }
      }
    );

    // Scroll to top button appear
    $(document).on("scroll", function () {
      var scrollDistance = $(this).scrollTop();
      if (scrollDistance > 100) {
        $(".scroll-to-top").fadeIn();
      } else {
        $(".scroll-to-top").fadeOut();
      }
    });

    // Smooth scrolling using jQuery easing
    $(document).on("click", "a.scroll-to-top", function (e) {
      var $anchor = $(this);
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: $($anchor.attr("href")).offset().top,
          },
          1000,
          "easeInOutExpo"
        );
      e.preventDefault();
    });
  }, []);
  const passwordLinks = (
    <li className="nav-item dropdown no-arrow">
      <a
        className="nav-link dropdown-toggle"
        rel="noopener noreferrer"
        href="#"
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          {profile ? `${profile.displayName}` : ``}
        </span>
        {profile ? (
          profile.photoURL ? (
            <img
              style={{ borderRadius: "50%" }}
              src={profile.photoURL}
              width="25rem"
              height="25rem"
              alt="profile"
            ></img>
          ) : (
            <RiAccountCircleLine size="1.5rem" />
          )
        ) : (
          ""
        )}
      </a>
      {/* <!-- Dropdown - User Information --> */}
      <div
        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <a
          className="dropdown-item"
          rel="noopener noreferrer"
          href="#"
          onClick={() => editProfile(profile && profile.email)}
        >
          <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
          Edit Profile
        </a>
        <a
          className="dropdown-item"
          rel="noopener noreferrer"
          href="#"
          onClick={() => changePassword(profile && profile.email)}
        >
          <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
          Change Password
        </a>
        <a
          className="dropdown-item"
          rel="noopener noreferrer"
          href="#"
          onClick={() => deleteAccountPassword(profile && profile.email)}
        >
          <i className="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
          Delete Account
        </a>
        <CustomLink className="dropdown-item" to="#" tag="button">
          <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
          Activity Log
        </CustomLink>
        <div className="dropdown-divider"></div>
        <a
          className="dropdown-item"
          rel="noopener noreferrer"
          href="#"
          data-toggle="modal"
          data-target="#logoutModal"
          onClick={() =>
            swalWithBootstrapButtons
              .fire({
                title: "Are you sure?",
                text: "Do you want to Logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Logout!",
                cancelButtonText: "No, Stay here!",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.value) {
                  logOut();
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Log-Out cancelled!",
                    text: "Welcome Back 😃",
                  });
                }
              })
          }
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
  const googleLinks = (
    <li className="nav-item dropdown no-arrow">
      <a
        className="nav-link dropdown-toggle"
        rel="noopener noreferrer"
        href="#"
        id="userDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="mr-2 d-none d-lg-inline text-gray-600 small">
          {profile ? `${profile.displayName}` : ``}
        </span>
        {profile ? (
          profile.photoURL ? (
            <img
              referrerPolicy="no-referrer"
              style={{ borderRadius: "50%" }}
              src={profile.photoURL}
              width="25rem"
              height="25rem"
              alt="profile"
            ></img>
          ) : (
            <RiAccountCircleLine size="1.5rem" />
          )
        ) : (
          ""
        )}
      </a>
      {/* <!-- Dropdown - User Information --> */}
      <div
        className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
        aria-labelledby="userDropdown"
      >
        <a
          className="dropdown-item"
          rel="noopener noreferrer"
          href="#"
          onClick={() => deleteAccountGoogle(profile && profile.email)}
        >
          <i className="fas fa-trash fa-sm fa-fw mr-2 text-gray-400"></i>
          Delete Account
        </a>
        <CustomLink className="dropdown-item" to="#" tag="button">
          <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
          Activity Log
        </CustomLink>
        <div className="dropdown-divider"></div>
        <a
          className="dropdown-item"
          rel="noopener noreferrer"
          href="#"
          data-toggle="modal"
          data-target="#logoutModal"
          onClick={() =>
            swalWithBootstrapButtons
              .fire({
                title: "Are you sure?",
                text: "Do you want to Logout?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, Logout!",
                cancelButtonText: "No, Stay here!",
                reverseButtons: true,
              })
              .then((result) => {
                if (result.value) {
                  logOut();
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Log-Out cancelled!",
                    text: "Welcome Back 😃",
                  });
                }
              })
          }
        >
          <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
          Logout
        </a>
      </div>
    </li>
  );
  return (
    <div id="page-top">
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <ul
          className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
          id="accordionSidebar"
        >
          {/* <!-- Sidebar - Brand --> */}
          <Link
            className="sidebar-brand d-flex align-items-center justify-content-center"
            to="/"
          >
            <div className="sidebar-brand-icon rotate-n-15">
              <span className="fa fa-home"></span>
            </div>
            <div className="sidebar-brand-text mx-3">
              Project
              {/* <sup>2</sup> */}
            </div>
          </Link>

          {/* <!-- Divider --> */}
          {/* <hr className="sidebar-divider my-0" /> */}

          {/* <!-- Nav Item - Dashboard -->
          <li className="nav-item">
            <CustomLink className="nav-link" to="/" tag="a">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </CustomLink>
          </li>*/}

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">Interface</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              rel="noopener noreferrer"
              href="#"
              data-toggle="collapse"
              data-target="#collapseTwo"
              aria-expanded="true"
              aria-controls="collapseTwo"
            >
              <i className="fas fa-fw fa-cog"></i>
              <span>Components</span>
            </a>
            <div
              id="collapseTwo"
              className="collapse"
              aria-labelledby="headingTwo"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Components:</h6>
                <CustomLink className="collapse-item" to="/buttons" tag="a">
                  Buttons
                </CustomLink>
                <CustomLink className="collapse-item" to="/cards" tag="a">
                  Cards
                </CustomLink>
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Utilities Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              rel="noopener noreferrer"
              href="#"
              data-toggle="collapse"
              data-target="#collapseUtilities"
              aria-expanded="true"
              aria-controls="collapseUtilities"
            >
              <i className="fas fa-fw fa-wrench"></i>
              <span>Utilities</span>
            </a>
            <div
              id="collapseUtilities"
              className="collapse"
              aria-labelledby="headingUtilities"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Custom Utilities:</h6>
                <CustomLink
                  className="collapse-item"
                  to="/utilities-color"
                  tag="a"
                >
                  Colors
                </CustomLink>
                <CustomLink
                  className="collapse-item"
                  to="/utilities-border"
                  tag="a"
                >
                  Borders
                </CustomLink>
                <CustomLink
                  className="collapse-item"
                  to="/utilities-animation"
                  tag="a"
                >
                  Animations
                </CustomLink>
                <CustomLink
                  className="collapse-item"
                  to="/utilities-other"
                  tag="a"
                >
                  Other
                </CustomLink>
              </div>
            </div>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider" />

          {/* <!-- Heading --> */}
          <div className="sidebar-heading">Addons</div>

          {/* <!-- Nav Item - Pages Collapse Menu --> */}
          <li className="nav-item">
            <a
              className="nav-link collapsed"
              rel="noopener noreferrer"
              href="#"
              data-toggle="collapse"
              data-target="#collapsePages"
              aria-expanded="true"
              aria-controls="collapsePages"
            >
              <i className="fas fa-fw fa-folder"></i>
              <span>Pages</span>
            </a>
            <div
              id="collapsePages"
              className="collapse"
              aria-labelledby="headingPages"
              data-parent="#accordionSidebar"
            >
              <div className="bg-white py-2 collapse-inner rounded">
                <h6 className="collapse-header">Login Screens:</h6>
                <CustomLink className="collapse-item" to="/login" tag="a">
                  Login
                </CustomLink>
                <CustomLink className="collapse-item" to="/register" tag="a">
                  Register
                </CustomLink>
                <CustomLink
                  className="collapse-item"
                  to="/forgot-password"
                  tag="a"
                >
                  Forgot Password
                </CustomLink>
                <div className="collapse-divider"></div>
                <h6 className="collapse-header">Other Pages:</h6>
                <CustomLink className="collapse-item" to="/404" tag="a">
                  404 Page
                </CustomLink>
                <CustomLink className="collapse-item" to="/blank" tag="a">
                  Blank Page
                </CustomLink>
              </div>
            </div>
          </li>

          {/* <!-- Nav Item - Charts --> */}
          <li className="nav-item">
            <CustomLink className="nav-link" to="/charts" tag="a">
              <i className="fas fa-fw fa-chart-area"></i>
              <span>Charts</span>
            </CustomLink>
          </li>

          {/* <!-- Nav Item - Tables --> */}
          <li className="nav-item">
            <CustomLink className="nav-link" to="/tables" tag="a">
              <i className="fas fa-fw fa-table"></i>
              <span>Tables</span>
            </CustomLink>
          </li>

          {/* <!-- Nav Item - PDF --> */}
          <li className="nav-item">
            <CustomLink className="nav-link" to="/pdfGeneration" tag="a">
              <i className="fas fa-fw fa-table"></i>
              <span>PDF</span>
            </CustomLink>
          </li>

          {/* <!-- Nav Item - File --> */}
          <li className="nav-item">
            <CustomLink className="nav-link" to="/fileUtils" tag="a">
              <i className="fas fa-fw fa-table"></i>
              <span>FileUtils</span>
            </CustomLink>
          </li>

          {/* <!-- Divider --> */}
          <hr className="sidebar-divider d-none d-md-block" />

          {/* <!-- Sidebar Toggler (Sidebar) --> */}
          <div className="text-center d-none d-md-inline">
            <button
              className="rounded-circle border-0"
              id="sidebarToggle"
            ></button>
          </div>
        </ul>
        {/* <!-- End of Sidebar --> */}
        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
              {/* <!-- Sidebar Toggle (Topbar) --> */}
              <button
                id="sidebarToggleTop"
                className="btn btn-link d-md-none rounded-circle mr-3"
              >
                <i className="fa fa-bars"></i>
              </button>

              {/* <!-- Topbar Navbar --> */}
              <ul className="navbar-nav ml-auto">
                <div className="topbar-divider d-none d-sm-block"></div>

                {/* <!-- Nav Item - User Information --> */}
                <Fragment>
                  {providerId === "google.com" ? googleLinks : passwordLinks}
                </Fragment>
              </ul>
            </nav>
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              {/* <!-- Page Heading --> */}
              <Switch>
                <Route component={Routes} />
              </Switch>
              {/* <!-- Content Row --> */}

              {/* <!-- Content Row --> */}
            </div>
            {/* <!-- /.container-fluid --> */}
          </div>
          {/* <!-- End of Main Content --> */}

          {/* <!-- Scroll to Top Button--> */}
          <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
          </a>
          {/* <!-- Footer --> */}
          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2020</span>
              </div>
            </div>
          </footer>
          {/* <!-- End of Footer --> */}
        </div>
        {/* <!-- End of Content Wrapper --> */}
      </div>
    </div>
  );
};

NavBar.propTypes = {
  logOut: PropTypes.func.isRequired,
  changePassword: PropTypes.func.isRequired,
  editProfile: PropTypes.func.isRequired,
  deleteAccountPassword: PropTypes.func.isRequired,
  deleteAccountGoogle: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => {
  const email = state.firebase.auth.email;
  const profile =
    state.firestore.data.users && state.firestore.data.users[email];
  return {
    email,
    profile,
  };
};

export default compose(
  connect(mapStateToProps, {
    logOut,
    changePassword,
    editProfile,
    deleteAccountPassword,
    deleteAccountGoogle,
  }),
  firestoreConnect((props) => [{ collection: "users", doc: props.email }])
)(NavBar);
