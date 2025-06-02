import Student from "../models/student";
import Tutor from "../models/tutor";

export default function distribute(tutors: Tutor[], students: Student[]) {
    for(const student of students) {
        // Obtem lista de tutores de interesse que não estão cheios
        const desireds = tutors.filter((tutor) => {
            return !tutor.isFull() && student.preferred_tutors.includes(tutor.name);
        });

        // Vincula os tutores
        if(desireds.length == 1) link(student, desireds[0]);
        else if(desireds.length > 1) linkBestTutor(student, desireds);
        else linkBestTutor(student, tutors);
    };

    // Filtragem de repetidos (casos de mudança de horário/tutor)
};

function linkBestTutor(student: Student, tutors: Tutor[]) {
    const _tutors = [...tutors];
    _tutors.sort((a, b) => {
        // A prioridade de tutor são os que não estão cheios
        const isAFull = a.isFull() ? 1:0;
        const isBFull = b.isFull() ? 1:0;
        if(isAFull != isBFull) {
            return isAFull - isBFull;
        };
        
        // Seguido dos que casarem melhor com os horários
        const scoreA = a.getTimeScore(student.available_times);
        const scoreB = b.getTimeScore(student.available_times);
        if(scoreA != scoreB) {
            return scoreB - scoreA;
        };

        // Depois, temos como criério de desempate o número de tutorandos
        // E, se ainda houver empate, permanece a ordem original (alfabética)
        return a.students.length - b.students.length;
    });

    link(student, _tutors[0]);
};

function link(student: Student, tutor: Tutor) {
    student.tutor = tutor;
    tutor.students.push(student);
};

