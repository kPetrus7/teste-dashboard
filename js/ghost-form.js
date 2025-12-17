// Ó tu, viajante destemido, que ousa adentrar as linhas tortuosas deste código amaldiçoado, prepara teu espírito pois aqui repousa um labirinto de gambiarras tão antigas quanto caóticas, forjado não por sábios programadores, mas pelo desespero… e por conspirações obscuras da magia artificial(ChatGPT).

// Quando outrora pus-me a escrever estas runas, sonhava criar apenas um humilde controlador, guardião dos formulários que alimentariam os cálculos das metas. Mas o destino, caprichoso, aliou-se ao uso imprudente de poderes arcanos (muitos deles soprados pelas IAs do além) — e assim, aquilo que deveria ser ferramenta tornou-se criatura.

// Desisti de domá-la há eras. Hoje, este código tem vontade própria… e eu, mero junior que o concebeu, já não comando seu curso.

// Segue, portanto, bravo aventureiro. Que a sorte esteja contigo, e que os deuses — quaisquer que ainda tenham piedade — iluminem teu caminho através deste ser indomável.

// Ass Milton Neto.

const btnSalvar = document.getElementById("btnSalvar");
const btnOpen = document.querySelector(".menu");
const ghost = document.getElementById("ghost");

// --- Labels --- //
const secador = document.getElementById("secador");
const numero = document.getElementById("numero");
const oe = document.getElementById("oe");

let aviso = "";
let SALVAR = false

//=============================================================================//
// --- ABRE TELA --- //
btnOpen.onclick = () => {
    ghost.style.display = "flex";

    fetch('http://192.168.0.15:8090/dashboard/teste/controller/json_controller.php?action=ler')
        .then(res => res.json())
        .then(dados => {
            console.log(dados);
            oe.value = dados["informacoes-manuais"].oe ?? "";
            secador.value = dados["informacoes-manuais"].tempo_secador ?? "";
            numero.value = dados["informacoes-manuais"].qtd_carrinho ?? "";
        });
}
//=============================================================================//
// --- FILTROS --- //

// OE: Números e Ponto
filtro(oe, "0-9.", 5, v => !isNaN(parseInt(v)));

// Secador: Inteiros
filtro(secador, "0-9", 2, v => !isNaN(parseInt(v)));

// Numeros: 1 ou 2
filtro(numero, "1-2", 1, v => !isNaN(parseInt(v)));

//=============================================================================//
// --- SALVAR --- //
btnSalvar.onclick = () => {

    let CAMPOS_VALIDOS = true;

    const MAX = 16;
    const MIN = 5;

    // Validador OE e Numero de Carrinhos
    CAMPOS_VALIDOS = (validadorMinMax(oe, 0, 1) && validadorMinMax(numero, 1, 2))

    // Validador Tempo de Secador
    if (!validadorMinMax(secador, 5, 16)) {

        let valorSecador = parseInt(secador.value);

        if (valorSecador > 16) {
            valorSecador = MAX;
            aviso = "O secador atingiu o máximo de " + MAX + " minutos";
        }
        else if (valorSecador < 5) {
            valorSecador = MIN;
            aviso = "O secador atingiu o mínimo de " + MIN + " minutos"
        }
        secador.value = parseInt(valorSecador);
    }

    //Display de Alertas
    if (!CAMPOS_VALIDOS) {
        alert("Corrija os campos antes de salvar.");
        SALVAR = false;
        return;
    }

    SALVAR = true;
    ghost.style.display = "none";
}
//=============================================================================//
// ENVIO DO FORMULÁRIO
document.getElementById("ghost-form").addEventListener("submit", function (e) {
    e.preventDefault();

    if (SALVAR) {

        let oe = document.getElementById("oe").value
        let secador = document.getElementById("secador").value
        let numero = document.getElementById("numero").value

        //Formatação da OE
        if (oe.startsWith(".")) {
            oe = "0" + oe;
        }
        oe = parseFloat(oe);

        //construção do JSON
        const data = {
            "informacoes-manuais": {
                oe: parseFloat(oe),
                tempo_secador: parseInt(secador),
                qtd_carrinho: parseInt(numero)
            }
        };

        // POST do JSON
        fetch("http://192.168.0.15:8090/dashboard/teste/controller/json_controller.php?action=salvar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(res => {
                let alerta = res + "\n" + aviso;
                aviso = "";
                alert(alerta);
            })
            .catch(err => console.error(err));
    }
})
