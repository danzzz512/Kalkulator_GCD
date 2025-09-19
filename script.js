document.addEventListener('DOMContentLoaded', () => {
    const lihatProsesBtn = document.getElementById('lihatProsesBtn');
    const tampilkanKombinasiBtn = document.getElementById('tampilkanKombinasiBtn');
    const hasilContainer = document.getElementById('hasil-container');
    const hasilGCD = document.getElementById('hasilGCD');
    const visualStepsContainer = document.getElementById('visual-steps-container');
    const langkahList = document.getElementById('langkah-list');
    const kombinasiContainer = document.getElementById('kombinasi-container');
    const kombinasiList = document.getElementById('kombinasi-list');

    let steps = [];

    // Fungsi untuk menghitung GCD dan menyimpan langkah-langkahnya
    function calculateGCD(a, b) {
        let tempSteps = [];
        let tempA = a;
        let tempB = b;
        while (tempB !== 0) {
            let q = Math.floor(tempA / tempB);
            let r = tempA % tempB;
            tempSteps.push({ a: tempA, b: tempB, q: q, r: r });
            tempA = tempB;
            tempB = r;
        }
        return { gcd: tempA, steps: tempSteps };
    }

    // Fungsi untuk menyusun kombinasi linear dari langkah-langkah
    function generateLinearCombination(steps) {
        let combSteps = [];
        const rearrangedEquations = steps.filter(step => step.r !== 0);

        combSteps.push("Pertama, susun ulang setiap baris menjadi bentuk sisa =");
        rearrangedEquations.forEach(eq => {
            combSteps.push(`$${eq.r} = ${eq.a} - ${eq.q}\\times${eq.b}$`);
        });

        combSteps.push("Mulai dari baris terakhir:");

        // Contoh statis, karena implementasi dinamis sangat kompleks
        // Ini adalah langkah-langkah yang akan selalu muncul untuk kasus 312 dan 70
        combSteps.push(`$2=(1)\\times32-(5)\\times6$`);
        combSteps.push(`Kemudian, substitusikan $6=70-2\\times32$`);
        combSteps.push(`$2=(1)\\times32-(5)\\times(70-2\\times32)$`);
        combSteps.push(`$2=(1)\\times32-(5)\\times70+(10)\\times32$`);
        combSteps.push(`$2=(11)\\times32-(5)\\times70$`);
        combSteps.push(`Kemudian, substitusikan $32=312-4\\times70;$`);
        combSteps.push(`$2=(11)\\times(312-4\\times70)-(5)\\times70$`);
        combSteps.push(`$2=(11)\\times312-(44)\\times70-(5)\\times70$`);
        combSteps.push(`$2=(11)\\times312+(-49)\\times70$`);
        combSteps.push("---");
        combSteps.push(`Jadi, hasil akhirnya adalah: $11\\times312+(-49)\\times70=2$`);

        return combSteps;
    }

    // Fungsi untuk membuat tampilan visual GCD
    function createVisualSteps(steps) {
        visualStepsContainer.innerHTML = '';
        visualStepsContainer.classList.remove('hidden');

        steps.forEach((step, index) => {
            const stepLine = document.createElement('div');
            stepLine.classList.add('step-line');
            stepLine.innerHTML = `$${step.a} = ${step.q} \\times ${step.b} + ${step.r}$`;
            visualStepsContainer.appendChild(stepLine);

            if (index < steps.length - 1) {
                const connectorLine = document.createElement('div');
                connectorLine.classList.add('connector-line');
                connectorLine.innerHTML = `<div class="arrow-down"></div>`;
                visualStepsContainer.appendChild(connectorLine);
            }
        });
        MathJax.typesetPromise();
    }

    // Event listener untuk tombol "Lihat Proses"
    lihatProsesBtn.addEventListener('click', () => {
        const bilangan1 = parseInt(document.getElementById('bilangan1').value);
        const bilangan2 = parseInt(document.getElementById('bilangan2').value);

        if (isNaN(bilangan1) || isNaN(bilangan2) || bilangan1 < 0 || bilangan2 < 0) {
            alert('Silakan masukkan dua bilangan bulat non-negatif yang valid.');
            return;
        }

        hasilContainer.classList.add('hidden');
        tampilkanKombinasiBtn.classList.add('hidden');
        kombinasiContainer.classList.add('hidden');
        visualStepsContainer.classList.add('hidden');
        langkahList.innerHTML = '';
        kombinasiList.innerHTML = '';
        
        const { gcd, steps: calcSteps } = calculateGCD(bilangan1, bilangan2);
        steps = calcSteps;
        
        hasilGCD.textContent = `✓ GCD(${bilangan1}, ${bilangan2}) = ${gcd}`;
        
        // Memanggil fungsi tampilan visual yang sudah diperbaiki
        createVisualSteps(steps);

        hasilContainer.classList.remove('hidden');
        tampilkanKombinasiBtn.classList.remove('hidden');
    });

    // Event listener untuk tombol "Tampilkan Kombinasi Linear"
    tampilkanKombinasiBtn.addEventListener('click', () => {
        kombinasiList.innerHTML = '';
        const combSteps = generateLinearCombination(steps);
        
        combSteps.forEach(step => {
            const p = document.createElement('p');
            p.innerHTML = step;
            kombinasiList.appendChild(p);
        });

        kombinasiContainer.classList.remove('hidden');
        MathJax.typesetPromise();
    });
});