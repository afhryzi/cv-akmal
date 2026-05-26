// ==========================================================================
// 1. ANIMASI INTERAKTIF POP-UP BERURUTAN DI HALAMAN MITIGASI-LOGAM.HTML
// ==========================================================================
function animatePortfolioCards() {
  const starBoxes = document.querySelectorAll(".star-box");

  // Konfigurasi ambang pengamatan viewport browser
  const observerOptions = {
    root: null, // Menggunakan area pandang layar aktif klien
    threshold: 0.1, // Memicu penayangan jika minimal 10% area kartu masuk ke dalam layar
    rootMargin: "0px",
  };

  const boxObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Kartu dimunculkan satu per satu dari arah bawah dibantu delay matematika CSS
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        boxObserver.unobserve(entry.target); // Melepas pengamatan setelah aksi selesai agar menghemat memakaian RAM
      }
    });
  }, observerOptions);

  starBoxes.forEach((box, index) => {
    // Menyiapkan parameter mentah awal kartu tersembunyi sebelum animasi diaktifkan
    box.style.opacity = "0";
    box.style.transform = "translateY(20px)";
    // Pembuatan rumus matematis jeda berurutan otomatis (staggered animation delay)
    box.style.transition = `all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${index * 0.15}s`;
    boxObserver.observe(box);
  });
}

// Validasi Otomatis: Fungsi eksekusi kartu STAR hanya aktif jika mendeteksi elemen ".star-box" di halaman tersebut
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelectorAll(".star-box").length > 0) {
    animatePortfolioCards();
  }
});
