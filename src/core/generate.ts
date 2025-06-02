import distribute from './distribute';
import loadStudents from './load_students';
import loadTutors from './load_tutors';
import writeContacts from './write_contacts';

const path = process.argv[2];
if(!!!path || !path.endsWith(".csv")) {
    console.error("Passe o caminho de um arquivo .csv!");
    process.exit(0);
};

loadTutors((tutors) => {
    loadStudents(path, (students) => {
        distribute(tutors, students);
        writeContacts(students);
        console.log(students);
    });
});

