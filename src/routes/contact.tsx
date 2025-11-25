// src/routes/contact.tsx

import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, MapPin, Instagram, Linkedin, Mailbox } from "lucide-react"; // Ikon tambahan

// Import komponen UI Anda
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

// 1. Skema Validasi Formulir dengan Zod
const contactSchema = z.object({
  name: z.string().min(2, { message: "Nama minimal 2 karakter." }),
  email: z.string().email({ message: "Format email tidak valid." }),
  subject: z.string().min(5, { message: "Subjek minimal 5 karakter." }),
  message: z.string().min(10, { message: "Pesan minimal 10 karakter." }),
});

// WAJIB: Definisi rute untuk /contact
export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const form = useForm<z.infer<typeof contactSchema>>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  // 2. Handler Pengiriman Formulir
  async function onSubmit(values: z.infer<typeof contactSchema>) {
    console.log("Data Formulir Dikirim:", values);

    // 🚨 PENTING:
    // Di sini Anda perlu mengintegrasikan layanan backend untuk mengirim email.
    // Contoh layanan: EmailJS, Formspree, atau API route kustom (Next.js/Express)

    alert("Terima kasih! Pesan Anda telah dikirim.");
    form.reset();
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="flex mb-8 border-b-2 border-primary pb-2 text-4xl font-extrabold text-primary items-center">
        Hubungi Kami <Mailbox className="ml-6 h-10 w-10 text-primary" />
      </h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Kolom Kiri: Info Kontak */}
        <div className="space-y-6 md:col-span-1">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Informasi Kontak
          </h2>

          <div className="flex items-start space-x-3">
            <Mail className="mt-1 h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold text-primary">Email</p>
              {/* Ganti 'your-email@example.com' dengan email Anda */}
              <p className="break-words text-muted-foreground">
                oxadefrizal258@gmail.com
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Linkedin className="mt-1 h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold text-primary">LinkedIn</p>
              <a
                href="https://www.linkedin.com/in/oxadefrizalkhasay/"
                className="text-muted-foreground"
              >
                Oxa Defrizal Khasay
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <Instagram className="mt-1 h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold text-primary">Instagram</p>
              <a
                href="https://instagram.com/deekai258"
                className="text-muted-foreground"
              >
                @deekai258
              </a>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <MapPin className="mt-1 h-6 w-6 text-primary" />
            <div>
              <p className="font-semibold text-primary">Lokasi</p>
              <p className="text-muted-foreground">Yogyakarta, Indonesia</p>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Formulir Kontak */}
        <div className="md:col-span-2">
          <h2 className="mb-4 text-2xl font-bold text-foreground">
            Kirim Pesan Kepada Kami
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Anda</FormLabel>
                    <FormControl>
                      <Input placeholder="Nama lengkap Anda" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email@contoh.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subjek</FormLabel>
                    <FormControl>
                      <Input placeholder="Terkait apa pesan ini?" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pesan Anda</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tuliskan pesan Anda di sini..."
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
