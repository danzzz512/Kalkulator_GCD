document.addEventListener('DOMContentLoaded', () => {
    const lihatProsesBtn = document.getElementById('lihatProsesBtn');
    const tampilkanKombinasiBtn = document.getElementById('tampilkanKombinasiBtn');
    const hasilContainer = document.getElementById('hasil-container');
    const hasilGCD = document.getElementById('hasilGCD');
    const visualStepsContainer = document.getElementById('visual-steps-container');
    const kombinasiContainer = document.getElementById('kombinasi-container');
    const kombinasiList = document.getElementById('kombinasi-list');

    let steps = [];

    // Euclid biasa
    const calculateGCD = (a, b) => {
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
    };

    // Extended Euclid
    const extendedEuclid = (a, b) => {
        if (b === 0) {
            return { x: 1, y: 0, gcd: a, history: [`${a}(1) + ${b}(0) = ${a}`] };
        }
        let { x: x1, y: y1, gcd, history } = extendedEuclid(b, a % b);
        let x = y1;
        let y = x1 - Math.floor(a / b) * y1;
        history.push(`${a}(${x}) + ${b}(${y}) = ${gcd}`);
        return { x, y, gcd, history };
    };

    // Visualisasi langkah Euclid
    const createVisualSteps = (steps) => {
        visualStepsContainer.innerHTML = '';
        if (steps.length === 0) return;

        steps.forEach((step, i) => {
            const line = document.createElement('div');
            line.classList.add('step-line');
            line.innerHTML = `$${step.a} = ${step.q}\\times${step.b} + ${step.r}$`;
            visualStepsContainer.appendChild(line);

            if (i < steps.length - 1) {
                const connector = document.createElement('div');
                connector.classList.add('connector-arrows');
                connector.innerHTML = `
                    <div class="arrow-left"></div>
                    <div class="arrow-right"></div>
                `;
                visualStepsContainer.appendChild(connector);
            }
        });
        MathJax.typesetPromise();
    };

    // Kombinasi linear dinamis
    const generateLinearCombination = (a, b) => {
        let { x, y, gcd, history } = extendedEuclid(a, b);

        let resultSteps = [];
        resultSteps.push("Langkah penyusunan kombinasi linear:");
        history.forEach(eq => resultSteps.push(`$${eq}$`));
        resultSteps.push("---");
        resultSteps.push(`Sehingga: $${a}(${x}) + ${b}(${y}) = ${gcd}$`);

        return resultSteps;
    };

    // Event listener tombol Lihat Proses
    lihatProsesBtn.addEventListener('click', () => {
        const bilangan1 = parseInt(document.getElementById('bilangan1').value);
        const bilangan2 = parseInt(document.getElementById('bilangan2').value);

        if (isNaN(bilangan1) || isNaN(bilangan2) || bilangan1 <= 0 || bilangan2 <= 0) {
            alert('Masukkan dua bilangan bulat positif.');
            return;
        }

        const { gcd, steps: calcSteps } = calculateGCD(bilangan1, bilangan2);
        steps = calcSteps;

        hasilGCD.innerHTML = `✓ GCD(${bilangan1}, ${bilangan2}) = <b>${gcd}</b>`;
        createVisualSteps(steps);

        hasilContainer.classList.remove('hidden');
        tampilkanKombinasiBtn.classList.remove('hidden');
        kombinasiContainer.classList.add('hidden');
    });

    // Event listener tombol Kombinasi Linear
    tampilkanKombinasiBtn.addEventListener('click', () => {
        kombinasiList.innerHTML = '';
        const bilangan1 = parseInt(document.getElementById('bilangan1').value);
        const bilangan2 = parseInt(document.getElementById('bilangan2').value);

        const combSteps = generateLinearCombination(bilangan1, bilangan2);
        combSteps.forEach(step => {
            const p = document.createElement('p');
            p.innerHTML = step;
            kombinasiList.appendChild(p);
        });

        kombinasiContainer.classList.remove('hidden');
        MathJax.typesetPromise();
    });
});
