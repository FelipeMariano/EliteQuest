<!DOCTYPE html>
<html>

<head>

	<title>Elite Jogos</title>
	<meta charset="utf-8">

	<!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">

    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css" integrity="sha384-rHyoN1iRsVXV4nD0JutlnGaslCJuC7uwjduW9SVrLvRYooPp2bWYgmgJQIXwl/Sp" crossorigin="anonymous">

    <link rel="stylesheet" type="text/css" href="./../../css/style.css">

</head>

<body>

	<div class="container">
		<div class="row">
			<div class="col-sm-12 logo">
				<img src="./../../assets/Logo Quest.png">
			</div>
			<div id="login" class="col-sm-6 formulario">
				<form action="{{ route('login') }}" method="POST">
					{{ csrf_field() }}
					<input class="btn" type="text" name="email" placeholder="E-mail*"><br/>
					<input class="btn" type="password" name="password" placeholder="Senha*"><br/>
					<button id="botao" class="btn btn-success" type="submit">Jogar</button><br/>
					<div class="esqueciSenha"><a href="/">ESQUECI A SENHA</a></div>
				</form>
			</div>
			<div class="col-sm-6 formulario">
				<form action="{{ route('register') }}" method="POST">
					{{ csrf_field() }}
					<p>Não tem cadastro? Registre-se agora</p>
					
					<input class="btn {{ $errors->has('name') ? 'temErro':''}}" type="text" name="name" placeholder="Nome Completo* {{$errors->first('name')}}"><br/>
					<input class="btn {{ $errors->has('email') ? 'temErro':''}}" type="text" name="email" placeholder="E-mail* {{$errors->first('email')}}"><br/>
					<input class="btn {{ $errors->has('password') ? 'temErro':''}}" type="password" name="password" placeholder="Senha* {{$errors->first('password')}}"><br/>
					<input class="btn {{ $errors->has('password_confirmation') ? 'temErro':''}}" type="password" name="password_confirmation" placeholder="Confirmar Senha* {{$errors->first('password_confirmation')}}"><br/>
					<button id="botao" class="btn btn-success" type="submit">Cadastrar</button>
				</form>
			</div>
		</div>
	</div>

	<div class="container">
		<div class="row footer">
			<div class="col-sm-6 empresa">ELITE JOGOS</div>
			<div class="col-sm-6 webmaster"><a href="/"><u>Webmaster</u></a></div>
		</div>
	</div>	


	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<!-- Latest compiled and minified JavaScript -->
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>

</body>

</html>