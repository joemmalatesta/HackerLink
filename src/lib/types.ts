export interface Event {
	// Id probably
	id: string;
	eventName: string;
	// submissionCount: number,
	primaryColor: string;
	secondaryColor: string;
	textColor: string;
	description: string;
}

export interface User {
	id: string;
	email: string;
	organiztion: string;
	name: string;
}

export interface Form {
	id: string;
	name: string;
	questions: Question[];
	// submissionCount: number,
}

export interface Question {
	id: number;
	title: string;
	type: QuestionType;
	required?: boolean;
	options?: string[];
	// extras (checkboxes, etc, all dependant on question type)
}

export type QuestionType = "shortAnswer" | "paragraph" | "multipleChoice" | "trueFalse" | "checkBoxes" | "date" | "fileUpload";


export interface EventSettings {
	slug: string;
	description: string;
	eventName: string;
	primaryColor: string;
	secondaryColor: string;
	textColor: string;
}


export interface Answer {
	id: number;
	title: string;
	answer: any;
}

export interface Response {
	createdAt: Date,
	formId: string,
	response: Answer[],
	id: number
}   