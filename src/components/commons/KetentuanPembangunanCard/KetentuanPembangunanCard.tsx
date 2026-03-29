import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface KetentuanPembangunanCardProps {
  data: any;
}

const KetentuanPembangunanCard = ({ data }: KetentuanPembangunanCardProps) => {
  return (
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="bg-gray-50 border-b border-gray-100 pb-4">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Hasil Kajian
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">GSP</span>
            <span className="font-medium text-gray-900">
              {data?.gsp ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">GSB</span>
            <span className="font-medium text-gray-900">
              {data?.gsb ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">KDB</span>
            <span className="font-medium text-gray-900">
              {data?.kdb ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">KLB</span>
            <span className="font-medium text-gray-900">
              {data?.klb ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">KDH</span>
            <span className="font-medium text-gray-900">
              {data?.kdh ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">TB Min</span>
            <span className="font-medium text-gray-900">
              {data?.tb_min ?? "-"}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">TB Max</span>
            <span className="font-medium text-gray-900">
              {data?.tb_max ?? "-"}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KetentuanPembangunanCard;
