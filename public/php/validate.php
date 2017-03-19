<?
// ----INSERT YOUR E_MAIL----- //
define('YOUR_EMAIL','jan.skwara@germino.pl');
//error_reporting(E_ALL);

header("Content-Type: text/html; charset=utf-8");
// Start the main function
if($_POST["mail"]==1)
{
	sendEmail();
}
else
	validateData();

// Validates data and sending e-mail
function sendEmail()
{
	$output = '';
	$error = 0;
	if(!$_POST['name'])
	{
		$output .= '<p>insert your name</p>';
		$error = 1;
	}
	if(!$_POST['email'])
	{
		$output .= '<p>insert your e-mail</p>';
		$error = 1;
	}
	elseif(!(ereg("^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$", $_POST['email'], $regs)))
	{
		$output .= '<p>wrong e-mail</p>';
		$error = 1;
	}
	
	if(!$_POST['message'])
	{
		$output .= '<p>insert message</p>';
		$error = 1;
	}
	if($error)
	{
		echo '<blockquote class="error margin_1line margin_bottom_1line">'.$output.'</blockquote>';
	}
	else
	{
			$to = YOUR_EMAIL;
			$subject = "Message from the gallery";
			$mbody = "
			Sender:
			".$_POST['name']."
			".$_POST['email']."
			
			Message:
			".$_POST['message']."
			
			";
			if(mail("jan.skwara@germin.pl", $subject, $mbody))
			{
				echo '<blockquote class="success margin_1line margin_bottom_1line">E-mail was send.</blockquote>';
			}
			else
			{
				echo '<blockquote class="error margin_1line margin_bottom_1line">Error. Please try again.</blockquote>';				
			}
	}
}

function validateData() {
	
	$required = $_GET["required"];
	$type = $_GET["type"];
	$value = $_GET["value"];

	validateRequired($required, $value, $type);

	switch ($type) {
		case 'number':
			validateNumber($value);
			break;
		case 'alphanum':
			validateAlphanum($value);
			break;
		case 'alpha':
			validateAlpha($value);
			break;
		case 'date':
			validateDate($value);
			break;
		case 'email':
			validateEmail($value);
			break;
		case 'url':
			validateUrl($value);
		case 'all':
			validateAll($value);
			break;
	}
}

// The function to check if a field is required or not
function validateRequired($required, $value, $type) {
	if($required == "required") {

		// Check if we got an empty value
		if($value == "") {
			echo "false";
			exit();
		}
	} else {
		if($value == "") {
			echo "none";
			exit();
		}
	}
}

// Validation of an Email Address
function validateEmail($value) {
	if(ereg("^([0-9a-zA-Z]+[-._+&])*[0-9a-zA-Z]+@([-0-9a-zA-Z]+[.])+[a-zA-Z]{2,6}$", $value, $regs)) {
		echo "true";
	} else {
		echo "false";
	}
}

// Validation of a date
function validateDate($value) {
	if(ereg("^(([1-9])|(0[1-9])|(1[0-2]))\/(([0-9])|([0-2][0-9])|(3[0-1]))\/(([0-9][0-9])|([1-2][0,9][0-9][0-9]))$", $value, $regs)) {
		echo "true";
	} else {
		echo "false";
	}
}

// Validation of an URL
function validateUrl($value) {
	if(ereg("^(http|https|ftp)\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(:[a-zA-Z0-9]*)?/?([a-zA-Z0-9\-\._\?\,\'/\\\+&amp;%\$#\=~])*[^\.\,\)\(\s]$", $value, $regs)) {
		echo "true";
	} else {
		echo "false";
	}
}

// Validation of characters
function validateAlpha($value) {
	if(ereg("^[a-zA-Z]+$", $value, $regs)) {
		echo "true";
	} else {
		echo "false";
	}
}

// Validation of characters and numbers
function validateAlphanum($value) {
	if(ereg("^[a-zA-Z0-9]+$", $value, $regs)) {
		echo "true";
	} else {
		echo "false";
	}
}

// Validation of numbers
function validateNumber($value) {
	if(ereg("^[0-9]+$", $value, $regs)) {
		echo "true";
	} else {
		echo "false";
	}
}

// Validation of numbers
function validateAll($value) {
		echo "true";
}

?>
