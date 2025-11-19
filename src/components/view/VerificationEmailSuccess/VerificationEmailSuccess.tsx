import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const VerificationEmailSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/20 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-3">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <CardTitle className="text-2xl font-semibold">
            Email Berhasil Diverifikasi 🎉
          </CardTitle>

          <CardDescription className="text-gray-600">
            Akun kamu sekarang sudah aktif. Silahkan login untuk melanjutkan.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center mt-4">
          <Button
            asChild
            className="px-6 py-2 bg-blue-700 text-white hover:bg-blue-800 rounded-lg transition-all"
          >
            <a href="/login">Pergi ke Login</a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationEmailSuccess;
