[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/ashikka/motorq-service">
    <img src="./assets/logo.png" alt="Logo" width="80">
  </a>

  <h3 align="center">motorq-service</h3>

  <p align="center">
    Course registration and Timetable management system to make your student life easier!
    <br />
    <a href="https://github.com/ashikka/motorq-service"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/ashikka/motorq-service">View Demo</a>
    ·
    <a href="https://github.com/ashikka/motorq-service/issues">Report Bug</a>
    ·
    <a href="https://github.com/ashikka/motorq-service/issues">Request Feature</a>
  </p>
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Roadmap](#roadmap)
* [Contributing](#contributing)
* [License](#license)
* [Contributors](#contributors-)

<!-- ABOUT THE PROJECT -->
## About The Project

Making a good timetalble while taking care of clashes is a mess! This application was made to take care of that automatically for you. You can build your timetable, check for clashes and even render a map showing the distance between all the classes! Now managing your timetable is so easy!

### Built With

* [express](https://www.npmjs.com/package/express)
* [nodemon](https://www.npmjs.com/package/nodemon)
* [mongoose](https://www.npmjs.com/package/mongoose)
* [winston](https://www.npmjs.com/package/winston)
* [typescript](https://www.typescriptlang.org)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Install global dependencies
* npm
```sh
npm install npm@latest -g
```

* Typescript
```sh
npm install -g typescript
```

### Installation
 
1. Clone the repo
```sh
git clone https://github.com/ashikka/motorq-service.git
cd motorq-service
```
2. Install NPM packages
```sh
npm install
```

2. Start the project
```sh
npm run dev
```

<!-- USAGE EXAMPLES -->
## API specification

### 1. Create a new class for a specific course
```http
  POST /class
```

| Parameter | Type     | Description                     |
| :--------: | :-------: | :------------------------------: |
| `body`    | `string` |  courseCode |
| `body`    | `number` | courseName |
| `body`    | `string` |  building |
| `body`    | `string` |  faculty |
| `body`    | `string` |  time |
| `body`    | `number` |  location.latitude |
| `body`    | `number` |  location.longitude |


### Response format

```json
{
    "success": true,
    "message": "Class created successfully",
    "data": {
        "classOfStudent": {
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "courseCode": "MAT-2021",
          "courseName": "Calculus",
          "building": "sjt-403",
          "faculty": "Peri Kameswaram",
          "time": "14:00",
          "location": {
            "latitude": 40.858689,
            "longitude": 96.784136
          }
        }
    }
}
```

### 2. Get classes for given courseCode
```http
  GET /class/:courseCode
```

| Parameter | Type     | Description                     |
| :--------: | :-------: | :------------------------------: |
| `params`    | `string` |  courseCode |


### Response format

```json
{
    "success": true,
    "message": "Classes found successfully",
    "data": {
        "classes": [{
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "courseCode": "MAT-2021",
          "courseName": "Calculus",
          "building": "sjt-403",
          "faculty": "Peri Kameswaram",
          "time": "14:00",
          "location": {
            "latitude": 40.858689,
            "longitude": 96.784136
          }
        }]
    }
}
```

### 3. Add new class to student if no clashes
```http
  POST /class/:studentId
```

| Parameter | Type     | Description                     |
| :--------: | :-------: | :------------------------------: |
| `params`    | `string` |  studentId |
| `body`    | `string` |  courseCode |
| `body`    | `number` | courseName |
| `body`    | `string` |  building |
| `body`    | `string` |  faculty |
| `body`    | `string` |  time |
| `body`    | `number` |  location.latitude |
| `body`    | `number` |  location.longitude |


### Response format

```json
{
    "success": true,
    "message": "Classes updated successfully",
    "data": {
        "rollNo": "19BCE0002",
        "name": "Ravi sharma",
        "classes": [{
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "courseCode": "MAT-2021",
          "courseName": "Calculus",
          "building": "sjt-403",
          "faculty": "Peri Kameswaram",
          "time": "14:00",
          "location": {
            "latitude": 40.858689,
            "longitude": 96.784136
          }
        }]
    }
}
```

### 4. Deletes a class with the given classId from the student’s entity
```http
  DELETE /class/:studentId/:classId
```

| Parameter | Type     | Description                     |
| :--------: | :-------: | :------------------------------: |
| `params`    | `string` |  studentId |
| `params`    | `string` |  classId |


### Response format

```json
{
    "success": true,
    "message": "Class removed successfully",
    "data": {
        "classes": []
    }
}
```

### 5. Gets all the classes registered by the student with rollNo
```http
  GET /class/student/:studentId
```

| Parameter | Type     | Description                     |
| :--------: | :-------: | :------------------------------: |
| `params`    | `string` |  studentId |


### Response format

```json
{
    "success": true,
    "message": "Classes found successfully",
    "data": {
        "classes": [{
          "id": "123e4567-e89b-12d3-a456-426614174000",
          "courseCode": "MAT-2021",
          "courseName": "Calculus",
          "building": "sjt-403",
          "faculty": "Peri Kameswaram",
          "time": "14:00",
          "location": {
            "latitude": 40.858689,
            "longitude": 96.784136
          }
        }]
    }
}
```

### 6. Get an array of classes of the given courseCode on map
```http
  GET /class/classes-on-map/:courseCode
```

| Parameter | Type     | Description                     |
| :--------: | :-------: | :------------------------------: |
| `params`    | `string` |  courseCode |


### Response format

```json
{
    "success": true,
    "message": "Classes found successfully",
    "data": [{
        "classesId": "123e4567-e89b-12d3-a456-426614174000",
        "courseCode": "MAT-2021",
        "courseName": "Calculus",
        "building": "sjt-403",
        "faculty": "Peri Kameswaram",
        "studentsRegistered": 1,
        "time": "14:00",
        "location": {
          "latitude": 40.858689,
          "longitude": 96.784136
        }
    }]
}
```

### 7. Register a new student
```http
  POST /student
```

| Parameter | Type     | Description                     |
| :--------: | :-------: | :------------------------------: |
| `body`    | `string` |  rollNo |
| `body`    | `string` |  name |


### Response format

```json
{
    "success": true,
    "message": "Data posted successfully",
    "data": {
     "rollNo": "19BCE0002",
        "name": "Ravi sharma"
    }
}
```

### 8. Register a new student
```http
  GET /student/:rollNo
```

| Parameter | Type     | Description                     |
| :--------: | :-------: | :------------------------------: |
| `params`    | `string` |  rollNo |


### Response format

```json
{
    "success": true,
    "message": "Student found successfully",
    "data": {
     "rollNo": "19BCE0002",
        "name": "Ravi sharma"
    }
}
```

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/ashikka/motorq-service/issues) for a list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push -u origin feature/AmazingFeature`)
5. Open a Pull Request

You are requested to follow the contribution guidelines specified in [CONTRIBUTING.md](./CONTRIBUTING.md) while contributing to the project :smile:.

<!-- LICENSE -->
## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[issues-shield]: https://img.shields.io/github/issues/csivitu/template.svg
[issues-url]: https://github.com/ashikka/motorq-service/issues
