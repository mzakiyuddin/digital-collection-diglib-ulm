# Digital Collection Diglib ULM

This repository is a collection of data from the digital library of the Lambung Mangkurat University (ULM) in the form of a [JSON](/data.json) and [CSV](/data.csv) file.

Source: http://digilib.ulm.ac.id/archive/digital/catalogue.php

File:

- [Google Spreadsheet](https://docs.google.com/spreadsheets/d/19k_x0VqwMKQ6lW-w3yTr3DHFHRYE8NYPWweEAw-bSr0/edit?usp=sharing)
- [CSV](/data.csv)
- [JSON](/data.json)

## How To Use

1. Clone the repository

   ```bash
   git clone https://github.com/zakiego/digital-collection-diglib-ulm.git
   ```

2. Install dependencies

   ```bash
   yarn install
   ```

3. Run the project

   ```bash
   yarn start
   ```

## Folder Structure

```bash
├── index.ts # Entry point
├── utils # Utils folder
│   ├── [utils].ts
│   └── __tests__
│       └── [utils].test.ts
├── .github
│   └── workflows
│       └── test.yml # Github Actions for testing
├── .vscode
│   └── settings.json # VSCode settings
├── .gitignore # Git ignore
├── vitest.config.js # Vitest config
├── package.json # Package.json
├── README.md # Readme
└── tsconfig.json # TypeScript config
```
