let bill = document.getElementById("billAmount");
let people = document.getElementById("peopleNubmer");
let customButton = document.getElementById("customAmountButton");
let customInput = document.getElementById("customAmountInput");
let tipPerPerson = document.querySelector(".tips__amount");
let totalTip = document.querySelector(".total__amount");
let button = document.querySelector(".reset");
let messageError = document.querySelector(".message");
let splitterInput = document.querySelector(".splitter__input");
let tipPercent = document.querySelectorAll(".amounts__el");
let percentage = [];

const billHandler = (event) => {
  if (customInput.value) {
    totalTip.innerHTML = `$${event.target.value * customInput.value}`;
    if(people.value){
      tipPerPerson.innerHTML = `$${(
        (event.target.value * customInput.value) /
        people.value
      ).toFixed(2)}`;
    } else {
      tipPerPerson.innerHTML = "$0.00";
    }
  } else if (percentage.length > 0) {
    totalTip.innerHTML = `$${event.target.value * percentage}`;
    tipPerPerson.innerHTML = `$${(
      (event.target.value * percentage) /
      people.value
    ).toFixed(2)}`;
  } else {
    tipPerPerson.innerHTML = "$0.00";
  }
};

if(!people.value){
  button.disabled = true;
}

const splitHandler = (event) => {
  if(event.target.value == 0 || people.value.length === 0){
    messageError.classList.remove("disabled");
    splitterInput.classList.add("error");
  } else {
    messageError.classList.add("disabled");
    splitterInput.classList.remove("error");
  }
  if(event.target.value){
    tipPerPerson.innerHTML = `$${((bill.value * percentage) / event.target.value).toFixed(2)}`;
  } else if(customInput.value) {
    if(event.target.value){
      tipPerPerson.innerHTML = `$${(
        (bill.value * (customInput.value / 100)) /
        event.target.value
      ).toFixed(2)}`;
    }
  } else {
    tipPerPerson.innerHTML = '$0.00';
  }
  button.disabled = false;
};

const customTipHandler = (event) => {
  totalTip.innerHTML = `$${(event.target.value / 100) * bill.value}`;
  if (people.value) {
    tipPerPerson.innerHTML = `$${(
      (bill.value * (event.target.value / 100)) /
      people.value
    ).toFixed(2)}`;
  }
};

let prevBtn = null;

const tipHandler = (event) => {
  percentage = [];
  percentage.push(parseFloat(event.target.innerHTML) / 100);
  event.target.classList.add('isClicked');
  if(prevBtn !== null){
    prevBtn.classList.remove('isClicked');
  }
  prevBtn = event.target;
  totalTip.innerHTML = `$${bill.value * percentage}`;
  if (people.value) {
    tipPerPerson.innerHTML = `$${(
      (bill.value * percentage) /
      people.value
    ).toFixed(2)}`;
  }
};

const inputHandler = () => {
  customButton.classList.remove("enabled");
  customButton.classList.add("disabled");
  customInput.classList.remove("disabled");
  customInput.classList.add("enabled");
};

const resetHandler = () => {
  bill.value = "";
  people.value = "";
  totalTip.innerHTML = "$0.00";
  tipPerPerson.innerHTML = "$0.00";
  customInput.value = "";
  customButton.classList.add("enabled");
  customButton.classList.remove("disabled");
  customInput.classList.add("disabled");
  customInput.classList.remove("enabled");
  percentage = [];
  for (let i = 0; i < tipPercent.length; i++) {
    tipPercent[i].classList.remove('isClicked')
  }
};



for (let i = 0; i < tipPercent.length; i++) {
  tipPercent[i].onclick = tipHandler;
}

bill.oninput = billHandler;
people.oninput = splitHandler;
customInput.oninput = customTipHandler;
button.onclick = resetHandler;
customButton.onclick = inputHandler;
