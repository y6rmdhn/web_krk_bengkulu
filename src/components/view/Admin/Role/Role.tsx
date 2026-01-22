import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import DataTable from "@/components/commons/DataTable";
import DropdownActions from "@/components/commons/DropdownActions";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FormInput from "@/components/commons/FormInput";
import { Pencil, Trash, Plus, Loader2 } from "lucide-react"; // Import Loader2
import useRole from "./useRole";
import useDataTable from "@/hooks/useDataTable";

const RolePage = () => {
  const {
    roleList,
    isLoading,
    form,
    handleSubmit,
    removeRole,
    handleCreateClick, // Ambil dari hook
    handleEditClick, // Ambil dari hook
    handleCancel, // Ambil dari hook
    isPending, // Ambil loading state untuk tombol simpan
  } = useRole();

  const { currentPage, currentLimit, handleChangePage, handleLimitChange } =
    useDataTable();

  // --- LOCAL STATE UNTUK VISIBILITAS POPUP ---
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Kita gunakan state modalType hanya untuk Judul Dialog
  const [modalType, setModalType] = useState<"create" | "edit">("create");

  // --- HANDLERS ---

  // Buka modal untuk Create
  const onOpenCreate = () => {
    setModalType("create");
    handleCreateClick(); // PENTING: Beritahu hook bahwa ini create mode
    setIsDialogOpen(true);
  };

  // Buka modal untuk Edit
  const onOpenEdit = (item: any) => {
    setModalType("edit");
    handleEditClick(item); // PENTING: Masukkan data item ke hook (setEditData)
    setIsDialogOpen(true);
  };

  // Handler saat dialog ditutup (misal klik area luar)
  const onOpenChangeDialog = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      handleCancel(); // Reset form jika dialog ditutup tanpa simpan
    }
  };

  // Buka konfirmasi delete
  const onOpenDelete = (id: string) => {
    setDeleteId(id);
    setIsAlertOpen(true);
  };

  // Eksekusi delete
  const onConfirmDelete = async () => {
    if (deleteId) {
      await removeRole(deleteId);
      setIsAlertOpen(false);
      setDeleteId(null);
    }
  };

  // Wrapper Submit
  const onSubmitWrapper = async (data: any) => {
    // Sekarang handleSubmit mengembalikan Promise<boolean>
    const success = await handleSubmit(data);

    // Hanya tutup modal jika sukses
    if (success) {
      setIsDialogOpen(false);
    }
  };

  const totalPages = Math.ceil((roleList?.length || 0) / currentLimit);

  const tableData = (roleList || [])
    .slice((currentPage - 1) * currentLimit, currentPage * currentLimit)
    .map((item: any, index: number) => [
      (currentPage - 1) * currentLimit + index + 1,
      item.name,
      <span
        className={`px-2 py-1 rounded text-xs font-semibold ${
          item.is_active
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {item.is_active ? "Aktif" : "Tidak Aktif"}
      </span>,
      <DropdownActions
        key={item.id}
        menu={[
          {
            label: (
              <span className="flex gap-2 items-center">
                <Pencil size={16} /> Edit
              </span>
            ),
            action: () => onOpenEdit(item),
          },
          {
            label: (
              <span className="flex gap-2 items-center text-red-600">
                <Trash size={16} /> Hapus
              </span>
            ),
            action: () => onOpenDelete(item.id),
          },
        ]}
      />,
    ]);

  return (
    <AdminLayout title="Role Management" desc="Master Data Role">
      <Button
        onClick={onOpenCreate}
        className="mb-4 bg-blue-600 hover:bg-blue-700"
      >
        <Plus className="mr-2 h-4 w-4" />
        Tambah Role
      </Button>

      <DataTable
        header={["No", "Nama Role", "Status", "Aksi"]}
        data={tableData}
        isLoading={isLoading}
        totalPages={totalPages}
        currentPage={currentPage}
        currentLimit={currentLimit}
        onChangePage={handleChangePage}
        onChangeLimit={handleLimitChange}
      />

      {/* --- MODAL FORM --- */}
      <Dialog open={isDialogOpen} onOpenChange={onOpenChangeDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {modalType === "create" ? "Tambah Role Baru" : "Edit Role"}
            </DialogTitle>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmitWrapper)}
              className="space-y-4"
            >
              <FormInput
                form={form}
                name="name"
                label="Nama Role"
                placeholder="Masukkan nama role"
              />

              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(value === "true")
                      }
                      value={field.value ? "true" : "false"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="true">Aktif</SelectItem>
                        <SelectItem value="false">Tidak Aktif</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={isPending} // Disable saat loading
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isPending ? "Menyimpan..." : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* --- DELETE CONFIRMATION --- */}
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah Anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data role ini akan dihapus
              permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Hapus
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default RolePage;
