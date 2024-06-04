export enum LabelClasses {
    'Relevant' = 1,
    'Irrelevant' = 0,
}

export class UpdateRowLabel {
    Label: LabelClasses;
}