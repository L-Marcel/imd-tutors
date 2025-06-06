import Student from "../models/student";
import Tutor from "../models/tutor";

export default function distribute(tutors: Tutor[], students: Student[]) {
    const now = new Date();
    for(const student of students) {
        // Verifica se o tutorado já não tem um tutor
        if(isAlreadyLinked(student, tutors)) continue;

        // Obtem lista de tutores de interesse que não estão cheios
        const desireds = tutors.filter((tutor) => {
            return !tutor.isFull() && student.preferred_tutors.includes(tutor.name);
        });

        // Vincula os tutores
        if(desireds.length == 1) desireds[0].link(student, now);
        else if(desireds.length > 1) linkBestTutor(student, desireds, now);
        else linkBestTutor(student, tutors, now);
    };
};

function isAlreadyLinked(student: Student, tutors: Tutor[]): boolean {
    for(const tutor of tutors) {
        const isLinked = tutor.students.some((other) => other.equals(student));
        if(isLinked) return true;
    };

    return false;
};

function linkBestTutor(student: Student, tutors: Tutor[], at: Date) {
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

        // Depois, temos como criério de desempate o número de tutorados
        // E, se ainda houver empate, permanece a ordem original (alfabética)
        return a.students.length - b.students.length;
    });

    _tutors[0].link(student, at);
};
