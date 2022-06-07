/**Desenvolvendo jogo da memória para praticar */

const cardBoard = document.querySelector("#cardboard");

//variavel contador 
var contador = 0;   

//Array de imagens
const images = [
    "Facebook.svg",
    "Instagram.svg",
    "LinkedIn.svg",
    "Pinterest.svg",
    "Whatsapp.svg",
    "Youtube.svg"
];

//criando HTML com as imagens
let cardHTML = " "; 

images.forEach(img =>{
    cardHTML += `
        <div class="memory-card" data-card="${img}">
            <img class="front-face" src="img/${img}">
            <img class="back-face" src="img/back-face4.jpg">
        </div>
    
    `
}); 

//Duplicando imagens para que seja possível a formação de pares.
cardBoard.innerHTML = cardHTML + cardHTML; 

/**FIM DA RENDERIZAÇÃO HTML -
INICIANDO JS */

const cards = document.querySelectorAll(".memory-card"); //Selecionando todos os cards.
let firstCard, secondCard; //Variáveis utilizadas na revelação das cartas
let lockCard = false //para bloquear a abertura de jogadas extras

//função para virar o card
function flipCard() {

    if(lockCard === true) return false;
    this.classList.add("flip");

    /**Verificando o preenchimento da Primeira Carta e caso
     não tenha sido preenchida, será definida como this*/
    if(!firstCard) {
        firstCard = this;
        

        return false; //para sair da função
    }

    secondCard = this; //especificação da Segunda Carta.

    
    checkForMatch();
    
}

function checkForMatch(){ // Função para Verificar a igualdade dos Cards

    let isMatch = firstCard.dataset.card === secondCard.dataset.card;

    !isMatch ? disableCards(): resetCards(isMatch);

    //lógica para pontuação
    if(isMatch === true){
        contador++
    }

    //Add o contador dentro do Paragrafo de Id #pont
    document.querySelector("#pont").innerHTML = contador;

    //Inserindo alerta
    if(contador === 6){
        alert("Parabéns!!! Você encontrou todos os pares!")
    }
}

/**Função para desabilitar o flip das cartas desiguais para
 que retornem em seu estado inicial*/
function disableCards(){
    lockCard = true;

    //setTimeout é utilizado para executar a função dentro de um determinado tempo
    setTimeout(() => {firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetCards();
    
    }, 1000)
    
}

//Função Recursiva para que as cartas se posicionem de forma aleatória
(function shuffle(){
    cards.forEach(card => {
        let rand = Math.floor(Math.random() * 12);
        card.style.order = rand;
    });
})();


function resetCards(isMatch = false){
    if(isMatch === true){ // se a cartas forem iguais, elas não terão mais o evento de click e o flip estará desabilitado. 
        firstCard.removeEventListener("click", flipCard);
        secondCard.removeEventListener("click", flipCard);
    }

    //zerando as variáveis para dar continuidade a próxima jogada
    [firstCard, secondCard, lockCard] = [null, null, false]

}

cards.forEach(card => card.addEventListener("click",
flipCard)); /**Para cada cards, um card novo será percorrido
e adicionado o evento de click que chamará a função flipCard.*/ 