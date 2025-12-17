function atualizarRelogio() {
    const agora = new Date();

    const h = agora.getHours().toString().padStart(2, '0');
    const m = agora.getMinutes().toString().padStart(2, '0');
    const s = agora.getSeconds().toString().padStart(2, '0');

    const dia = agora.getDate().toString().padStart(2, '0');
    const mes = (agora.getMonth() + 1).toString().padStart(2, '0');
    const ano = agora.getFullYear();

    document.getElementById("relogio").innerHTML =
        getDiaAtual() + " - " + `${dia}/${mes}/${ano} - ${h}:${m}:${s}`;
}

setInterval(atualizarRelogio, 1000);
atualizarRelogio()
