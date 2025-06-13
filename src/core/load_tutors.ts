import { parse } from "csv";
import fs from "fs";
import path from "node:path";
import Tutor from "../models/tutor";
import { load } from "./storage";

export default function loadTutors(onLoad: (tutors: Tutor[]) => void) {
    const folder = "./data/tutors";
    fs.readdir(folder, (err, files) => {
        if(err) {
            console.error("Erro ao ler pasta dos tutores!");
            process.exit(0);
        };
    
        const csvs = files.filter((file) => {
            return fs.statSync(path.join(folder, file)).isFile() && file.endsWith(".csv");
        });

        if(csvs.length == 0) {
            console.error("Nenhum tutor encontrado!");
            process.exit(0);
        };
        
        let tutors: Tutor[] = [];
        for(const file of csvs) {
            const name = file.replace(".csv", "");
            const filePath = path.join(folder, file);

            fs.readFile(filePath, { 
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
                }, (err, data: TutorForm[]) => {
                    if(err) {
                        console.error("Erro ao converter dados do arquivo!");
                        process.exit(0);
                    };
            
                    const tutor = new Tutor(name, data);
                    tutors.push(tutor);
                    if(tutors.length === csvs.length) {
                        load((loaded_tutors) => {
                            for(const tutor of tutors) {
                                for(const loaded_tutor of loaded_tutors) {
                                    if(loaded_tutor.name === tutor.name) {
                                        loaded_tutor.refreshStudents();
                                        tutor.students = loaded_tutor.students;
                                    };
                                };
                            };
    
                            onLoad(tutors);
                        });
                    };
                });
            });
        };
    });    
};