/*    
        @licstart  The following is the entire license notice for this page.

        Copyright (C) 2015  Carlos J. Costa

        The JavaScript code in this page is free software: you can
        redistribute it and/or modify it under the terms of the GNU
        General Public License (GNU GPL) as published by the Free Software
        Foundation, either version 3 of the License, or (at your option)
        any later version.  The code is distributed WITHOUT ANY WARRANTY;
        without even the implied warranty of MERCHANTABILITY or FITNESS
        FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.

        As additional permission under GNU GPL version 3 section 7, you
        may distribute non-source (e.g., minimized or compacted) forms of
        that code without the copy of the GNU GPL normally required by
        section 4, provided you include this license notice and a URL
        through which recipients can access the Corresponding Source.   


        @licend  The above is the entire license notice
        for the JavaScript code in this page.
*/

// Globals
var pontos = 0;
var bgWidth = 900;
var bgHeight  = 630;
var pimguimWidth = 32;
var pimguimHeight = 32;
var peixeWidth = 30;
var peixeHeight = 30;
var barcoHeight =50;
var barcoWidth = 80;
var totalPeixes = 0;
var nPeixeBarco = 0;
var guarda = true;
var movePinguim = true;
var peixeX; 
var peixeY; 
var barcoX;
var barcoY;


// Sons
var bubble = new Audio('bubble.mp3');
var fim = new Audio('fim.mp3');

// Gera uma posiçao aleatoria para o peixe
function peixeAleatorio(){ 
	peixeX = Math.random() * ( bgHeight - pimguimHeight); 
	peixeY = Math.random() * ( bgWidth - pimguimWidth); 
	
	var fish = document.getElementById("peixe");
    fish.style.top = peixeX + "px";
	fish.style.left = peixeY + "px";
}

// Move pinguim ou barco para a cima	
// Se barco velocidade menor
function up(figura){
	var myclass = new Array('back-right', 'back-stand', 'back-left');
	var n = Math.round(Math.random() * 2);
	var figuraObj = document.getElementById(figura);
		figuraObj.setAttribute('class', myclass[n]);
	var a = figuraObj.offsetTop;
	
	if ( parseInt(a, 10) <= 0 ){
		return;
	}
	
	if (a == 0){ 
		a = "0";
	}
	var velocidade = (figura == 'character') ? 8 : 2;
	
	b = parseInt(a) - velocidade;
	figuraObj.style.top = b + "px"; 
}

// Move pinguim ou barco para a baixo	
// Se barco velocidade menor
function down(figura){
	var myclass = new Array('front-right','front-stand','front-left');
	var n= Math.round(Math.random()*2);
	var figuraObj = document.getElementById(figura);
		figuraObj.setAttribute('class',myclass[n]);
	var a = figuraObj.offsetTop;
	
	if ( parseInt(a, 10) >= bgHeight - pimguimHeight ){
		return;
	}
	
	if (a == 0) {
		a = "0";
	}
	var velocidade = (figura == 'character') ? 8 : 2;
	
	b = parseInt(a) + velocidade;
	figuraObj.style.top = b + "px"; 
}

// Move pinguim ou barco para a direita	
// Se barco velocidade menor
function right(figura){
	var myclass = new Array('right-right','right-stand','right-left');
	var n = Math.round(Math.random()*2);
	var figuraObj = document.getElementById(figura);
		figuraObj.setAttribute('class',myclass[n]);
	var a = figuraObj.offsetLeft;
	
	if ( parseInt(a, 10) >= bgWidth ){
		return;
	}
	
	if (a==0) {
		a="0";
	}
	var velocidade = (figura == 'character') ? 8 : 2;
	
	b = parseInt(a)+ velocidade;
	figuraObj.style.left= b + "px"; 
}
	
// Move pinguim ou barco para a esquerda	
// Se barco velocidade menor
function left(figura){
	var myclass = new Array('left-right','left-stand','left-left');
	var n = Math.round(Math.random()*2);
	var figuraObj = document.getElementById(figura);
		figuraObj.setAttribute('class',myclass[n]);
	var a = figuraObj.offsetLeft;
	
	if ( parseInt(a, 10) <= 0){
		return;
	}	
	
	if (a == 0) {
		a = "0";
	}
	
	var velocidade = (figura == 'character') ? 8 : 2;
	
	b = parseInt(a) - velocidade;
	figuraObj.style.left = b + "px"; 
}
 
//  Gera alerta de fim de jogo com número total de peixes ao fim de 60 segundos
var x = setTimeout(
	function alertaFim() {
		fim.play();
		alert("Acabou o tempo! Apanhaste " + totalPeixes + " peixes.");
		
	}
, 60000);

// Verfica se o pinguim apanhou um peixe.
// Reproduz som se tiver apanhado um peixe.
// Aumenta o número de peixes apanhados e mostra no ecrã.
// Restringe o pinguim de apanhar peixes sem antes ir ao barco.

function apanhaPeixe(){

	var pimguimTop = document.getElementById('character').offsetTop;
	var pimguimLeft = document.getElementById('character').offsetLeft;
	
	var peixeTop = document.getElementById('peixe').offsetTop;
	var peixeLeft = document.getElementById('peixe').offsetLeft;
	
	if ( guarda == true) {
		if (pimguimTop >= peixeTop - 20 && pimguimTop <= peixeTop + peixeHeight){
			if (pimguimLeft >= peixeLeft - 20 && pimguimLeft <= peixeLeft + peixeWidth){
				bubble.play();
				peixeAleatorio();
				totalPeixes++;
				guarda = false;
				document.getElementById ('peixesApanhados').innerHTML = "Apanhaste " +totalPeixes+ " peixes.";
				document.getElementById ('guardaPeixe').innerHTML = "Guarda o peixe no barco!"
			}
		}
	}	
}

// Verfica se o pinguim foi ao barco colocar o peixe.
// Troca de personagem se o pinguim foi ao barco com peixe.
// Guarda a posiçao inicial do barco.
// Reproduz som ao chegar ao barco com peixe.
function guardaBarco(){

	var pimguimTop = document.getElementById('character').offsetTop;
	var pimguimLeft = document.getElementById('character').offsetLeft;
	
	var barcoTop = document.getElementById('barco').offsetTop;
	var barcoLeft = document.getElementById('barco').offsetLeft;
	
	if (pimguimTop >= barcoTop - 20 && pimguimTop <= barcoTop + barcoHeight){
		if (pimguimLeft >= barcoLeft - 20 && pimguimLeft <= barcoLeft + barcoWidth){
			if ( guarda == false ){
				movePinguim = false;
				barcoX = document.getElementById('barco').offsetTop;
				barcoY = document.getElementById('barco').offsetLeft;
				bubble.play();
				guarda = true;
				document.getElementById ('guardaPeixe').innerHTML = "Boa já guardaste o peixe, apanha outro!";	
			} 
		}
	}
}

// Deteta se o barco foi colocar os peixes a cidade
// Se tiver ido a cidade troca a personagem e o barco ao fim de 3 segundos volta a posição inicial
function guardaCidade(){
	var barco = document.getElementById('barco');
	var barcoTop = barco.offsetTop;
	var barcoLeft = barco.offsetLeft;
	
	if (barcoTop >=  114 - 20 && barcoTop <= 114 + barcoHeight){
		if (barcoLeft >= 514 - 20 && barcoLeft <= 514 + barcoWidth){
			console.log("ah caramba");
			movePinguim = true;
			setTimeout(function(){ 		
				barco.style.top = barcoX + "px";
				barco.style.left = barcoY + "px";
			}
			, 3000);
			bubble.play();
		}
	}
}

// Trata do evento onkeydown e adiciona movimento para as teclas de direcção	
function Key(e) {	
	var character = (movePinguim) ? 'character' : 'barco';
	
	if (e.keyCode === 37) left(character);
	if (e.keyCode === 38) up(character);
	if (e.keyCode === 39) right(character);
	if (e.keyCode === 40) down(character);
		
	// Verfica se o pinguim está em cima do peixe.
	apanhaPeixe();
	// Se o pinguim foi guardar os peixes no barco.
	guardaBarco();
	// Se o barco foi a cidade entregar o peixe.
	guardaCidade();
}

