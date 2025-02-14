let listaDeNumerosSorteados = [];
let numeroLimite = 10
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto){
let campo = document.querySelector(tag);
campo.innerHTML = texto;
// responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.3; 
    window.speechSynthesis.speak(utterance); 
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}

function exibirMensagemInicial() {
exibirTextoNaTela('h1', 'JOGO DO NÚMERO SECRETO!');
exibirTextoNaTela('p', 'ESCOLHA UM NÚMERO ENTRE 1 E 10: ');
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    let palavraTentativa = tentativas > 1 ? 'TENTATIVAS!' : 'TENTATIVA';
    let mensagemTentativas = (`CERTÔ EM ${tentativas} ${palavraTentativa}, PARABÉNS!`);
    if (chute == numeroSecreto){
    exibirTextoNaTela('p', mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela('p', `O NÚMERO SECRETO É MENOR QUE ${chute}.`);
        } else {
            exibirTextoNaTela('p', `O NÚMERO SECRETO É MAIOR QUE ${chute}.`);
        }
    tentativas ++
    limparCampo();
    }
 }

function gerarNumeroAleatorio() {
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;
    let numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        // console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    document.querySelector('input').value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}