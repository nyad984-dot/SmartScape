# City Safety AI

## Overview

City Safety AI is a Smart City platform designed to improve communication between citizens and municipal services.

The platform allows residents to report city problems, infrastructure defects, and emergency situations while using Artificial Intelligence to automatically classify, prioritize, and route reports to the appropriate department.

This project was developed as part of the **City Safety & Social Services** hackathon track.

---

## Problem

Cities receive thousands of reports from citizens every day.

Common issues include:

* Broken traffic lights
* Road potholes
* Damaged infrastructure
* Street lighting failures
* Waste accumulation
* Emergency incidents
* Public safety concerns

Many reports are processed manually, causing delays and reducing response efficiency.

---

## Solution

City Safety AI provides a centralized platform where citizens can quickly submit reports and receive faster responses through AI-powered analysis.

The system automatically:

* Classifies reports
* Assigns priority levels
* Generates summaries
* Suggests responsible departments
* Provides analytics for city administrators

---

## Features

### Citizen Portal

Residents can:

* Create reports
* Upload images
* Track report status
* View report history

### AI Analysis

Artificial Intelligence automatically determines:

* Category
* Priority
* Responsible department
* Incident summary

### Administrative Dashboard

City authorities can:

* Monitor reports
* View analytics
* Track incident resolution
* Identify problem hotspots

### Interactive Map

Visualize incidents across the city.

Supported categories:

* Traffic
* Infrastructure
* Lighting
* Garbage
* Emergency

### AI Assistant

Residents can ask questions about:

* City services
* Reporting procedures
* Emergency contacts
* Municipal information

---

## Technology Stack

### Frontend

* React
* Vite
* React Router DOM
* TailwindCSS
* Axios
* Recharts
* React Leaflet
* Lucide React

### Backend

* Spring Boot
* Spring Security
* JPA / Hibernate
* MySQL

### AI

* Gemini API

---

## Project Structure

src/

├── pages/

├── components/

├── layouts/

├── services/

├── hooks/

├── context/

├── utils/

├── assets/

└── styles/

---

## Available Pages

### Public Pages

| Route     | Description       |
| --------- | ----------------- |
| /         | Landing Page      |
| /login    | Login Page        |
| /register | Registration Page |

### User Pages

| Route          | Description    |
| -------------- | -------------- |
| /report/create | Create Report  |
| /reports       | Reports List   |
| /reports/:id   | Report Details |
| /profile       | User Profile   |

### Administrative Pages

| Route      | Description         |
| ---------- | ------------------- |
| /dashboard | Analytics Dashboard |
| /map       | City Incident Map   |

### AI Features

| Route      | Description  |
| ---------- | ------------ |
| /assistant | AI Assistant |

---

## User Workflow

1. Citizen creates a report.
2. Report is submitted to the backend.
3. AI analyzes the report.
4. Category and priority are assigned.
5. Report is routed to the responsible department.
6. Administrators process the report.
7. Status is updated until resolution.

---

## Report Statuses

* OPEN
* IN_PROGRESS
* RESOLVED
* REJECTED

---

## Priority Levels

* LOW
* MEDIUM
* HIGH
* CRITICAL

---

## Frontend Responsibilities

The frontend is responsible for:

* User Interface
* Authentication Pages
* Report Creation Forms
* Report Visualization
* Dashboard Analytics
* Map Visualization
* AI Assistant Interface
* API Communication

All communication with the backend is performed using REST APIs.

---

## Backend Modules

Expected backend modules:

* Authentication
* Users
* Reports
* AI Analysis
* Dashboard Analytics
* Map Data
* Assistant Chat

---

## Installation

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build production version:

```bash
npm run build
```

---

## Team

### Frontend Development

* User Interface
* User Experience
* Dashboard
* Maps
* API Integration

### Backend Development

* Authentication
* Database
* REST APIs
* Business Logic
* AI Integration

### Artificial Intelligence

* Report Classification
* Priority Detection
* Department Routing
* Assistant Responses

---

## Goal

Our goal is to make cities safer, smarter, and more responsive by combining citizen feedback, modern web technologies, and Artificial Intelligence into a single platform.
