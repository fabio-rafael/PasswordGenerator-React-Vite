import React from "react";
import "./PasswordGenerator.css";
import Animation from "../assets/Animation 1.gif";
import Copy from "../assets/copy.png";
import { CopyToClipboard } from "react-copy-to-clipboard";

function PasswordGenerator() {
  const [password, setPassword] = React.useState("");
  const [passwordLength, setPasswordLength] = React.useState(10);
  const [lowercase, setLowercase] = React.useState(false);
  const [uppercase, setUppercase] = React.useState(false);
  const [numbers, setNumbers] = React.useState(false);
  const [symbols, setSymbols] = React.useState(false);

  async function copyToClipboard() {
    try {
      navigator.clipboard.writeText(password);
      alert("🎉 Password Copied! Spread the security vibes! 🌐");
    } catch (error) {
      console.log("Error copying to clipboard", error);
    }
  }

  function generatePassword(
    passwordLength,
    includeLowercase,
    includeUppercase,
    includeNumbers,
    includeSymbols
  ) {
    let password = "";
    let lowercase = "abcdefghijklmnopqrstuvwxyz";
    let uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let numbers = "0123456789";
    let symbols = "!@#$%^&*()-_=+[{]}\\|;:'\",<.>/?";

    let allCharacters = "";

    if (includeLowercase) {
      allCharacters += lowercase;
    }
    if (includeUppercase) {
      allCharacters += uppercase;
    }
    if (includeNumbers) {
      allCharacters += numbers;
    }
    if (includeSymbols) {
      allCharacters += symbols;
    }

    if (allCharacters === "") {
      allCharacters = lowercase;
    }

    if (passwordLength < 8) {
      return "";
    }

    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * allCharacters.length);
      password += allCharacters.charAt(randomIndex);
    }

    return password;
  }

  function handleGenerateButtonClick() {
    const newPassword = generatePassword(
      passwordLength,
      lowercase,
      uppercase,
      numbers,
      symbols
    );
    setPassword(newPassword);
  }

  function handleResetButtonClick() {
    setPassword("");
  }

  function ValidatepasswordLength(passwordLength) {
    if (passwordLength < 8) {
      return "Password must be at least 8 characters long";
    } else return "";
  }

  return (
    <div className="container">
      <div className="header">
        <img
          src={Animation}
          className="pass-animation"
          alt="Password Animation"
        />
        <div className="titulo">
          <h1>Password Generator</h1>
          <p>
            Ensure online account safety by creating strong and <br></br> secure
            passwords
          </p>
        </div>
      </div>
      <div className="pass-input">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          readOnly
        />
        <CopyToClipboard text={password} onCopy={copyToClipboard}>
          <img src={Copy} className="copy" alt="Copy" />
        </CopyToClipboard>
      </div>
      <div className="validation">{ValidatepasswordLength(passwordLength)}</div>
      <div className="options">
        <div className="customize">
          <p>Customize your password : </p>
        </div>
        <div className="checkbox">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="lowercase"
              name="lowercase"
              checked={lowercase}
              onChange={() => setLowercase(!lowercase)}
            />
            <label htmlFor="lowercase">Lowercase (a-z)</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="uppercase"
              name="uppercase"
              checked={uppercase}
              onChange={() => setUppercase(!uppercase)}
            />
            <label htmlFor="uppercase">Uppercase (A-Z)</label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="numbers"
              name="numbers"
              checked={numbers}
              onChange={() => setNumbers(!numbers)}
            />
            <label htmlFor="numbers">Numbers (0-9)</label>
          </div>
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="symbols"
              name="symbols"
              checked={symbols}
              onChange={() => setSymbols(!symbols)}
            />
            <label htmlFor="symbols">Symbols(&-#)</label>
          </div>
        </div>
        <div className="tituloslider">
          <p>Password Length: </p>
        </div>
        <div className="slidecontainer">
          <div className="slider">
            {" "}
            <input
              type="range"
              min="1"
              max="20"
              value={passwordLength}
              class="slider"
              id="myRange"
              onChange={(e) => setPasswordLength(e.target.value)}
            />
          </div>
          <div className="valor">
            <p id="demo"> {passwordLength} </p>
          </div>
        </div>
      </div>

      <div className="footer">
        <div className="btn">
          <button onClick={handleGenerateButtonClick}>Generate</button>
          <button className="Reset" onClick={handleResetButtonClick}>
            Reset
          </button>
        </div>
        <div className="copyr">
          Made by
          <a className="link" href="https://github.com/fabio-rafael">
            Fábio Rafael
          </a>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
