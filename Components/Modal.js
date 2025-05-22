"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useRouter } from "next/navigation";

export default function ContactModalForm({ onClose, selectedProject,countryFromURL = "ae"  }) {
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

  const getParam = (key) =>
    urlParams[key] ||
    (typeof window !== "undefined" && localStorage.getItem(key)) ||
    "";

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
      setIsSubmitting(true);

      const formData = {
        ...values,
        utm_ad: getParam("utm_ad"),
        utm_placement: getParam("utm_placement"),
        gclid: getParam("gclid"),
        fbclid: getParam("fbclid"),
        utm_source: getParam("utm_source"),
        utm_campaign: getParam("utm_campaign"),
        utm_keywords: getParam("utm_keywords"),
        project: selectedProject || "",
      };

      const body = new URLSearchParams();
      Object.entries(formData).forEach(([key, val]) => {
        body.append(key, val);
      });

      try {
        // Google Sheets Submit
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

        // External API Submit
     const payload = {
  name: values.name,
  mobile: values.phone,
  email: values.email,
  source: getParam("utm_source") || "Google",
  campaign: getParam("utm_campaign") || "",
  notes: `Project: ${selectedProject || "N/A"}
UTM Source: ${getParam("utm_source")}
UTM Campaign: ${getParam("utm_campaign")}
UTM Ad: ${getParam("utm_ad")}
UTM Placement: ${getParam("utm_placement")}
GCLID: ${getParam("gclid")}
FBCLID: ${getParam("fbclid")}
UTM Keywords: ${getParam("utm_keywords")}`,
};

console.log("Payload being sent:", payload); // Log the payload

const response = await fetch(
  "https://api.cparamount.com/leads/web-hook/campaigns?access_token=YUFZVDMSFFQKNDYWZKRLYBDIA",
  {
    method: "POST",
    headers: {
      Accept: "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
      Authorization: "Bearer YUFZVDMSFFQKNDYWZKRLYBDIA",
    },
    body: JSON.stringify(payload),
  }
);


        const data = await response.json();
        console.log(data)
        resetForm();
        setShouldRedirect(true);
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
      <div className="relative bg-white rounded-[4px] w-full max-w-2xl p-6 shadow-lg">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-black text-[27px] font-bold hover:text-red-600"
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
              className="w-full rounded-full border placeholder:text-black text-black border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
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
              onBlur={() => formik.setFieldTouched("phone", true)}
              inputProps={{
                name: "phone",
                required: true,
                className:
                  "!w-full !pl-16 !pr-5 !py-3 !rounded-full focus:outline-none",
              }}
              inputClass="!w-full !pl-17 !pr-5 !py-6 !px-5 !rounded-full !text-black !text-[16px] !border-none !shadow-none !bg-transparent placeholder:text-gray-400 focus:outline-none"
              containerClass="!w-full !rounded-full !border !border-gray-300 !text-black !shadow-sm !flex !items-center focus-within:ring-2 focus-within:ring-yellow-600"
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
              className="w-full rounded-full border placeholder:text-black text-black border-gray-300 px-5 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-600"
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