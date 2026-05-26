// ==========================================================================
// 1. EFEK MENGETIK OTOMATIS (TYPING EFFECT) DI HERO AREA SISI UTAMA
// ==========================================================================
const words = [
  "Lulusan Kimia Analisis.",
  "Operator Produksi.",
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
      word.pop();
      targetElement.innerHTML = word.join("");
    } else {
      i = (i + 1) % words.length; // Berpindah ke kata berikutnya di dalam array
      setTimeout(typingEffect, 500); // Jeda setengah detik sebelum mulai mengetik kata baru
      return false;
    }
    timer = setTimeout(loopDeleting, 50); // Kecepatan penghapusan per karakter (50ms)
  };
  loopDeleting();
}

// Inisiasi efek ketik asli saat DOM siap
document.addEventListener("DOMContentLoaded", typingEffect);

// ==========================================================================
// 2. MANAGEMENT UTILITY KONTROL SCROLL (BACK TO TOP & FADE-IN SECTION)
// ==========================================================================
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function () {
  scrollFunction();
  revealSections();
};

function scrollFunction() {
  if (!backToTopButton) return;
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
}

if (backToTopButton) {
  backToTopButton.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

function revealSections() {
  const faders = document.querySelectorAll(".fade-in");
  faders.forEach((fader) => {
    const slideInAt =
      window.scrollY + window.innerHeight - fader.clientHeight / 2;
    const isLetterShown = slideInAt > fader.offsetTop;
    if (isLetterShown) {
      fader.classList.add("appear");
    }
  });
}

// ==========================================================================
// 3. ANIMASI INTERSECTION OBSERVER (KHUSUS CERTIFICATION CARD INDEX.HTML)
// ==========================================================================
document.addEventListener("DOMContentLoaded", function () {
  // Hanya menargetkan elemen yang ADA di index.html saja (.certification-card)
  const animatedElements = document.querySelectorAll(".certification-card");
  if (animatedElements.length === 0) return;

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: "0px",
  };

  const UIObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target); // Lepas memori observer setelah animasi aktif
      }
    });
  }, observerOptions);

  animatedElements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    // Efek kemunculan beruntun (staggered delay) yang halus saat di-scroll
    element.style.transition = `all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1) ${(index % 3) * 0.15}s`;
    UIObserver.observe(element);
  });
});
