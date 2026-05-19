// ==========================================================================
// 1. EFEK MENGETIK OTOMATIS (TYPING EFFECT) DI HERO AREA SISI UTAMA
// ==========================================================================
const words = [
  "Chemical Analyst Graduate.",
  "Operational Production.",
  "Quality Control.",
];
let i = 0; // Menyimpan urutan indeks kata saat ini di dalam array words
let timer; // Menyimpan referensi pengatur waktu eksekusi setTimeout

function typingEffect() {
  // Validasi: Cek keberadaan elemen penarget teks typing di halaman aktif
  const targetElement = document.getElementById("typing-text");
  if (!targetElement) return;

  let word = words[i].split("");
  var loopTyping = function () {
    if (word.length > 0) {
      // Mengambil huruf terdepan dari array dan menyuntikkannya ke DOM HTML
      targetElement.innerHTML += word.shift();
    } else {
      setTimeout(deletingEffect, 2000); // Jeda membaca teks selama 2 detik sebelum dihapus
      return false;
    }
    timer = setTimeout(loopTyping, 100); // Kecepatan pengetikan per karakter (100ms)
  };
  loopTyping();
}

function deletingEffect() {
  const targetElement = document.getElementById("typing-text");
  if (!targetElement) return;

  let word = words[i].split("");
  var loopDeleting = function () {
    if (word.length > 0) {
      word.pop(); // Memotong huruf paling akhir dari baris teks aktif
      targetElement.innerHTML = word.join("");
    } else {
      // Mengubah urutan indeks menuju kata berikutnya, berputar otomatis jika melampaui batas array
      i = (i + 1) % words.length;
      setTimeout(typingEffect, 500); // Jeda transisi sebelum mengetik ulang kata baru
      return false;
    }
    timer = setTimeout(loopDeleting, 50); // Kecepatan penghapusan karakter (50ms)
  };
  loopDeleting();
}

// Menjalankan inisiasi fungsi setelah seluruh halaman DOM selesai dimuat browser
document.addEventListener("DOMContentLoaded", typingEffect);

// ==========================================================================
// 2. LOGIKA KONTROL TOMBOL UTILITAS UTAMA BACK TO TOP
// ==========================================================================
const backToTopButton = document.getElementById("backToTop");

// Menggabungkan seluruh aksi pemantauan event scroll global jendela layar aktif
window.onscroll = function () {
  scrollFunction();
  revealSections();
};

function scrollFunction() {
  if (!backToTopButton) return;

  // Memunculkan tombol jika pengguna menggulir ke bawah lebih dari 300 piksel
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

// Eksekusi skrol balik halus (smooth scroll) menuju koordinat 0 atas saat tombol diklik
if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ==========================================================================
// 3. EFEK ANIMASI KEMUNCULAN ELEMEN SEARAH GULIR (FADE IN SCROLL EFFECT)
// ==========================================================================
function revealSections() {
  const faders = document.querySelectorAll(".fade-in");

  faders.forEach((fader) => {
    const slideInAt =
      window.scrollY + window.innerHeight - fader.clientHeight / 2;
    const isLetterShown = slideInAt > fader.offsetTop;

    // Membuka segel opacity dengan mengaktifkan kelas CSS ".appear" jika koordinat terpenuhi
    if (isLetterShown) {
      fader.classList.add("appear");
    }
  });
}

// ==========================================================================
// 4. ANIMASI INTERAKTIF POP-UP BERURUTAN KHUSUS DI HALAMAN PORTFOLIO.HTML
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
        observer.unobserve(entry.target); // Melepas pengamatan setelah aksi selesai agar menghemat pemakaian RAM
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
