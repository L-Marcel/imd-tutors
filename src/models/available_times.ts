import { day_to_property_name } from "../utils/times";

export default class AvailableTimes {
    public monday: string[] = [];
    public tuesday: string[] = [];
    public wednesday: string[] = [];
    public thursday: string[] = [];
    public friday: string[] = [];
    public saturday: string[] = [];

    static fromForm(data: Form): AvailableTimes {
        const times: AvailableTimes = new AvailableTimes();

        const form_times = [
            { id: "M12", value: data["Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [M34]"], },
            { id: "M34", value: data["Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [M34]"], }, 
            { id: "M56", value: data["Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [M56]"], }, 
            { id: "T12", value: data["Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [T12]"], }, 
            { id: "T34", value: data["Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [T34]"], }, 
            { id: "T56", value: data["Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [T56]"], }, 
            { id: "N12", value: data["Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [N12]"], }, 
            { id: "N34", value: data["Quais destes horários você provavelmente utilizaria quando quisesse entrar em contato? [N34]"], }, 
        ];

        for(const time of form_times) {
            if(time.value === "") continue;
   
            const days = time.value.split(", ");
            for(const day of days) {
                const property_name = day_to_property_name(day);
                if(property_name !== '') {
                    times[property_name].push(time.id);
                };
            };
        }; 

        return times;
    };

    toString(): string {
        let content: string = "Horários";
        if(this.monday.length > 0) content += "\nSegunda: " + this.monday.join(", ");
        if(this.thursday.length > 0) content += "\nTerça: " + this.thursday.join(", ");
        if(this.wednesday.length > 0) content += "\nQuarta: " + this.wednesday.join(", ");
        if(this.thursday.length > 0) content += "\nQuinta: " + this.thursday.join(", ");
        if(this.friday.length > 0) content += "\nSexta: " + this.friday.join(", ");
        if(this.saturday.length > 0) content += "\nSábado: " + this.saturday.join(", ");
        if(content === "Horários") content = "Nenhum horário informado.";
        return content;
    };
};