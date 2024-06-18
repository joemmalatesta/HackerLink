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
	type: keyof typeof QuestionType;
	options?: string[];
	// extras (checkboxes, etc, all dependant on question type)
}

export enum QuestionType {
	shortAnswer,
	paragraph,
	multipleChoice,
	trueFalse,
	checkBoxes,
	date,
	fileUpload,
}

export interface EventSettings {
	slug: string;
	description: string;
	eventName: string;
	primaryColor: string;
	secondaryColor: string;
	textColor: string;
}
