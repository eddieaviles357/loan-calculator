window.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById("calc-form");
  if (form) {
    // default values are coming from DOM
    setupIntialValues(getCurrentUIValues());
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      update();
    });
  }
});

function getCurrentUIValues() {
  return {
    amount: +(document.getElementById("loan-amount").value),
    years: +(document.getElementById("loan-years").value),
    rate: +(document.getElementById("loan-rate").value),
  }
}

// Get the inputs from the DOM.
// Put some default values in the inputs
// Call a function to calculate the current monthly payment
function setupIntialValues(obj) {
  update();
}

// Get the current values from the UI
// Update the monthly payment
function update() {
  let months = calculateMonthlyPayment(getCurrentUIValues());
  let totalToPay = totalPrincipalAndInterest(months, +(document.getElementById("loan-years").value));
  updateMonthly(months, totalToPay)
}

// Given an object of values (a value has amount, years and rate ),
// calculate the monthly payment.  The output should be a string
// that always has 2 decimal places.
function calculateMonthlyPayment(obj) {
  const {amount, years, rate} = obj;
  if(!(amount > 0 && years > 0 && rate > 0)){
    return;
  }
  const r = rate/100;
  const n = 12;
  let months = amount * ( r/n ) / ( 1- Math.pow( 1+r/n, -n*years ) );
  return twoDecimalPoints(months);
}

// Total amount at end of of term to pay ( interest + principal )
function totalPrincipalAndInterest(months, years) {
  let total = months * ( years * 12);
  return twoDecimalPoints(total);
}

// Given a string representing the monthly payment value,
// update the UI to show the value.
function updateMonthly(pymnts, totalToPay) {
  let displayMonthlyPymnt = document.getElementById("monthly-payment");
  let totalPymnt = document.getElementById("total");
  displayMonthlyPymnt.innerText = `💲${pymnts.toLocaleString()}`;
  totalPymnt.innerText = `💲${totalToPay.toLocaleString()}`;
}

// convert amount to 2 floating points if whole number will not
// produce 2 decimals
function twoDecimalPoints(amount) {
  return parseFloat(amount.toFixed(2));
}
