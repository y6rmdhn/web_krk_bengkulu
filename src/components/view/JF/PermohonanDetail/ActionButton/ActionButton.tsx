import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, RefreshCcw, Loader2 } from "lucide-react";
import useActionButton from "./useActionButton";

const ActionButtons = ({ id }: { id: string }) => {
  const { formAccept, formRevisiReject, actions, state } = useActionButton(id);

  // State untuk mengatur dialog mana yang terbuka
  const [openDialog, setOpenDialog] = useState<
    "accept" | "revisi" | "reject" | null
  >(null);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-3">
          {/* --- BUTTON & DIALOG SETUJUI --- */}
          <Dialog
            open={openDialog === "accept"}
            onOpenChange={(open) => setOpenDialog(open ? "accept" : null)}
          >
            <DialogTrigger asChild>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Setujui Permohonan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Setujui Permohonan</DialogTitle>
                <DialogDescription>
                  Apakah Anda yakin ingin menyetujui permohonan ini? Tambahkan
                  catatan jika perlu.
                </DialogDescription>
              </DialogHeader>
              <Form {...formAccept}>
                <form
                  onSubmit={(e) => {
                    actions.onAccept(e);
                    setOpenDialog(null); // Tutup dialog setelah submit (opsional, bisa dipindah ke onSuccess)
                  }}
                  className="space-y-4"
                >
                  <FormField
                    control={formAccept.control}
                    name="catatan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catatan (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Masukkan catatan persetujuan..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpenDialog(null)}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700"
                      disabled={state.isPendingAccept}
                    >
                      {state.isPendingAccept && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Setujui
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* --- BUTTON & DIALOG REVISI --- */}
          <Dialog
            open={openDialog === "revisi"}
            onOpenChange={(open) => setOpenDialog(open ? "revisi" : null)}
          >
            <DialogTrigger asChild>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                <RefreshCcw className="h-4 w-4 mr-2" />
                Revisi Permohonan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Revisi Permohonan</DialogTitle>
                <DialogDescription>
                  Berikan alasan revisi agar pemohon dapat memperbaikinya.
                </DialogDescription>
              </DialogHeader>
              <Form {...formAccept}>
                <form
                  onSubmit={(e) => {
                    actions.onRevisi(e);
                    setOpenDialog(null);
                  }}
                  className="space-y-4"
                >
                  <FormField
                    control={formAccept.control}
                    name="catatan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catatan Revisi</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Jelaskan bagian yang perlu diperbaiki..."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpenDialog(null)}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      className="bg-yellow-600 hover:bg-yellow-700"
                      disabled={state.isPendingRevisi}
                    >
                      {state.isPendingRevisi && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Kirim Revisi
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* --- BUTTON & DIALOG TOLAK --- */}
          <Dialog
            open={openDialog === "reject"}
            onOpenChange={(open) => setOpenDialog(open ? "reject" : null)}
          >
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="w-full text-red-600 border-red-600 hover:bg-red-50"
              >
                <XCircle className="h-4 w-4 mr-2" />
                Tolak Permohonan
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-red-600">
                  Tolak Permohonan
                </DialogTitle>
                <DialogDescription>
                  Tindakan ini tidak dapat dibatalkan. Harap berikan alasan
                  penolakan.
                </DialogDescription>
              </DialogHeader>
              <Form {...formRevisiReject}>
                <form
                  onSubmit={(e) => {
                    actions.onReject(e);
                    setOpenDialog(null);
                  }}
                  className="space-y-4"
                >
                  <FormField
                    control={formRevisiReject.control}
                    name="alasan_penolakan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Alasan Penolakan</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Mengapa permohonan ini ditolak?"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpenDialog(null)}
                    >
                      Batal
                    </Button>
                    <Button
                      type="submit"
                      variant="destructive"
                      disabled={state.isPendingReject}
                    >
                      {state.isPendingReject && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      Tolak Permanen
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  );
};

export default ActionButtons;
