import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

const Quiz = () => {

    let[index, setIndex] = useState(0); // This will set the index to the first question
    let[question, setQuestion] = useState(data[index]) // This will have question be the data/question loaded by index
    let[lock, setLock] = useState(false); // This will be used to have the user only be able to select one option at a time

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
            } else {
              selected.target.classList.add("wrong"); // This will add a class name to the selected option call "wrong"
              setLock(true);
              option_arr[question.ans - 1].current.classList.add("correct"); // Have the correct option get the class name correct. - 1 to get the correct answer(different start)
            }
        }
    }

  return (
    //  Class name is container, which will be edited in the css file. Any part can be edited individually by adding the tag (e.g. container hr)
    <div className = 'container'>
      <h1>Quiz App</h1>
      <hr />
      {/* Below will be questions and answer choices for our quiz */}
      <h2>{index + 1} {question.question}</h2>
      <ul>
        {/* Clicking in any option will activate the check answer function, adding a class name which will be edited in the css file */}
        <li ref = {Option1} onClick={(selected) => {checkAns(selected, 1)}}>{question.option1}</li>
        <li ref = {Option2} onClick={(selected) => {checkAns(selected, 2)}}>{question.option2}</li>
        <li ref = {Option3} onClick={(selected) => {checkAns(selected, 3)}}>{question.option3}</li>
        <li ref = {Option4} onClick={(selected) => {checkAns(selected, 4)}}>{question.option4}</li>
      </ul>
      <button>Next</button>
      <div className="index">Question 1 of ?</div>
    </div>
  )
}

export default Quiz