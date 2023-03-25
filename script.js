let billAmount = document.getElementById("billAmount");
let tipBtn = document.querySelectorAll(".tip");
let tipCustom = document.querySelector("#tipCustom");
let nPeople = document.getElementById("nPeople");

let error = document.querySelector(".error");

let tipAmount = document.querySelector(".tipAmount");
let totalAmount = document.querySelector(".totalAmount");

let resetBtn = document.querySelector(".btn-reset");

let tipValue = 0;
let billValue = 0;
let peoplesValue = 0;
let tipAmountValue = 0;
let totalAmountValue = 0;


billAmount.addEventListener("input", setBillValue);
tipCustom.addEventListener("input", setTipValue);
nPeople.addEventListener("input", setPeopleValue);
tipBtn.forEach(btn => {
    btn.addEventListener("click", handleClick);
})



function validateFloat(s) {
    let rgx = /^[0-9]*\.?[0-9]*$/;
    return s.match(rgx);
}

function validateInt(s) {
    let rgx = /^[0-9]*$/;
    return s.match(rgx);
}


function setBillValue() {
    if (billAmount.value.includes(",")) {
        billAmount.value = billAmount.value.replace(",", ".");
    }

    if (!validateFloat(billAmount.value)) {
        billAmount.value = billAmount.value.substring(0, billAmount.value.length - 1);
    }

    billValue = parseFloat(billAmount.value);
    // console.log(billValue)

    calculation();

}

function setTipValue() {

    if (!validateFloat(tipCustom.value)) {
        tipCustom.value = tipCustom.value.substring(0, tipCustom.value.length - 1);
    }

    // remove active state from all input btn
    tipBtn.forEach(btn => {
        btn.classList.remove("active-btn")
    })

    tipValue = parseFloat(tipCustom.value) / 100;
    // console.log(tipValue)

    calculation();

}

function setPeopleValue() {
    if (!validateInt(nPeople.value)) {
        nPeople.value = nPeople.value.substring(0, nPeople.value.length - 1);
    }

    peoplesValue = parseFloat(nPeople.value);

    if (peoplesValue <= 0) {
        error.innerHTML = "Can't be zero";
        nPeople.classList.add("active");

        setTimeout(() => {
            error.innerHTML = "";
            nPeople.classList.remove("active");
        }, 1000)
    }
    // console.log(peoplesValue)

    calculation();

}

function handleClick(event) {
    tipCustom.value = ''

    // remove active state from all input btn
    tipBtn.forEach(btn => {
        btn.classList.remove("active-btn")


        if (event.target.value == btn.value) {
            btn.classList.add("active-btn")
            tipValue = parseFloat(event.target.value) / 100;
        }
    })

    // console.log(tipValue)

    calculation();


}

function calculation() {
    if (peoplesValue >= 1) {
        tipAmountValue = (billValue * tipValue) / peoplesValue;
        totalAmountValue = (billValue + (billValue * tipValue)) / peoplesValue;

        tipAmount.innerHTML = "$" + tipAmountValue.toFixed(2);
        totalAmount.innerHTML = "$" + totalAmountValue.toFixed(2);
    }
}

resetBtn.addEventListener("click", () => {
    tipBtn.forEach(btn => {
        btn.classList.remove("active-btn")
    })

    billAmount.value = "";
    tipBtn.value = "";
    tipCustom.value = "";
    nPeople.value = "";
    tipAmount.innerHTML = "$0.00";
    totalAmount.innerHTML = "$0.00";
})



