import { day_to_property_name } from "../utils/times";

export default class AvailableTutorTimes {
    public monday: TutorTime[] = [];
    public tuesday: TutorTime[] = [];
    public wednesday: TutorTime[] = [];
    public thursday: TutorTime[] = [];
    public friday: TutorTime[] = [];
    public saturday: TutorTime[] = [];

    static fromTutorForm(data: TutorForm[]): AvailableTutorTimes {
        const times: AvailableTutorTimes = new AvailableTutorTimes();
        const days: string[] = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

        for(const time of data) {
            for(const day of days) {
                const property_name = day_to_property_name(day);
                if(property_name !== '' && time[day as keyof TutorForm] !== '') {
                    times[property_name].push({
                        id: time[''],
                        serviceOnly: time[day as keyof TutorForm] !== "o",
                        value: time[day as keyof TutorForm],
                    });
                };
            };
        }; 
        
        return times;
    };

    private timeToString(time: TutorTime): string {
        return `${time.id}(${time.serviceOnly ? "✔":"o"})`;
    };

    toString(): string {
        let content: string = "Horários";
        if(this.monday.length > 0) content += "\nSegunda: " + this.monday.map(this.timeToString).join(", ");
        if(this.thursday.length > 0) content += "\nTerça: " + this.thursday.map(this.timeToString).join(", ");
        if(this.wednesday.length > 0) content += "\nQuarta: " + this.wednesday.map(this.timeToString).join(", ");
        if(this.thursday.length > 0) content += "\nQuinta: " + this.thursday.map(this.timeToString).join(", ");
        if(this.friday.length > 0) content += "\nSexta: " + this.friday.map(this.timeToString).join(", ");
        if(this.saturday.length > 0) content += "\nSábado: " + this.saturday.map(this.timeToString).join(", ");
        if(content === "Horários") content = "Nenhum horário informado.";
        return content;
    };
};