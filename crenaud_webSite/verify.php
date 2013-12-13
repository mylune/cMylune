<html>
	<head>
		<title>V&eacute;rification de l'envoi d'un e-mail</title>
	<head>
	<body>		
		<?php
			require_once('recaptchalib.php');
			$privatekey = "6LemKusSAAAAAPZ0Bt7t14zUIrpLD8kMQgyioJie";
			$resp = recaptcha_check_answer($privatekey,
										$_SERVER["REMOTE_ADDR"],
										$_POST["recaptcha_challenge_field"],
										$_POST["recaptcha_response_field"]);
			if (!$resp->is_valid) {
				// What happens when the CAPTCHA was entered incorrectly
				echo "Les valeurs saisies dans le CAPTCHA sont incorrectes. Veuillez recommencer en cliquant sur le bouton ci-dessous."
		?>
				<form method="post" action="index.php">
					<input type="hidden" name="postName" value=<?php echo $_POST['name']; ?> />
					<input type="hidden" name="postEmail" value=<?php echo $_POST['email']; ?> />
					<input type="hidden" name="postMessage" value=<?php echo $_POST['message']; ?> />							
					<center><input type='submit' id='retour' name='retour' value='Retour' /></center>
				</form>
		<?php
			} else {
				// Le message
				$message = $_POST['message'];

				// Envoi du mail
				mail('contact@c-renaud.fr', 'Contact depuis mon CV en ligne', $message);
				echo "Votre message a bien été envoyé. Merci.";
			}
		?>
	</body>
</html>
