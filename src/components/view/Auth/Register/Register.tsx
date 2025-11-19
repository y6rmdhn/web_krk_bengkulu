import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { User, Mail, Phone, IdCard } from "lucide-react";
import { Link } from "react-router-dom";
import Branding from "./Barnding";
import useRegister from "./useRegister";
import AuthLayouts from "@/components/layouts/AuthLayout/AuthLayout";
import FormInput from "@/components/commons/FormInput";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";

export default function RegisterPage() {
  const { form, isPendingRegister, handleRegister } = useRegister();

  const {
    showConfirmPassword,
    showPassword,
    toggleConfirmPassword,
    togglePassword,
  } = usePasswordToggle();

  return (
    <AuthLayouts title="Register | KRK Bengkulu">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
        <main className="flex-1 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              src="/img/image 1.png"
              alt="City Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-green-50/80 via-blue-50/60 to-emerald-50/80"></div>
          </div>

          <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob"></div>
          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200/30 rounded-full mix-blend-overlay filter blur-3xl animate-blob animation-delay-4000"></div>

          <div className="container max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Side - Branding */}
              <Branding />

              {/* Right Side - Register Form */}
              <div className="flex justify-center lg:justify-end">
                <Card className="w-full max-w-lg border-0 shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl overflow-hidden">
                  <CardHeader className="space-y-4 pb-6 pt-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">
                          Daftar Akun Baru
                        </CardTitle>
                        <CardDescription className="text-gray-600 mt-1">
                          Isi data diri Anda untuk membuat akun
                        </CardDescription>
                      </div>
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                          <User className="text-white" size={20} />
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleRegister)}
                        className="space-y-4"
                      >
                        <div className="grid grid-cols-1 gap-4">
                          <FormInput
                            form={form}
                            name="nik"
                            label="No. KTP"
                            placeholder="Masukkan No KTP Anda (16 digit)"
                            labelIcon={<IdCard size={16} />}
                            inputClassName="h-11 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                          />

                          <FormInput
                            form={form}
                            name="name"
                            label="Name"
                            placeholder="Masukkan Name Anda"
                            labelIcon={<User size={16} />}
                            inputClassName="h-11 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                          />

                          <FormInput
                            form={form}
                            name="email"
                            label="Email"
                            type="email"
                            placeholder="Masukkan email Anda"
                            labelIcon={<Mail size={16} />}
                            inputClassName="h-11 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                          />

                          <FormInput
                            form={form}
                            name="phone"
                            label="No. Telepon"
                            placeholder="Masukkan nomor telepon Anda"
                            labelIcon={<Phone size={16} />}
                            inputClassName="h-11 rounded-xl border-gray-300 focus:border-green-500 focus:ring-green-500 transition-all duration-200"
                          />

                          <FormInput
                            form={form}
                            name="password"
                            label="Password"
                            placeholder="******"
                            type="password"
                            showPassword={showPassword}
                            onTogglePassword={togglePassword}
                          />

                          <FormInput
                            form={form}
                            name="confirmPassword"
                            label="Konfirmasi Password"
                            placeholder="******"
                            type="password"
                            showPassword={showConfirmPassword}
                            onTogglePassword={toggleConfirmPassword}
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isPendingRegister}
                          className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 mt-6"
                        >
                          {isPendingRegister ? (
                            <div className="flex items-center gap-2">
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Membuat Akun...
                            </div>
                          ) : (
                            "Daftar Sekarang"
                          )}
                        </Button>
                      </form>
                    </Form>

                    <div className="mt-6 text-center border-t border-gray-100 pt-6">
                      <p className="text-gray-600">
                        Sudah punya akun?{" "}
                        <Link
                          to="/login"
                          className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                        >
                          Masuk di sini
                        </Link>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthLayouts>
  );
}
