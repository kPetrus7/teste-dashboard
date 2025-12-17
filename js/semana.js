function diaSemana(dataStr) {
    const [dia, mes, ano] = dataStr.split("/").map(Number);

    const date = new Date(ano, mes - 1, dia);

    const dias = [
        "DOMINGO",
        "SEGUNDA-FEIRA",
        "TERÇA-FEIRA",
        "QUARTA-FEIRA",
        "QUINTA-FEIRA",
        "SEXTA-FEIRA",
        "SÁBADO"
    ];
    return dias[date.getDay()];
}

function getDiaAtual() {

    const data = new Date();
    const data_BR = data.toLocaleDateString('pt-BR');
    return diaSemana(data_BR);
}