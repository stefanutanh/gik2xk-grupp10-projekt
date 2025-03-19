TAGET FRÅN PROJEKTBESKRIVNINGEN:

Kravspecifikation
Ni ska skapa en webbshop. Produkterna i butiken kan vara vad som helst – blandat,
filmer, bilar, spel, kläder eller i stort sett vad som helst. Det får dock inte vara något
stötande eller opassande.
Väldigt mycket av funktionaliteten i detta projekt kommer ni att kunna finna i bloggen,
som byggs under lektionerna. Koncepten är liknande, men ni behöver ”översätta”
bloggens lösningar till en webbshop.
Det kommer dock att finnas detaljer och krav som ni inte ännu har sett under kursens
gång och som ni förväntas lösa på egen hand. Det är mycket det som projektet går ut på –
att tillämpa idéer från någon annan stans, men också i grupp lösa de problem som
uppstår med de saker som inte löses genom något ni sett tidigare.
Tekniska krav
• Datalagring ska ske i en SQL-databas av valfri typ (MySQL, MariaDB, SQLite eller
liknande).
• Backend ska skrivas i en Node.js-miljö med stöd av Express.
• Sequelize ska tillämpas som ORM-ramverk.
o Det finns ett alternativt ORM-ramverk som heter Prisma, som är godkänt
för den som vill ta sig an det, det är dock inget som kommer att gås
igenom i kursen.
• Arkitektur för långsiktig och hållbar API-kommunikation ska tillämpas.
• Frontend ska skrivas i React med tydlig och logisk komponentstruktur.
• Webbsidan ska ha ett tilltalande, konsekvent och användbart gränssnitt.
• Färdiga komponent-/CSS-bibliotek från exempelvis Material UI eller Bootstrap
bör användas.
o Att göra helt egen styling med CSS eller andra tekniker för att styla Reactapplikationer kan vara svårt och bidra till att webbsidan inte blir
tillräckligt väl utformad rent grafiskt, men anta gärna utmaningen.
Funktionskrav (användarfall) – minimum
Nedanstående delar ska kunna utföras. Detaljer kring hur denna funktionalitet tillämpas
är upp till er, men det ska gå att göra allt nedanstående via ett gränssnitt i er webbshop.
1. SOM KUND VILL JAG KUNNA:
• se en vy av flera produkter.
• se en detaljvy för en given produkt med mer information och detaljer, inklusive
o bilder och information om produkten
o en lista av betyg på produkten
o snittbetyg uträknat ifrån alla betyg
o gränssnitt för att betygsätta en produkt.
* lägga valfritt antal av önskade produkter i en varukorg.
• se min varukorg med en lista över tillagda produkter, deras pris, antal och
sammanlagda pris.

2. SOM FÖRSÄLJARE/ADMINISTRATÖR AV WEBBSHOPEN VILL JAG KUNNA:
• Skapa, ändra och ta bort produkter.
Notera: både besökare och administratör i webbshopen är en och samma modell/resurs –
user. De särskiljs inte på något sätt förutom någon eventuell benämning eller text i
gränssnittet. Det behövs alltså exempelvis ingen funktionalitet för att kontrollera någon
slags användarroll och anpassa funktionalitet efter det. Ni får låtsas att vissa funktioner
bara är synliga för vissa användare, även fast de kanske syns hela tiden.
Notera: För de delar som man inte kan administrera via frontend (t.ex. användare)
används exempelvis Postman för att hantera data.
