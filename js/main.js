let saveBtn = document.querySelector('#save-btn');
let bankName = document.getElementById('bank__name');
let formInputItem = document.querySelector('#jaja');
let rule;
let dosCredoBank = document.querySelector('#dos-credo-bank');
let bakaiBank = document.querySelector('#bakai-bank');
let counter = 0;

function checkField(fields){
  for(let i = 0; i < fields.length; i++) {
    if (!fields[i].value) {
      return false;
    }
  }

  return true;
}


function showError(){
  if (counter == 0) {
    let showText = document.createElement('h5');
    let incorrectCode = document.querySelector('#incorrect-code');
    showText.textContent = 'Пожалуйста, заполните все поля';
    showText.classList.add('error');
    incorrectCode.after(showText);
    counter = 1;
  }
}



function showRules(){
    // console.log(bankName.selectedIndex); 
    if(bankName.selectedIndex === 1){
      bakaiBank.classList.add('d-block');
      dosCredoBank.classList.remove("d-block");
    } else if(bankName.selectedIndex === 2){
      bakaiBank.classList.remove("d-block");
      dosCredoBank.classList.add("d-block");
    }   else{
      dosCredoBank.classList.remove("d-block");
      bakaiBank.classList.remove("d-block");
    }
  }


  function collectData(){
    let formInputsPart = document.querySelectorAll('.form__inputs');
    let data = {};

    formInputsPart.forEach(el => {
      let inputs = el.querySelectorAll('.form__input');
      data[el.id] = {};
      inputs.forEach(elem => {
        data[el.id][elem.name] = elem.value;
      });
    });

    return data;
  }


  saveBtn.onclick = function(){
    let fields = document.querySelectorAll('.form__input');
    if(!checkField(fields)) {
      showError();
      return;
    }

    let data  = collectData();
    const URL = 'https://tmegadrive.megacom.kg/api/v1/mstore/saveRequest';

    let options = {
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    }

    fetch(URL, options)
    .then(response => {
      if(response.ok){
        return response.json();
      } else {
        alert('Ошибкa')
      }
    })
    .then(data => {
      if(data.status === 1){
        window.location = 'finish.html';
              console.log(data);
            } else if(data.status === 0){
              alert('Произошла ошибкa');
            }
          })
  }
