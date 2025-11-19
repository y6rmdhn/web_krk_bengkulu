import { Button } from "@/components/ui/button";
import useSuccessRegister from "./useSuccessRegister";
import { Spinner } from "@/components/ui/spinner";

const SuccessRegister = () => {
  const { handleResendVerifyEmail, isPendingResendVerifyEmail } =
    useSuccessRegister();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-10 max-w-md w-full text-center">
        <img
          src="/img/general/undraw_mailbox_e7nc.svg"
          alt="Check Email Illustration"
          className="w-64 mx-auto mb-6"
        />

        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          Registrasi Berhasil!
        </h1>

        <p className="text-gray-600 mb-6">
          Akun Anda berhasil dibuat.
          <span className="font-semibold">Silahkan cek email Anda</span> untuk
          verifikasi sebelum login.
        </p>

        <Button
          onClick={handleResendVerifyEmail}
          disabled={isPendingResendVerifyEmail}
          className="inline-block bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
        >
          {isPendingResendVerifyEmail ? (
            <Spinner />
          ) : (
            "Kirim Ulang Email Verifikasi"
          )}
        </Button>
      </div>
    </div>
  );
};

export default SuccessRegister;
