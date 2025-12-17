function filtro(input, caracteresValidos, comprimento, validador) {
    const regex = new RegExp(`[^${caracteresValidos}]`, "g");

    input.addEventListener("input", () => {
        input.value = input.value.replace(regex, "");

        if (input.value.length > comprimento) {
            input.value = input.value.slice(0, comprimento);
        }

        const valor = input.value;

        if (!validador(valor)) {
            input.classList.add("input-error");
            input.classList.remove("input-valid");
        } else {
            input.classList.remove("input-error");
            input.classList.add("input-valid");
        }
    });
}

function validadorMinMax(input, min, max) {

    const valor = input.value;

    if (isNaN(valor) || valor < min || valor > max) {
        input.classList.remove("input-valid");
        input.classList.add("input-error");
        return false;
    } else {
        input.classList.remove("input-error");
        input.classList.add("input-valid");
        return true
    }
}