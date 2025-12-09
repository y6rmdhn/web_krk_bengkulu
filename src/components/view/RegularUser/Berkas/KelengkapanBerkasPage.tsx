import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainLayout from "@/components/layouts/MainLayout/MainLayout";
import IdentitasTab from "./IdentitasTab";
import BerkasTab from "./BerkasTab";

export default function Berkas() {
  // State untuk melacak tab mana yang aktif
  const [activeTab, setActiveTab] = useState("identitas");

  return (
    <MainLayout title="Berkas | KRK Bengkulu">
      <div className="w-full min-h-screen mb-5">
        <div className="max-w-6xl mx-auto mt-6 md:mt-10 px-4 md:px-6 lg:px-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4 text-gray-900">
            Kelengkapan Berkas
          </h2>

          {/* Gunakan Tabs hanya untuk Navigasi/Trigger */}
          <Tabs
            defaultValue="identitas"
            className="w-full"
            value={activeTab}
            onValueChange={setActiveTab}
          >
            {/* Tab List */}
            <TabsList className="grid w-full grid-cols-2 h-12 rounded-lg p-1 bg-gray-100/80 mb-6">
              <TabsTrigger
                value="identitas"
                className="data-[state=active]:bg-[#2451AA] data-[state=active]:text-white text-sm md:text-md font-semibold rounded-md h-full transition-all"
              >
                Identitas
              </TabsTrigger>
              <TabsTrigger
                value="berkas"
                className="data-[state=active]:bg-[#2451AA] data-[state=active]:text-white text-sm md:text-md font-semibold rounded-md h-full transition-all"
              >
                Berkas
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <div className={activeTab === "identitas" ? "block" : "hidden"}>
            <IdentitasTab />
          </div>

          <div className={activeTab === "berkas" ? "block" : "hidden"}>
            <BerkasTab />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
