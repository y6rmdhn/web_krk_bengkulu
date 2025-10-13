import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Eye, EyeOff } from "lucide-react";
import Header from "@/components/widgets/Header";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  username: z.string().min(1, "Username harus diisi"),
  password: z.string().min(1, "Password harus diisi"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log(data);
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="relative flex flex-1 items-center justify-center p-4 lg:p-8">
        <img
          src="/img/image 1.png"
          alt="Green City Illustration"
          className="absolute object-cover z-0 hidden lg:block -translate-y-1/2 top-1/2 left-1/2 -translate-x-1/2"
        />

        <div className="absolute inset-0 opacity-20 z-0 hidden lg:block"></div>

        <div className="container relative z-10 flex w-full max-w-6xl overflow-hidden rounded-xl">
          <div className="flex w-full items-center justify-center p-8 lg:w-1/2 lg:ml-auto">
            <Card className="relative w-full max-w-md">
              <img
                src="/img/jadi 2.png"
                alt="Logo Bengkulu"
                className="absolute right-6 top-6 h-12 w-12"
              />
              <CardHeader>
                <div className="mb-2">
                  <p className="text-gray-600">Hai,</p>
                  <CardTitle className="text-2xl">Selamat Datang</CardTitle>
                </div>
                <CardTitle className="text-2xl text-center">Login</CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                  >
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Masukkan username Anda"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder="Masukkan password Anda"
                                {...field}
                              />
                              <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                              >
                                {showPassword ? (
                                  <EyeOff size={20} />
                                ) : (
                                  <Eye size={20} />
                                )}
                              </button>
                            </div>
                          </FormControl>
                          <div className="text-right">
                            <a
                              href="#"
                              className="text-sm text-blue-600 hover:underline"
                            >
                              Lupa Kata Sandi?
                            </a>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-[#16a34a] text-lg hover:bg-[#15803d]"
                    >
                      Masuk
                    </Button>
                  </form>
                </Form>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-center text-sm text-gray-600">
                  Belum Punya Akun?{" "}
                  <Link
                    to="/register"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Daftar Sekarang
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
