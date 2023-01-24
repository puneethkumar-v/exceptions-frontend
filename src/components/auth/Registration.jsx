import { Container } from "@mui/system";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik,Field } from "formik";
import Logo from "../../assets/exceptions/png/E.png";
import Background from "../custom_styling/Background";
import { useNavigate } from "react-router-dom";
import Exceptions from "../../assets/svg/male.svg";
import { addTodo } from "../../features/reducers/slice";
import axios from "axios";
import * as yup from "yup";
import { State } from "country-state-city";

function Registration() {
  const states = State.getStatesOfCountry("IN");
  const [loading,setLoading]=useState(false)
  const navigate = useNavigate();
  const url = "";


  const checkoutSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
  });
  const initialValues={
    email: "",
    firstName: "",
    lastName: "",
    contactNumber: "",
    password: "",
    confirmPassword:"",
    collegeName: "",
    usn: "",
    state: "",
    city: "",
    zip: "",
  }


  
  const loginAuth = async (values) => {};

  const handleFormSubmit = async (values, { setSubmitting }) => {
    console.log("values", values);
    const data = await loginAuth(values);
    console.log("data", data);
  };

  return (
    <Container maxWidth="xl">
      <Background />
      <section className="h-full gradient-form  md:h-screen login-container text-center">
        <div className="container py-12 px-6 h-full w-full">
          <div className="flex justify-center items-center flex-wrap h-full g-6 text-gray-800 w-full">
            <div className="xl:w-10/12">
              <div
                className="block text-neutral-content login-container-part1
        h-full w-full  rounded-md bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0
         shadow-lg rounded-lg
         border-2 border-sky-500
         "
              >
                <div className="lg:flex lg:flex-wrap g-0 w-full">
                  <div className="lg:w-6/12 px-4 md:px-0 w-full" >
                    <div className="md:p-12 md:mx-6 w-full">
                      <div className="text-center">
                        <img className="mx-auto w-36" src={Logo} alt="logo" />
                        <h4
                          className="text-xl font-semibold  mb-3 pb-1 text-primary"
                          style={{ fontFamily: "Orbitron" }}
                        >
                          EXCEPTIONS - 2023
                        </h4>
                      </div>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                        onSubmit={handleFormSubmit}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          /* and other goodies */
                        }) => (
                          <form onSubmit={handleSubmit} className="w-full">
                            <p className="mb-4 font-bold ">
                              Lets create an account
                            </p>
                            <div className="flex justify-around items-center  w-full flex-wrap">



                            <div className="mb-4 basis-full lg:basis-1/2 ">
                              <input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                placeholder="First Name"
                                className="form-control block w-full lg:w-11/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              />
                              </div>


                              <div className="mb-4 basis-full lg:basis-1/2">
                              <input
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                placeholder="Last Name"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              />
                              </div>

                              <div className="mb-4 basis-full lg:basis-1/2">
                              <input
                                type="text"
                                name="contactNumber"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.contactNumber}
                                placeholder="Contact Number"
                                className="form-control block w-full lg:w-11/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              />
                              </div>

                            
                            <div className="mb-4 basis-full lg:basis-1/2">
                              <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder="Email ID"
                                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              />
                            </div>

                            <div className="mb-4 basis-full ">
                            <input
                              type="text"
                              name="collegeName"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.collegeName}
                              placeholder="College Name "
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                            </div>

                            <div className="mb-4 basis-full ">
                            <input
                              type="text"
                              name="usn"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.usn}
                              placeholder="University number "
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                            </div>


                            <div className="mb-4 basis-full lg:basis-1/2">
                            <input
                              type="text"
                              name="city"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.city}
                              placeholder="City"
                              className="form-control block w-full lg:w-11/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                            </div>

                           


                            <div className="mb-4 basis-full lg:basis-1/2">
                            <input
                              type="text"
                              name="city"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.zip}
                              placeholder="Zip code"
                              className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            />
                            </div>

                            <div className="mb-4 basis-full ">
                            <Field
                              name="state"
                              as="select"
                              className="form-control block state-selector w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                            >
                              <option value="">Select State</option>
                              {states.map((state) => {
                                return (
                                  <option value={state.name} key={state.name}>
                                    {state.name}
                                  </option>
                                );
                              })}
                            </Field>
                          </div>
    

                            <div className="mb-4 basis-full lg:basis-1/2">
                              <input
                                type="password"
                                onChange={handleChange}
                                name="password"
                                className="form-control block w-full  lg:w-11/12 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                id="exampleFormControlInput1"
                                placeholder="Password"
                                value={values.password}
                              />
                            </div>

                            <div className="mb-4 basis-full lg:basis-1/2 ">
                            <input
                              type="password"
                              onChange={handleChange}
                              name="confirmPassword"
                              className="form-control block w-full  px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                              id="exampleFormControlInput1"
                              placeholder="Confirm Password"
                              value={values.confirmPassword}
                            />
                          </div>

                          


                            <div className="text-center pt-1 mb-6 basis-full pb-1">
                              <button
                                className={` py-2.5 text-neutral btn btn-outline btn-warning
                                text-neutral font-bold btn-register
                               text-sm leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg 
                               focus:shadow-lg focus:outline-none focus:ring-0 active:shadow-lg transition
                                duration-150 ease-in-out w-full  ${
                                  loading ? "loading" : null
                                } `}
                                type="submit"
                                data-mdb-ripple="true"
                                data-mdb-ripple-color="light"
                              >
                                Register
                              </button>
                            </div>
                            </div>

                            <div className="">
                              <p className="mb-0 font-bold login-link ">
                                Already have an account?{" "}
                                <Link to="/login" className="text-warning">
                                  Click here
                                </Link>
                              </p>

                              <p className="text-primary font-bold  underline text-center mt-3">
                                {" "}
                                <Link to="/">Back Home</Link>
                              </p>
                            </div>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <div
                    className="lg:w-6/12 flex items-center lg:rounded-r-lg rounded-b-lg lg:rounded-bl-none
              justify-center align-center
              login-container-part2 
             
             "
                    style={{
                      background: "linear-gradient(to right, #8360c3, #2ebf91)",
                    }}
                  >
                    <img
                      src={Exceptions}
                      style={{ width: "500px", height: "500px" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

export default Registration;