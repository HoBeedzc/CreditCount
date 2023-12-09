import { create } from 'zustand'

export const useStatesStore = create(() => ({
    step: 1,
    major: '',
    grade: '',
}));

export const useFilterStore = create(() => ({
    major: '',
    grade: '',
    majorList: [],
    gradeList: [],
}));