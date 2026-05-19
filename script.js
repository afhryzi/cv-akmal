// 1. EFEK MENGETIK OTOMATIS (TYPING EFFECT) DI HERO SECTION
const words = ["Operational Production.", "Quality Control Specialist.", "Chemical Analyst Graduate."];
let i = 0;
let timer;

function typingEffect() {
    let word = words[i].split("");
    var loopTyping = function() {
        if (word.length > 0) {
            document.getElementById('typing-text').innerHTML += word.shift();
        } else {
            setTimeout(deletingEffect, 2000); // Jeda sebelum menghapus teks
            return false;
        }
        timer = setTimeout(loopTyping, 100);
    };
    loopTyping();
}

function deletingEffect() {
    let word = words[i].split("");
    var loopDeleting = function() {
        if (word.length > 0) {
            word.pop();
            document.getElementById('typing-text').innerHTML = word.join("");
        } else {
            if (words.length > (i + 1)) {
                i++;
            } else {
                i = 0;
            }
            setTimeout(typingEffect, 500); // Jeda sebelum mengetik kata baru
            return false;
        }
        timer = setTimeout(loopDeleting, 50);
    };
    loopDeleting();
}

// Jalankan efek mengetik setelah halaman selesai dimuat
document.addEventListener("DOMContentLoaded", typingEffect);


// 2. TOMBOL BACK TO TOP (KEMBALI KE ATAS)
const backToTopButton = document.getElementById("backToTop");

window.onscroll = function() {
    scrollFunction();
    revealSections();
};

function scrollFunction() {
    // Tombol muncul jika halaman di-scroll ke bawah lebih dari 300px
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
}

// Ketika tombol diklik, kembali ke atas halaman
backToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});


// 3. EFEK FADE IN SAAT SCROLL (ANIMASI HALUS)
const faders = document.querySelectorAll('.fade-in');

function revealSections() {
    faders.forEach(fader => {
        const slideInAt = (window.scrollY + window.innerHeight) - (fader.clientHeight / 4);
        const isLetterShown = slideInAt > fader.offsetTop;
        
        if (isLetterShown) {
            fader.classList.add('appear');
        }
    });
}