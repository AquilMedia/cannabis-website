import React, { useState, useRef } from 'react';

type StepData = {
    question: string;
    options?: { label: string; value: string | boolean }[];
    info?: React.ReactNode;
    type?: 'radio' | 'checkbox' | 'upload' | 'summary' | 'custom';
    customRender?: (props: any) => React.ReactNode;
};

const allSteps: StepData[] = [
    {
        question: 'Do you already have the necessary doctor\'s prescription for this order with identical product and quantity information?',
        options: [
            { label: 'Yes', value: true },
            { label: 'No, request a prescription', value: false }
        ],
        type: 'radio'
    },
    {
        question: 'Upload a photo of the prescription',
        type: 'upload',
        info: <div style={{ fontSize: 14, color: '#888' }}>JPG / PNG, max size 10MB</div>
    },
    {
        question: 'Prescription',
        type: 'custom',
        customRender: () => (
            <div style={{ textAlign: 'center', margin: 16 }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#388e3c' }}>€14.20</div>
                <div style={{ fontSize: 18, color: '#888', textDecoration: 'line-through' }}>€0.00</div>
                <div style={{ color: '#388e3c', marginTop: 8 }}>First prescription is on us!</div>
                <div style={{ fontSize: 14, color: '#555', marginTop: 4 }}>Begin your therapy with no additional costs.</div>
            </div>
        )
    },
    {
        question: 'Select a symptom that best describes your condition',
        options: [
            { label: 'Pain', value: 'Pain' },
            { label: 'Dementia', value: 'Dementia' },
            { label: 'Other', value: 'Other' }
        ],
        type: 'radio'
    },
    {
        question: 'When did your symptoms appear?',
        options: [
            { label: '1-7 days ago', value: '1-7 days ago' },
            { label: '1-4 weeks ago', value: '1-4 weeks ago' },
            { label: '1-3 months ago', value: '1-3 months ago' },
            { label: '3-12 months ago', value: '3-12 months ago' },
            { label: '1-5 years ago', value: '1-5 years ago' },
            { label: 'more than 5 years ago', value: 'more than 5 years ago' }
        ],
        type: 'checkbox'
    },
    {
        question: 'Has a doctor already diagnosed your condition and possibly treated it?',
        options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
        ],
        type: 'radio'
    },
    {
        question: 'Have you already been prescribed cannabis in Germany in the past?',
        options: [
            { label: 'Yes', value: true },
            { label: 'No', value: false }
        ],
        type: 'radio'
    },
    {
        question: 'What POSITIVE effects did it have?',
        options: [
            { label: 'Ease', value: 'Ease' },
            { label: 'Empathy', value: 'Empathy' },
            { label: 'Euphoria', value: 'Euphoria' },
            { label: 'Sensitive', value: 'Sensitive' },
            { label: 'Well-being', value: 'Well-being' },
            { label: 'Pain relief', value: 'Pain relief' },
            { label: 'Fooling around', value: 'Fooling around' },
            { label: 'Detail perception', value: 'Detail perception' },
            { label: 'Sense of community', value: 'Sense of community' },
            { label: 'New ideas/thought patterns', value: 'New ideas/thought patterns' },
            { label: 'None', value: 'None' }
        ],
        type: 'checkbox'
    },
    {
        question: 'What NEGATIVE effects did it have?',
        options: [
            { label: 'None', value: 'None' },
            { label: 'Nausea', value: 'Nausea' },
            { label: 'Paranoia', value: 'Paranoia' },
            { label: 'Dizziness', value: 'Dizziness' },
            { label: 'Drowsiness', value: 'Drowsiness' },
            { label: 'Memory gaps', value: 'Memory gaps' },
            { label: 'Hallucinations', value: 'Hallucinations' },
            { label: 'Motor problems', value: 'Motor problems' },
            { label: 'Panic or anxiety', value: 'Panic or anxiety' },
            { label: 'Unclear thinking', value: 'Unclear thinking' },
            { label: 'Heart palpitations', value: 'Heart palpitations' },
            { label: 'Circulatory collapse', value: 'Circulatory collapse' },
            { label: 'Increase in appetite', value: 'Increase in appetite' },
            { label: 'Feeling of loneliness', value: 'Feeling of loneliness' }
        ],
        type: 'checkbox'
    },
    {
        question: "I confirm, I don't meet any of the following criteria.",
        options: [
            { label: 'Yes, I confirm', value: true },
            { label: "No, I don't", value: false }
        ],
        type: 'radio',
        info: (
            <ul>
                <li>You have not used up the previously prescribed cannabis yourself to the extent that it is completely used up within 10 days as per the doctor’s instructions.</li>
                <li>The disadvantages of your previous cannabis consumption outweigh the advantages</li>
                <li>You have had a psychosis, schitzophrenic episode or other serious mental illness at least once in your life</li>
                <li>You have severe cardiovascular disease, liver or kidney dysfunction, shortness of breath or lung disease</li>
                <li>You suffer from severe depression with thoughts of harming yourself (suicidal)</li>
                <li>In addition to your current symptoms, you have another chronic illness</li>
                <li>You work as a car driver</li>
                <li>You are allergic to cannabis</li>
            </ul>
        )
    },
    {
        question: "Do you confirm, you're not taking any of the following medications?",
        options: [
            { label: 'Yes, I confirm', value: true },
            { label: "No, I don't", value: false }
        ],
        type: 'radio',
        info: (
            <ul>
                <li>Drugs to control blood pressure</li>
                <li>Anticoagulants such as warfarin</li>
                <li>Potency drugs such as Viagra</li>
                <li>Sedative drugs such as Ativan, Valium, antidepressants and narcotics</li>
                <li>Antidiabetics, blood thinners, anticonvulsants, antipsychotics, immunosuppressants, anticholinergics, sympathomimetics, psilocybin</li>
                <li>CNS depressants such as benzodiazepines, barbiturates, opioids, alcohol</li>
            </ul>
        )
    },
    {
        question: "Upload your identity document (ID card or passport)",
        type: 'upload',
        info: <div style={{ fontSize: 14, color: '#888' }}>JPG / PNG, max size 10MB</div>
    },
    {
        question: "Summary",
        type: 'summary'
    }
];

const PrescriptionWizardModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState<any[]>([]);
    const [prescriptionImg, setPrescriptionImg] = useState<string | null>(null);
    const [identityImg, setIdentityImg] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);
    const idInputRef = useRef<HTMLInputElement>(null);
    let steps: StepData[] = [];
    if (answers[0] === true) {
        steps = [
            allSteps[0], 
            allSteps[1], 
            allSteps[allSteps.length - 1]
        ];
    } else if (answers[0] === false) {
        steps = [
            allSteps[0], 
            allSteps[2], 
            ...allSteps.slice(3, allSteps.length - 1), 
            allSteps[allSteps.length - 1] 
        ];
    } else {
        steps = [allSteps[0]];
    }

    const current = steps[step];

    const handleOption = (value: any) => {
        setAnswers(prev => {
            const updated = [...prev];
            updated[step] = value;
            return updated;
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'prescription' | 'identity') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = ev => {
                if (type === 'prescription') setPrescriptionImg(ev.target?.result as string);
                else setIdentityImg(ev.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleNext = () => {
        if (
            answers[0] === false && 
            step === 3 && 
            answers[step] === "No"
        ) {
            onClose();
            return;
        }
        setStep(step + 1);
    };

    const handlePrev = () => {
        setStep(step - 1);
    };

    if (current.type === 'summary') {
      
    }

    return (
        <div className="wizard-modal-overlay">
            <div className="wizard-modal-content">
                <button
                    onClick={onClose}
                    className="wizard-modal-close"
                    aria-label="Close"
                >×</button>
                <div className="wizard-progress-bar">
                    <div
                        className="wizard-progress"
                        style={{
                            width: `${((step + 1) / steps.length) * 100}%`
                        }}
                    />
                </div>
                <h5 className="wizard-step-title">Step {step + 1} of {steps.length}</h5>
                <h6 className="wizard-question">{current.question}</h6>
                {current.info}

                {current.type === 'upload' && (
                    <div style={{ margin: '16px 0' }}>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={step === 1 && answers[0] === true ? fileInputRef : idInputRef}
                            onChange={e => handleFileChange(e, step === 1 && answers[0] === true ? 'prescription' : 'identity')}
                        />
                        {step === 1 && answers[0] === true && prescriptionImg && (
                            <img src={prescriptionImg} alt="Prescription" style={{ maxHeight: 120, marginTop: 12, borderRadius: 8, border: '1px solid #eee' }} />
                        )}
                        {((answers[0] === false && step === steps.length - 2) || (answers[0] === true && step === steps.length - 2)) && identityImg && (
                            <img src={identityImg} alt="Identity" style={{ maxHeight: 120, marginTop: 12, borderRadius: 8, border: '1px solid #eee' }} />
                        )}
                    </div>
                )}
   
                {current.type === 'custom' && current.customRender && (
                    <div>{current.customRender({})}</div>
                )}
       
                {current.type === 'summary' && (
                    <div style={{ margin: '16px 0' }}>
                        <h6>Summary</h6>
                        <ul style={{ textAlign: 'left' }}>
                            <li><b>Prescription Provided:</b> {answers[0] === true ? 'Yes' : 'No'}</li>
                            {answers[0] === true && prescriptionImg && (
                                <li>
                                    <b>Prescription Image:</b><br />
                                    <img src={prescriptionImg} alt="Prescription" style={{ maxHeight: 80, borderRadius: 6, border: '1px solid #eee' }} />
                                </li>
                            )}
                            {answers[0] === false && (
                                <>
                                    <li><b>Prescription Fee:</b> €14.20 (First prescription: <span style={{ color: '#388e3c' }}>Free</span>)</li>
                                    <li><b>Complaint:</b> {answers[2]}</li>
                                    <li><b>Symptoms:</b> {(answers[3] || []).join(', ')}</li>
                                    <li><b>Doctor Diagnosed:</b> {answers[4] === true ? 'Yes' : 'No'}</li>
                                    <li><b>Cannabis Prescribed Before:</b> {answers[5] === true ? 'Yes' : 'No'}</li>
                                    <li><b>Positive Effects:</b> {(answers[6] || []).join(', ')}</li>
                                    <li><b>Negative Effects:</b> {(answers[7] || []).join(', ')}</li>
                                    <li><b>Exclusion Criteria:</b> {answers[8] === true ? 'None met' : 'Some met'}</li>
                                    <li><b>Medication Conflicts:</b> {answers[9] === true ? 'No conflicting medications reported' : 'Some conflicts'}</li>
                                    <li>
                                        <b>Identity Document:</b><br />
                                        {identityImg && <img src={identityImg} alt="Identity" style={{ maxHeight: 80, borderRadius: 6, border: '1px solid #eee' }} />}
                                    </li>
                                </>
                            )}
                        </ul>
                        <button className="btn btn-success" style={{ width: '100%', marginTop: 16 }} onClick={() => alert('Checkout!')}>
                            Checkout
                        </button>
                    </div>
                )}
      
                {(current.type === 'radio' || current.type === 'checkbox') && (
                    <div style={{ margin: '16px 0' }}>
                        {current.options?.map(opt => (
                            <div key={opt.label} className="wizard-option">
                                <label>
                                    <input
                                        type={current.type}
                                        name={`step-${step}`}
                                        value={String(opt.value)}
                                        checked={
                                            current.type === 'radio'
                                                ? answers[step] === opt.value
                                                : Array.isArray(answers[step]) && answers[step].includes(opt.value)
                                        }
                                        onChange={e => {
                                            if (current.type === 'radio') {
                                                handleOption(opt.value);
                                            } else {
                                                let arr = Array.isArray(answers[step]) ? [...answers[step]] : [];
                                                if (e.target.checked) arr.push(opt.value);
                                                else arr = arr.filter((v: any) => v !== opt.value);
                                                handleOption(arr);
                                            }
                                        }}
                                    />
                                    {' '}{opt.label}
                                </label>
                            </div>
                        ))}
                    </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
                    <button className="btn btn-secondary" onClick={handlePrev} disabled={step === 0}>Back</button>
                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                        disabled={
                            (current.type === 'radio' && answers[step] == null) ||
                            (current.type === 'checkbox' && (!answers[step] || answers[step].length === 0)) ||
                            (current.type === 'upload' && ((answers[0] === true && step === 1 && !prescriptionImg) || ((answers[0] === false && step === steps.length - 2) && !identityImg)))
                        }
                    >
                        {step === steps.length - 1 ? 'Finish' : 'Next'}
                    </button>
                </div>
            </div>
            <style jsx>{`
                .wizard-modal-overlay {
                    position: fixed;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: rgba(0,0,0,0.45);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                }
                .wizard-modal-content {
                    background: #fff;
                    padding: 32px 24px;
                    border-radius: 18px;
                    min-width: 370px;
                    max-width: 95vw;
                    box-shadow: 0 8px 32px rgba(56,142,60,0.18);
                    position: relative;
                    animation: wizard-fadein 0.3s;
                }
                .wizard-modal-close {
                    position: absolute;
                    top: 10px;
                    right: 16px;
                    background: transparent;
                    border: none;
                    font-size: 2rem;
                    color: #388e3c;
                    cursor: pointer;
                }
                .wizard-step-title {
                    color: #388e3c;
                    font-weight: 700;
                    margin-bottom: 10px;
                }
                .wizard-question {
                    font-size: 1.1rem;
                    font-weight: 600;
                    margin-bottom: 8px;
                }
                .wizard-progress-bar {
                    width: 100%;
                    height: 6px;
                    background: #e0e0e0;
                    border-radius: 3px;
                    margin-bottom: 18px;
                    overflow: hidden;
                }
                .wizard-progress {
                    height: 100%;
                    background: linear-gradient(90deg, #4caf50 60%, #388e3c 100%);
                    transition: width 0.3s;
                }
                .wizard-option {
                    background: #f7f7f7;
                    border-radius: 6px;
                    padding: 8px 12px;
                    margin-bottom: 8px;
                    transition: background 0.2s;
                }
                .wizard-option input[type="radio"]:checked + span,
                .wizard-option input[type="checkbox"]:checked + span {
                    color: #388e3c;
                    font-weight: 600;
                }
                @keyframes wizard-fadein {
                    from { opacity: 0; transform: translateY(40px);}
                    to { opacity: 1; transform: translateY(0);}
                }
            `}</style>
        </div>
    );
};

export default PrescriptionWizardModal;