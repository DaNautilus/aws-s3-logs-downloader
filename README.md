<h1 align="center">AWS S3 Logs Downloader</h1>

![divider](./divider.png)

## ❯ Why

Download and extract log files from Amazon S3 storage

![divider](./divider.png)

## ❯ Getting Started

### Step 2: Set up Environment

Install [Node.js and NPM](https://nodejs.org/en/download/)

- on OSX use [homebrew](http://brew.sh) `brew install node`
- on Windows use [chocolatey](https://chocolatey.org/) `choco install nodejs`

Install yarn globally

```bash
yarn install yarn -g
```

### Step 2: Download project

Download this project.

### Step 2: Install dependencies

Navigate to your project folder and install all dependencies with `yarn`.

```bash
yarn install yarn -g
```

### Step 3: Set up environment variables

Copy the `.env.example` file and rename it to `.env`. In this file you have to add your Amazon AWS S3 credentials.

### Step 4: Start download

Run `npm run start` to download and extract log files.
<>
### Step 5: Have fun

Downloaded AWS S3 storage files are located in folder `./s3-files` and extracted log in folder `./logs`.

![divider](./divider.png)
