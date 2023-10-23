import { useState } from 'react';
import next_img from '../../../img/next.svg';
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Preferences_Question2() {
    const { state } = useLocation()
    const navigate = useNavigate()
    console.log(state)
    const [index1, setIndex1] = useState(1)
    const [key, setKey] = useState(0)
    const [question, setQuestion] = useState("Following up on the previous question, How do you want to impact your mentees (in order of priority)")
    const [answers, setAnswers] = useState([
        { "answer": "I want to become or find sponsor(s) for my mentees", optionNumber: 0, priority: 0 },
        { "answer": "I want help my mentees to level-up to new skills", optionNumber: 0, priority: 0 },
        { "answer": "I want to help my mentees navigate changes in their careers such as promotions and new job responsibilities.", optionNumber: 0, priority: 0 }
    ])
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
        console.log(index)
        console.log(answers[index].optionNumber)
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

    const sendAnotherScreen = async () => {
        console.log(answers)
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
            "questionNumber": 3,
            "questionType": "priority",
        }
        state.push(dict)
        console.log(state)
        // return
        const body = {
            data: state
        }
        console.log(body)
        // return
        const token = localStorage.getItem("token")
        const btoken = `Bearer ${token}`;
        const res = await fetch(`https://api.wiseqglobal.com/api/mentor/preferences`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": btoken,
            },
            body: JSON.stringify(body)
        })
        const response = await res.json()
        console.log("added pref", response)
        if (response.success) {
            navigate('/')
        }



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
                                                <p class="color-dark fs-16 fw-600 align-center mb-4 questio">Q3. Following up on the previous question, How do you want to impact your mentees? (in order of priority)</p>

                                                {answers.map((i, index) => (
                                                    <div class="prefernce_ques mb-25">
                                                        <div key={key} className="prefer_img d-flex">
                                                            <div onClick={() => updateCheck(index)} style={{ backgroundColor: i.optionNumber != "" ? "#006666" : "lightgray", height: 30, width: 30, borderRadius: 15 }}>
                                                                <p style={{ textAlign: 'center', color: 'white', width: "30px", marginTop: "3px" }}>{i.optionNumber == 0 ? "" : i.optionNumber}</p>
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

                                                        <span className="know1">I want to become or find sponsor(s) for my mentees</span>
                                                    </div>
                                                </div>

                                                <div class="prefernce_ques mb-25">
                                                    <div className="prefer_img d-flex">
                                                        <div className="me-3">
                                                            <input id="checkbox1" type="checkbox" />
                                                            <label for="checkbox1"></label>
                                                        </div>

                                                        <span className="know1">I want help my mentees to level-up to new skills</span>
                                                    </div>
                                                </div>

                                                <div class="prefernce_ques mb-110">
                                                    <div className="prefer_img d-flex">
                                                        <div className="me-3">
                                                            <input id="checkbox2" type="checkbox" />
                                                            <label for="checkbox2"></label>
                                                        </div>

                                                        <span className="know1">I want to help my mentees navigate changes in their careers such as promotions and new job responsibilities.</span>
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
        </div>
    );
}

export default Preferences_Question2;
