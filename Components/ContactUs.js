"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "animate.css";
import "react-phone-input-2/lib/style.css";
import AnimateCard from "./AnimateCard";
export default function ContactForm() {
  const [urlParams, setUrlParams] = useState({
    utm_ad: "",
    utm_placement: "",
    gclid: "",
    fbclid: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = new URLSearchParams(window.location.search);
      const params = {
        utm_ad: query.get("utm_ad") || "",
        utm_placement: query.get("utm_placement") || "",
        gclid: query.get("gclid") || "",
        fbclid: query.get("fbclid") || "",
      };

      setUrlParams(params);

      Object.entries(params).forEach(([key, value]) =>
        localStorage.setItem(key, value)
      );
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      project: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      project: Yup.string().required("Project selection is required"),
      phone: Yup.string().required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      const utm_ad = urlParams.utm_ad || localStorage.getItem("utm_ad") || "";
      const utm_placement =
        urlParams.utm_placement || localStorage.getItem("utm_placement") || "";
      const gclid = urlParams.gclid || localStorage.getItem("gclid") || "";
      const fbclid = urlParams.fbclid || localStorage.getItem("fbclid") || "";

      const formData = {
        ...values,
        utm_ad,
        utm_placement,
        gclid,
        fbclid,
      };

      const body = new URLSearchParams();
      Object.entries(formData).forEach(([key, val]) => {
        body.append(key, val);
      });

      setIsSubmitting(true);
      setStatus("Submitting...");

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbxACDHcXZaxzcaWH_0-JMkKPIChjJZA-BMA6ozCvSQqAjFa7mLCfVegeEWVP2q756RZsQ/exec",
          {
            method: "POST",
            mode: "no-cors", 
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
          }
        );

        setStatus("Form submitted successfully!");
        resetForm();
      } catch (error) {
        console.error("Error submitting form", error);
        setStatus(`Something went wrong: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <AnimateCard animationClass="animate__fadeIn">
        <div
          className="bg-gray-100 pb-5 lg:pb-13 px-4 l lg:py-0 py-5"
          id="contact"
        >
          <div className="text-center mb-10">
            <h2 className="text-[#D2A23A] mt-4 text-xl md:text-3xl font-extrabold">
              Contact Us
            </h2>
            <div className="mx-auto mt-[1px] w-29 h-1 bg-black rounded"></div>
          </div>
          <h2 className="text-center text-black font-bold mb-6">
            Please enter the details below to get in touch with us!
          </h2>

          {status && (
            <div
              className={`text-center text-lg font-medium ${
                status.includes("success")
                  ? "text-green-500"
                  : status === "Submitting..."
                  ? "text-blue-500"
                  : "text-red-500"
              } mb-6`}
            >
              {status}
            </div>
          )}

          <form
            onSubmit={formik.handleSubmit}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            <div>
              <input
                name="name"
                type="text"
                placeholder="Name*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full rounded-full border border-gray-300 px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 placeholder-black"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1 ml-5">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="w-full">
              <PhoneInput
                country={"ae"}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                onBlur={formik.handleBlur}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                inputClass="!w-full !pl-17 !pr-5 !py-6 !px-5 !rounded-full !text-[16px] !border-none !shadow-none !bg-transparent !placeholder-black focus:outline-none"
                containerClass="!w-full  !rounded-full !border !border-gray-300 !shadow-sm !flex !items-center focus-within:ring-2 focus-within:ring-yellow-600"
                buttonClass="!bg-gray-100  !border-none !rounded-l-full !h-full !flex !items-center !pl-4"
                dropdownClass="!rounded-md"
                placeholder="Phone*"
              />
              {formik.touched.phone && formik.errors.phone && (
                <div className="text-red-500 text-sm mt-1 ml-5">
                  {formik.errors.phone}
                </div>
              )}
            </div>
            <div>
              <input
                name="email"
                type="email"
                placeholder="Email*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full rounded-full border border-gray-300 px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 placeholder-black"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1 ml-5">
                  {formik.errors.email}
                </div>
              )}
            </div>
            <div>
              <select
                name="project"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.project}
                className="w-full rounded-full border border-gray-300 px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-600"
              >
                <option value="">Select Project*</option>
                <option value="Project A">Project A</option>
                <option value="Project B">Project B</option>
                <option value="Project C">Project C</option>
              </select>
              {formik.touched.project && formik.errors.project && (
                <div className="text-red-500 text-sm mt-1 ml-5">
                  {formik.errors.project}
                </div>
              )}
            </div>

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-[#D09E32] hover:bg-yellow-700"
                } text-white font-medium py-2 px-8 rounded-md transition`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </AnimateCard>
    </>
  );
}
