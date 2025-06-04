import { compareAsc } from "date-fns";
import Student from "../models/student";
import Tutor from "../models/tutor";
import fs from "node:fs";
import { fromDate } from "../utils/times";

export default function writeHistory(
    tutors: Tutor[]
) {
    let history = "";

    const now = new Date();
    const students = tutors.reduce((prev, tutor) => {
        return prev.concat(tutor.students);
    }, [] as Student[]);
    
    students.sort((a, b) => {
        const diff = compareAsc(a.linked_at ?? now, b.linked_at ?? now);
        if(diff !== 0) return diff;

        const tutorA = a.tutor as Tutor;
        const tutorB = b.tutor as Tutor;
        return tutorA.name.localeCompare(tutorB.name);
    });

    let current_date = "";
    let current_tutor: Tutor | undefined = undefined;
    let current_students: Student[] = [];
    let first_line = true;
    for(let i = 0; i < students.length; i++) {
        const student = students[i];
        const linked_at = fromDate(student.linked_at ?? now);
        if(linked_at !== current_date) {
            if(!first_line) history += "\n\n\n";
            first_line = false;
            history += "======================== " + linked_at + " ========================";
            current_date = linked_at;
        };

        const tutor = student.tutor as Tutor;
        if(!tutor.equals(current_tutor)) {
            if(current_students.length > 0) {
                history += "\nE-mails: ";
                const emails = current_students.map((student) => student.email).join(", ");
                history += emails + "\n------------------------------------------------------------";
            };

            current_students = [];
            history += "\n\n\n" + tutor.name + ":\n------------------------------------------------------------\n"; 
            current_tutor = tutor;
        };

        current_students.push(student);
        history += `${student.name} (${student.email})\n`;
    };

    if(current_students.length > 0) {
        history += "\nE-mails: ";
        const emails = current_students.map((student) => student.email).join(", ");
        history += emails + "\n------------------------------------------------------------";
    };

    fs.writeFile("./output/history.log", history, { 
        encoding: "utf-8" 
    }, (err) => {
        if(err) {
            console.error("Erro ao escrever dados de filtros!");
            process.exit(0);
        } else {
            console.log("Arquivo de filtros gerado com sucesso!");
        };
    });
};
  