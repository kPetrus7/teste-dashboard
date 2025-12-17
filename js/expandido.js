document.querySelectorAll('.animado').forEach(item => {
    item.addEventListener('click', () => {

        limparExpandidos()

        item.classList.toggle('expanded');
        item.classList.add('destaque');
    });
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        
        limparExpandidos()
        destacarTurno();
        if (!window.destaqueInterval) {
            window.destaqueInterval = setInterval(destacarTurno, 1000);
        }
    }
});

function limparExpandidos() {

    clearInterval(destaqueInterval);
    window.destaqueInterval = null;

    document.getElementById("detalhamento").style.display = "none";


    document.querySelectorAll('.destaque').forEach(destacado => {
        destacado.classList.remove('destaque');
    });

    document.querySelectorAll('.dash-space').forEach(item => {
            item.classList.remove('expanded');
            item.classList.remove('destaque');
        });

}