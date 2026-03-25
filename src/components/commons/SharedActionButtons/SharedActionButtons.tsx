import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import type { RoleType } from "@/hooks/useSharedActionButton";
import useSharedActionButton from "@/hooks/useSharedActionButton";

const APPROVE_TEMPLATES = ["Sesuai (berkas sudah lengkap)", "Lainnya"];
const REJECT_TEMPLATES = [
  "Dokumen tidak terbaca",
  "Lokasi tidak sesuai koordinat",
  "Berkas persyaratan kurang lengkap",
  "Lainnya",
];
const NEXT_ACTION_OPTIONS = [
  { label: "Lanjut ke Surveyor (Default)", value: "DEFAULT" },
];

interface SharedActionButtonsProps {
  id: string;
  role: RoleType;
  // Props khusus Operator
  isFinal?: boolean;
  isVerificationComplete?: boolean;
  // Props khusus Jabatan Fungsional
  surveyLocation?: { lat: number; lng: number } | null;
}

const SharedActionButtons = ({
  id,
  role,
  isFinal = true,
  isVerificationComplete = false,
  surveyLocation,
}: SharedActionButtonsProps) => {
  const { formAccept, formRevisiReject, actions, state } =
    useSharedActionButton(id, role);
  const [openDialog, setOpenDialog] = useState<
    "accept" | "revisi" | "reject" | null
  >(null);

  const handleTemplateChange = (
    value: string,
    form: any,
    fieldName: string,
  ) => {
    form.setValue(fieldName, value === "Lainnya" ? "" : value);
  };

  // Efek khusus Jabatan Fungsional untuk mengisi Geom
  useEffect(() => {
    if (role === "JF" && surveyLocation) {
      formAccept.setValue("geom", [
        String(surveyLocation.lat),
        String(surveyLocation.lng),
      ]);
    }
  }, [surveyLocation, formAccept, role]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-3">
          {/* ================= BUTTON & DIALOG SETUJUI ================= */}
          <Dialog
            open={openDialog === "accept"}
            onOpenChange={(open) => setOpenDialog(open ? "accept" : null)}
          >
            <DialogTrigger asChild>
              <Button
                disabled={
                  role === "OPERATOR" && !isVerificationComplete && isFinal
                }
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Setujui Permohonan
                {role === "OPERATOR" &&
                  !isVerificationComplete &&
                  isFinal &&
                  " (Terkunci)"}
              </Button>
            </DialogTrigger>
            <DialogContent className={role === "JF" ? "max-w-lg" : ""}>
              <DialogHeader>
                <DialogTitle>Setujui Permohonan</DialogTitle>
                <DialogDescription>
                  {role === "JF"
                    ? "Masukkan parameter teknis. Koordinat survei otomatis tersimpan."
                    : "Apakah Anda yakin ingin menyetujui permohonan ini?"}
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
                  {/* --- Field Khusus Operator --- */}
                  {role === "OPERATOR" && isFinal && (
                    <FormField
                      control={formAccept.control}
                      name="nextAction"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tindak Lanjut Ke</FormLabel>
                          <Select
                            disabled
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Pilih tujuan..." />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {NEXT_ACTION_OPTIONS.map((opt) => (
                                <SelectItem key={opt.value} value={opt.value}>
                                  {opt.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* --- Field Khusus Operator (Template Approve) --- */}
                  {role === "OPERATOR" && (
                    <FormItem>
                      <FormLabel>Template Catatan</FormLabel>
                      <Select
                        onValueChange={(val) =>
                          handleTemplateChange(val, formAccept, "catatan")
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih catatan..." />
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
                  )}

                  {/* --- Field Khusus Jabatan Fungsional (Teknis) --- */}
                  {role === "JF" && (
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "gsp",
                        "gsb",
                        "kdb",
                        "klb",
                        "kdh",
                        "tb_max",
                        "tb_min",
                      ].map((fieldName) => (
                        <FormField
                          key={fieldName}
                          control={formAccept.control}
                          name={fieldName as keyof typeof formAccept.getValues}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="uppercase">
                                {fieldName.replace("_", " ")}
                              </FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="..."
                                  {...field}
                                  value={field.value as string}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                  )}

                  {/* --- Field Catatan Umum (Semua Role) --- */}
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
                      )}{" "}
                      Setujui
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          {/* ================= BUTTON & DIALOG REVISI (Hanya Operator) ================= */}
          {role === "OPERATOR" && (
            <Dialog
              open={openDialog === "revisi"}
              onOpenChange={(open) => setOpenDialog(open ? "revisi" : null)}
            >
              <DialogTrigger asChild>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white">
                  <RefreshCcw className="h-4 w-4 mr-2" /> Revisi Permohonan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Revisi Permohonan</DialogTitle>
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
                              placeholder="Alasan revisi..."
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
                        className="bg-yellow-600 hover:bg-yellow-700 text-white"
                        disabled={state.isPendingRevisi}
                      >
                        {state.isPendingRevisi && (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}{" "}
                        Kirim Revisi
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}

          {/* ================= BUTTON & DIALOG TOLAK (Operator & JF) ================= */}
          {(role === "OPERATOR" || role === "JF") && (
            <Dialog
              open={openDialog === "reject"}
              onOpenChange={(open) => setOpenDialog(open ? "reject" : null)}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full text-red-600 border-red-600 hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4 mr-2" /> Tolak Permohonan
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-red-600">
                    Tolak Permohonan
                  </DialogTitle>
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
                            "alasan_penolakan",
                          )
                        }
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih alasan..." />
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
                              placeholder="Mengapa ditolak?"
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
                        )}{" "}
                        Tolak
                      </Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SharedActionButtons;
