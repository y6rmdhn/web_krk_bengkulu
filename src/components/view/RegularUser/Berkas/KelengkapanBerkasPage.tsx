import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import IdentitasTab from "./IdentitasTab";
import BerkasTab from "./BerkasTab";

export default function Berkas() {
  const [activeTab, setActiveTab] = useState("identitas");

  return (
    <MainLayout title="Berkas | KRK Bengkulu">
      <div className="w-full min-h-screen mb-5">
        <div className="max-w-6xl mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">Kelengkapan Berkas</h2>
          <Tabs
            defaultValue="identitas"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            {/* Custom styling untuk Tab List agar sesuai gambar */}
            <TabsList className="grid w-full grid-cols-2 h-12 rounded-lg p-0">
              <TabsTrigger
                value="identitas"
                className="data-[state=active]:bg-[#2451AA] data-[state=active]:text-white text-md font-semibold rounded-tl-lg h-full"
              >
                Identitas
              </TabsTrigger>
              <TabsTrigger
                value="berkas"
                className="data-[state=active]:bg-[#2451AA] data-[state=active]:text-white text-md font-semibold rounded-tr-lg h-full"
              >
                Berkas
              </TabsTrigger>
            </TabsList>

            {/* Konten untuk Tab Identitas */}
            <TabsContent value="identitas">
              <IdentitasTab />
            </TabsContent>

            {/* Konten untuk Tab Berkas */}
            <TabsContent value="berkas">
              <BerkasTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
