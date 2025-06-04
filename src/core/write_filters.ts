import Tutor from "../models/tutor";
import fs from "node:fs";

export default function writeFilters(
    tutors: Tutor[]
) {
    const now = new Date().toISOString();

    const entryFilterIdParts: string[] = [];
    let entriesXml = '';
  
    for(const tutor of tutors) {
        if(tutor.students.length === 0) continue;

        const filterIdPart = generateGmailFilterIdPart();
        entryFilterIdParts.push(filterIdPart);

        const entryId = `tag:mail.google.com,2008:filter:${filterIdPart}`;
        const emailsValue = tutor.students
            .map((student) => student.email)
            .join(',');

        entriesXml += `<entry>
            <category term="filter"/>
            <title>Mail Filter</title>
            <id>${entryId}</id>
            <updated>${now}</updated>
            <content/>
            <apps:property name="from" value="${escapeXml(emailsValue)}"/>
            <apps:property name="label" value="${escapeXml(tutor.name)}"/>
            <apps:property name="shouldAlwaysMarkAsImportant" value="true"/>
            <apps:property name="smartLabelToApply" value="^smartlabel_personal"/>
            <apps:property name="sizeOperator" value="s_sl"/>
            <apps:property name="sizeUnit" value="s_smb"/>
        </entry>`;
    };

    const feedIdContent = entryFilterIdParts.join(',');
    const feedId = `tag:mail.google.com,2008:filters:${feedIdContent}`;

    const xml = `<?xml version='1.0' encoding='UTF-8'?>
    <feed xmlns='http://www.w3.org/2005/Atom' xmlns:apps='http://schemas.google.com/apps/2006'>
        <title>Mail Filters</title>
        <id>${feedId}</id>
        <updated>${now}</updated>
        <author>
        <name>Tutoria IMD</name>
        <email>tutoria@imd.ufrn.br</email>
        </author>${entriesXml}
    </feed>`;

    fs.writeFile("./output/filters.xml", xml, { 
        encoding: "utf-8" 
    }, (err) => {
        if(err) {
            console.error("Erro ao escrever dados de filtros!");
            process.exit(0);
        } else {
            console.log("Arquivo de filtros gerado com sucesso!");
        };
    });
};
  
function generateGmailFilterIdPart(): string {
    const generate19Digits = (): string => {
        let digits = '';
        for (let i = 0; i < 19; i++)
            digits += Math.floor(Math.random() * 10);
        return digits;
    };

    return `z${generate19Digits()}*${generate19Digits()}`;
};

function escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&"']/g, (char) => {
        switch (char) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '"': return '&quot;';
            case "'": return '&apos;';
            default: return char;
        };
    });
};
  