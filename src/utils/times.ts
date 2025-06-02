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