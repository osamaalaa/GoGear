import PropTypes from "prop-types";
import React, { useEffect } from "react";
import logodark from "images/logos/main.svg";
import bg from "images/layouts/Pattern.png";
import { Row, Col, CardBody, Card, Alert, Container, Form, Input, FormFeedback, Label , CardImgOverlay , CardImg } from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link } from "react-router-dom";
import withRouter from "../../components/Common/withRouter";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";


// actions
import { loginUser } from "../../store/actions";


import { createSelector } from 'reselect';

const Login = props => {
  document.title = "Login | Go Gear";

  const dispatch = useDispatch();

  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: "osamaalaaeldin@mail.com" || '',
      password: "123456" || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
    }
  });

  const loginpage = createSelector(
    (state ) => state.login,
    (state) => ({
        error: state.error,
    })
  );
// Inside your component
const { error } = useSelector(loginpage);

  // handleValidSubmit
  // const handleValidSubmit = (event, values) => {
  //   dispatch(loginUser(values, props.router.navigate));
  // };




  useEffect(() => {
    document.body.className = "bg-pattern";
    // remove classname when component will unmount
    return function cleanup() {
      document.body.className = "";
    };
  });

  return (
    <React.Fragment>
    
    <div className="bg-overlay"></div>
    <div className="account-pages my-5 pt-5">
      <Container>
        <Row className="justify-content-center">
          <Col lg={9} md={8} xl={6}>
            <Card>
            <CardImg
                alt="Card image cap"
                src={bg}
             
                width="30%"
              />
              <CardImgOverlay>
                <CardBody className="p-4"> 
                  <div>
                    <div className="text-center">
                      <Link to="/">
                        <img
                          src={logodark}
                          alt=""
                          height="80"
                          className="auth-logo logo-dark mx-auto"
                        />
                        
                      </Link>
                    </div>
                    <Form
                      className="form-horizontal mt-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                      }}
                    >
                      {error ? <Alert color="danger"><div>{error}</div></Alert> : null}
                      <Row className="mt-5">
                        <Col>
                          <div className="mb-4">
                          <Label className="form-label">Email</Label>
                          <Input
                            name="email"
                            className="form-control"
                            placeholder="Enter email"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email && validation.errors.email ? true : false
                            }
                          />
                          {validation.touched.email && validation.errors.email ? (
                            <FormFeedback type="invalid"><div>{validation.errors.email}</div></FormFeedback>
                          ) : null}
                          </div>
                          <div className="mb-4">
                            <Label className="form-label">Password</Label>
                            <Input
                              name="password"
                              value={validation.values.password || ""}
                              type="password"
                              placeholder="Enter Password"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              invalid={
                                validation.touched.password && validation.errors.password ? true : false
                              }
                            />
                            {validation.touched.password && validation.errors.password ? (
                              <FormFeedback type="invalid"><div> {validation.errors.password} </div></FormFeedback>
                            ) : null}
                          </div>

                          <Row>
                            <Col>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  className="form-check-input"
                                  id="customControlInline"
                                />
                                <label
                                  className="form-label form-check-label"
                                  htmlFor="customControlInline"
                                >
                                  Remember me
                                </label>
                              </div>
                            </Col>
                            <Col className="col-7">
                              <div className="text-md-end mt-3 mt-md-0">
                                <Link
                                  to="/auth-recoverpw"
                                  className="text-muted"
                                >
                                  <i className="mdi mdi-lock"></i> Forgot your
                                  password?
                                </Link>
                              </div>
                            </Col>
                          </Row>
                          <div className="d-grid mt-4">
                            <button
                              className="btn btn-primary waves-effect waves-light"
                              type="submit"
                            >
                              Log In
                            </button>
                          </div>
                          <div className="mt-4 text-center">

                      </div>

                        </Col>
                      </Row>
                    </Form>
                  </div>
                </CardBody>
              </CardImgOverlay>
            </Card>
            <div className="mt-5 text-center">
              <p className="text-white-50">
                Don't have an account ?{" "}
                <Link to="/register" className="fw-medium text-primary">
                  {" "}
                  Register{" "}
                </Link>{" "}
              </p>
              <p className="text-white-50 font-weight-bold">
               © Go Gear. All rights reserved  {new Date().getFullYear()}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
