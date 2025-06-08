import { parse, stringify } from "csv";
import fs from "fs";
import Student from "../models/student";
import { compareAsc } from "date-fns";

export default function loadStudents(onLoad: (students: Student[]) => void) {
    fs.readFile("./data/students.csv", { 
        encoding: "utf-8"
    }, (err, data) => {
        if(err) {
            console.error("Erro ao ler o arquivo!");
            process.exit(0);
        };
    
        parse(data, { 
            columns: true, 
            trim: true, 
            skip_empty_lines: true
        }, (err, data: Form[]) => {
            if(err) {
                console.error("Erro ao converter dados do arquivo!");
                process.exit(0);
            };
    
            const students: Student[] = data.map((form) => new Student(form));
            onLoad(students);
        });
    });
};