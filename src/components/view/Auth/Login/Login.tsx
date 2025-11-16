import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Link } from "react-router-dom";
import Branding from "./Branding";
import AuthLayouts from "@/components/layouts/AuthLayout/AuthLayout";
import useLogin from "./useLogin";
import FormInput from "@/components/commons/FormInput";
import { usePasswordToggle } from "@/hooks/usePasswordToggle";
import { Spinner } from "@/components/ui/spinner";

export default function LoginPage() {
  const { form, handleLogin, isPendingLogin } = useLogin();
  const { showPassword, togglePassword } = usePasswordToggle();

  return (
    <AuthLayouts title="Login | KRK">
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50">
        <main className="flex-1 flex items-center justify-center p-4 lg:p-8 relative overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-0 w-72 h-72 bg-green-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 right-0 w-72 h-72 bg-blue-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          {/* Main Content */}
          <div className="container max-w-6xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Branding */}
              <Branding />

              {/* Right Side - Login Form */}
              <div className="flex justify-center lg:justify-end">
                <Card className="w-full max-w-md border-0 shadow-2xl bg-white/90 backdrop-blur-sm rounded-3xl">
                  <CardHeader className="space-y-6 pb-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-600 text-lg">Halo,</p>
                        <CardTitle className="text-3xl font-bold text-gray-900">
                          Selamat Datang
                        </CardTitle>
                      </div>
                      <img
                        src="/img/jadi 2.png"
                        alt="Logo Bengkulu"
                        className="h-16 w-16"
                      />
                    </div>

                    <div className="text-center">
                      <CardTitle className="text-2xl font-semibold text-gray-800">
                        Masuk ke Akun
                      </CardTitle>
                      <p className="text-gray-600 mt-2">
                        Silakan masuk untuk melanjutkan
                      </p>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <Form {...form}>
                      <form
                        onSubmit={form.handleSubmit(handleLogin)}
                        className="space-y-6"
                      >
                        <FormInput
                          form={form}
                          label="Email"
                          name="email"
                          placeholder="Masukan Email anda"
                          type="email"
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

                        <Button
                          type="submit"
                          disabled={isPendingLogin}
                          className="w-full h-12 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50"
                        >
                          {isPendingLogin ? (
                            <>
                              <Spinner />
                              Loading..
                            </>
                          ) : (
                            "Masuk"
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>

                  <CardFooter className="flex justify-center border-t border-gray-100 pt-6">
                    <p className="text-center text-gray-600">
                      Belum Punya Akun?{" "}
                      <Link
                        to="/register"
                        className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Daftar Sekarang
                      </Link>
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </AuthLayouts>
  );
}
