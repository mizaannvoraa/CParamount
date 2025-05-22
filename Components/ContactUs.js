"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "animate.css";
import "react-phone-input-2/lib/style.css";
import AnimateCard from "@/Components/AnimateCard";
import Select from "react-select";
import { useRouter } from "next/navigation";

export default function ContactForm({ countryFromURL = "ae" }) {
  const [urlParams, setUrlParams] = useState({
    utm_ad: "",
    utm_placement: "",
    gclid: "",
    fbclid: "",
    utm_source: "",
    utm_campaign: "",
    utm_keywords: "",
  });
  const router = useRouter();
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (shouldRedirect) {
      router.push("/thank-you");
    }
  }, [shouldRedirect, router]);

  const countryCodeMap = {
    canada: "ca",
    usa: "us",
    india: "in",
    dubai: "ae",
    uae: "ae",
    uk: "gb",
  };

  const getPhoneCountryCode = (country) => {
    return countryCodeMap[country?.toLowerCase()] || "ae"; // Default to 'ae' (UAE)
  };
  const [phoneCountry, setPhoneCountry] = useState("ae");

  useEffect(() => {
    setPhoneCountry(getPhoneCountryCode(countryFromURL));
  }, [countryFromURL]);

  const projectOptions = [
    { value: "Project A", label: "Sobha" },
    { value: "Project B", label: "Damac" },
    { value: "Project C", label: "Emaar" },
    { value: "Project D", label: "Binghatti" },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const query = new URLSearchParams(window.location.search);
      const params = {
        utm_ad: query.get("utm_ad") || "",
        utm_placement: query.get("utm_placement") || "",
        gclid: query.get("gclid") || "",
        fbclid: query.get("fbclid") || "",
        utm_source: query.get("utm_source") || "",
        utm_campaign: query.get("utm_campaign") || "",
        utm_keywords: query.get("utm_keywords") || "",
      };

      setUrlParams(params);

      Object.entries(params).forEach(([key, value]) =>
        localStorage.setItem(key, value)
      );
    }
  }, []);
  useEffect(() => {
    if (status.includes("success")) {
      const timer = setTimeout(() => setStatus(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const formik = useFormik({
    initialValues: {
      name: "",
      project: null,
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      project: Yup.object()
        .nullable()
        .required("Project selection is required"),
      phone: Yup.string().required("Phone number is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { resetForm, setFieldValue }) => {
      const utm_ad = urlParams.utm_ad || localStorage.getItem("utm_ad") || "";
      const utm_placement =
        urlParams.utm_placement || localStorage.getItem("utm_placement") || "";
      const gclid = urlParams.gclid || localStorage.getItem("gclid") || "";
      const fbclid = urlParams.fbclid || localStorage.getItem("fbclid") || "";
      const utm_source =
        urlParams.utm_source || localStorage.getItem("utm_source") || "";
      const utm_campaign =
        urlParams.utm_campaign || localStorage.getItem("utm_campaign") || "";
      const utm_keywords =
        urlParams.utm_keywords || localStorage.getItem("utm_keywords") || "";

      const formData = {
        ...values,
        project: values.project ? values.project.label : "",
        utm_ad,
        utm_placement,
        gclid,
        fbclid,
        utm_source,
        utm_campaign,
        utm_keywords,
      };

      const body = new URLSearchParams();
      Object.entries(formData).forEach(([key, val]) => {
        body.append(key, val);
      });

      setIsSubmitting(true);

      try {
        await fetch(
          "https://script.google.com/macros/s/AKfycbwTYqeq_iHIsazYotEm-C_fxnN5CI8spaw-gPmfuhjWvZdtXGMJ6HmUKfzgCRdH0cvD-Q/exec",
          {
            method: "POST",
            mode: "no-cors",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: body.toString(),
          }
        );

        const response = await fetch(
          "https://api.cparamount.com/leads/web-hook/campaigns?access_token=YUFZVDMSFFQKNDYWZKRLYBDIA",
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              "User-Agent": "Thunder Client (https://www.thunderclient.com)",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: values.name,
              mobile: values.phone,
              email: values.email,
              source: utm_source || "Google",
              campaign: utm_campaign || "",
              notes: `Project: ${values.project?.label || "N/A"}
UTM Source: ${utm_source}
UTM Campaign: ${utm_campaign}
UTM Ad: ${utm_ad}
UTM Placement: ${utm_placement}
GCLID: ${gclid}
FBCLID: ${fbclid}
UTM Keywords: ${utm_keywords}`,
            }),
          }
        );

        const data = await response.json();
        resetForm();
        setShouldRedirect(true);
        setFieldValue("project", null);
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
                className="w-full rounded-full border border-gray-300 !text-black px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-600 placeholder-black"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500 text-sm mt-1 ml-5">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="w-full">
              <PhoneInput
                country={phoneCountry}
                value={formik.values.phone}
                onChange={(phone) => formik.setFieldValue("phone", phone)}
                onBlur={formik.handleBlur}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                inputClass="!w-full !pl-17 !pr-5 !py-6 !px-5 !rounded-full !text-[16px] !border-none !text-black !shadow-none !bg-transparent !placeholder-black focus:outline-none"
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
                className="w-full rounded-full border !text-black border-gray-300 px-5 py-3 shadow-sm focus:outline-none  focus:ring-yellow-600 placeholder-black"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-sm mt-1 ml-5">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div>
              <Select
                name="project"
                options={projectOptions}
                value={formik.values.project}
                onChange={(option) => formik.setFieldValue("project", option)}
                onBlur={() => formik.setFieldTouched("project", true)}
                placeholder="Select Developer*"
                className="w-full"
                styles={{
                  control: (base, state) => ({
                    ...base,
                    backgroundColor: formik.values.project
                      ? "#E6F0FF"
                      : "transparent", // Apply bg if project selected
                    borderRadius: "9999px",
                    borderWidth: "1px",
                    borderColor: state.isFocused ? "#D97706" : "#D1D5DB",
                    boxShadow: state.isFocused
                      ? "0 0 0 2px rgba(234,179,8, 0.5)"
                      : "0 1px 2px rgba(0, 0, 0, 0.05)",
                    paddingLeft: "1.25rem",
                    paddingRight: "1.25rem",
                    minHeight: "3.2rem",
                    fontSize: "1rem",
                    color: "#000000",
                    outline: "none",
                    "&:hover": {
                      borderColor: "#D97706",
                    },
                  }),
                  placeholder: (base) => ({
                    ...base,
                    color: "#000000",
                  }),
                  singleValue: (base) => ({
                    ...base,
                    color: "#000000",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: "0.5rem",
                    zIndex: 20,
                  }),
                  menuList: (base) => ({
                    ...base,
                    maxHeight: 150,
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? "#FEF3C7" : "white",
                    color: "#000000",
                    padding: "10px 16px",
                    cursor: "pointer",
                  }),
                }}
              />

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
