var intervalo = null;
var $question = null;
var $jogadores = null;
var $eu = null;
var $rodadas = null;
var $atualizarTurno = true;
var $categorias = null;
var $snake_never = false;
var $firstLoad = true;
var $controleTurnoIntervalo;
////////////////////////////////////////

function getRodadaAtual(){
  return $status.rodadaAtual; //$rodadas[$rodadas.length - 1];
}

function setGeneral(){
  console.log($status);
  var rodada_atual  = this.getRodadaAtual();
  // $eu = $jogadores.filter(function(j){return j.id === $user_id})[0];
  // //$eu = $jogadores.filter(function(j){return j.id === 3})[0];
  for(index_jogador in $jogadores){
    var jogador = $jogadores[index_jogador];
    var elementId = "#name_player_" + (Number(index_jogador) + 1);
    var tokenId = "#token_player_" + (Number(index_jogador) + 1);
    $(tokenId).show();
    $(elementId).text(jogador.user.name);
    $(elementId).attr("player_id", jogador.user.id);
    $(tokenId).attr("player_id", jogador.user.id);
    if(rodada_atual.jogador_id == jogador.user.id)
      $("#area_player_" + (Number(index_jogador) + 1)).css("color", "white");
    else
      $("#area_player_" + (Number(index_jogador) + 1)).css("color", "black");
  }

  for(index_s in $jogadores){
    var status = $jogadores[index_s].status;
    status.jogador_id =  $jogadores[index_s].user_id;
    if($firstLoad){
      walk(status, false);
    }else{
      //$audio_walk.play();
      setInterval(walk(status, false), 6000);
    }
  }
  $firstLoad = false;
}

function prepareTurno(){

  $("#snake_show").hide();
  $("#waitGameArea").modal("hide");
  $atualizarTurno = false;
  var rodada_atual = this.getRodadaAtual();
  $fichas = JSON.parse(rodada_atual.fichas);

  attFichas();
}

function prepareEspectador(configuration){
  for(i = 1; i <= 5; i++)
    disableFicha($("#ficha_" + i));

  $("#questionArea").hide();
  if(!$snake_never){

    if(!$("#waitGameArea").is(":visible")){
      $turno_outros.play();
    }
    $("#waitGameArea").modal("show");
  }

}

function finishGame(){
  var finishMessage;
  if($user_id === $status.vencedor_id)
    finishMessage = "PARABÉNS! YOU HAVE THE POWER";
  else
    finishMessage = "TA DE SACANAGEM? TU PERDEU CACETE!";
  var counter = 5;
  var redirectCounter = setInterval(function(){
      $("#redirectMessage").text(counter--);
      if(counter == 0){
        clearInterval(redirectCounter);
        window.location.replace("./home");
      }
  }, 1000);

  $("#finishMessage").text(finishMessage);
  $("#modalFinish").modal("show");
}

function statusTurno(){
  $jogadores = $status.jogadores;
  console.log($status);
  if($status.vencedor_id != null || this.getRodadaAtual().posicao >= 22){
    finishGame();
    return;
  }
  setGeneral();
  $rodadas = null;
  var rodada_atual = this.getRodadaAtual();
  if($user_id !== rodada_atual.jogador_id)
    prepareEspectador();
  else
    prepareTurno();
}

function updateTurnoTimer(){
  var secAtual = Number($("#turno_timer").text());
  $("#turno_timer").text(--secAtual);

  if(secAtual <= 0){
    selectAnswer(true);
  }
}

function setCategorias(){
  requestCategorias(function(categorias){
    $categorias = categorias;
    var html = "";
    for(key in categorias){
      html += "<div class='col-lg-12'> Titulo: " +
        categorias[key].titulo + " - Descriçaõ: " + categorias[key].descricao
        +"</div>";
    }
    $("#categoriasArea").append(html);
  });
}

function controlarTurno(){
  var data = {user_id: $user_id};
    requestGameStatus(data, function(status){
      $status = status;
      statusTurno();
    });
}

$(document).ready(function(){

  var data = {user_id: $user_id};
  requestGameStatus(data, function(status){
    $status = status;
    statusTurno();
  }, function(error){
    window.location.replace("/home");
  });

  $controleTurnoIntervalo = setInterval(function(){
    console.log("atualizando status da sala...");
    controlarTurno();
  }, 5000);

//  controlarTurno();

  $("#snake_show").on("click", function(){
    $snake_never = false;
    $("#waitGameArea").modal("show");
  });

  $("#snake_no_more").on("click", function(){
    $snake_never = true;
  });

  $("#forceRedirect").on("click", function(){
    window.location.replace("./home");
  });

  $("#confirmFichaSelection").on("click",function(){
    console.log("limpando intervalo de turno...");
    clearInterval($controleTurnoIntervalo);
    intervalo = setInterval(function(){
      updateTurnoTimer();
    }, 1000);
  });
});
