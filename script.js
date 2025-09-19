document.addEventListener('DOMContentLoaded', () => {
    // ... (kode yang sudah ada sebelumnya)

    // Tambahkan variabel baru
    const visualStepsContainer = document.getElementById('visual-steps-container');

    // Fungsi untuk membuat tampilan visual dari langkah-langkah
    function createVisualSteps(steps) {
        visualStepsContainer.innerHTML = '';
        visualStepsContainer.classList.remove('hidden');

        steps.forEach((step, index) => {
            const stepLine = document.createElement('div');
            stepLine.classList.add('step-line');

            const equation = document.createElement('div');
            equation.classList.add('step-equation');
            equation.innerHTML = `$${step.a} = ${step.q} \\times ${step.b} + ${step.r}$`;

            stepLine.appendChild(equation);
            visualStepsContainer.appendChild(stepLine);

            if (index < steps.length - 1) {
                const connectorLine = document.createElement('div');
                connectorLine.classList.add('connector-line');
                connectorLine.innerHTML = `
                    <div class="arrow-down"></div>
                    <div class="arrow-down"></div>
                `;
                visualStepsContainer.appendChild(connectorLine);
            }
        });
        MathJax.typesetPromise();
    }

    // Perbarui event listener untuk Lihat Proses
    lihatProsesBtn.addEventListener('click', () => {
        // ... (kode yang sudah ada sebelumnya)
        
        // Hapus tampilan teks lama dan gunakan tampilan visual
        langkahList.innerHTML = '';
        const { gcd, steps: calcSteps } = calculateGCD(bilangan1, bilangan2);
        steps = calcSteps;
        
        hasilGCD.textContent = `✓ GCD(${bilangan1}, ${bilangan2}) = ${gcd}`;
        
        // Buat tampilan visual
        createVisualSteps(steps);

        hasilContainer.classList.remove('hidden');
        tampilkanKombinasiBtn.classList.remove('hidden');
    });

    // ... (kode untuk Tampilkan Kombinasi Linear tidak perlu diubah)
});