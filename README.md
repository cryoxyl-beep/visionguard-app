# MIND PALACE: THE COLD READ
### A 2D Detective, Psychological Thriller & Interactive Investigation Game

---

## 1. Overview

**Mind Palace: The Cold Read** is a complete, narrative-driven 2D detective and psychological thriller game. You play as **Detective Julian Cross**, an independent consultant and former mentalist, partnered with **Detective Clara Vance**, a state bureau investigator who relies on physical evidence and forensic procedure.

Together, you investigate five increasingly complex cases, examine crime scenes, synthesize theories in your Mind Palace, interrogate suspects with psychological bluffs, reconstruct chronological timelines, and unmask **The Puppetmaster** in a grand final confrontation.

---

## 2. Technology Stack (Non-Unity)

Built as a responsive 2D Neo-Noir Web application:
- **Framework:** React 19 + TypeScript
- **Bundler:** Vite 6
- **Styling:** Tailwind CSS + Custom Neo-Noir Themes & Cinzel Typography
- **Audio Engine:** Procedural Web Audio API Sound Generator (synthesized dark jazz piano, ambient rain & drones, heart rate monitors, and tense stingers without any missing audio asset dependencies)
- **State & Progression:** Local storage persistence + JSON save export/import

---

## 3. The 5 Complete Cases

1. **Case 1: The Staged Solo (Tutorial)**
   - *Victim:* Arthur Pendelton (Hedge Fund Managing Director)
   - *Location:* Penthouse Study, Glass Tower Condos
   - *Culprit:* Marcus Vance
   - *Core Mystery:* Apparent suicide via Seconal overdose and typed farewell note. Exposed by the pristine wiped print, Arthur's severed right index fingertip, and Marcus's touch-typing skills.

2. **Case 2: Vintage Blood (Intermediate)**
   - *Victim:* Gabriel Moreau (Syndicated Wine Critic)
   - *Location:* Cellar Dining Hall, Castille Winery
   - *Culprit:* Henri Laurent
   - *Core Mystery:* Six guests drank from the same 1982 Cabernet decanter, but only Gabriel died. Solved by the poisoned silver Falcon glass marker activated by Gabriel's citrus ritual.

3. **Case 3: The Sightless Mirror (Challenging)**
   - *Victim:* Julianne Sterling (Avant-Garde Sculptor)
   - *Location:* Backstage Atelier, Contemporary Art Gallery
   - *Culprit:* Dr. Simon Finch
   - *Core Mystery:* Apprentice Damian Cole was found unconscious with blood on his jacket. Julian discovers the shattered mirror was swept into millimeter-graded piles in the dark, exposing Dr. Finch's clinical OCD and pilocarpine poisoning.

4. **Case 4: The Architect's Proxy (Complex)**
   - *Victim:* Nolan Burke (Investigative Reporter)
   - *Location:* Rooftop Observatory, Meridian Communications Tower
   - *Culprit:* Rachel Vance-Kemp (Security Head & Mastermind)
   - *Core Mystery:* Data analyst Sarah Chen shoved Nolan off the balustrade, swearing he held a knife. Julian proves Rachel engineered an optical illusion via a 7.2 Hz strobe light and 18.9 Hz infrasound fear frequency.

5. **Case 5: The Grand Theater (Master & Finale)**
   - *Victim:* Chief Justice Donald Sterling
   - *Location:* The Orpheum Opera House (800 Guests)
   - *Antagonist:* Dr. Alistair Finch (The Puppetmaster)
   - *Core Mystery:* Sudden cardiac arrest during the timpani crash in Verdi's *Dies Irae*. Uncovered via a concealed seat induction loop, 403 MHz telemetry pulse, and Julian's master psychological bluff that exposes Finch before the State Supreme Court.

---

## 4. Core Gameplay Systems

### Dual Observation System
Every collected clue features two complementary analyses:
- **Julian Cross (Psychological Observation):** Detects displaced personal belongings, habits, unusual object placement, and behavioral anomalies.
- **Clara Vance (Physical Forensics):** Examines latent fingerprints, chemical residues, spatter physics, and digital telecom records.
- **Synthesis:** When both angles are reviewed, breakthroughs unlock in the case archive.

### The Mind Palace (Deduction Board)
- Select and connect 2 to 3 pieces of discovered evidence.
- If the combination forms a valid contradiction or deduction, a breakthrough insight is synthesized into the deduction matrix.
- Unsupported connections receive detective guidance without spoiling the solution.
- Unlocking key deductions activates the **Final Accusation** sequence.

### The Mentalist's Matrix (Interrogation Room)
- **Observe Baseline:** Scans the suspect's autonomic pulse (ECG monitor and heartbeat audio), detecting micro-tells, cuttle-fidgeting, and vocal modulation.
- **Cold Read / Provoke:** Delivers psychological pressure based on behavioral anomalies.
- **Set the Trap / The Bluff:** Introduces deliberate false facts to trap suspects into revealing private crime scene knowledge.
- **Present Evidence:** Confronts false witness statements directly with clues from the archive.

### 5-Pillar Final Accusation
A structured indictment interface:
1. The Accused Culprit
2. The Underlying Motive
3. The True Murder Method
4. The Decisive Forensic Clue
5. Explanation of Misleading / Staged Evidence

---

## 5. How to Run and Play

### Development Mode:
```bash
npm install
npm run dev
```
Open `http://localhost:3000` in any modern web browser.

### Run Automated QA Tests:
```bash
npm test
```
Executes the test suite verifying all 242 narrative linkages, hotspot coordinates, dialogue branch targets, and deduction schemas.

### Production Build:
```bash
npm run build
npm run preview
```
The compiled, optimized static distribution is generated in `dist/`.
