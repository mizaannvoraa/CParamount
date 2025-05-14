"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ContactModalForm({ onClose }) {
  const [urlParams, setUrlParams] = useState({
    utm_ad: "",
    utm_placement: "",
    gclid: "",
    fbclid: "",
  });

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Get URL parameters when the component mounts
    if (typeof window !== 'undefined') {
      const query = new URLSearchParams(window.location.search);
      const params = {
        utm_ad: query.get("utm_ad") || "",
        utm_placement: query.get("utm_placement") || "",
        gclid: query.get("gclid") || "",
        fbclid: query.get("fbclid") || "",
      };
      setUrlParams(params);

      // Store parameters in localStorage
      Object.entries(params).forEach(([key, value]) => {
        if (value) localStorage.setItem(key, value);
      });
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      phone: Yup.string().required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      // Prevent default form submission behavior
      setIsSubmitting(true);
      setStatus("Submitting...");

      // Get UTM parameters from state or localStorage
      const utm_ad = urlParams.utm_ad || (typeof window !== 'undefined' && localStorage.getItem("utm_ad")) || "";
      const utm_placement = urlParams.utm_placement || (typeof window !== 'undefined' && localStorage.getItem("utm_placement")) || "";
      const gclid = urlParams.gclid || (typeof window !== 'undefined' && localStorage.getItem("gclid")) || "";
      const fbclid = urlParams.fbclid || (typeof window !== 'undefined' && localStorage.getItem("fbclid")) || "";

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

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxACDHcXZaxzcaWH_0-JMkKPIChjJZA-BMA6ozCvSQqAjFa7mLCfVegeEWVP2q756RZsQ/exec",
          {
            method: "POST",
            mode: "no-cors", // Add this to handle CORS issues
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
          }
        );

        // Since we're using no-cors, we can't actually read the response
        // So we'll assume success if no error is thrown
        setStatus("Form submitted successfully!");
        resetForm();
        
        // Optional: close modal after successful submission
        setTimeout(() => {
          onClose();
        }, 2000);
      } catch (error) {
        console.error("Error submitting form", error);
        setStatus("Something went wrong. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
      <div className="relative bg-white rounded-2xl w-full max-w-2xl p-6 shadow-lg">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-2xl font-bold hover:text-red-600"
        >
          &times;
        </button>

        <h2 className="text-[#D2A23A] uppercase text-xl md:text-3xl font-extrabold text-center mb-2">
          Classic Paramount
        </h2>
        <div className="mx-auto mt-1 w-24 h-1 bg-black rounded"></div>
        <p className="text-center font-semibold text-black my-4">
          Please enter the details below to get in touch with us!
        </p>

        {status && (
          <div
            className={`text-center font-medium mb-4 ${
              status.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              name="name"
              type="text"
              placeholder="Name*"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              className="w-full rounded-full border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
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
              onBlur={() => formik.setFieldTouched("phone", true)}
              inputProps={{
                name: "phone",
                required: true,
                className: "!w-full !pl-16 !pr-5 !py-3 !rounded-full focus:outline-none",
              }}
              inputClass="!w-full !pl-17 !pr-5 !py-6 !px-5 !rounded-full !text-[16px] !border-none !shadow-none !bg-transparent placeholder:text-gray-400 focus:outline-none"
              containerClass="!w-full !rounded-full !border !border-gray-300 !shadow-sm !flex !items-center focus-within:ring-2 focus-within:ring-yellow-600"
              buttonClass="!bg-gray-100 !border-none !rounded-l-full !h-full !flex !items-center !pl-4"
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
              className="w-full rounded-full border border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-500 text-sm mt-1 ml-5">
                {formik.errors.email}
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
              } text-white font-semibold py-3 px-8 rounded-full transition duration-200`}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}