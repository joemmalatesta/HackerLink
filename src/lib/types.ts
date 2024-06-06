export interface Event{
    // Id probably
    name: string,
    submissionCount: number,
    primaryColor: string,
    secondaryColor: string,
    // primaryColor: string,
}

export interface User{
    id: string,
    email: string,
    organiztion: string,
    name: string,
}

export interface Form {
    // ID probably
    name: string
    questionCount: number,
    submissionCount: number,
    // questions: []Question,
}

export interface Question {
    id: number,
    title: string,
    // type: some enum
    // extras (checkboxes, etc, all dependant on question type)
}