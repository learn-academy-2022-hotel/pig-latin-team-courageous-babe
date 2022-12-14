import React, { useState } from 'react'
import './App.css'
import butcherPigImage from './assets/butcherPig.jpeg'

const App = () => {

  // ACTION ITEM: to make the development process easier there are some preassigned words in the input field, when you are ready for your full user experience delete the test words passed to useState and pass an empty string
  const [userInput, setUserInput] = useState("apple through queen squeal fry fluent")
  const [inputTranslated, setInputTranslated] = useState("")

  // ACTION ITEM: the "myPigLatinCodeHere" function is where you will put your logic to translate the sentence entered by the user into Pig Latin
  const myPigLatinCodeHere = () => {


    // NO MODIFICATION NEEDED: the variable "arrayOfUserInput" will contain the text input from the user split into an array of words
    const arrayOfUserInput = userInput.split(" ")
    console.log("arrayOfUserInput:", arrayOfUserInput)

    // NO MODIFICATION NEEDED: now that we have an array of words, we can map over the array and look at each word
    const translatedWordsArray = arrayOfUserInput.map(eachWord => {
      console.log("eachWord:", eachWord)

      // NO MODIFICATION NEEDED: this code will look at each word and identify the vowels
      const vowelsArray = eachWord.split("").filter(vowel => {
        return (
          vowel === "a" || 
          vowel === "e" || 
          vowel === "i" || 
          vowel === "o" || 
          vowel === "u"
        )
      })
      console.log("vowelsArray:", vowelsArray)

      // ACTION ITEM: your Pig Latin logic goes here!
      
      // STEP 1 VOWEL FUNCTIONALITY
      // .map of the words array inside the map function 
      // check for the first charater of each word is a vowel
      // if it is then add (way) to the end 
      let vowels = ["a", "e", "i", "o", "u"]
      if (vowels.includes(eachWord[0])){
        eachWord = eachWord.concat("way")
      }
      
      // STEP 2 QU FUNCTIONLITY
      // words that have "qu" in the first syllable translated by moving all the consonant and the "u" to the end and add "ay".
      // Pseudo
      // for words that have "qu" identify the placement of the first non-vowel
      // shift the letters before the non-u vowel to the end
      // eg "question" estion-qu-ay
      //    "squeal" eal-squ-ay
      //    "squtkjslkdat" tkjslkdat-squ-ay
      //    "queen" een-qu-ay
      // add "ay" at the end
      if (eachWord.includes("qu")) {
        // console.log(`${eachWord} includes a qu`)
        // console.log(eachWord.indexOf("qu"))
        // find the starting index of "qu"
        let idx = eachWord.indexOf("qu")
        // make variable to add to string by: splice starting at 0 and up to index of "qu" + 2
        let sliced = eachWord.slice(0, idx+2)
        // initialize a variable with the rest of eachWord
        let restOfWord = eachWord.slice(idx+2)
        // add sliced varible to the modified eachWord
        // add "ay" at the end
        eachWord = restOfWord.concat(sliced, "ay")
      }
      // story 3 : y-fuctionality
      // Sometimes Y: Shift the letters before the y to the end:
      // fry = yfr , Add “ay” to the end: yfray 
      // check eachWord for a "y"
        if (eachWord.indexOf('y') !== -1){
          let foundVowel = false
          // check if eachWord has no vowels
          // loop through each word
          // if current letter is in vowels
          // save index to variable 
          // break
          for (let i = 0; i < eachWord.length; i++ ){
            if (vowels.includes(eachWord[i])){
              foundVowel = true
              break
            }
          }
          if (!foundVowel){
            let idx = eachWord.indexOf('y')
            // save the slice up to the "y" variable
            let vowel1 = eachWord.slice(0, idx)
            // save the rest of each word to a variable
            let vowel2 = eachWord.slice(idx)
            // add the slice and "ay" too the rest of each word  
            eachWord = vowel2.concat(vowel1 , "ay")
          }
        }

        // STEP 4 CONSONANT FUNCTIONALITY
        // Shift the letter before the vowel to the end:
        // ineapplep
        // ineapplepay
        // Add “ay” to the end:
        // make a fn to see if eachWord starts with a consonant
        // if first letter is a consonant
        if (!vowels.includes(eachWord[0]) && eachWord[0] !== "y") {
          console.log('word with first letter consonant', eachWord)
        //   // find the index of the first vowel
          for (let i = 1; i < eachWord.length; i++) {
            if (vowels.includes(eachWord[i])) {
              let firstPart = eachWord.slice(0, i)
              let secondPart = eachWord.slice(i)
              eachWord = secondPart.concat(firstPart, "ay")
              break
            }
        //     // create a variable holding the first part of eachWord
        //     // create a variable holding the second part of eachWord
        //     // add the first part and "ay" to the second part
        }
      }

      // ACTION ITEM: this return will be the output of your Pig Latin'd code
      return eachWord
    })

    // NO MODIFICATION NEEDED: once the code has been modified it gets joined from an array back to a string
    const translatedWords = translatedWordsArray.join(" ")
    console.log("translatedWords:", translatedWords)

    // NO MODIFICATION NEEDED: this will update the inputTranslated variable in state
    setInputTranslated(translatedWords)
  }

  // ACTION ITEM: this method restarts the game by setting the original state, when you are ready for your full user experience delete the test words in setUserInput and pass an empty string
  const restartGame = () => {
    setUserInput("apple through queen squeal fry fluent")
    setInputTranslated("")
  }

  // NO MODIFICATION NEEDED: this method prevents React from refreshing the page unnecessarily
  const setUpPreventDefault = (e) => {
    e.preventDefault()
    myPigLatinCodeHere()
  }

  // NO MODIFICATION NEEDED: this method takes the value of the input and saves it in state
  const handleInput = (e) => {
    setUserInput(e.target.value)
  }

  return (
    <div className="page-container">
      <div className="body-container">
        <h1>Pig Latin Translator</h1>
        <img
          src={butcherPigImage}
          alt="pig with butcher cut names in pig latin"
          className="butcher-pig-image"
        />

        <div className="input-section">
          <h4>Enter phrase to be translated:</h4>
          <input
            type="text"
            className="user-input"
            onChange={handleInput}
            value={userInput}
          />
          <br />
          <button onClick={setUpPreventDefault}>Submit</button>
          <button onClick={restartGame}>Clear</button>
        </div>
        <p>{inputTranslated}</p>
      </div>
      <footer>&copy; 2022 | Coded by: Your Names Here!</footer>
    </div>
  )
}

export default App