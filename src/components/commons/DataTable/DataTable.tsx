import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { type ReactNode } from "react";
import PaginationDataTable from "../PaginationDataTable";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { LIMIT_LISTS } from "@/constants/dataTable.constant";
import { Label } from "@/components/ui/label";

const DataTable = ({
  header,
  data,
  isLoading,
  totalPages,
  currentPage,
  currentLimit,
  onChangePage,
  onChangeLimit,
}: {
  header: string[];
  data: (string | ReactNode)[][];
  isLoading?: boolean;
  totalPages: number;
  currentPage: number;
  currentLimit: number;
  onChangePage: (page: number) => void;
  onChangeLimit: (limit: number) => void;
}) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <Card className="p-0">
        <Table className="w-full rounded-lg overflow-hidden">
          <TableHeader className="bg-muted sticky top-0 z-10">
            <TableRow>
              {header.map((column) => (
                <TableHead key={`th-${column}`} className="px-6 py-3">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={header.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={header.length} className="h-24 text-center">
                  No Result Data
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={`tr-${rowIndex}`}>
                  {row.map((column, columnIndex) => (
                    <TableCell
                      key={`tc-${rowIndex}-${columnIndex}`}
                      className="px-6 py-3"
                    >
                      {column}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Label>Limit</Label>
          <Select
            value={currentLimit.toString()}
            onValueChange={(value) => onChangeLimit(Number(value))}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Limit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Limit</SelectLabel>
                {LIMIT_LISTS.map((limit) => (
                  <SelectItem key={limit} value={limit.toString()}>
                    {limit}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {totalPages > 1 && (
          <div className="flex justify-end">
            <PaginationDataTable
              currentPage={currentPage}
              onChangePage={onChangePage}
              totalPages={totalPages}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;
