import SuperJSON, { parse, stringify } from "superjson";
import Tutor from "../models/tutor";
import AvailableTutorTimes from "../models/available_tutor_times";
import Student from "../models/student";
import AvailableTimes from "../models/available_times";
import fs from "node:fs";

SuperJSON.registerClass(Tutor, { identifier: "Tutor" });
SuperJSON.registerClass(AvailableTutorTimes, { identifier: "AvailableTutorTimes" });
SuperJSON.registerClass(Student, { identifier: "Student" });
SuperJSON.registerClass(AvailableTimes, { identifier: "AvailableTimes" });

export function save(tutors: Tutor[]) {
    const output = JSON.stringify(JSON.parse(stringify(tutors)), null, 2);
    fs.writeFile("./data/database.json", output, { 
        encoding: "utf-8" 
    }, (err) => {
        if(err) {
            console.error("Erro ao escrever banco de dados!");
            process.exit(0);
        } else {
            console.log("Banco de dados importado com sucesso!");
        };
    });
};

export function load(onLoaded: (tutors: Tutor[]) => void) {
    fs.readFile("./data/database.json", { 
        encoding: "utf-8"
    }, (err, data) => {
        if(err) {
            console.info("AVISO: banco de dados recriado!");
            onLoaded([]);
            return;
        };

        try {
            const tutors = parse<Tutor[]>(data);
            onLoaded(tutors);
        } catch (error) {
            console.info("AVISO: banco de dados recriado!");
            onLoaded([]);
        }
    });
};