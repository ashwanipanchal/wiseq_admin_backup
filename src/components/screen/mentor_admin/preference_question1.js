import { useState } from 'react';
import next_img from '../../../img/next.svg';
import { NavLink, useLocation, useNavigate } from "react-router-dom";

function Preferences_Question1() {
    const { state } = useLocation()
    const [prevData, setPrevData] = useState(state)
    const navigate = useNavigate()
    const [index1, setIndex1] = useState(1)
    const [key, setKey] = useState(0)
    const [question, setQuestion] = useState("What is your Mentorship Style? (you may select one or multiple)")
    const [answers, setAnswers] = useState([
        { "answer": "The challenger will inspire and challenge their mentee through narrative and task assignment. They have a lot of enthusiasm and excitement, and they're quite aggressive when it comes to mentoring.", optionNumber: 0, priority: 0 },
        { "answer": "The Sponsor is focused on connecting and advocating for their mentee, ensuring that their network expands to aiding in their career growth.", optionNumber: 0, priority: 0 },
        { "answer": "The Harbor is the empathic mentor who listens to their mentee and has a high level of emotional intelligence. When confronted with adversity, they will assist their mentee in thriving rather than simply surviving.", optionNumber: 0, priority: 0 },
        { "answer": "The Master of Craft is a mentor who is well-versed in their craft and is eager to share their learned experiences. They are often short-term mentors that assist their mentees in achieving professional goals in a short period of time.", optionNumber: 0, priority: 0 }
    ])

    // const updateCheck = (index) => {
    //     if (index1 <= 4) {
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
        const dict1 = []
        for (let ll of answers) {
            console.log(ll.priority)
            if (ll.priority > 0) {
                dict1.push(ll)
            }
        }
        // let newAns = answers.filter((i) => {
        //     return (i.optionNumber != "")
        // })
        // console.log(newAns)
        // return
        console.log(dict1)
        if (dict1.length == 0) {
            alert("Please Select Atleast One Answer.")
            return
        }
        const dict = [state, {
            question,
            "answers": dict1,
            "questionNumber": 2,
            "questionType": "multiple_choice",
        }]
        console.log(dict)
        // return
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
                                                            <div onClick={() => updateCheck(index)} style={{ backgroundColor: i.optionNumber != "" ? "#006666" : "lightgray", height: 30, width: 30, borderRadius: 15 }}>
                                                                <p style={{ textAlign: 'center', color: 'white', width: 30, }}></p>
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
                                                <div onClick={() => sendAnotherScreen()} className="next-arrow" style={{ paddingBottom: "20px" }}>
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
