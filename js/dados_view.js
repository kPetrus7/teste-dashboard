// Função que atualiza a produção e projeção dos turnos e do dia no DOM
function atualizarProducao(dom_prod, dom_proj, dados) {
   if (dados.producao != null) {
      dom_prod.innerText = dados.producao;
      dom_proj.innerText = dados.projecao;
   } else {
      dom_prod.innerText = "Não iniciado";
      dom_proj.innerText = "Não iniciado";
   }
}

//Função que controla e atualiza a formatação do tipo de produto atual
function atualizarProdAtual(valor) {
   dom_prod_atual.classList.remove("standard", "eudr", "fsc");
   if (valor === "STANDARD") dom_prod_atual.classList.add("standard");
   else if (valor === "EUDR") dom_prod_atual.classList.add("eudr");
   else if (valor === "FSC") dom_prod_atual.classList.add("fsc");
}

// Função para o calculo das metas
function calculoMeta(MINUTOS, SECADOR, OE, QTD_SECADORES) {
   const PESO_CARRINHO = 650;
   return ((MINUTOS / SECADOR) * PESO_CARRINHO * QTD_SECADORES) * OE;
}

// Função utilitária para converter valores em float com apenas 2 casas decimais
function toFloat(valor) {
   if (typeof valor !== "number") return valor;
   return valor.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function atualizarDash() {

   // Depende do Script: semana.js
   const hoje = getDiaAtual().toUpperCase();

   const qtd_dias = 10;
   const sem_prod = false;

   let meta_manha, meta_tarde, meta_noite, meta_dia;

   // Fetch que solicita a leitura do JSON das configurações para o controlador 
   // Paramentro: action -> "ler" para o controlador executar o método de leitura
   fetch('http://192.168.0.15:8090/dashboard/producao/controller/json_controller.php?action=ler')
      .then(response => response.json())
      .then(dados => {

         const { oe, tempo_secador, qtd_carrinho } = dados["informacoes-manuais"];

         switch (hoje) {
            case "DOMINGO":
               meta_manha = meta_tarde = meta_noite = meta_dia = "DESCANSAR";
               break;
            case "SEGUNDA-FEIRA":
               meta_manha = calculoMeta(370, tempo_secador, oe, qtd_carrinho);
               meta_tarde = calculoMeta(500, tempo_secador, oe, qtd_carrinho);
               meta_noite = calculoMeta(410, tempo_secador, oe, qtd_carrinho);
               break;
            case "SABADO":
               meta_manha = calculoMeta(400, tempo_secador, oe, qtd_carrinho);
               meta_tarde = calculoMeta(480, tempo_secador, oe, qtd_carrinho);
               meta_noite = calculoMeta(360, tempo_secador, oe, qtd_carrinho);
               break;
            default:
               meta_manha = calculoMeta(460, tempo_secador, oe, qtd_carrinho);
               meta_tarde = calculoMeta(500, tempo_secador, oe, qtd_carrinho);
               meta_noite = calculoMeta(480, tempo_secador, oe, qtd_carrinho);
               break;
         }

         if (hoje !== "DOMINGO") meta_dia = meta_manha + meta_tarde + meta_noite;

         dom_meta_manha.innerText = parseInt(meta_manha).toLocaleString('pt-BR');
         dom_meta_tarde.innerText = parseInt(meta_tarde).toLocaleString('pt-BR');
         dom_meta_noite.innerText = parseInt(meta_noite).toLocaleString('pt-BR');
         dom_meta_dia.innerText = parseInt(meta_dia).toLocaleString('pt-BR');
      });

   // Fetch que solicita ao controlador as informações armazenadas no banco
   // Parametro: qtd_dias -> número de dias que ele deve buscar para os dias anteriores
   // Parametro: sem_prod -> se deve retornar dias sem produção(true) ou não(false)
   fetch(`http://192.168.0.15:8090/dashboard/producao/controller/dados_controller.php?action=dados&qtd_dias=${qtd_dias}&sem_prod=${sem_prod}`)
      .then(response => response.json())
      .then(dados => {

         atualizarProducao(dom_prod_dia, dom_proj_dia, dados.dia);
         atualizarProducao(dom_prod_manha, dom_proj_manha, dados.manha);
         atualizarProducao(dom_prod_tarde, dom_proj_tarde, dados.tarde);
         atualizarProducao(dom_prod_noite, dom_proj_noite, dados.noite);

         dom_ultimos_dias.innerHTML = "";
         for (let i = 1; i <= qtd_dias; i++) {
            dom_ultimos_dias.innerHTML += `
                    <div class="row dia-anterior" id="linha_dia_${i}">
                        <div class="col-4 offset-1 text-start" id="semana_dia_${i}"></div>
                        <div class="teste col-2 text-center" id="data_dia_${i}"></div>
                        <div class="col-2 offset-1 text-end" id="produzido_dia_${i}"></div>
                    </div>
                `;
         }

         for (let i = 0; i < qtd_dias; i++) {
            dom_linha_dia(i + 1).dataset.referencia = dados.anteriores[i].referencia;
            dom_linha_dia(i + 1).dataset.dataDia = dados.anteriores[i].data;
            dom_data_dia(i + 1).innerText = dados.anteriores[i].data;
            dom_semana_dia(i + 1).innerText = diaSemana(dados.anteriores[i].data);
            dom_produzido_dia(i + 1).innerText = dados.anteriores[i].produzido;
         }

         dom_prod_mes.innerText = dados.mes;
         dom_prod_ano.innerText = dados.ano;
         dom_prod_atual.innerText = dados.prod_atual + " ";
         dom_op_atual.innerText = dados.op_atual;

         atualizarProdAtual(dados.prod_atual);
      });
}

// Elementos do DOM para produção e projeção dos turnos e do dia
const dom_prod_dia = document.getElementById("prod_dia");
const dom_proj_dia = document.getElementById("proj_dia");

const dom_prod_manha = document.getElementById("prod_manha");
const dom_proj_manha = document.getElementById("proj_manha");

const dom_prod_tarde = document.getElementById("prod_tarde");
const dom_proj_tarde = document.getElementById("proj_tarde");

const dom_prod_noite = document.getElementById("prod_noite");
const dom_proj_noite = document.getElementById("proj_noite");

// Elementos do DOM para os valores das metas de turno e dia
const dom_meta_manha = document.getElementById("meta_manha");
const dom_meta_tarde = document.getElementById("meta_tarde");
const dom_meta_noite = document.getElementById("meta_noite");
const dom_meta_dia = document.getElementById("meta_dia");

// Elementos do DOM para produção do mes e do ano
const dom_prod_mes = document.getElementById("prod_mes");
const dom_prod_ano = document.getElementById("prod_ano");

// Elementos do DOM para produto e op atuais
const dom_prod_atual = document.getElementById("prod_atual");
const dom_op_atual = document.getElementById("op_atual");

// Elemento do DOM onde vão ser inseridos os valores de produção dos ultimos dias
const dom_ultimos_dias = document.getElementById("ultimos_dias");

// Funções que geram referencias para os elemtos de cada dia anterior a ser utilizado
const dom_linha_dia = i => document.getElementById(`linha_dia_${i}`);
const dom_semana_dia = i => document.getElementById(`semana_dia_${i}`);
const dom_data_dia = i => document.getElementById(`data_dia_${i}`);
const dom_produzido_dia = i => document.getElementById(`produzido_dia_${i}`);

setInterval(atualizarDash, 60000);
atualizarDash();
