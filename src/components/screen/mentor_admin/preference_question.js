import { useEffect, useState } from 'react';
import next_img from '../../../img/next.svg';
import { NavLink, useNavigate } from "react-router-dom";

function Preferences_Question() {
    const navigate = useNavigate()
    const [index1, setIndex1] = useState(1)
    const [key, setKey] = useState(0)
    const [question, setQuestion] = useState("How would you like to help your mentees? (in order of priority)")
    const [answers, setAnswers] = useState([
        { "answer": "Skill Growth", optionNumber: 0, priority: 0 },
        { "answer": "Career Growth", optionNumber: 0, priority: 0 },
        { "answer": "Personal Growth", optionNumber: 0, priority: 0 }
    ])

    useEffect(() => {
        getQues()
    }, [])

    const getQues = async () => {
        const token = await localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/mentor/preferences`, {
            method: 'GET',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
        })
        const response = await res.json()
    }

    // const updateCheck = (index) => {
    //     if (index1 <= 3) {
    //         if (answers[index].optionNumber == 0) {
    //             setIndex1(index1 + 1)

    //             answers[index].optionNumber = index1
    //             answers[index].priority = index1
    //             setKey(index)
    //         }
    //         setAnswers(answers)
    //     }

    // }

    const updateCheck = (index) => {
        if(answers[index].optionNumber != 0)
        {
            for(let i of answers){
                i.optionNumber = 0
                i.priority = 0
            }
            // alert("clicked Again")
            setIndex1(0)
            answers[index].optionNumber = 0
            setKey(Math.random())
            
        }else{
            if (index1 <= 3) {
                if (answers[index].optionNumber == 0) {
                    setIndex1(index1 + 1)
                    answers[index].optionNumber = index1
                    answers[index].priority = index1
                    setKey(index)
                }
                setAnswers(answers)
            }
        }
        
    }

    const sendAnotherScreen = () => {
        const dict1 = []
        for (let ll of answers) {
            console.log(ll.priority)
            if (ll.priority > 0) {
                dict1.push(ll)
            }
        }
        console.log(dict1)
        if (dict1.length == 0) {
            alert("Please Select Atleast One Answer.")
            return
        }
        const dict = {
            question,
            "answers": dict1,
            "questionNumber": 1,
            "questionType": "priority",

        }
        console.log(dict)
        // return
        navigate("/preference_two", { state: dict })
    }

    return (

        <div className="App">
            <div className="main-content admin">
                <div className="">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-8 col-md-8 col-sm-8 content_par">
                            </div>

                            <div className="col-lg-4 col-md-4 col-sm-4">
                                <div className="edit-profile">
                                    <div className="card border-0">
                                        <div className="card-header">
                                            <div className="edit-profile__title">
                                                <h6 className="text-center">Tell us your preferences</h6>
                                            </div>
                                        </div>

                                        <div className="card-body custom_input">
                                            <div className="edit-profile__body">
                                                <p class="color-dark fs-16 fw-600 align-center mb-4 questio">Q1. {question}</p>
                                                {answers.map((i, index) => (
                                                    <div class="prefernce_ques mb-25">
                                                        <div key={key} className="prefer_img d-flex">
                                                            <div onClick={() => updateCheck(index)} style={{ backgroundColor: i.optionNumber != "" ? "#006666" : "lightgray", height: 30, width: 30, borderRadius: 15 }}>
                                                                <p style={{ textAlign: 'center', color: 'white', marginTop: "3px" }}>{i.optionNumber == 0 ? "" : i.optionNumber}</p>
                                                            </div>
                                                            <span className="know" style={{ marginLeft: "10px" }}>{i.answer}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                                {/* <div class="prefernce_ques mb-25">
                                                    <div className="prefer_img d-flex">
                                                        <div className="me-3">
                                                            <input id="checkbox" type="checkbox" />
                                                            <label for="checkbox"></label>
                                                        </div>

                                                        <span className="know">Knowledge growth</span>
                                                    </div>
                                                </div>

                                                <div class="prefernce_ques mb-25">
                                                    <div className="prefer_img d-flex">
                                                        <div className="me-3">
                                                            <input id="checkbox1" type="checkbox" />
                                                            <label for="checkbox1"></label>
                                                        </div>
                                                        <span className="know">Career growth</span>

                                                    </div>
                                                </div>

                                                <div class="prefernce_ques mb-200">
                                                    <div className="prefer_img d-flex">
                                                        <div className="me-3">
                                                            <input id="checkbox2" type="checkbox" />
                                                            <label for="checkbox2"></label>
                                                        </div>
                                                        <span className="know">Personal Growth</span>
                                                    </div>
                                                </div> */}

                                                <div onClick={() => sendAnotherScreen()} className="next-arrow">
                                                    <img src={next_img} className="svg wh-50" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Preferences_Question;
