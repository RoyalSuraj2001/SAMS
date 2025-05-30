# Welcome to my BCAOL project

## Project info
Student Side:

On login/signup, the student lands on their dashboard.

The dashboard displays their QR code (which encodes their name, ID, and email).

A real-time 'Attendance' section shows the list of dates and times they were marked present.

Teacher Side:

On login/signup, the teacher lands on a dashboard.

The dashboard has a QR code scanner using the device camera.

When a student shows their QR code to the teacher:

The scanner decodes the data (name, ID).

Automatically stores an attendance entry in Firestore under:

A 'teachers_attendance' collection for that teacher, storing student name, ID, and timestamp.

A 'students_attendance' collection under the student ID, storing timestamp and teacher ID.

This update reflects in real-time on the student’s dashboard in their attendance section.

Firebase Integration:

Use Firebase Firestore to store:

Users (students, teachers)

Attendance logs

Real-time updates using Firebase streams.


Deliverables:

Role-based login and routing.

Real-time Firestore data updates.

QR Code generation and scanning.

Working student and teacher dashboards.

Functional attendance logging system with time and date."

To run this project follow the steps as given below.

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
