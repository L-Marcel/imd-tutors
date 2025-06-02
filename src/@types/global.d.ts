export {};

declare global {
    type TutorTime = {
        id: string;
        serviceOnly: boolean;
        value: string;
    };

    type TutorForm = {
        '': string;
        'Segunda': '✔' | 'o' | '';
        'Terça': '✔' | 'o' | '';
        'Quarta': '✔' | 'o' | '';
        'Quinta': '✔' | 'o' | '';
        'Sexta': '✔' | 'o' | '';
        'Sábado': '✔' | 'o' | '';
    };

    type Form = {
        'Qual o seu nome completo?': string;
        'Qual sua matrícula?': string;
        'Endereço de e-mail': string;
        'Como prefere ser chamado(a)?': string;
        'Você é estudante do BTI?': 'Sim' | 'Não';
        'Carimbo de data/hora': string;
        'Marque o turno em que você ingressou:\nSe você trocou de turno, marque o atual.': string;
        'Autorização para uso de dados\nAutorizo a utilização dos dados fornecidos neste formulário exclusivamente para o preenchimento de fichas e demais documentos necessários ao planejamento das ações do Projeto de Tutoria no âmbito da Diretoria de Ensino do IMD.\nDeclaro estar ciente de que, após o envio desta solicitação, as informações aqui prestadas serão encaminhadas aos Coordenadores do Projeto de Tutoria 2025.1 do IMD para as devidas providências.': 'Declaro que li, e estou de acordo.' | 'Não estou de acordo.';
        'Prefere escolher o(a) tutor(a)?\nSe sim, quem?': string;
        'Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [M12]': string;
        'Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [M34]': string;
        'Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [M56]': string;
        'Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [T12]': string;
        'Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [T34]': string;
        'Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [T56]': string;
        'Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [N12]': string;
        'Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [N34]': string;
    };
    
    type Contact = {
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
        'Custom Field 2 - Label': 'Turno';
        'Custom Field 2 - Value': string;
        'Custom Field 3 - Label': 'Data de requisição';
        'Custom Field 3 - Value': string;
        'Notes': string;
        'Labels': string;
    };
};