"use client";

import { useState, useEffect } from "react";
import { Input, Link, Select, SelectItem } from "@nextui-org/react";
import {
  signUp,
  customSignUp,
  startPhoneAuth,
  setupRecaptcha,
  verifyOTP,
} from "@/utils/authFunctions"; // Import Firebase auth function
import { useRouter } from "next/navigation"; // For redirecting after signup
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/firebase";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    countryCode: "+1",
    rememberMe: false,
    firstName: "",
    lastName: "",
    email: "",
    password: "", // Added password field
  });
  const [error, setError] = useState(""); // Added error state
  const [verificationId, setVerificationId] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [authMethod, setAuthMethod] = useState<"email" | "phone" | null>(null);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [sent, setSent] = useState(false);
  const [timer, setTimer] = useState(20); // 20 seconds timer
  const [verificationSent, setVerificationSent] = useState(false); // Track if verification code is sent

  console.log(formData.phoneNumber);
  const countryCodes = [
    { label: "US (+1)", value: "+1" },
    { label: "UK (+44)", value: "+44" },
    { label: "CA (+1)", value: "+1" },
    { label: "AU (+61)", value: "+61" },
    { label: "TR (+90)", value: "+90" },
    // Add more country codes as needed
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResendDisabled && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsResendDisabled(false);
      setTimer(20); // Reset timer
    }
    return () => clearInterval(interval);
  }, [isResendDisabled, timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signUp(formData.email, formData.password);

      router.push("/dashboard"); // Redirect to dashboard after successful signup
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGithubSignIn = async () => {
    try {
      const provider = new GithubAuthProvider();
      const result = await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleOracleSignIn = () => {
    // Remove or replace with another provider
  };

  const handlePhoneSignIn = async () => {
    try {
      const fullPhoneNumber = `${formData.countryCode}${formData.phoneNumber}`;
      const recaptchaVerifier = setupRecaptcha("recaptcha-container");
      const verificationId = await startPhoneAuth(
        fullPhoneNumber,
        recaptchaVerifier
      );
      setVerificationId(verificationId);
      setShowOtpInput(true);
      setIsResendDisabled(true); // Disable resend button
      setVerificationSent(true); // Mark verification as sent
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      setSent(false);
      await verifyOTP(verificationId, otp);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Create your account
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Choose your signup method
          </p>
        </div>

        {!authMethod && (
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setAuthMethod("email")}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
              Sign up with Email
            </button>

            <button
              type="button"
              onClick={() => setAuthMethod("phone")}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <svg
                className="w-5 h-5 mr-2"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z" />
              </svg>
              Sign up with Phone
            </button>
          </div>
        )}

        {authMethod && (
          <button
            type="button"
            onClick={() => {
              setAuthMethod(null);
              setShowOtpInput(false);
              setError("");
            }}
            className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
          >
            ← Back to signup options
          </button>
        )}

        {authMethod === "email" && (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="First name"
                  className="flex-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  required
                />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Last name"
                  className="flex-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  required
                />
              </div>

              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email address"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                required
              />

              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Password"
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                required
              />

              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Create account
              </button>
            </div>
          </form>
        )}

        {authMethod === "phone" && (
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="flex gap-2">
                <select
                  value={formData.countryCode}
                  onChange={(e) =>
                    setFormData({ ...formData, countryCode: e.target.value })
                  }
                  className="block rounded-lg w-32 px-3 py-2 border border-gray-300 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.value}>
                      {country.label}
                    </option>
                  ))}
                </select>

                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder="Phone number"
                  className="flex-1 appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>

              <div id="recaptcha-container"></div>

              {!showOtpInput ? (
                <button
                  type="button"
                  onClick={handlePhoneSignIn}
                  className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Send Verification Code
                </button>
              ) : (
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex justify-center space-x-1">
                    {Array.from({ length: 6 }).map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ""}
                        onChange={(e) => {
                          const value = e.target.value;
                          if (/^[0-9]$/.test(value) || value === "") {
                            const newOtp = otp.split("");
                            newOtp[index] = value;
                            setOtp(newOtp.join(""));
                            // Move to the next input if filled
                            if (value && index < 5) {
                              document
                                .getElementById(`otp-input-${index + 1}`)
                                ?.focus();
                            }
                          }
                        }}
                        onFocus={(e) => e.target.select()}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !otp[index]) {
                            // Move to the previous input if current is empty
                            if (index > 0) {
                              document
                                .getElementById(`otp-input-${index - 1}`)
                                ?.focus();
                            }
                          }
                        }}
                        id={`otp-input-${index}`}
                        className="w-12 h-12 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200 ease-in-out"
                  >
                    Verify Code
                  </button>
                </div>
              )}
            </div>

            {verificationSent && isResendDisabled && (
              <div className="text-center mt-4">
                <p>Resend code in {timer} seconds</p>
              </div>
            )}

            {verificationSent && !isResendDisabled && (
              <button
                type="button"
                onClick={handlePhoneSignIn}
                className="text-blue-600 hover:text-blue-800 mt-4"
              >
                Resend Code
              </button>
            )}
          </div>
        )}

        {error && <div className="text-red-500 text-sm">{error}</div>}

        {authMethod && (
          <>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  or continue with
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
          </>
        )}

        <p className="text-sm text-gray-600 text-center">
          Already have an account?{" "}
          <Link
            href="/auth/signin"
            className="text-blue-600 hover:text-blue-800"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
