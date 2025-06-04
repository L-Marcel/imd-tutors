import { startCase } from "lodash";
import AvailableTimes from "./available_times";
import Tutor from "./tutor";
import { fromDate, toDate } from "../utils/times";

export default class Student {
    public name: string;
    public nickname: string;
    public enrollment: string;
    public email: string;
    public shift: string;
    public is_bti_student: boolean;
    public allowed_use_data: boolean;
    public preferred_tutors: string[];
    public available_times: AvailableTimes;
    public linked_at?: Date;
    public submitted_at: Date;
    public tutor?: Tutor;

    constructor(form: Form) {
        this.name = startCase(form["Qual o seu nome completo?"]);
        this.shift = form["Marque o turno em que você ingressou:\nSe você trocou de turno, marque o atual."];
        this.nickname = startCase(form["Como prefere ser chamado(a)?"] ?? this.name);
        this.enrollment = form["Qual sua matrícula?"];
        this.email = form["Endereço de e-mail"];
        this.submitted_at = toDate(form["Carimbo de data/hora"]);
        this.is_bti_student = form["Você é estudante do BTI?"] === "Sim";
        this.allowed_use_data = form["Autorização para uso de dados\nAutorizo a utilização dos dados fornecidos neste formulário exclusivamente para o preenchimento de fichas e demais documentos necessários ao planejamento das ações do Projeto de Tutoria no âmbito da Diretoria de Ensino do IMD.\nDeclaro estar ciente de que, após o envio desta solicitação, as informações aqui prestadas serão encaminhadas aos Coordenadores do Projeto de Tutoria 2025.1 do IMD para as devidas providências."] === "Declaro que li, e estou de acordo.";
        this.preferred_tutors = form["Prefere escolher o(a) tutor(a)?\nSe sim, quem?"].split(", ");
        this.available_times = AvailableTimes.fromForm(form);
    };

    public isValid(): boolean {
        return this.is_bti_student && this.allowed_use_data;
    };

    public equals(student: Student) {
        return this.email === student.email || this.enrollment === student.email;
    };

    public toContact(): Contact {
        return {
            "Name Prefix": "",
            "First Name": this.name,
            "Middle Name": "",
            "Last Name": "",
            "Name Suffix": "",
            "Phonetic First Name": "",
            "Phonetic Middle Name": "",
            "Phonetic Last Name": "",
            "Nickname": this.nickname,
            "File As": "",
            "E-mail 1 - Label": "Contato",
            "E-mail 1 - Value": this.email,
            "Phone 1 - Label": "",
            "Phone 1 - Value": "",
            "Address 1 - Label": "",
            "Address 1 - Country": "",
            "Address 1 - Street": "",
            "Address 1 - Extended Address": "",
            "Address 1 - City": "",
            "Address 1 - Region": "",
            "Address 1 - Postal Code": "",
            "Address 1 - PO Box": "",
            "Organization Name": "",
            "Organization Title": "",
            "Organization Department": "",
            "Birthday": "",
            "Event 1 - Label": "",
            "Event 1 - Value": "",
            "Relation 1 - Label": "",
            "Relation 1 - Value": "",
            "Website 1 - Label": "",
            "Website 1 - Value": "",
            "Custom Field 1 - Label": "Matricula",
            "Custom Field 1 - Value": this.enrollment,
            "Custom Field 2 - Label": "Turno",
            "Custom Field 2 - Value": this.shift,
            "Custom Field 3 - Label": "Data de requisição",
            "Custom Field 3 - Value": fromDate(this.submitted_at),
            "Notes": this.available_times.toString(),
            "Labels": "Tutorado ::: " + (this.tutor?.name ?? "Tutor Indefinido"),
        };
    };
};