# Viktorinų kūrimo ir atsakinėjimo svetainė

## Aprašymas

Viktorinų kūrimo ir atsakinėjimo svetainė.

Sistema skirta vartotojams kurti įvairias viktorinas, jas atsakinėti ir gauti rezultatus.

Iš viso bus naudojamos 3 rolės:
- Svečias – gali atsakinėti į viktorinas ir matyti rezultatą.
- Narys – gali tai ką ir svečias, tačiau papildomai gali ir kurti viktorinas.
- Administratorius – gali tai ką ir narys, tačiau papildomai gali patvirtinti narių sukurtas viktorinas ir padaryti jas viešomis.

Hierarchinis ryšys: viktorina -> klausimas -> komentaras.

Vartotojo sąsajai bus naudojama „React“ bilbioteka, serverio pusei .NET, duomenų bazei – MySQL.

---

## API Dokumentacija

Viktorinos
- `GET /quizzes`: Gauti visas viktorinas.
- `POST /quizzes`: Sukurti naują viktoriną.
- `GET /quizzes/:quizId`: Gauti viktoriną nurodant norimą id.
- `PUT /quizzes/:quizId`: Atnaujinti viktorinos duomenis nurodant id.
- `DELETE /quizzes/:quizId`: Pašalinti viktoriną nurodant id.

Klausimai
- `GET /quizzes/:questionId/questions`: Gauti visus klausimus iš nurodytos viktorinos.
- `POST /quizzes/:quizId/questions`: Sukurti naują klausimą nurodytai viktorinai.
- `GET /quizzes/:quizId/questions/:questionId`: Gauti konkretų klausimą iš nurodytos viktorinos.
- `PUT /quizzes/:quizId/questions/:questionId`: Atnaujinti nurodyto klausimo duomenis iš nurodytos viktorinos.
- `DELETE /quizzes/:quizId/questions/:questionId`: Pašalinti klausimą iš nurodytos viktorinos.

Atsakymai
- `GET /quizzes/:quizId/questions/:questionId/answers`: Gauti visus atsakymus iš nurodyto klausimo.
- `POST /quizzes/:quizId/questions/:questionId/answers`: Sukurti naują atsakymą nurodytam klausimui.
- `GET /quizzes/:quizId/questions/:questionId/answers/:answerId`: Gauti nurodytą atsakymą iš klausimo.
- `PUT /quizzes/:quizId/questions/:questionId/answers/:answerId`: Atnaujinti atsakymo duomenis.
- `DELETE /quizzes/:quizId/questions/:questionId/answers/:answerId`: Pašalinti nurodytą klausimą.