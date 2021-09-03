document.addEventListener('DOMContentLoaded', () => {
  //get all our elements
  var bill,
      tip,
      split,
      tipAmount,
      total;
  var billMsg,
      tipMsg,
      splitMsg;
  bill = 0;
  tip = 0;
  split = 0;
  tipAmount = 0;
  total = 0;
  var billEl,
      tipBtns,
      tipCustom,
      splitEl,
      tipAmountEl,
      totalAmountEl,
      resetBtn;
  billEl = document.querySelector('input[name="bill"]');
  tipBtns = document.querySelectorAll('button.tip');
  tipCustom = document.querySelector('input[name="custom_tip"]');
  splitEl = document.querySelector('input[name="people"]');
  tipAmountEl = document.querySelector('#each_tip');
  totalAmountEl = document.querySelector('#each_total');
  resetBtn = document.querySelector('#reset');

  //get validation message elements
  billMsg = document.getElementById('bill_msg');
  tipMsg = document.getElementById('tip_msg');
  splitMsg = document.getElementById('split_msg');

  //add event listeners to each input element
  billEl.addEventListener('input', () => {
    if (parseFloat(billEl.value) > 0) {
      if (billEl.classList.contains('error')) {
        billEl.classList.remove('error');
        billMsg.innerText = "";
      }
      updateTotals();
    } else {
      billEl.classList.add('error');
      billMsg.innerText = "Can't be zero";
    }
    if (parseInt(splitEl.value) > 0 && parseFloat(billEl.value) > 0) {
      resetBtn.classList.remove('inactive');
    } else {
      resetBtn.classList.add('inactive');
    }
  });
  tipBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      tipBtns.forEach(b => {b.classList.remove('is-active');});
      tipCustom.value = 0;
      btn.classList.add('is-active');
      updateTotals();
    })
  });
  tipCustom.addEventListener('input', () => {
    tipBtns.forEach(btn => {btn.classList.remove('is-active');});
    updateTotals();
  })
  splitEl.addEventListener('input', () => {
    if (parseInt(splitEl.value) > 0) {
      if (splitEl.classList.contains('error')) {
        splitEl.classList.remove('error');
        splitMsg.innerText = "";
      }
      updateTotals();
    } else {
      splitEl.classList.add('error');
      splitMsg.innerText = "Can't be zero";
    }
    if (parseInt(splitEl.value) > 0 && parseFloat(billEl.value) > 0) {
      resetBtn.classList.remove('inactive');
    } else {
      resetBtn.classList.add('inactive');
    }
  })

  resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (resetBtn.classList.contains('inactive')) {
      var container = document.getElementById('hint_text');
      var hint = "The form is already reset";
      container.innerText = hint;
      container.classList.remove('hidden');
      var toID = window.setTimeout(() => {
        container.innerText = "";
        container.classList.add('hidden');
      }, 5000);
    } else {
      billEl.value = 0;
      if (document.querySelector('.tip.is-active')) {
        document.querySelector('.tip.is-active').classList.remove('is-active');
      }
      tipCustom.value = 0;
      splitEl.value = 1;
      resetBtn.classList.add('inactive');
      updateTotals();
      var container = document.getElementById('hint_text');
      var hint = "The form has been reset";
      container.innerText = hint;
      container.classList.remove('hidden');
      var toID = window.setTimeout(() => {
        container.innerText = "";
        container.classList.add('hidden');
      }, 5000);
    }
  })

  //do the maths!
  function updateTotals() {
    //validate inputs
    var valid = true;
    bill = parseFloat(billEl.value);
    tip = getTip();
    split = parseInt(splitEl.value);
    if (billEl.classList.contains('error') || splitEl.classList.contains('error')) {
      valid = false;
    }
    if (valid) {
      var finalTip = bill * tip;
      var finalBill = bill + finalTip;
      var finalBillSplit = finalBill / split;
      var finalTipSplit = finalTip / split;
      tipAmountEl.innerText = "$" + finalTipSplit.toFixed(2);
      totalAmountEl.innerText = "$" + finalBillSplit.toFixed(2);
    } else {
      tipAmountEl.innerText = "$0.00";
      totalAmountEl.innerText = "$0.00";
    }
  }
  function getTip() {
    var activeTipBtn = document.querySelector('.tip.is-active');
    if (activeTipBtn) {
      return parseInt(activeTipBtn.value) * .01;
    } else if (parseFloat(tipCustom.value) > 0) {
      return parseFloat(tipCustom.value) * .01;
    } else {
      return 0.00;
    }
  }
})