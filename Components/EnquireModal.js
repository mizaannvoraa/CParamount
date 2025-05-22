"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import "react-phone-input-2/lib/style.css";
import "animate.css";
import { useRouter } from "next/navigation";

export default function EnquireModal({ isOpen, onClose,countryFromURL = "ae" }) {
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
      const utm = {
        utm_ad: urlParams.utm_ad || localStorage.getItem("utm_ad") || "",
        utm_placement:
          urlParams.utm_placement ||
          localStorage.getItem("utm_placement") ||
          "",
        gclid: urlParams.gclid || localStorage.getItem("gclid") || "",
        fbclid: urlParams.fbclid || localStorage.getItem("fbclid") || "",
        utm_source:
          urlParams.utm_source || localStorage.getItem("utm_source") || "",
        utm_campaign:
          urlParams.utm_campaign || localStorage.getItem("utm_campaign") || "",
        utm_keywords:
          urlParams.utm_keywords || localStorage.getItem("utm_keywords") || "",
      };
      const { utm_source, utm_campaign } = utm;

      const formData = {
        ...values,
        project: values.project.label,
        ...utm,
      };

      const body = new URLSearchParams();
      Object.entries(formData).forEach(([key, val]) => body.append(key, val));

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
              notes: `Project: ${values.project ? values.project.label : "N/A"}
UTM Source: ${utm.utm_source}
UTM Campaign: ${utm.utm_campaign}
UTM Ad: ${utm.utm_ad}
UTM Placement: ${utm.utm_placement}
GCLID: ${utm.gclid}
FBCLID: ${utm.fbclid}
UTM Keywords: ${utm.utm_keywords}`,
            }),
          }
        );

        const data = await response.json();
        
        setShouldRedirect(true);
        resetForm();
        setFieldValue("project", null);
      } catch (error) {
        console.error(error);
        setStatus(`Something went wrong: ${error.message}`);
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center px-4 py-6 overflow-y-auto">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg animate__animated animate__fadeIn">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-[#D2A23A]">Enquire</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 cursor-pointer text-xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="px-6 py-4">
          <h3 className="text-center font-semibold mb-4 text-black">
            Please enter the details below to get in touch with us!
          </h3>

          {status && (
            <div
              className={`text-center font-medium text-sm mb-4 ${
                status.includes("success")
                  ? "text-green-600"
                  : status === "Submitting..."
                  ? "text-blue-500"
                  : "text-red-500"
              }`}
            >
              {status}
            </div>
          )}

          <form
            onSubmit={formik.handleSubmit}
            className="grid gap-4 md:grid-cols-2"
          >
            <div className="flex flex-col">
              <input
                name="name"
                type="text"
                placeholder="Name*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                className="w-full border border-gray-300 rounded-full px-5 py-3 text-black placeholder-black focus:outline-none focus:border-[#D2A23A] focus:border-3"
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-sm text-red-600 mt-1">
                  {formik.errors.name}
                </div>
              )}
            </div>

            <div className="flex flex-col">
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
                <div className="text-sm text-red-600 mt-1">
                  {formik.errors.phone}
                </div>
              )}
            </div>

            <div className="flex flex-col">
              <input
                name="email"
                type="email"
                placeholder="Email*"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className="w-full border border-gray-300 rounded-full px-5 py-3 text-black placeholder-black focus:outline-none focus:border-[#D2A23A] focus:border-3"
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-sm text-red-600 mt-1">
                  {formik.errors.email}
                </div>
              )}
            </div>

            <div className="flex flex-col">
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
                      : "transparent", 
                    borderRadius: "9999px",
                    borderWidth: "1px",
                    borderColor: state.isFocused ? "#D2A23A" : "#D1D5DB",
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
                      borderColor: "#D2A23A",
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
                <div className="text-sm text-red-600 mt-1">
                  {formik.errors.project}
                </div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2 text-center mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 rounded-full text-white font-semibold transition ${
                  isSubmitting
                    ? "bg-gray-400"
                    : "bg-yellow-600 hover:bg-yellow-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}