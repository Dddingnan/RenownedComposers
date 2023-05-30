function welcomeAlert() {
  alert("Welcome to A Tribute to Renowned Composers!");
  let keepWorking = true;
  while (keepWorking) {
    const name = prompt("Please enter your name:");
    if (name.trim() === "") {
      alert("Input cannot be empty. Please try again.");
      continue;
    }
    alert("Welcome " + name + "! You can use the button, Addition Calculator, to calculate addition!");
    localStorage.setItem("name", name);
    document.getElementById("welcomeMessage").innerHTML = "Welcome " + name + "!";
    keepWorking = false;
  }
}

function addNumbers(num1, num2) {
  return num1 + num2;
}

function thanksAlert() {
  const currentUser = localStorage.getItem("name");
  alert("Thank you for using this calculator, " + currentUser + "!");
}

function userNumberAdditionLoop() {
  let keepWorking = true;
  while (keepWorking) {
    const numbers = prompt("Please enter two numbers separated by a space:");
    if (numbers.trim() === "") {
      alert("Input cannot be empty. Please try again.");
      continue;
    }
    const nums = numbers.split(" ");
    if (nums.length != 2 || isNaN(nums[0]) || isNaN(nums[1])) {
      alert("Invalid input. Please try again.");
      continue;
    }

    const num1 = parseFloat(nums[0]);
    const num2 = parseFloat(nums[1]);

    const result = addNumbers(num1, num2);
    alert("The sum of your two numbers is: " + result);

    if (result > 10) {
      alert("That is a big number.");
    } else {
      alert("That is a small number.");
    }

    const response = prompt("Would you like to add two numbers again? (y/n):");

    if (response.toLowerCase() !== "y") {
      keepWorking = false;
      thanksAlert();
    }
  }
}

window.onload = function () {
  welcomeAlert();
};
