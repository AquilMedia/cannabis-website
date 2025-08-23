import React, { useMemo, useState } from "react";

type RelatedData = { id: number; title: string };
type Question = {
    id: number;
    title: string;
    question: string;
    answers: any;
    relation_table: string | null;
    description: string | null;
    relatedData: RelatedData[] | null;
};

export default function MedicalQuestionnaire({
    questions = [] as Question[],
    onSubmit,
}: {
    questions: Question[];
    onSubmit?: (resp: any) => void;
}) {
    const sortedQuestions = useMemo(
        () => [...questions].sort((a, b) => a.id - b.id),
        [questions]
    );

    const [responses, setResponses] = useState<Record<string, any>>({});
    const [currentIdx, setCurrentIdx] = useState(0);

    const q = sortedQuestions[currentIdx];
    const total = sortedQuestions.length;

    const handleChange = (qKey: string | number, value: any) => {
        setResponses((prev) => ({ ...prev, [qKey]: value }));
    };

    const evaluateCurrent = () => {
 
        if (q.answers?.selected) {
            const selectedValues: string[] = Array.isArray(responses[q.id]) ? responses[q.id] : [];
            const answered = selectedValues.length > 0;
            const blockedAnswers = selectedValues.filter((v) => q.answers[v] === false);

            return { answered, blocked: blockedAnswers.length > 0, blockedAnswers };
        }

  
        if (!q.answers) {
            const val = responses[q.id];
            return {
                answered: q.relatedData ? !!val : typeof val === "string" && val.trim() !== "",
                blocked: false,
                blockedAnswers: []
            };
        }

        const keys = Object.keys(q.answers);

   
        if (q.id === 2) {
            const selected = responses[q.id];
            if (!selected) return { answered: false, blocked: false, blockedAnswers: [] };
            const isBlocked = q.answers[selected] === false;
            return {
                answered: true,
                blocked: isBlocked,
                blockedAnswers: isBlocked ? [selected] : []
            };
        }

      
        if (keys.length > 2 && Object.values(q.answers).every((v) => typeof v === "boolean")) {
            const selected = Array.isArray(responses[q.id]) ? responses[q.id] : [];
            const blockedAnswers = selected.filter((v: string | number) => q.answers[v] === false);
            return { answered: selected.length > 0, blocked: blockedAnswers.length > 0, blockedAnswers };
        }


        if (keys.every((k) => typeof q.answers[k] === "boolean" || typeof q.answers[k] === "object")) {
            const selected = responses[q.id];
            if (!selected) return { answered: false, blocked: false, blockedAnswers: [] };
            const optionData = q.answers[selected];
            if (typeof optionData === "boolean") {
                return {
                    answered: true,
                    blocked: optionData === false,
                    blockedAnswers: optionData === false ? [selected] : []
                };
            }
            if (typeof optionData === "object") {
                const subKey = `${q.id}-${selected}`;
                const subSelected = responses[subKey];
                if (!subSelected) return { answered: false, blocked: false, blockedAnswers: [] };
                const leaf = optionData.answers?.[subSelected];
                return {
                    answered: true,
                    blocked: leaf === false,
                    blockedAnswers: leaf === false ? [subSelected] : []
                };
            }
        }

        return { answered: false, blocked: false, blockedAnswers: [] };
    };


    const { answered, blocked } = evaluateCurrent();

    const goPrev = () => setCurrentIdx((i) => Math.max(0, i - 1));
    const goNext = () => setCurrentIdx((i) => Math.min(total - 1, i + 1));
    const handleFinalSubmit = () => {
        const answeredQuestions = sortedQuestions.map((question) => {
            return {
                id: question.id,
                question: question.question,
                answer: responses[question.id] ?? null
            };
        });

        onSubmit?.(answeredQuestions);
    };


    const renderAnswers = (answers: any, qKey: string | number) => {
        const currentQuestion = sortedQuestions.find((qq) => qq.id === Number(qKey));
        const rel = currentQuestion?.relatedData || [];

        if (!answers) {
            if (rel.length > 0) {
                const selected = responses[qKey] ?? "";
                return (
                    <div className="row row-gap-2">
                        {rel.map((r, idx) => (
                            <div key={r.id} className={`col-12 col-md-3 d-flex`}>
                                <label className="d-flex gap-2 w-100 align-items-center">
                                    <input
                                        type="radio"
                                        className="cb_input_rc"
                                        name={`question-${qKey}`}
                                        checked={selected === r.title}
                                        onChange={() => handleChange(qKey, r.title)}
                                    />
                                    <span>{r.title}</span>
                                </label>
                            </div>
                        ))}
                    </div>

                );
            }
      
            return (
                <textarea
                    className="form-control resize-none"
                    placeholder="Type your answer…"
                    rows={3}
                    value={responses[qKey] || ""}
                    onChange={(e) => handleChange(qKey, e.target.value)}
                />
            );
        }

        if (answers.selected) {
            const options = Object.keys(answers).filter((k) => k !== "selected");
            const selectedValues: string[] = Array.isArray(responses[qKey]) ? responses[qKey] : [];

            const toggle = (option: string) => {
                let updated = [...selectedValues];

                if (option === "None") {
                    updated = updated.includes("None") ? [] : ["None"];
                } else {
                    updated = updated.includes(option)
                        ? updated.filter((o) => o !== option)
                        : [...updated.filter((o) => o !== "None"), option];
                }

                handleChange(qKey, updated);
            };

            return (
                <div className="row row-gap-2">
                    {options.map((option) => (
                        <div key={option} className="col-sm-6 col-lg-5 d-flex">
                            <label className="d-flex gap-2 align-items-center w-100">
                                <input
                                    type="checkbox"
                                    className="cb_input_rc"
                                    checked={selectedValues.includes(option)}
                                    onChange={() => {
                                        let updated = [...selectedValues];
                                        if (option === "None") {
                                            updated = updated.includes("None") ? [] : ["None"];
                                        } else {
                                            updated = updated.includes(option)
                                                ? updated.filter((o) => o !== option)
                                                : [...updated.filter((o) => o !== "None"), option];
                                        }
                                        handleChange(qKey, updated);
                                    }}
                                />
                                <span>{option}</span>
                            </label>
                        </div>
                    ))}
                </div>

            );
        }


        const keys = Object.keys(answers);
        if (qKey === 2) {
            const selected = responses[qKey] ?? "";
            return keys.map((option) => (
                <label key={option} className="d-flex gap-2 align-items-center mb-2">
                    <input
                        type="radio"
                        className="cb_input_rc"
                        name={`question-${qKey}`}
                        checked={selected === option}
                        onChange={() => handleChange(qKey, option)}
                    />
                    <span>{option}</span>
                </label>
            ));
        }
 
        if (keys.length > 2 && Object.values(answers).every((v) => typeof v === "boolean")) {
            const selected = Array.isArray(responses[qKey]) ? responses[qKey] : [];
            const toggle = (option: string) => {
                let updated = [...selected];
                updated = updated.includes(option)
                    ? updated.filter((o) => o !== option)
                    : [...updated, option];
                handleChange(qKey, updated);
            };
            return keys.map((option) => (
                <label key={option} className="d-flex gap-2 align-items-center mb-2">
                    <input
                        type="checkbox"
                        className="cb_input_rc"
                        checked={selected.includes(option)}
                        onChange={() => {
                            let updated = [...selected];
                            if (option === "None") {
                                updated = updated.includes("None") ? [] : ["None"];
                            } else {
                                updated = updated.includes(option)
                                    ? updated.filter((o) => o !== option)
                                    : [...updated.filter((o) => o !== "None"), option];
                            }
                            handleChange(qKey, updated);
                        }}
                    />
                    <span>{option}</span>
                </label>

            ));
        }

        return keys.map((option) => {
            const optionData = answers[option];
            const isSelected = responses[qKey] === option;
            return (
                <div key={option} className="mb-2">
                    <label className="d-flex gap-2 align-items-center">
                        <input
                            type="radio"
                            className="cb_input_rc"
                            name={`question-${qKey}`}
                            checked={isSelected}
                            onChange={() => handleChange(qKey, option)}
                        />
                        <span>{option}</span>
                    </label>

                    {isSelected && typeof optionData === "object" && optionData.question && (
                        <div className="ms-3 mt-2">
                            <div className="text-black line_H_1_3 mb-2">{optionData.question}</div>
                            <div>{renderAnswers(optionData.answers, `${qKey}-${option}`)}</div>
                        </div>
                    )}
                </div>

            );
        });
    };

    if (!q) return null;

    return (
        <div className="cb_cardStyle_1">
            <h3 className="text-black f-size-20 line_H_1_2">Medical Questionnaire</h3>
            <div className="mb-2">Question {currentIdx + 1} of {total}</div>
            <h5 className="text-black">{q.title}</h5>
            <div className="text-black line_H_1_3 mb-4">{q.question}</div>

            {q.description && (
                <div
                    className="mb-2"
                    dangerouslySetInnerHTML={{ __html: q.description }}
                />
            )}

            <div className="mb-3">
                {renderAnswers(q.answers, q.id)}
            </div>

            {blocked && (
                <div className="alert alert-danger mt-2">
                    You are not eligible to proceed with this selection.
                </div>
            )}

            <div className="d-flex justify-content-between mt-3">
                <button
                    onClick={goPrev}
                    className="btn cb_cmnBtn px-4"
                    disabled={currentIdx === 0}
                >
                    Previous
                </button>

                {currentIdx < total - 1 ? (
                    <button
                        onClick={goNext}
                        className="btn cb_cmnBtn px-4"
                        disabled={!answered || blocked}
                    >
                        Next
                    </button>
                ) : (
                    <button
                        onClick={handleFinalSubmit}
                        className="btn cb_cmnBtn px-4"
                        disabled={!answered || blocked}
                    >
                        Complete Questionnaire
                    </button>
                )}
            </div>
        </div>

    );
}
