import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import AuthLayouts from "@/components/layouts/AuthLayout/AuthLayout";
import FormInput from "@/components/commons/FormInput";
import { Spinner } from "@/components/ui/spinner";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { useForgotPassword } from "./useForgotPassword";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  const { form, handleForgotPassword, isPendingResetPassword, isSuccess } =
    useForgotPassword();

  const navigate = useNavigate();

  const { showPassword: showOldPassword, togglePassword: toggleOldPassword } =
    usePasswordToggle();
  const { showPassword: showNewPassword, togglePassword: toggleNewPassword } =
    usePasswordToggle();

  return (
    <AuthLayouts title="Ubah Password | KRK">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50">
        <main className="flex-1 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
          {/* Background Elements - Blue theme */}
          <div className="absolute inset-0 z-0">
            {/* Geometric shapes in blue */}
            <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200/30 rotate-45 rounded-3xl mix-blend-multiply filter blur-2xl animate-pulse"></div>
            <div className="absolute top-20 right-20 w-48 h-48 bg-sky-200/30 -rotate-12 rounded-2xl mix-blend-multiply filter blur-2xl animate-pulse animation-delay-1000"></div>
            <div className="absolute bottom-20 left-1/4 w-56 h-56 bg-cyan-200/30 rotate-12 rounded-3xl mix-blend-multiply filter blur-2xl animate-pulse animation-delay-2000"></div>

            {/* Floating dots in blue */}
            <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-blue-300 rounded-full animate-bounce"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-sky-300 rounded-full animate-bounce animation-delay-500"></div>
            <div className="absolute top-1/3 left-1/2 w-4 h-4 bg-cyan-300 rounded-full animate-bounce animation-delay-1000"></div>
          </div>

          {/* Main Content */}
          <div className="container max-w-6xl mx-auto relative z-10">
            <div className="flex justify-center">
              {/* Single column layout */}
              <div className="w-full max-w-lg">
                {/* Header Section */}
                <div className="text-center mb-8">
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-sky-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                          />
                        </svg>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center border-4 border-white">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-sky-600 bg-clip-text text-transparent mb-4">
                    Reset Password
                  </h1>
                  <p className="text-gray-600 text-lg">
                    {isSuccess
                      ? "Password berhasil diubah! Silakan login dengan password baru Anda."
                      : "Masukkan password lama dan baru Anda untuk mengubah password"}
                  </p>
                </div>

                {/* Card Form */}
                <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
                  {/* Decorative header bar */}
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-sky-500"></div>

                  <CardHeader className="text-center pt-8 pb-6">
                    <CardTitle className="text-2xl font-semibold text-gray-800">
                      {isSuccess ? "🎉 Berhasil!" : "Ubah Password Anda"}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pb-8">
                    {!isSuccess ? (
                      <Form {...form}>
                        <form
                          onSubmit={form.handleSubmit(handleForgotPassword)}
                          className="space-y-6"
                        >
                          {/* Password Lama */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-blue-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                              Password Lama
                            </label>
                            <FormInput
                              form={form}
                              name="oldPassword"
                              placeholder="••••••••"
                              type="password"
                              showPassword={showOldPassword}
                              onTogglePassword={toggleOldPassword}
                            />
                          </div>

                          {/* Password Baru */}
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 flex items-center">
                              <svg
                                className="w-4 h-4 mr-2 text-sky-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                                />
                              </svg>
                              Password Baru
                            </label>
                            <FormInput
                              form={form}
                              name="newPassword"
                              placeholder="••••••••"
                              type="password"
                              showPassword={showNewPassword}
                              onTogglePassword={toggleNewPassword}
                            />
                          </div>

                          {/* Requirements */}
                          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                            <p className="text-sm font-medium text-blue-800 mb-2">
                              Requirements:
                            </p>
                            <ul className="text-xs text-blue-600 space-y-1">
                              <li>• Minimal 8 karakter</li>
                              <li>• Huruf Besar & Kecil</li>
                              <li>• Angka & Simbol</li>
                            </ul>
                          </div>

                          <Button
                            type="submit"
                            disabled={isPendingResetPassword}
                            className="w-full h-12 bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 group"
                          >
                            {isPendingResetPassword ? (
                              <>
                                <Spinner />
                                Memproses...
                              </>
                            ) : (
                              <span className="flex items-center justify-center">
                                Ubah Password
                                <svg
                                  className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                  />
                                </svg>
                              </span>
                            )}
                          </Button>
                        </form>
                      </Form>
                    ) : (
                      <div className="text-center space-y-6 py-4">
                        <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        </div>

                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-gray-800">
                            Password Berhasil Diubah!
                          </h3>
                          <p className="text-gray-600">
                            Sekarang Anda bisa login dengan password baru Anda.
                          </p>
                        </div>

                        <Button
                          onClick={() => navigate("/")}
                          className="w-full h-12 bg-gradient-to-r from-blue-500 to-sky-500 hover:from-blue-600 hover:to-sky-600 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200"
                        >
                          Kembali ke halaman utama
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Security Note */}
                <div className="mt-6 text-center">
                  <p className="text-xs text-gray-500 flex items-center justify-center">
                    <svg
                      className="w-4 h-4 mr-1 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Data Anda aman dan terlindungi
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthLayouts>
  );
}
