function destacarTurno() {

    const agora = new Date();
    const hora = agora.getHours();
    const minuto = agora.getMinutes();

    const total = hora * 60 + minuto;

    // console.log(total);

    // Faixas convertidas:
    // 00:00 = 0 min   | 07:40 = 460 min
    // 07:41 = 481 min | 16:00 = 960 min
    // 16:01 = 961 min | 23:59 = 1439 min

    const hoje = getDiaAtual();

    const manha = document.getElementById("manha");
    const tarde = document.getElementById("tarde");
    const noite = document.getElementById("noite");

    [manha, tarde, noite].forEach(el => el.classList.remove("destaque"));

    if (hoje === "SEGUNDA-FEIRA") {

        if (total >= 90 && total <= 370) {
            manha.classList.add("destaque");
        } else if (total >= 371 && total <= 960) {
            tarde.classList.add("destaque");
        } else if (total >= 961 && total <= 1370) {
            noite.classList.add("destaque");
        }
    } else if (hoje === "SÁBADO") {

        if (total >= 0 && total <= 400) {
            manha.classList.add("destaque");
        } else if (total >= 401 && total <= 880) {
            tarde.classList.add("destaque");
        } else if (total >= 881 && total <= 1240) {
            noite.classList.add("destaque");
        }

    } else {

        if (total >= 0 && total <= 460) {
            manha.classList.add("destaque");
        } else if (total >= 461 && total <= 960) {
            tarde.classList.add("destaque");
        } else if (total >= 961 && total <= 1439) {
            noite.classList.add("destaque");
        }
    }

}
destacarTurno();
window.destaqueInterval = setInterval(destacarTurno, 60000);