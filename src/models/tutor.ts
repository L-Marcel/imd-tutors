import { day_to_property_name } from "../utils/times";
import AvailableTimes from "./available_times";
import AvailableTutorTimes from "./available_tutor_times";
import Student from "./student";

export default class Tutor {
    public name;
    public available_times: AvailableTutorTimes;
    public students: Student[];

    constructor(name: string, forms: TutorForm[]) {
        this.name = name;
        this.available_times = AvailableTutorTimes.fromTutorForm(forms);
        this.students = [];
    };

    public refreshStudents() {
        for(const student of this.students) {
            student.tutor = this;
        };
    };

    public isStudentAlreadyLinked(candidate: Student): boolean {
        for(const student of this.students) {
            if(student.equals(candidate)) {
                candidate.tutor = student.tutor; 
                candidate.linked_at = student.linked_at; 
                candidate.link_was_preference = student.link_was_preference; 
                candidate.link_score = student.link_score; 
                return true;
            };
        };
    
        return false;
    };

    public link(student: Student, at: Date) {
        student.tutor = this;
        student.linked_at = at;
        student.link_was_preference = student.preferred_tutors.includes(this.name);
        student.link_score = this.getTimeScore(student.available_times);
        this.students.push(student);
    };

    public isFull(): boolean {
        return this.students.length >= 30;
    };

    public equals(tutor?: Tutor) {
        return this.name === tutor?.name;
    };

    public getTimeScore(student_available_times: AvailableTimes): number {
        let score = 0;

        const days: string[] = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
        for(const day of days) {
            const property_name = day_to_property_name(day);
            const student_times = student_available_times[property_name as keyof AvailableTimes] as string[];
            const tutor_times = this.available_times[property_name as keyof AvailableTutorTimes] as TutorTime[];
            
            for(const time of tutor_times) {
                if(student_times.includes(time.id)) {
                    // Horários não dedicados ao atendimento 
                    // contam menos na pontuação
                    score += (time.serviceOnly? 1:0.75);
                };
            };
        };

        return score;
    };
};