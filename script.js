const clearBtn = document.querySelector('.clear');
const sendBtn = document.querySelector('.send');
const closeBtn = document.querySelector('.close');
const popup = document.querySelector('.popup');
const inputs = document.querySelectorAll('input');
const username = document.querySelector('#username');
const pass = document.querySelector('#password');
const pass2 = document.querySelector('#password2');
const email = document.querySelector('#email');
const showPasswordBtn = document.querySelector('.show-password');
const showPasswordBtn2 = document.querySelector('.show-password2');

const showError = (input, msg) => {
	const formBox = input.parentElement;
	const errorMsg = formBox.querySelector('.error-text');
	formBox.classList.add('error');
	errorMsg.textContent = msg;
};

const clearError = (input) => {
	const formBox = input.parentElement;
	formBox.classList.remove('error');
};

const checkForm = () => {
	inputs.forEach((input) => {
		if (input.value === '') {
			showError(input, input.placeholder);
		} else {
			clearError(input);
		}
	});
};

const checkLengthUsername = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} You have to enter a username, min. ${min} characters.`
		);
	}
};
const checkLengthPassword = (input, min) => {
	if (input.value.length < min) {
		showError(
			input,
			`${input.previousElementSibling.innerText.slice(
				0,
				-1
			)} You have to enter a password, min. ${min} characters.`
		);
	}
};

const checkPassword = (pass1, pass2) => {
	if (pass1.value !== pass2.value) {
		showError(pass2, "Passwords don't match");
	}
};

const showPassword = () => {
	document.getElementById('password').type = 'text';
};
const hidePassword = () => {
	document.getElementById('password').type = 'password';
};
const showPassword2 = () => {
	document.getElementById('password2').type = 'text';
};
const hidePassword2 = () => {
	document.getElementById('password2').type = 'password';
};

const checkMail = (email) => {
	const re =
		/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	if (re.test(email.value)) {
		clearError(email);
	} else {
		showError(email, 'You have to enter your email');
	}
};

const checkErrors = () => {
	const allInputs = document.querySelectorAll('.form-item');
	let errorCount = 0;

	allInputs.forEach((el) => {
		if (el.classList.contains('error')) {
			errorCount++;
		}
	});

	if (errorCount == 0) {
		popup.classList.add('show-popup');

		inputs.forEach((input) => {
			input.value = '';
		});
	}
};

const closePopup = (e) => {
	e.preventDefault();
	popup.classList.remove('show-popup');
};

clearBtn.addEventListener('click', (e) => {
	e.preventDefault();

	inputs.forEach((input) => {
		input.value = '';
		clearError(input);
	});
});

sendBtn.addEventListener('click', (e) => {
	e.preventDefault();

	checkForm([username, pass, pass2, email]);
	checkLengthUsername(username, 5);
	checkLengthPassword(pass, 8);
	checkPassword(pass, pass2);
	checkMail(email);
	checkErrors();
});

showPasswordBtn.addEventListener('mouseover', showPassword);
showPasswordBtn.addEventListener('mouseout', hidePassword);
showPasswordBtn2.addEventListener('mouseover', showPassword2);
showPasswordBtn2.addEventListener('mouseout', hidePassword2);

closeBtn.addEventListener('click', closePopup);
