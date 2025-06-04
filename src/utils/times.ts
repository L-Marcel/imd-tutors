import { format, parse } from "date-fns";

export function day_to_property_name(
    day: string
): '' | 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' {
    switch(day) {
        case 'Segunda': return 'monday';
        case 'Terça': return 'tuesday';
        case 'Quarta': return 'wednesday';
        case 'Quinta': return 'thursday';
        case 'Sexta': return 'friday';
        case 'Sábado': return 'saturday';
        default: return '';
    };
};

export function toDate(value: string): Date {
    return parse(value, "dd/MM/yyyy HH:mm:ss", new Date());
};

export function fromDate(date: Date): string {
    return format(date, "dd/MM/yyyy");
};