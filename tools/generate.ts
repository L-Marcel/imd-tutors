import { parse, stringify } from 'csv';
import { startCase } from 'lodash';
import fs from 'fs';

type InputRow = {
    'Qual o seu nome completo?': string;
    'Qual sua matrícula?': string;
    'Endereço de e-mail': string;
    'Como prefere ser chamado(a)?': string;
    'Você é estudante do BTI?': 'Sim' | 'Não';
    'Carimbo de data/hora': string;
};

type OutputRow = {
    'Name Prefix': string;
    'First Name': string;
    'Middle Name': string;
    'Last Name': string;
    'Name Suffix': string;
    'Phonetic First Name': string;
    'Phonetic Middle Name': string;
    'Phonetic Last Name': string;
    'Nickname': string;
    'File As': string;
    'E-mail 1 - Label': string;
    'E-mail 1 - Value': string;
    'Phone 1 - Label': string;
    'Phone 1 - Value': string;
    'Address 1 - Label': string;
    'Address 1 - Country': string;
    'Address 1 - Street': string;
    'Address 1 - Extended Address': string;
    'Address 1 - City': string;
    'Address 1 - Region': string;
    'Address 1 - Postal Code': string;
    'Address 1 - PO Box': string;
    'Organization Name': string;
    'Organization Title': string;
    'Organization Department': string;
    'Birthday': string;
    'Event 1 - Label': string;
    'Event 1 - Value': string;
    'Relation 1 - Label': string;
    'Relation 1 - Value': string;
    'Website 1 - Label': string;
    'Website 1 - Value': string;
    'Custom Field 1 - Label': 'Matricula';
    'Custom Field 1 - Value': string;
    'Custom Field 2 - Label': 'Data de requisição';
    'Custom Field 2 - Value': string;
    'Notes': string;
    'Labels': string;
};

const path = process.argv[2];
if(!!!path || !path.endsWith(".csv")) {
    console.error("Passe o caminho de um arquivo .csv!");
    process.exit(0);
};

fs.readFile(path, { 
    encoding: 'utf-8'
}, (err, data) => {
    if(err) {
        console.error("Erro ao ler o arquivo!");
        process.exit(0);
    };

    parse(data, { 
        columns: true, 
        trim: true, 
        skip_empty_lines: true
    }, (err, data: InputRow[]) => {
        if(err) {
            console.error("Erro ao converter dados do arquivo!");
            process.exit(0);
        };

        const result: OutputRow[] = data.map((data) => ({
            'Name Prefix': '',
            'First Name': startCase(data['Qual o seu nome completo?']),
            'Middle Name': '',
            'Last Name': '',
            'Name Suffix': '',
            'Phonetic First Name': '',
            'Phonetic Middle Name': '',
            'Phonetic Last Name': '',
            'Nickname': startCase(data['Como prefere ser chamado(a)?'] ?? data['Qual o seu nome completo?']),
            'File As': '',
            'E-mail 1 - Label': 'Contato',
            'E-mail 1 - Value': data['Endereço de e-mail'],
            'Phone 1 - Label': '',
            'Phone 1 - Value': '',
            'Address 1 - Label': '',
            'Address 1 - Country': '',
            'Address 1 - Street': '',
            'Address 1 - Extended Address': '',
            'Address 1 - City': '',
            'Address 1 - Region': '',
            'Address 1 - Postal Code': '',
            'Address 1 - PO Box': '',
            'Organization Name': '',
            'Organization Title': '',
            'Organization Department': '',
            'Birthday': '',
            'Event 1 - Label': '',
            'Event 1 - Value': '',
            'Relation 1 - Label': '',
            'Relation 1 - Value': '',
            'Website 1 - Label': '',
            'Website 1 - Value': '',
            'Custom Field 1 - Label': 'Matricula',
            'Custom Field 1 - Value': data['Qual sua matrícula?'],
            'Custom Field 2 - Label': 'Data de requisição',
            'Custom Field 2 - Value': data['Carimbo de data/hora'],
            'Notes': '',
            'Labels': 'tutorando',
        }));

        stringify(result, { 
            header: true 
        }, (err, output) => {
            if(err) {
                console.error("Erro ao converter dados da lista!");
                process.exit(0);
            };

            fs.writeFile("contacts.csv", output, { 
                encoding: 'utf-8' 
            }, (err) => {
                if(err) {
                    console.error("Erro ao escrever dados!");
                    process.exit(0);
                } else {
                    console.log("Arquivos gerados com sucesso!");
                }
            })
        })
    });
});