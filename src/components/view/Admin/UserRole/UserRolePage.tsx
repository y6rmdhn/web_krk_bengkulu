import AdminLayout from "@/components/layouts/AdminLayout";
import DataTable from "@/components/commons/DataTable";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Loader2 } from "lucide-react";
import useUserRole from "./useUserRole";
import useDataTable from "@/hooks/useDataTable";

const UserRolePage = () => {
  const {
    form,
    userList,
    roleList,
    userRoleList,
    isLoading,
    isSubmitting,
    isDialogOpen,
    setIsDialogOpen,
    handleOpenDialog,
    handleSubmit,
  } = useUserRole();

  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  // Setup Table Data
  const totalPages = Math.ceil((userRoleList?.length || 0) / currentLimit);

  const tableData = (userRoleList || [])
    .slice((currentPage - 1) * currentLimit, currentPage * currentLimit)
    .map((item: any, index: number) => [
      (currentPage - 1) * currentLimit + index + 1,
      item.user?.name || "Unknown User", // Sesuaikan struktur object API response
      item.role?.name || "Unknown Role",
      // Tambahkan kolom aksi jika perlu (misal: Unassign)
    ]);

  return (
    <AdminLayout title="User Role Assignment" desc="Atur role untuk user">
      {/* Tombol Assign Role */}
      <Button
        onClick={handleOpenDialog}
        className="mb-4 bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Assign Role
      </Button>

      {/* Tabel */}
      <DataTable
        header={["No", "Nama User", "Role", "Aksi"]}
        data={tableData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleLimitChange}
      />

      {/* --- MODAL ASSIGN ROLE --- */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Assign Role ke User</DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              {/* 1. SELECT USER */}
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih User</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih user..." />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        {userList?.map((item: any) => (
                          <SelectItem key={item.user.id} value={item.user.id}>
                            {item.user.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* 2. SELECT ROLE */}
              <FormField
                control={form.control}
                name="roleId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pilih Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih role..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleList?.map((role: any) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default UserRolePage;
