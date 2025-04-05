// Toggle Switch Mode
// Ubah mode saat tombol toggle ditekan

// Dapatkan elemen toggle switch
const toggle = document.getElementById("modeToggle");

// Tambahkan event listener untuk perubahan mode dari light mode ke dark mode atau sebaliknya
toggle.addEventListener("change", () => {
	document.body.classList.toggle("dark-mode");
});

// Ubah teks judul saat mode berubah

// Dapatkan elemen judul
const title = document.querySelector(".title");

// Tambahkan event listener untuk perubahan teks ketika mode light mode atau dark mode
toggle.addEventListener("change", () => {
	title.textContent = toggle.checked ? "Dark Mode" : "Light Mode";
});

// Stopwatch
// Mendapatkan referensi ke elemen HTML yang dibutuhkan
// Dapatkan elemen stopwatch
const display = document.getElementById("display");
// Dapatkan tombol start, pause, dan reset
const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

// Variabel untuk menyimpan waktu mulai, interval, dan status stopwatch
let startTime = 0; // Menyimpan waktu saat tombol Start diklik
let timeSoFar = 0; // Total waktu yang sudah berjalan
let timerInterval; // Menyimpan ID interval dari setInterval
let isRunning = false; // Status apakah stopwatch sedang berjalan

// Fungsi untuk memformat waktu ke format HH : MM : SS : MS
function formatTime(ms) {
	// Menghitung jam, menit, detik, dan milidetik
	let hours = Math.floor(ms / (1000 * 60 * 60));
	let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((ms % (1000 * 60)) / 1000);
	let milliseconds = ms % 1000;

	// Menambahkan leading zero
	return (
		// Menggunakan String.padStart() untuk menambahkan leading zero untuk setiap komponen waktu
		String(hours).padStart(2, "0") +
		" : " +
		String(minutes).padStart(2, "0") +
		" : " +
		String(seconds).padStart(2, "0") +
		" : " +
		String(milliseconds).padStart(3, "0")
	);
}

// Fungsi untuk update tampilan waktu
function updateDisplay() {
	// Menghitung waktu sekarang
	const now = Date.now();
	timeSoFar = now - startTime; // Total waktu yang sudah berjalan
	display.textContent = formatTime(timeSoFar); // Memformat waktu ke format HH : MM : SS : MS
}

// Event saat tombol Start diklik
startBtn.addEventListener("click", () => {
	if (!isRunning) {
		// Menyimpan waktu mulai berdasarkan waktu sekarang dikurangi waktu yang sudah berjalan
		startTime = Date.now() - timeSoFar;
		// Mulai interval
		timerInterval = setInterval(updateDisplay, 10); // Update tiap 10ms
		isRunning = true;
	}
});

// Cara kerja awal mula ketika tombol Start diklik
// let startTime = 0;
// let timeSoFar = 0;
// let timerInterval;
// let isRunning = false;

// ketika tombol start diklik akan masuk pada function startBtn ketika di "click"
// startBtn.addEventListener("click", () => {
// karena isRunning masih false maka kode ini masih berjalan
//     if (!isRunning) {
//         startTime = Date.now() - timeSoFar; // startTime = Date.now() - 0 // misalkan hasilnya 1000000
//         timerInterval = setInterval(updateDisplay, 10); // setiap 10 milidetik akan menjalankan function updateDisplay
//         isRunning = true; // set isRunning menjadi true
//         lanjut ke function updateDisplay
//     }
// });

// masuk pada function updateDisplay
// function updateDisplay() {
// 	const now = Date.now(); // waktu saat ini, misalnya 1000100 (setelah 100ms)
// 	timeSoFar = now - startTime;  // 1000100 - 1000000 = 100 ms
// 	display.textContent = formatTime(timeSoFar); // maka tampilkan "00 : 00 : 00 : 100"
// }

// Event saat tombol Pause diklik
pauseBtn.addEventListener("click", () => {
	if (isRunning) {
		clearInterval(timerInterval); // Menghentikan interval
		isRunning = false;
	}
});

// Event saat tombol Reset diklik
resetBtn.addEventListener("click", () => {
	clearInterval(timerInterval); // Menghentikan interval
	isRunning = false;
	timeSoFar = 0;
	display.textContent = "00 : 00 : 00 : 000"; // Reset tampilan
});
