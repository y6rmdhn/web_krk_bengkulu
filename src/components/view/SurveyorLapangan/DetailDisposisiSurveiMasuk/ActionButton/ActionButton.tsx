import { useState, useEffect } from "react"; // <--- Jangan lupa import useEffect
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
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import useActionButton from "./useActionButton";

// Tambahkan props surveyLocation agar bisa menerima data dari induk
interface ActionButtonsProps {
  id: string;
  surveyLocation: { lat: number; lng: number } | null;
}

const ActionButtons = ({ id, surveyLocation }: ActionButtonsProps) => {
  const { formAccept, formRevisiReject, actions, state } = useActionButton(id);

  const [openDialog, setOpenDialog] = useState<
    "accept" | "revisi" | "reject" | null
  >(null);

  // WAJIB: Efek ini akan memasukkan koordinat peta ke dalam form secara otomatis
  useEffect(() => {
    if (surveyLocation) {
      // Pastikan format array string ["lat", "long"]
      formAccept.setValue("geom", [
        String(surveyLocation.lat),
        String(surveyLocation.lng),
      ]);
    }
  }, [surveyLocation, formAccept, openDialog]);

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-3">
          {/* --- DIALOG SETUJUI (APPROVE) --- */}
          <Dialog
            open={openDialog === "accept"}
            onOpenChange={(open) => setOpenDialog(open ? "accept" : null)}
          >
            <DialogTrigger asChild>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Setujui
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Setujui Permohonan</DialogTitle>
                <DialogDescription>
                  Masukkan parameter teknis. Koordinat survei akan otomatis
                  tersimpan.
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
                  <div className="grid grid-cols-2 gap-4">
                    {/* GSP */}
                    <FormField
                      control={formAccept.control}
                      name="gsp"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GSP (m)</FormLabel>
                          <FormControl>
                            <Input placeholder="3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* GSB */}
                    <FormField
                      control={formAccept.control}
                      name="gsb"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GSB (m)</FormLabel>
                          <FormControl>
                            <Input placeholder="5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* KDB */}
                    <FormField
                      control={formAccept.control}
                      name="kdb"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>KDB (%)</FormLabel>
                          <FormControl>
                            <Input placeholder="60" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* KLB */}
                    <FormField
                      control={formAccept.control}
                      name="klb"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>KLB</FormLabel>
                          <FormControl>
                            <Input placeholder="1.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* KDH */}
                    <FormField
                      control={formAccept.control}
                      name="kdh"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>KDH (%)</FormLabel>
                          <FormControl>
                            <Input placeholder="20" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* TB Max */}
                    <FormField
                      control={formAccept.control}
                      name="tb_max"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TB Max (Lantai)</FormLabel>
                          <FormControl>
                            <Input placeholder="3" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    {/* TB Min */}
                    <FormField
                      control={formAccept.control}
                      name="tb_min"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>TB Min (Lantai)</FormLabel>
                          <FormControl>
                            <Input placeholder="1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Catatan (Tetap Ada) */}
                  <FormField
                    control={formAccept.control}
                    name="catatan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catatan SK (Opsional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Disetujui secara teknis..."
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

          {/* --- DIALOG TOLAK (REJECT) --- */}
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
