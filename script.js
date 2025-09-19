function lihatProses() {
    let a = parseInt(document.getElementById("num1").value);
    let b = parseInt(document.getElementById("num2").value);

    if (isNaN(a) || isNaN(b) || a <= 0 || b <= 0) {
        alert("Masukkan dua bilangan bulat positif!");
        return;
    }

    let stepsContainer = document.getElementById("steps-container");
    stepsContainer.innerHTML = "";

    let steps = [];
    let x = a, y = b;

    while (y !== 0) {
        let q = Math.floor(x / y);
        let r = x % y;
        steps.push(`${x} = ${q} × ${y} + ${r}`);
        x = y;
        y = r;
    }

    // tampilkan hasil gcd
    document.getElementById("gcd-result").innerHTML = 
        `<b>GCD(${a}, ${b}) = ${x}</b>`;
    document.getElementById("gcd-result").classList.remove("hidden");

    // tampilkan langkah
    document.getElementById("step-title").classList.remove("hidden");
    document.getElementById("steps-container").classList.remove("hidden");

    steps.forEach((s, i) => {
        let div = document.createElement("div");
        div.className = "step-line";
        div.innerText = s;
        stepsContainer.appendChild(div);

        if (i < steps.length - 1) {
            let arrowDiv = document.createElement("div");
            arrowDiv.className = "connector-arrows";
            arrowDiv.innerHTML = `<div class="arrow"></div>`;
            stepsContainer.appendChild(arrowDiv);
        }
    });

    // aktifkan tombol kombinasi linear
    document.getElementById("btn-komlin").classList.remove("hidden");
}

function tampilkanKombinasiLinear() {
    let a = parseInt(document.getElementById("num1").value);
    let b = parseInt(document.getElementById("num2").value);

    let x0 = 1, y0 = 0;
    let x1 = 0, y1 = 1;

    let A = a, B = b;
    while (B !== 0) {
        let q = Math.floor(A / B);
        let r = A % B;

        let x2 = x0 - q * x1;
        let y2 = y0 - q * y1;

        x0 = x1; y0 = y1;
        x1 = x2; y1 = y2;

        A = B; B = r;
    }

    let gcd = A;
    let result = `GCD(${a}, ${b}) = ${gcd} = (${x0})·${a} + (${y0})·${b}`;

    document.getElementById("komlin-title").classList.remove("hidden");
    let komlinBox = document.getElementById("komlin-result");
    komlinBox.innerText = result;
    komlinBox.classList.remove("hidden");
}
