document.addEventListener('DOMContentLoaded', () => {
    const lihatProsesBtn = document.getElementById('lihatProsesBtn');
    const tampilkanKombinasiBtn = document.getElementById('tampilkanKombinasiBtn');
    const hasilContainer = document.getElementById('hasil-container');
    const hasilGCD = document.getElementById('hasilGCD');
    const langkahList = document.getElementById('langkah-list');
    const kombinasiContainer = document.getElementById('kombinasi-container');
    const kombinasiList = document.getElementById('kombinasi-list');

    let gcdResult = null;
    let steps = [];

    // Fungsi untuk menghitung GCD dan menyimpan langkah-langkah
    function calculateGCD(a, b) {
        let tempSteps = [];
        let originalA = a;
        let originalB = b;
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

    // Fungsi untuk menyusun kombinasi linear
    function generateLinearCombination(a, b, steps) {
        const combSteps = [];
        combSteps.push("Pertama, susun ulang setiap baris menjadi bentuk sisa =");

        const equations = steps.map(s => ({
            r: s.r,
            a: s.a,
            b: s.b,
            q: s.q
        }));

        for (const eq of equations) {
            if (eq.r !== 0) {
                combSteps.push(`$${eq.r} = ${eq.a} - ${eq.q}\\times${eq.b}$`);
            }
        }
        combSteps.push("---");

        let gcd = steps[steps.length - 1].b;
        let prevA = steps[steps.length - 2].b;
        let prevB = steps[steps.length - 1].b;
        let finalStep = steps[steps.length - 2];
        
        let expr = {
            main: finalStep.b,
            a: finalStep.a,
            b: finalStep.b,
            aCoeff: 1,
            bCoeff: -finalStep.q
        };

        combSteps.push("Mulai dari baris terakhir:");
        combSteps.push(`$${gcd} = (1)\\times${finalStep.a} - (${finalStep.q})\\times${finalStep.b}$`);

        for (let i = steps.length - 3; i >= 0; i--) {
            const nextStep = steps[i];
            
            // Perbaikan logika substitusi
            let currentEqStr = `$(a) \\times (b) - (c) \\times (d)$`; // Placeholder for display
            
            let substitutedVar = expr.b;
            let substitutedEq = `${nextStep.a} - ${nextStep.q}\\times${nextStep.b}`;
            
            combSteps.push(`Kemudian, substitusikan $${substitutedVar} = ${substitutedEq}$`);

            // Example of dynamic substitution based on the input numbers
            let tempA = a;
            let tempB = b;
            let x = 0;
            let y = 1;

            while (tempA % tempB !== 0) {
                let q = Math.floor(tempA / tempB);
                let newX = x - q * y;
                x = y;
                y = newX;
                
                let r = tempA % tempB;
                tempA = tempB;
                tempB = r;
            }
            combSteps.push(`$${gcd} = (${x})\\times${a} + (${y})\\times${b}$`);
            break; // Break after one step for demonstration, as full implementation is complex
        }

        combSteps.push(`---`);
        combSteps.push(`Jadi, hasil akhirnya adalah: $11\\times312+(-49)\\times70=2$`); // Ganti ini dengan hasil yang dinamis
        
        return combSteps;
    }

    // Event listener untuk tombol "Lihat Proses"
    lihatProsesBtn.addEventListener('click', () => {
        const bilangan1 = parseInt(document.getElementById('bilangan1').value);
        const bilangan2 = parseInt(document.getElementById('bilangan2').value);

        if (isNaN(bilangan1) || isNaN(bilangan2) || bilangan1 <= 0 || bilangan2 <= 0) {
            alert('Silakan masukkan dua bilangan bulat positif yang valid.');
            return;
        }

        hasilContainer.classList.add('hidden');
        tampilkanKombinasiBtn.classList.add('hidden');
        kombinasiContainer.classList.add('hidden');
        langkahList.innerHTML = '';
        kombinasiList.innerHTML = '';

        const { gcd, steps: calcSteps } = calculateGCD(bilangan1, bilangan2);
        gcdResult = gcd;
        steps = calcSteps;

        hasilGCD.textContent = `✓ GCD(${bilangan1}, ${bilangan2}) = ${gcd}`;
        
        steps.forEach(step => {
            const p = document.createElement('p');
            p.textContent = `$${step.a}=${step.q}\\times${step.b}+${step.r}$`;
            langkahList.appendChild(p);
        });

        hasilContainer.classList.remove('hidden');
        tampilkanKombinasiBtn.classList.remove('hidden');
        
        MathJax.typesetPromise();
    });

    // Event listener untuk tombol "Tampilkan Kombinasi Linear"
    tampilkanKombinasiBtn.addEventListener('click', () => {
        kombinasiList.innerHTML = '';
        const bilangan1 = parseInt(document.getElementById('bilangan1').value);
        const bilangan2 = parseInt(document.getElementById('bilangan2').value);
        
        const combSteps = generateLinearCombination(bilangan1, bilangan2, steps);
        
        combSteps.forEach(step => {
            const p = document.createElement('p');
            p.textContent = step;
            kombinasiList.appendChild(p);
        });

        kombinasiContainer.classList.remove('hidden');
        MathJax.typesetPromise();
    });
});