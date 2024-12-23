# Viktorinų kūrimo ir atsakinėjimo svetainė

## Aprašymas

Viktorinų kūrimo ir atsakinėjimo svetainė.

Sistema skirta vartotojams kurti įvairias viktorinas, jas atsakinėti ir gauti rezultatus.

Iš viso bus naudojamos 3 rolės:
- Svečias – gali atsakinėti į viktorinas ir matyti rezultatą.
- Narys – gali tai ką ir svečias, tačiau papildomai gali ir kurti viktorinas.
- Administratorius – gali tai ką ir narys, tačiau papildomai gali valdyti visas viktorinas.

Hierarchinis ryšys: viktorina -> klausimas -> komentaras.

Vartotojo sąsajai bus naudojama „React“ bilbioteka, serverio pusei .NET, duomenų bazei – MySQL.

---

## API Dokumentacija

Viktorinos
- `GET /quizzes`: Gauti visas viktorinas. **Autorizacija**: Nėra.
- `POST /quizzes`: Sukurti naują viktoriną. **Autorizacija**: Prisijungęs vartotojas arba Admin.
- `GET /quizzes/:quizId`: Gauti viktoriną nurodant norimą id. **Autorizacija**: Nėra.
- `PUT /quizzes/:quizId`: Atnaujinti viktorinos duomenis nurodant id. **Autorizacija**: Prisijungęs vartotojas arba Admin.
- `DELETE /quizzes/:quizId`: Pašalinti viktoriną nurodant id. **Autorizacija**: Prisijungęs vartotojas arba Admin.

Klausimai
- `GET /quizzes/:questionId/questions`: Gauti visus klausimus iš nurodytos viktorinos. **Autorizacija**: Nėra.
- `POST /quizzes/:quizId/questions`: Sukurti naują klausimą nurodytai viktorinai. **Autorizacija**: Prisijungęs vartotojas arba Admin.
- `GET /quizzes/:quizId/questions/:questionId`: Gauti konkretų klausimą iš nurodytos viktorinos. **Autorizacija**: Nėra.
- `PUT /quizzes/:quizId/questions/:questionId`: Atnaujinti nurodyto klausimo duomenis iš nurodytos viktorinos. **Autorizacija**: Prisijungęs vartotojas arba Admin.
- `DELETE /quizzes/:quizId/questions/:questionId`: Pašalinti klausimą iš nurodytos viktorinos. **Autorizacija**: Prisijungęs vartotojas arba Admin.

Atsakymai
- `GET /quizzes/:quizId/questions/:questionId/answers`: Gauti visus atsakymus iš nurodyto klausimo. **Autorizacija**: Nėra.
- `POST /quizzes/:quizId/questions/:questionId/answers`: Sukurti naują atsakymą nurodytam klausimui. **Autorizacija**: Prisijungęs vartotojas arba Admin.
- `GET /quizzes/:quizId/questions/:questionId/answers/:answerId`: Gauti nurodytą atsakymą iš klausimo. **Autorizacija**: Nėra.
- `PUT /quizzes/:quizId/questions/:questionId/answers/:answerId`: Atnaujinti atsakymo duomenis. **Autorizacija**: Prisijungęs vartotojas arba Admin.
- `DELETE /quizzes/:quizId/questions/:questionId/answers/:answerId`: Pašalinti nurodytą klausimą. **Autorizacija**: Prisijungęs vartotojas arba Admin.

Autentifikacija
- `POST /api/accounts`: Sukurti naują vartotoją. **Autorizacija**: Nėra.
- `POST /api/login`: Autentifikuoti vartotoją. **Autorizacija**: Nėra.
- `POST /api/accessToken`: Atnaujinti vartotojo token. **Autorizacija**: Prisijungęs vartotojas.
- `POST /api/logout`: Atjungti vartotoją. **Autorizacija**: Prisijungęs vartotojas.