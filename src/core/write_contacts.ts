import { stringify } from "csv";
import Student from "../models/student";
import fs from "node:fs";

export default function writeContacts(students: Student[]) {
    const contacts: Contact[] = students.map((form) => form.toContact());
    stringify(contacts, { 
        header: true 
    }, (err, output) => {
        if(err) {
            console.error("Erro ao converter dados da lista de contatos!");
            process.exit(0);
        };

        fs.writeFile("./output/contacts.csv", output, { 
            encoding: "utf-8" 
        }, (err) => {
            if(err) {
                console.error("Erro ao escrever dados de contato!");
                process.exit(0);
            } else {
                console.log("Arquivo de contatos gerado com sucesso!");
            };
        });
    });
};