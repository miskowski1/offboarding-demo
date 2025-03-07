# OffboardingDemo

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.1.

## Development server

To start a local development server, run:

```bash
npm run mock-server
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`

## Application description

This application displays a list of employees and allows you to view their details. You can also offboard an employee if he is leaving the company.

## Assumptions made

I was not sure if i can use external libraries for state management, so on main branch there is NgRx implementation which would be my first choice for state management. On second branch there is implementation with Angular services.
