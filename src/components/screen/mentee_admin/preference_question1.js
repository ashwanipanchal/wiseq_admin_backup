import { useState } from 'react';
import next_img from '../../../img/light_next.svg';
import back_img from '../../../img/light_back.svg';
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Preferences_Question1() {
    const { state } = useLocation()
    console.log(state)
    const navigate = useNavigate()
    const [index1, setIndex1] = useState(1)
    const [key, setKey] = useState(0)
    // const [question, setQuestion] = useState("In order of preference select your learning style from the below")
    // const [answers, setAnswers] = useState([
    //     { answer: "Visual learning style", optionNumber: 0, priority: 0 },
    //     { answer: "Auditory learning style", optionNumber: 0, priority: 0 },
    //     { answer: "Reading/Writing style", optionNumber: 0, priority: 0 },
    //     { answer: "Experiential Learning", optionNumber: 0, priority: 0 }
    // ])
    const [question, setQuestion] = useState("What is your need as a mentee (you may select one or multiple)")
    const [answers, setAnswers] = useState([
        { answer: "Spark: I want to be challenged, and given a gentle nudge along my desired career trajectory.", optionNumber: 0, priority: 0 },
        { answer: "Network: I am looking for a stepping stone to expand my network.", optionNumber: 0, priority: 0 },
        { answer: "Support: I want my mentor to support, provide reassurance and direction.", optionNumber: 0, priority: 0 },
        { answer: "Learn: I want to develop new skills based on my mentor’s experience and skill set.", optionNumber: 0, priority: 0 }
    ])

    // const updateCheck = (index) => {
    //     if (index1 <= 4) {
    //         if (answers[index].optionNumber == "") {
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
            if (index1 <= 4) {
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
        console.log("answer", answers)
        // let newAns = answers.filter((i) => {
        //     return (i.priority != "")
        // })
        // console.log(newAns)
        // return
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
        const dict = [state, {
            question,
            "answers": dict1,
            "questionNumber": 2,
            "questionType": "priority",
        }]
        navigate('/preference_three', { state: dict })

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

                                        <div className="card-body custom_input" style={{ height: "570px", overflowY: "scroll" }}>
                                            <div className="edit-profile__body">
                                                <p class="color-dark fs-16 fw-600 align-center mb-4 questio">Q2. {question}</p>

                                                {answers.map((i, index) => (
                                                    <div class="prefernce_ques mb-25">
                                                        <div key={key} className="prefer_img d-flex">
                                                            <div onClick={() => updateCheck(index)} style={{ backgroundColor: i.priority != "" ? "#72b8bf" : "lightgray", height: 30, width: 30, borderRadius: 15 }}>
                                                                <p style={{ textAlign: 'center', color: 'white', width: 30, marginTop: "3px" }}></p>
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

                                                        <span className="know1"><span className="fw-600">The Challenger:</span> The challenger will inspire and challenge their mentee through narrative and task assignment. They have a lot of enthusiasm and excitement, and they're quite aggressive when it comes to mentoring.</span>
                                                    </div>
                                                </div>

                                                <div class="prefernce_ques mb-25">
                                                    <div className="prefer_img d-flex">
                                                        <div className="me-3">
                                                            <input id="checkbox1" type="checkbox" />
                                                            <label for="checkbox1"></label>
                                                        </div>

                                                        <span className="know1"><span className="fw-600">The Sponsor:</span> The Sponsor is focused on connecting and advocating for their mentee, ensuring that their network expands to aiding in their career growth.</span>
                                                    </div>
                                                </div>

                                                <div class="prefernce_ques mb-25">
                                                    <div className="prefer_img d-flex">
                                                        <div className="me-3">
                                                            <input id="checkbox2" type="checkbox" />
                                                            <label for="checkbox2"></label>
                                                        </div>

                                                        <span className="know1"><span className="fw-600">The Harbor:</span> The Harbor is the empathic mentor who listens to their mentee and has a high level of emotional intelligence. When confronted with adversity, they will assist their mentee in thriving rather than simply surviving.</span>
                                                    </div>
                                                </div>

                                                <div class="prefernce_ques mb-25">
                                                    <div className="prefer_img d-flex">
                                                        <div className="me-3">
                                                            <input id="checkbox3" type="checkbox" />
                                                            <label for="checkbox3"></label>
                                                        </div>

                                                        <span className="know1"><span className="fw-600">The Master of Craft:</span> The Master of Craft is a mentor who is well-versed in their craft and is eager to share their learned experiences. They are often short-term mentors that assist their mentees in achieving professional goals in a short period of time.</span>
                                                    </div>
                                                </div> */}
                                                {/* <div style={{display:'flex', justifyContent:'space-between'}}>
                                                <div onClick={() => navigate(-1)} className="next-arrow">
                                                    <img src={back_img} className="svg wh-50" />
                                                </div>
                                                <div onClick={() => sendAnotherScreen()} className="next-arrow">
                                                    <img src={next_img} className="svg wh-50" />
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

export default Preferences_Question1;
