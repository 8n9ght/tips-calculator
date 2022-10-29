let bill = document.getElementById("billAmount");
let people = document.getElementById("peopleNubmer");
let tipPerPerson = document.querySelector(".tips__amount");
let totalTip = document.querySelector(".total__amount");
let tipPercent = document.querySelectorAll(".amounts__el");
let button = document.querySelector(".reset");
let customButton = document.getElementById("customAmountButton");
let customInput = document.getElementById("customAmountInput");


let percentage = [];

const billHandler = (event) => {
  totalTip.innerHTML = `$${event.target.value * percentage}`;
};

const splitHandler = (event) => {
  tipPerPerson.innerHTML = `$${(
    (bill.value * percentage) /
    event.target.value
  ).toFixed(2)}`;
  if(customInput.value){
    tipPerPerson.innerHTML = `$${(
        (bill.value * (customInput.value / 100)) /
        event.target.value
      ).toFixed(2)}`;
  }
};

const customTipHandler = (event) => {
    totalTip.innerHTML = `$${(event.target.value / 100) * bill.value}`
    if (people.value) {
        tipPerPerson.innerHTML = `$${(
          (bill.value * (event.target.value / 100)) /
          people.value
        ).toFixed(2)}`;
      }
};

const tipHandler = (event) => {
  percentage = [];
  percentage.push(parseFloat(event.target.innerHTML) / 100);
  totalTip.innerHTML = `$${bill.value * percentage}`;
  if (people.value) {
    tipPerPerson.innerHTML = `$${(
      (bill.value * percentage) /
      people.value
    ).toFixed(2)}`;
  }
};

const inputHandler = () => {
    customButton.classList.remove('enabled')
    customButton.classList.add('disabled')
    customInput.classList.remove('disabled')
    customInput.classList.add('enabled')
};

const resetHandler = () => {
  bill.value = "";
  people.value = "";
  totalTip.innerHTML = "$";
  tipPerPerson.innerHTML = "$";
  percentage = [];
};


for (let i = 0; i < tipPercent.length; i++) {
  tipPercent[i].onclick = tipHandler;
}

bill.oninput = billHandler;
people.oninput = splitHandler;
customInput.oninput = customTipHandler;
button.onclick = resetHandler;
customButton.onclick = inputHandler;
