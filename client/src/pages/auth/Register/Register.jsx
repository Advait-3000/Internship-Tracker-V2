import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "@/features/auth/hooks/useAuth";
import { getDashboardRouteForRole } from "@/features/auth/utils/auth.utils";
import aumLogo from "@/assets/images/aum logo with tag.png";
import buildingImg from "@/assets/images/building image.png";
import sunilRane from "@/assets/images/sunilRane 1.png";
import cloudImg from "@/assets/images/cloud.png";
import hatImg from "@/assets/images/hat.png";
import houseImg from "@/assets/images/house.png";
import kiteImg from "@/assets/images/kite.png";

const Register = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    department: "",
    universityRegNo: "",
    rollNo: "",
    academicYear: "",
    division: "",
    semester: "",
    residentialAddress: "",
    dateOfBirth: "",
    mobileNo: "",
    gender: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    try {
      const userData = {
        name: formData.fullName,
        email: formData.email,
        password: formData.mobileNo || "DefaultPass123!", // fallback if mobile empty
        role: "student",
        ...formData,
      };
      const data = await register(userData);
      const redirectPath = getDashboardRouteForRole(data?.user?.role || "student");
      navigate(redirectPath);
    } catch (err) {
      console.error("Registration failed:", err);
      setErrorMsg(err?.response?.data?.message || err?.message || "Registration failed. Please check your inputs.");
    }
  };

  const inputClass =
    "w-full px-2.5 py-1.5 text-xs border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-white placeholder:text-gray-400 text-gray-800 transition";

  const labelClass = "block text-[11px] font-semibold text-gray-700 mb-0.5";

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#f8fbff]"
      style={{ background: "linear-gradient(135deg, #f2f7ff 0%, #f8fbff 50%, #f0f6fe 100%)" }}
    >
      {/* ── AUM Logo – top left ── */}
      <img
        src={aumLogo}
        alt="Atharva University Mumbai"
        className="absolute top-6 left-6 md:top-8 md:left-10 w-44 sm:w-52 md:w-64 object-contain select-none pointer-events-none z-20"
      />

      {/* ── House Constellation – middle left ── */}
      <img
        src={houseImg}
        alt="House Constellation"
        className="absolute top-[26%] left-6 md:left-14 w-36 sm:w-44 md:w-56 object-contain select-none pointer-events-none z-10"
      />

      {/* ── Background building illustration – bottom left ── */}
      <img
        src={buildingImg}
        alt="Atharva University Building"
        className="absolute bottom-0 left-0 w-[260px] sm:w-[360px] md:w-[440px] lg:w-[480px] object-contain object-bottom select-none pointer-events-none z-10"
      />

      {/* ── Cloud illustration – top right ── */}
      <img
        src={cloudImg}
        alt="Cloud"
        className="absolute top-4 right-6 md:top-6 md:right-55 w-44 sm:w-56 md:w-64 object-contain select-none pointer-events-none z-10"
      />

    

      {/* ── Sunil Rane – bottom right ── */}
      <img
        src={sunilRane}
        alt="Sunil Rane"
        className="absolute bottom-0 right-2 md:right-6 w-[240px] sm:w-[300px] md:w-[390px] object-contain object-bottom select-none pointer-events-none z-10"
        style={{ filter: "drop-shadow(0 4px 16px rgba(30,60,120,0.12))" }}
      />

      {/* ── Main content wrapper ── */}
      <div className="relative z-30 w-full max-w-2xl mx-4 my-8">

        {/* ── Form Card ── */}
        <div className="bg-white rounded-2xl shadow-2xl border border-blue-100/80 overflow-hidden">
          {/* Card header */}
          <div
            className="px-6 py-3.5 text-center"
            style={{ background: "linear-gradient(90deg, #1a2a6e 0%, #23408e 100%)" }}
          >
            <h1
              className="text-base font-bold text-white tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif", letterSpacing: "0.06em" }}
            >
              Create New Profile
            </h1>
          </div>

          {/* Form body */}
          <form onSubmit={handleSubmit} className="px-6 py-4 space-y-3">
            {errorMsg && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs px-3 py-2 rounded-lg text-center font-medium">
                {errorMsg}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className={labelClass}>Full Name</label>
              <input
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="e.g., Parth Bholu"
                className={inputClass}
                required
              />
            </div>

            {/* Email ID */}
            <div>
              <label className={labelClass}>Email ID</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g., parth2101@gmail.com"
                className={inputClass}
                required
              />
            </div>

            {/* Department + University Reg No */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Department</label>
                <input
                  name="department"
                  type="text"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="e.g., Be – CMPH"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>University Reg No.</label>
                <input
                  name="universityRegNo"
                  type="text"
                  value={formData.universityRegNo}
                  onChange={handleChange}
                  placeholder="e.g., 1432"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Roll No + Academic Year */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Roll No.</label>
                <input
                  name="rollNo"
                  type="text"
                  value={formData.rollNo}
                  onChange={handleChange}
                  placeholder="e.g., 2"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Academic Year</label>
                <input
                  name="academicYear"
                  type="text"
                  value={formData.academicYear}
                  onChange={handleChange}
                  placeholder="e.g., 2024 – 2028"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Division + Semester */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Division</label>
                <input
                  name="division"
                  type="text"
                  value={formData.division}
                  onChange={handleChange}
                  placeholder="e.g., SE – 1"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Semester</label>
                <input
                  name="semester"
                  type="text"
                  value={formData.semester}
                  onChange={handleChange}
                  placeholder="e.g., Sem 3"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Residential Address */}
            <div>
              <label className={labelClass}>Residential Address</label>
              <input
                name="residentialAddress"
                type="text"
                value={formData.residentialAddress}
                onChange={handleChange}
                placeholder="e.g., ..."
                className={inputClass}
              />
            </div>

            {/* Date Of Birth + Mobile No */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={labelClass}>Date Of Birth</label>
                <input
                  name="dateOfBirth"
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  placeholder="e.g., 06/09/2006"
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Mobile No.</label>
                <input
                  name="mobileNo"
                  type="text"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  placeholder="e.g., 9321489957"
                  className={inputClass}
                />
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className={labelClass}>Gender :</label>
              <div className="flex items-center gap-5 mt-1">
                {["Male", "Female", "Others"].map((g) => (
                  <label key={g} className="flex items-center gap-1.5 cursor-pointer text-xs text-gray-700">
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      className="accent-blue-700 w-3.5 h-3.5"
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-white text-sm font-bold tracking-wide transition-all duration-150 hover:opacity-90 active:scale-[0.99] disabled:opacity-60"
              style={{ background: "linear-gradient(90deg, #1a2a6e 0%, #23408e 100%)" }}
            >
              {loading ? "Creating..." : "Create Profile"}
            </button>

            {/* Sign in link */}
            <p className="text-center text-[11px] text-gray-500 pt-1">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-700 font-semibold hover:underline">
                Sign in
              </Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

