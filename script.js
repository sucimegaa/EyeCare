let userName = '';
const nameInput = document.getElementById('nameInput');
const enterButton = document.getElementById('enterButton');
const notification = document.getElementById('notification');
const firstScreen = document.getElementById('firstScreen');
const secondScreen = document.getElementById('secondScreen');
const diagnosisButton = document.getElementById('diagnosisButton');
const questionScreen = document.getElementById('questionScreen');
const questionContainer = document.getElementById('questionContainer');
const resultScreen = document.getElementById('resultScreen');
const resultDiv = document.getElementById('result');

const questions = [
    { id: 'G001', text: 'Apakah mata Anda peka terhadap cahaya (fotofobia)?', expertCF: 0.5 },
    { id: 'G002', text: 'Apakah mata Anda terasa nyeri?', expertCF: 0.75 },
    { id: 'G003', text: 'Apakah kelopak mata Anda mengalami pembengkakan?', expertCF: 0.75 },
    { id: 'G004', text: 'Apakah mata Anda mengalami iritasi?', expertCF: 0.5 },
    { id: 'G005', text: 'Apakah terjadi pembengkakan bundar pada kelopak mata dan tumbuh secara perlahan pada mata Anda?', expertCF: 0.75 },
    { id: 'G006', text: 'Apakah terbentuk daerah kemerahan/abu-abu di bawah kelopak mata Anda?', expertCF: 0.5 },
    { id: 'G007', text: 'Apakah mata Anda berair?', expertCF: 0.75 },
    { id: 'G008', text: 'Apakah kornea mata Anda tampak keruh?', expertCF: 0.6 },
    { id: 'G009', text: 'Konjungtiva Anda meradang?', expertCF: 0.75 },
    { id: 'G010', text: 'Apakah penglihatan Anda kabur?', expertCF: 0.6 },
    { id: 'G011', text: 'Apakah di mata Anda terlihat bentuk-bentuk iregular yang melayang-layang atau kilatan cahaya?', expertCF: 0.75 },
    { id: 'G012', text: 'Apakah mata Anda mengalami hilangnya fungsi penglihatan pada salah satu mata, yang kemudian menyebar sejalan perkembangan ablasio?', expertCF: 0.7 },
    { id: 'G013', text: 'Apakah mata Anda mengalami kesulitan melihat di malam hari?', expertCF: 0.75 },
    { id: 'G014', text: 'Apakah mata Anda mengalami penurunan ketajaman penglihatan (bahkan siang hari)?', expertCF: 0.8 },
    { id: 'G015', text: 'Apakah terjadi kemerahan pada sklera?', expertCF: 0.6 },
    { id: 'G016', text: 'Apakah mata Anda menonjol?', expertCF: 1 },
    { id: 'G017', text: 'Apakah Anda mengalami demam?', expertCF: 0.5 },
    { id: 'G018', text: 'Apakah bola mata Anda membengkak dan tampak berkabut?', expertCF: 0.5 },
    { id: 'G019', text: 'Apakah mata Anda mengalami gangguan penglihatan?', expertCF: 0.6 },
];

const diseases = {
    P001: {
        name: 'Keratokonus',
        definition: 'Keratokonus adalah kondisi mata di mana kornea menjadi tipis dan berbentuk kerucut.',
        advice: 'Disarankan untuk berkonsultasi dengan dokter spesialis mata untuk penanganan lebih lanjut.',
    },
    P002: {
        name: 'Kalazion',
        definition: 'Kalazion adalah benjolan kecil yang terbentuk akibat sumbatan kelenjar minyak di kelopak mata.',
        advice: 'Kompres hangat pada area yang terkena bisa membantu meredakan gejala. Jika tidak membaik, konsultasikan dengan dokter.',
    },
    P003: {
        name: 'Trakoma',
        definition: 'Trakoma adalah infeksi mata yang disebabkan oleh bakteri, yang dapat menyebabkan kebutaan.',
        advice: 'Perawatan antibiotik diperlukan untuk mengatasi infeksi. Segera konsultasikan dengan dokter.',
    },
    P004: {
        name: 'Ablasio Retina',
        definition: 'Ablasio retina adalah kondisi serius di mana retina terpisah dari lapisan belakang mata.',
        advice: 'Segera cari bantuan medis. Perawatan darurat diperlukan untuk mencegah kehilangan penglihatan.',
    },
    P005: {
        name: 'Retinopati Diabetikum',
        definition: 'Retinopati diabetikum adalah kerusakan pada pembuluh darah retina yang disebabkan oleh diabetes.',
        advice: 'Penting untuk mengontrol kadar gula darah dan melakukan pemeriksaan mata secara rutin.',
    },
    P006: {
        name: 'Katarak',
        definition: 'Katarak adalah pengaburan lensa mata yang dapat mengganggu penglihatan.',
        advice: 'Pembedahan mungkin diperlukan jika penglihatan terganggu. Konsultasikan dengan dokter mata.',
    },
    P007: {
        name: 'Uveitis',
        definition: 'Uveitis adalah peradangan pada bagian tengah mata (uvea) yang dapat mempengaruhi penglihatan.',
        advice: 'Perawatan dengan obat anti-inflamasi atau antibiotik sering diperlukan. Segera temui dokter.',
    },
    P008: {
        name: 'Seluitis Orbitalis',
        definition: 'Seluitis orbitalis adalah infeksi serius yang terjadi pada jaringan lunak di sekitar mata, yang dapat menyebabkan pembengkakan, nyeri, dan gangguan penglihatan.',
        advice: 'Segera temui dokter untuk mendapatkan perawatan antibiotik atau penanganan lebih lanjut. Kondisi ini dapat memerlukan perawatan darurat untuk mencegah komplikasi serius.',
    },    
    P009: {
        name: 'Eksoftalmus',
        definition: 'Eksoftalmus adalah kondisi di mana bola mata menonjol keluar dari rongga mata, sering kali disebabkan oleh masalah tiroid.',
        advice: 'Konsultasikan dengan dokter untuk diagnosis dan perawatan yang tepat.',
    },
    P010: {
        name: 'Endoftalmus',
        definition: 'Endoftalmus adalah infeksi serius pada bagian dalam mata, biasanya akibat trauma atau komplikasi pasca operasi, yang dapat menyebabkan nyeri, penglihatan kabur, dan pembengkakan.',
        advice: 'Segera konsultasikan dengan dokter spesialis mata. Penanganan biasanya melibatkan antibiotik injeksi atau tindakan bedah untuk mencegah kerusakan permanen pada mata.',
    }    
};

const rules = {
    P001: ['G001', 'G007', 'G010', 'G013'],
    P002: ['G003', 'G004', 'G005', 'G006'],
    P003: ['G003', 'G008', 'G009'],
    P004: ['G010', 'G011', 'G012'],
    P005: ['G010', 'G011'],
    P006: ['G001', 'G002', 'G013', 'G014'],
    P007: ['G001', 'G010', 'G015'],
    P008: ['G002', 'G003', 'G017', 'G018'],
    P009: ['G016'],
    P010: ['G001', 'G002', 'G015', 'G019'],
};

let currentQuestion = 0;
let answers = {};

enterButton.addEventListener('click', () => {
    if (nameInput.value.trim() === '') {
        notification.classList.remove('hidden');  
    } else {
        userName = nameInput.value.trim();  
        notification.classList.add('hidden');
        firstScreen.classList.add('hidden');
        secondScreen.classList.remove('hidden');
    }
});

diagnosisButton.addEventListener('click', () => {
    secondScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    displayQuestion();
});

function displayQuestion() {
    if (currentQuestion < questions.length) {
        questionContainer.innerHTML = `<p>${questions[currentQuestion].text}</p>`;
        updateProgressBar();
        currentQuestion++;
    } else {
        showResult();
    }
}

function updateProgressBar() {
    const progress = (currentQuestion / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}


document.getElementById('yesButton').addEventListener('click', () => saveUserCF(1));
document.getElementById('maybeButton').addEventListener('click', () => saveUserCF(0.75));
document.getElementById('notSureButton').addEventListener('click', () => saveUserCF(0.5));
document.getElementById('unlikelyButton').addEventListener('click', () => saveUserCF(0.25));
document.getElementById('noButton').addEventListener('click', () => saveUserCF(0));

function saveUserCF(value) {
    const questionId = questions[currentQuestion - 1].id;
    answers[questionId] = value * questions[currentQuestion - 1].expertCF;
    displayQuestion();
}


function calculateCF() {
    const diseaseCF = {};

    for (const diseaseCode in rules) {
        let combinedCF = 0;

        for (const questionId of rules[diseaseCode]) {
            if (answers[questionId] !== undefined) {
                const currentCF = answers[questionId];
                combinedCF = combinedCF + currentCF * (1 - combinedCF);
            }
        }

        diseaseCF[diseaseCode] = combinedCF;
    }

    return diseaseCF;
}

function showResult() {
    const diseaseCF = calculateCF();
    const sortedDiseases = Object.entries(diseaseCF).sort(([, a], [, b]) => b - a);

    if (sortedDiseases.length > 0 && sortedDiseases[0][1] > 0) {
        const [bestMatch, bestCF] = sortedDiseases[0];
        resultDiv.innerHTML = `
            Hai ${userName}, Anda mungkin mengalami <strong>${diseases[bestMatch].name}</strong> dengan tingkat keyakinan <strong>${(bestCF * 100).toFixed(2)}%</strong>.<br>
            <em>${diseases[bestMatch].definition}</em><br>
            <strong>Saran:</strong> ${diseases[bestMatch].advice}
        `;
    } else {
        resultDiv.innerHTML = `
            Hai ${userName},Tidak bisa terdeteksi penyakit apapun berdasarkan gejala yang Anda masukkan.<br>
            Mohon pastikan Anda telah menjawab dengan teliti atau konsultasikan langsung dengan dokter.
        `;
    }

    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
}

document.getElementById('restartButton').addEventListener('click', () => {
    location.reload();
});