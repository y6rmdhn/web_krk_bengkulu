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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, RefreshCcw, Loader2 } from "lucide-react";
import useActionButton from "./useActionButton";

const APPROVE_TEMPLATES = ["Sesuai (berkas sudah lengkap)", "Lainnya"];

const REJECT_TEMPLATES = [
  "Dokumen tidak terbaca",
  "Lokasi tidak sesuai koordinat",
  "Berkas persyaratan kurang lengkap",
  "Lainnya",
];

const ActionButtons = ({ id }: { id: string }) => {
  const { formAccept, formRevisiReject, actions, state } = useActionButton(id);

  const [openDialog, setOpenDialog] = useState<
    "accept" | "revisi" | "reject" | null
  >(null);

  const handleTemplateChange = (
    value: string,
    form: any,
    fieldName: string
  ) => {
    if (value === "Lainnya") {
      form.setValue(fieldName, "");
    } else {
      form.setValue(fieldName, value);
    }
  };

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
                  Apakah Anda yakin ingin menyetujui permohonan ini? Pilih
                  template catatan atau ketik manual.
                </DialogDescription>
              </DialogHeader>
              <Form {...formAccept}>
                <form
                  onSubmit={(e) => {
                    actions.onAccept(e);
                    setOpenDialog(null);
                  }}
                  className="space-y-4"
                >
                  <FormItem>
                    <FormLabel>Template Catatan</FormLabel>
                    <Select
                      onValueChange={(val) =>
                        handleTemplateChange(val, formAccept, "catatan")
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih catatan template..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {APPROVE_TEMPLATES.map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

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
                  <FormItem>
                    <FormLabel>Template Revisi</FormLabel>
                    <Select
                      onValueChange={(val) =>
                        handleTemplateChange(val, formAccept, "catatan")
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih alasan revisi..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {REJECT_TEMPLATES.map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

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
                  <FormItem>
                    <FormLabel>Template Penolakan</FormLabel>
                    <Select
                      onValueChange={(val) =>
                        handleTemplateChange(
                          val,
                          formRevisiReject,
                          "alasan_penolakan"
                        )
                      }
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih alasan penolakan..." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {REJECT_TEMPLATES.map((item, idx) => (
                          <SelectItem key={idx} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>

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
