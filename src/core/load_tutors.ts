import { parse } from "csv";
import fs from "fs";
import path from "node:path";
import Tutor from "../models/tutor";

export default function loadTutors(onLoad: (tutors: Tutor[]) => void) {
    const folder = "./tutors";
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
        csvs.forEach((file) => {
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
                        onLoad(tutors);
                    };
                });
            });
        });
    });    
};