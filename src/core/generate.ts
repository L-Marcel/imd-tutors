import distribute from './distribute';
import loadStudents from './load_students';
import loadTutors from './load_tutors';
import { save } from './storage';
import writeContacts from './write_contacts';
import writeFilters from './write_filters';
import writeHistory from './write_history';

loadTutors((tutors) => {
    loadStudents("./data/candidates.csv", (students) => {
        distribute(tutors, students);
        writeContacts(students);
        writeFilters(tutors);
        writeHistory(tutors);
        save(tutors);
    });
});

