document.addEventListener('click', function (e) {

    const dia = e.target.closest('.dia-anterior');
    if (dia) {

        const referencia = dia.dataset.referencia;
        const data_dia = diasAnteriores(referencia)

        const dash_line = document.getElementById("detalhamento")
        const dash_space = document.getElementById("dia-detalhado")

        limparExpandidos()

        fetch(`http://192.168.0.15:8090/dashboard/producao/controller/dados_controller.php?action=detalhado&dia_ref=${referencia}`)
            .then(response => response.json())
            .then(dados => {

                document.getElementById("detalhe-data").innerText = data_dia;
                document.getElementById("detalhe-total").innerText = dados.dia.producao;
                document.getElementById("detalhe-manha").innerText = dados.manha.producao;
                document.getElementById("detalhe-tarde").innerText = dados.tarde.producao;
                document.getElementById("detalhe-noite").innerText = dados.noite.producao;

            });

        dash_line.style.display = "block";
        
        dash_space.classList.add('destaque');
        dash_space.classList.add('expanded');
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {

        document.getElementById("detalhamento").style.display = "none";

        destacarTurno();
        if (!window.destaqueInterval) {
            window.destaqueInterval = setInterval(destacarTurno, 1000);
        }
    }
});

function diasAnteriores(n) {
    const data = new Date();
    data.setDate(data.getDate() - n);
    const data_BR = data.toLocaleDateString('pt-BR');
    return data_BR;
}