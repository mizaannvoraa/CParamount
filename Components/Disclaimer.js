import React from "react";

const Disclaimer = () => {
  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8 bg-[#cabfbf] text-gray-800">
      <div className="max-w-5xl mx-auto text-center flex flex-col gap-4">
        <h2 className="text-xl sm:text-2xl font-bold">Disclaimer</h2>
        <p className="text-sm sm:text-base font-normal leading-relaxed">
          We collect information from you when you register on our site or fill out a form. When filling out a form on our site, for any of the above-mentioned reasons, you may be asked to enter your name, e-mail address, and phone number. You may, however, visit our site anonymously. Any of the information we collect from you is to personalize your experience, improve our website, and enhance customer service. Any data collected will not be shared with any third party as mentioned in the privacy disclaimer section.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold">Privacy Policy</h2>
        <p className="text-sm sm:text-base font-normal leading-relaxed">
          When you voluntarily send us electronic mail, we keep a record of this information so that we can respond to you. We collect information from you when you register on our site or fill out a form. When doing so, you may be asked to enter your name, e-mail address, or phone number. You may, however, visit our site anonymously. If you have submitted your personal information and contact details, we reserve the right to contact you via Call, SMS, Email, or WhatsApp about our products and offers, even if your number has DND activated on it.
        </p>

        <p className="text-xs sm:text-sm font-medium text-gray-700 mt-4">
          © 2025 Assetz. All rights reserved. | All projects are RERA approved.
        </p>
      </div>
    </div>
  );
};

export default Disclaimer;
