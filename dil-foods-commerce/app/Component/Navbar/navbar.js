"use client";
import React, { useState } from "react";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { TbUserSquareRounded } from "react-icons/tb";
import "./navbar.css";
import { MdFace } from "react-icons/md";
import SignInModal from "../Main/signinmodal";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CiLock } from "react-icons/ci";

function Navbar() {
  const [modalOpenSign, setModalOpenSign] = useState(false);
  const [userName, setuserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showotp, setshowotp] = useState(false);

  const handelOpenModalSignin = () => {
    setModalOpenSign(true);
  };

  const closeModalSignIn = () => {
    setModalOpenSign(false);
  };

  const handleSubmit = () => {
    // if userName is null or empty alert
    if (userName === "" || phoneNumber === "") {
      alert("Please enter your name or phone number");
      return;
    } else {
      setshowotp(true);
    }
  };

  return (
    <div className="w-full h-20 bg-gradient-to-r from-white via-pink-500 to-red-500 flex justify-between shadow-lg fixed">
      <div className="w-20 h-full mx-5">
        <img
          src="https://dilfoods.in/wp-content/uploads/2023/04/Dil-Foods-new-logo.png"
          alt="Company Logo"
        />
      </div>
      <div className="flex items-center w-20 justify-between me-6">
        <TbUserSquareRounded
          size={30}
          className="cursor-pointer"
          onClick={() => handelOpenModalSignin()}
        />
        <HiOutlineShoppingCart size={30} className="cursor-pointer" />
      </div>
      {modalOpenSign && (
        <SignInModal onClose={closeModalSignIn}>
          {/* Content for the modal */}
          <div className="w-full h-2/4 flex justify-center items-center">
            <div className="w-1/3 h-full flex justify-center rounded-xl items-center bg-white flex-col m-auto">
              <div className="flex h-full justify-center items-center">
                {showotp ? (
                  <div className="h-full p-10">
                    <div>
                      <div className="w-full flex flex-col items-center justify-center mb-2">
                        <CiLock size={50} />
                        <h2 className="text-2l font-bold my-2">
                          Hello {userName}!!!
                        </h2>
                        <h2 className="text-2l font-bold my-2">
                          Please Enter the OTP in +{phoneNumber}
                        </h2>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full p-10">
                    <p className="text-sm font-normal mb-4">
                      Please enter your Mobile number to Sign In. <br />
                      We will send an OTP to verify your number.
                    </p>
                    <div className="flex  flex-col justify-center items-center gap-y-2">
                      <div className="relative h-10 w-full border-2 rounded-lg border-black pl-10 text-sm bg-white">
                        <MdFace className="absolute h-6 w-6 left-2 top-2 text-gray-500" />
                        <input
                          type="text"
                          value={userName}
                          onChange={(e) => setuserName(e.target.value)}
                          className="w-full h-full focus:outline-none"
                          placeholder="Enter Name"
                        />
                      </div>
                      <div className="relative w-full border-2 border-black rounded text-sm">
                        <PhoneInput
                          country={"in"}
                          inputProps={{ required: true }}
                          value={phoneNumber}
                          onChange={(value) => setPhoneNumber(value)}
                          inputClass="w-full h-full focus:outline-none"
                          maxLength="10"
                          minlength="10"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="w-11/12 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                )}
                ;
              </div>
            </div>
          </div>
        </SignInModal>
      )}
    </div>
  );
}

export default Navbar;
