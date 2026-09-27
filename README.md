# 🔐 4-Bit Digital Combination Lock

> **Design and Implementation of a 4-Bit Digital Combination Lock Using Logic Gates**
> An interactive hardware + web simulation project for Digital Electronics Lab.

---

## 📌 About

This project demonstrates how **digital logic gates** (NOT + AND) can be used to build a **password-based locking system**. A 4-bit binary password is entered using switches, verified through combinational logic, and a physical gate opens when the correct combination is matched.

**Password:** `1011` (A=1, B=0, C=1, D=1)

**Boolean Expression:** `MATCH = A · B' · C · D`

---

## ✨ Features

### 🖥️ Web Simulation
- Interactive toggle switches (A, B, C, D)
- Real-time binary input display
- Animated logic gate visualization (NOT, AND)
- Live Boolean expression evaluation
- Green/Red LED indicators with glow effects
- Animated door opening mechanism
- Cinematic sound effects (success chime, error buzz, switch click)
- Complete 16-row truth table with live highlighting
- Fully responsive design

### 🔧 Hardware Implementation
- Pure logic gate circuit (No microcontroller)
- 74HC04 Hex NOT Gate IC
- 74HC08 Quad AND Gate IC
- BC547 transistor-driven DC motor
- Physical cardboard gate mechanism
- LED indicators + buzzer

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Frontend | HTML5, CSS3, JavaScript |
| Audio | Web Audio API |
| Hosting | GitHub Pages |
| Hardware | 74HC04, 74HC08, BC547, DC Motor |

---

## 🚀 How to Run

### Web Simulation
Click On Click:https://sanidhya1372006-cpu.github.io/Digtal_Lock_System/
