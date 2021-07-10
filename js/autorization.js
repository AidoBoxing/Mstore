let btn = document.querySelector('#btn');

function showError(txt = 'Неправильно набран номер, пожалуйста, проверьте правильность набора номера и повторите попытку') {
	let err = document.querySelector('.error');
	if(err) err.remove();
    let showText = document.createElement('h5');
    let inputs = document.querySelector('.form-input');
    showText.textContent = txt;
    showText.classList.add('error', 'text-center');
    inputs.after(showText);
    inputs.classList.add('addError');
}


btn.onclick = function () {
    let inputNumber = document.getElementById('input-number').value;
    if (!inputNumber) {
        showError('Заполните поле!');
        return;
    }

    const URL = `https://tmegadrive.megacom.kg/api/v1/mstore/getCode?msisdn=${inputNumber}`;

    fetch(URL)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert('Oops ! Что-то произошло..');
            }
        })
        .then(data => {
            if (data.result === 1) {
                localStorage.setItem('msisdn', inputNumber);
                window.location = 'verification.html';
            } else if (data.result === 0) {
                showError(data.text);
            }

        })
}







