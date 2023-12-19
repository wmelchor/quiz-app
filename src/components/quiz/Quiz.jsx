import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {

    let[index, setIndex] = useState(0); // This will set the index to the first question
    let[question, setQuestion] = useState(data[index]) // This will have question be the data/question loaded by index
    let[lock, setLock] = useState(false); // This will be used to have the user only be able to select one option at a time
    let[score,setScore] = useState(0);
    let[result, setResult] = useState(false);

    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);

    let option_arr = [Option1, Option2, Option3, Option4];

    const checkAns = (selected, answer) => { // We will compare the selected option with the answer
        if(lock == false) {
            if(question.ans == answer) {
              selected.target.classList.add("correct"); // This will add a class name to the selected option call "correct"
              setLock(true);
              setScore(prev => prev + 1) // prev is just previous value of score
            } else {
              selected.target.classList.add("wrong"); // This will add a class name to the selected option call "wrong"
              setLock(true);
              option_arr[question.ans - 1].current.classList.add("correct"); // Have the correct option get the class name correct. - 1 to get the correct answer(different start)
            }
        }
    }

    const next = () => {
      if(lock === true) { // If an option has been selected, the user can move to the next question
        if(index === data.length - 1) { // After the last question setResult becomes true
          setResult(true);
          return 0;
        }
        setIndex(++index);
        setQuestion(data[index]);
        setLock(false);
        option_arr.map((option) => { // For each option in option_arr, remove the class names. (Map is used to iterate over the array)
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
          return null;
        })
      }
    }

    const reset = () => {
      setIndex(0);
      setQuestion(data[0]);
      setScore(0);
      setLock(false);
      setResult(false);
    }

  return (
    //  Class name is container, which will be edited in the css file. Any part can be edited individually by adding the tag (e.g. container hr)
    <div className = 'container'>
      <h1>Quiz App</h1>
      <hr />
      {/* If result is set to false, use the code below to display the questions */}
      {result? <> </>: <>

      {/* Below will be questions and answer choices for our quiz */}
      <h2>{index + 1} {question.question}</h2>
      <ul>
        {/* Clicking in any option will activate the check answer function, adding a class name which will be edited in the css file */}
        <li ref = {Option1} onClick={(selected) => {checkAns(selected, 1)}}>{question.option1}</li>
        <li ref = {Option2} onClick={(selected) => {checkAns(selected, 2)}}>{question.option2}</li>
        <li ref = {Option3} onClick={(selected) => {checkAns(selected, 3)}}>{question.option3}</li>
        <li ref = {Option4} onClick={(selected) => {checkAns(selected, 4)}}>{question.option4}</li>
      </ul>
      <button onClick = {next}>Next</button>
      <div className="index">Question {index + 1} of {data.length}</div>

      </>}
      {/* Below is the results screen that will only show if result is equal to true */}
      {result? <> 
        <h2>You scored {score} out of {data.length}</h2>
        <button onClick = {reset}>Reset</button>
      </>:<></>}
    </div>
  )
}

export default Quiz