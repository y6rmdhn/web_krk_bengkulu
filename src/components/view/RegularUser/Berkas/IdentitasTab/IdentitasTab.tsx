import InputField from "@/components/commons/InputField";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { User } from "lucide-react";
import useIdentitasTab from "./useIdentitas";

const IdentitasTab = () => {
  const { identitasForm } = useIdentitasTab();

  return (
    <Card className="rounded-t-none border-t-0">
      <CardContent className="p-6">
        <Form {...identitasForm}>
          <form>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Bagian Kiri: Foto Profil */}
              <div className="md:col-span-1 flex flex-col items-center justify-center space-y-4 py-4">
                <Avatar className="h-40 w-40 border-4 border-gray-100">
                  <AvatarImage src="/placeholder-user.jpg" alt="Foto Profil" />
                  <AvatarFallback>
                    <User className="h-20 w-20 text-gray-400" />
                  </AvatarFallback>
                </Avatar>
                <Button type="button" className="bg-[#2451AA]">
                  Ubah Foto
                </Button>
              </div>

              {/* Bagian Kanan: Form Input */}
              <div className="md:col-span-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <InputField
                    id="noKtp"
                    label="No. KTP"
                    form={identitasForm}
                    name="noKtp"
                  />
                  <InputField
                    id="noTelp"
                    label="No. Telp"
                    form={identitasForm}
                    name="noTelp"
                  />
                  <InputField
                    id="nama"
                    label="Nama"
                    className="sm:col-span-2"
                    form={identitasForm}
                    name="nama"
                  />
                  <InputField
                    id="email"
                    label="Email"
                    className="sm:col-span-2"
                    form={identitasForm}
                    name="email"
                  />
                  <InputField
                    id="alamat"
                    label="Alamat"
                    className="sm:col-span-2"
                    form={identitasForm}
                    name="alamat"
                  />

                  {/* Input untuk No, RT, RW */}
                  <div className="sm:col-span-2 grid grid-cols-3 gap-4">
                    <InputField
                      id="no"
                      label="No"
                      form={identitasForm}
                      name="no"
                    />
                    <InputField
                      id="rt"
                      label="RT"
                      form={identitasForm}
                      name="rt"
                    />
                    <InputField
                      id="rw"
                      label="RW"
                      form={identitasForm}
                      name="rw"
                    />
                  </div>

                  <InputField
                    id="jenisKelamin"
                    label="Jenis Kelamin"
                    form={identitasForm}
                    name="jenisKelamin"
                  />
                  <InputField
                    id="kelurahan"
                    label="Kelurahan"
                    form={identitasForm}
                    name="kelurahan"
                  />
                  <InputField
                    id="kecamatan"
                    label="Kecamatan"
                    form={identitasForm}
                    name="kecamatan"
                  />
                  <InputField
                    id="kota"
                    label="Kota"
                    form={identitasForm}
                    name="kota"
                  />
                </div>

                {/* Tombol Simpan */}
                <div className="flex justify-end mt-8">
                  <Button
                    type="submit"
                    className="bg-[#2451AA] hover:bg-[#1D4ED8] px-8"
                  >
                    Simpan
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default IdentitasTab;
