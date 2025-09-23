'use client';

import { useEffect, useState } from "react";
import { CreditCard, Loader2 } from "lucide-react";

declare global {
  interface Window {
    snap: any;
  }
}

export default function PembayaranPage() {
  const [snapLoaded, setSnapLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "");
    script.onload = () => setSnapLoaded(true);
    script.onerror = () => console.error("Gagal load Snap.js");
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handlePayment = async () => {
    if (!snapLoaded) {
      alert("Snap.js belum siap.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/midtrans-token", { method: "POST" });
      const data = await res.json();
      if (!data.token) {
        alert("Token pembayaran tidak tersedia!\n" + (data.error || ""));
        setLoading(false);
        return;
      }

      window.snap.pay(data.token, {
        onSuccess: () => { alert("Pembayaran berhasil!"); setLoading(false); },
        onPending: () => { alert("Pembayaran tertunda!"); setLoading(false); },
        onError: () => { alert("Terjadi kesalahan pembayaran!"); setLoading(false); },
        onClose: () => { alert("Popup ditutup."); setLoading(false); },
      });
    } catch (err) {
      console.error("Fetch token error:", err);
      alert("Gagal mengambil token pembayaran.");
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Pembayaran</h1>

        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="bg-blue-50 rounded-full p-4">
            <CreditCard className="w-10 h-10 text-blue-600" />
          </div>
          <p className="text-gray-600 text-center">
            Silakan lanjutkan pembayaran Anda melalui Midtrans. Pastikan data sudah benar sebelum melanjutkan.
          </p>
        </div>

        <div className="bg-gray-100 rounded-xl p-4 mb-6 flex justify-between items-center">
          <span className="text-gray-700 font-medium">Total Pembayaran:</span>
          <span className="text-gray-800 font-bold text-lg">Rp 2.000</span>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-105 transform transition-all duration-200 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Bayar Sekarang"}
        </button>

        <p className="text-gray-400 text-sm text-center mt-4">
          Transaksi aman melalui Midtrans
        </p>
      </div>
    </main>
  );
}
