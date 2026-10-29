import { CaseData } from '../../types/game';

export const case5Data: CaseData = {
  id: 'case5',
  caseNumber: 5,
  title: 'The Grand Theater',
  subtitle: 'The Puppetmaster\'s Final Symphony',
  difficulty: 'Master',
  location: 'The Orpheum Opera House, Annual State Judicial Gala (Auditorium & Pit)',
  victim: {
    name: 'Chief Justice Donald Sterling',
    age: 69,
    occupation: 'Chief Justice of the State Supreme Court',
    apparentDeath: 'Fatal cardiac dysrhythmia in Box Suite A during the climax of Verdi\'s Requiem (Dies Irae).'
  },
  actualCulprit: 'Dr. Alistair Finch (The Puppetmaster)',
  synopsis: 'Before an audience of eight hundred dignitaries, Chief Justice Donald Sterling collapses dead in his private opera box as the timpani crashes during Verdi\'s Requiem. What appears to be an elderly judge\'s heart attack quickly reveals the calculated signature of a phantom: an antique scalpel from St. Jude\'s Asylum, an origami crane folded from legal statutes, and a hacked wireless transmission into the Justice\'s cardiac telemetry. The Puppetmaster—the psychological architect who orchestrated the tragedies of the past four cases and framed Julian\'s brother seven years ago—is in the hall, daring Julian to deduce his identity before the final curtain falls.',

  scenes: [
    {
      id: 'opera_hall',
      name: 'Orpheum Opera House',
      subtitle: 'The opulent auditorium: red velvet, gilded balconies, and the hushed orchestra pit.',
      visualTheme: 'theater',
      hotspots: [
        {
          id: 'hs_sterling_program',
          name: 'Chief Justice\'s Marked Program',
          x: 28,
          y: 48,
          width: 8,
          height: 10,
          clueId: 'clue_sterling_program',
          examinePrompt: 'Inspect the gold-embossed gala program resting on the box railing.'
        },
        {
          id: 'hs_antique_scalpel',
          name: 'St. Jude\'s Asylum Antique Scalpel',
          x: 38,
          y: 56,
          width: 6,
          height: 8,
          clueId: 'clue_st_judes_scalpel',
          examinePrompt: 'Examine the bone-handled surgical tool left beneath the red velvet seat.'
        },
        {
          id: 'hs_origami_crane',
          name: 'Wax-Sealed Origami Crane',
          x: 46,
          y: 44,
          width: 6,
          height: 8,
          clueId: 'clue_origami_crane',
          examinePrompt: 'Inspect the paper crane folded from aged yellow parchment.'
        },
        {
          id: 'hs_wireless_transmitter',
          name: 'Unauthorized RF Audio Transmitter',
          x: 75,
          y: 38,
          width: 8,
          height: 10,
          clueId: 'clue_wireless_transmitter',
          examinePrompt: 'Inspect the concealed radio relay tapped into the balcony audio mixer.'
        },
        {
          id: 'hs_pacemaker_telemetry',
          name: 'Implanted Pacemaker Induction Loop',
          x: 22,
          y: 62,
          width: 10,
          height: 12,
          clueId: 'clue_pacemaker_device',
          examinePrompt: 'Examine the telemetry receiver and magnetic coil behind the Justice\'s chair.'
        },
        {
          id: 'hs_conductor_score',
          name: 'Maestro\'s Annotated Orchestral Score',
          x: 52,
          y: 68,
          width: 10,
          height: 10,
          clueId: 'clue_orchestra_timing',
          examinePrompt: 'Inspect the conductor\'s podium score for Verdi\'s Dies Irae.'
        },
        {
          id: 'hs_puppetmaster_dossier',
          name: 'Encrypted St. Jude\'s Medical Archive',
          x: 82,
          y: 52,
          width: 10,
          height: 12,
          clueId: 'clue_puppetmaster_web',
          examinePrompt: 'Check Clara\'s tablet connecting all five cases to St. Jude\'s Asylum.'
        }
      ]
    }
  ],

  clues: [
    {
      id: 'clue_sterling_program',
      title: 'Justice Sterling\'s Circled Gala Program',
      category: 'document',
      location: 'Box Suite A Railing',
      iconName: 'BookOpen',
      summary: 'Gala program with Latin verse: "Dies", "Irae", and "Salva" circled in dark crimson ink.',
      fullDescription: 'The Latin words correspond to the exact bars of the Dies Irae when the bass drum and choir hit triple forte (fff). Sterling had written: "Finch was right. The past cannot be buried."',
      julianObservation: 'Sterling knew his execution was scheduled. He was given a countdown. The killer didn\'t hide; he wanted his victim to sit through fifty minutes of exquisite, suffocating anticipation.',
      claraForensics: 'Crimson ink matches customized iron-gall ink imported from Vienna, exclusive to neuropsychiatric board filings.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_st_judes_scalpel',
      title: 'St. Jude\'s Asylum Surgical Scalpel',
      category: 'physical',
      location: 'Under Box Suite Seat',
      iconName: 'Scissors',
      summary: 'Vintage bone-handled scalpel engraved with the crest of St. Jude\'s State Asylum.',
      fullDescription: 'St. Jude\'s was closed seven years ago following a fatal scandal involving human cognitive experimentation—the scandal for which Julian Cross\'s younger brother, Leo Cross, was blamed and imprisoned.',
      julianObservation: 'This is a calling card. Leo never touched surgery; he was a junior researcher. The real director who oversaw those experiments and covered his tracks was Dr. Alistair Finch.',
      claraForensics: 'Fingerprints intentionally wiped. The metallurgical dating confirms it is genuine hospital property from the 1970s surgical wing.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'The St. Jude\'s Connection',
      combinedDeductionText: 'The killer is directly tied to the psychiatric directorate of St. Jude\'s Asylum.'
    },
    {
      id: 'clue_origami_crane',
      title: 'Wax-Sealed Legal Origami Crane',
      category: 'psychological',
      location: 'Box Suite Table',
      iconName: 'FileText',
      summary: 'Crane folded from page 412 of the State Penal Code on Insanity Acquittals, sealed with black wax.',
      fullDescription: 'Page 412 contains Chief Justice Sterling\'s famous ruling denying appeal to St. Jude\'s test victims. Inside the folded crane is a handwritten inscription: "For Julian. Every puppet dances when the strings are cut."',
      julianObservation: 'The Puppetmaster isn\'t just executing judges. He came here to watch me. He orchestrated Marcus Vance, Henri Laurent, Dr. Simon Finch, and Rachel Vance-Kemp as prelude acts to test my mentalist deductions!',
      claraForensics: 'The black wax bears the imprint of a serpentine signet—the medical directorate seal of the State Board of Mental Health.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'The Puppetmaster\'s Challenge',
      combinedDeductionText: 'The killer orchestrated the earlier cases as psychological tests for Julian Cross.'
    },
    {
      id: 'clue_wireless_transmitter',
      title: 'Sub-Carrier RF Frequency Transmitter',
      category: 'physical',
      location: 'Balcony Audio Distribution Panel',
      iconName: 'Radio',
      summary: 'Miniature RF transmitter spliced into the auditorium\'s hearing-assist frequency band.',
      fullDescription: 'Broadcasts an encoded 403 MHz digital pulse burst synchronized to the soundboard\'s audio output. The 403 MHz band is reserved for Medtronic biometric pacemaker telemetry.',
      julianObservation: 'Sterling was wearing an experimental wireless pacemaker. The killer knew the precise hospital model and hospital encryption keys.',
      claraForensics: 'Clara\'s radio sweep detected the burst at exactly 9:42 PM—the instant the bass drum struck during the Dies Irae.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_pacemaker_device',
      title: 'Concealed Magnetic Induction Loop',
      category: 'contradiction',
      location: 'Back of Box Seat A',
      iconName: 'Cpu',
      summary: 'A copper coil woven inside the velvet cushion of Sterling\'s assigned seat.',
      fullDescription: 'The coil created a localized electromagnetic pulse when energized by the RF transmitter, triggering Sterling\'s pacemaker to enter diagnostic override mode (ventricular fibrillation at 240 bpm), mimicking a massive natural coronary.',
      julianObservation: 'The killer had VIP access to the box seats before the gala began. Only box patrons and high board trustees had keys to Box Suite A.',
      claraForensics: 'Copper coil was stitched using surgical nylon thread—the exact suture material used in neurosurgical procedures.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'Sonic-Electromagnetic Trigger',
      combinedDeductionText: 'The magnetic coil in the seat triggered fatal arrhythmia via wireless radio pulse.'
    },
    {
      id: 'clue_orchestra_timing',
      title: 'Dies Irae Score Markings (Measure 124)',
      category: 'timeline',
      location: 'Conductor\'s Podium',
      iconName: 'Music',
      summary: 'Verdi\'s score has a penciled notation in Maestro Victor Vance\'s hand: "Hold grand pause 3.5 sec."',
      fullDescription: 'Maestro Victor Vance received an anonymous donor letter with a $100,000 endowment clause requiring him to execute an exact 3.5-second grand pause before the timpani crash in Measure 124.',
      julianObservation: 'The pause created the silent acoustic window needed for the RF pulse to trigger the pacemaker without radio interference.',
      claraForensics: 'Donor letter was delivered by courier from the State Psychiatric Institute. Victor had no idea the pause was a murder cue.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_puppetmaster_web',
      title: 'State Board Archive: The Puppetmaster Dossier',
      category: 'motive',
      location: 'Clara\'s Forensic Terminal',
      iconName: 'Network',
      summary: 'Complete genealogical and institutional links connecting all five cases to Dr. Alistair Finch.',
      fullDescription: 'Dr. Alistair Finch is the elder brother of Dr. Simon Finch (Case 3), the former clinical supervisor of Rachel Vance-Kemp (Case 4), and the investor in Marcus Vance\'s offshore shell funds (Case 1). Seven years ago, Alistair Finch destroyed Julian\'s brother Leo to protect his cognitive control experiments.',
      julianObservation: 'This entire campaign wasn\'t a random string of crimes; it was Alistair Finch\'s magnum opus—a grand psychological game designed to break me or crown him as the ultimate architect of human behavior.',
      claraForensics: 'Financial tracking shows Finch moved $4M into the Orpheum gala fund to secure seat assignments for Justice Sterling, Senator Grey, and himself.',
      isExamined: false,
      discovered: false
    }
  ],

  suspects: [
    {
      id: 'dr_alistair_finch',
      name: 'Dr. Alistair Finch',
      title: 'State Board Director & Neuropsychiatrist (The Puppetmaster)',
      age: 56,
      bio: 'Brilliant, aristocratic polymath with silver-streaked hair and piercing, hypnotic grey eyes. Former medical director of St. Jude\'s. Believes human beings are merely organic puppets governed by predictable stimulus-response chains.',
      portrait: 'alistair_portrait',
      currentExpression: 'calculating',
      baselineHeartRate: 60,
      baselineTells: [
        {
          label: 'The Puppeteer Gesture',
          description: 'Subtly flexes his long fingers as if adjusting invisible marionette strings.'
        },
        {
          label: 'Complete Absence of Startle',
          description: 'Zero physiological reaction to sudden loud noises or accusations; heart rate remains locked at 60 bpm.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Peerless psychological acumen, absolute emotional numbness, master of manipulative contingencies.',
        vulnerability: 'Monumental intellectual pride; pathologically incapable of admitting that someone can out-think his grand design.',
        habitualDefense: 'Philosophical condescension and treating murder as an elevated cognitive experiment.'
      },
      initialSuspicion: 90,
      disclosedInformation: []
    },
    {
      id: 'senator_eleanor_grey',
      name: 'Senator Eleanor Vance-Grey',
      title: 'State Judiciary Committee Chair',
      age: 54,
      bio: 'Formidable politician leading the push for a total overhaul of the state court system. Chief Justice Sterling was her most fierce opponent on the bench.',
      portrait: 'eleanor_portrait',
      currentExpression: 'defensive',
      baselineHeartRate: 85,
      baselineTells: [
        {
          label: 'Adjusting Diamond Brooch',
          description: 'Clutches her lapel brooch whenever judicial corruption is mentioned.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Deep political maneuvering and legal mastery.',
        vulnerability: 'Terrified of public political scandal.',
        habitualDefense: 'Invoking senatorial privilege and questioning the detectives\' authority.'
      },
      initialSuspicion: 55,
      disclosedInformation: []
    },
    {
      id: 'maestro_victor_vance',
      name: 'Maestro Victor Vance',
      title: 'Principal Conductor, Orpheum Symphony',
      age: 48,
      bio: 'Eccentric, passionate musical genius. Brother of victim Arthur Pendelton\'s partner Marcus Vance. Deeply indebted to private orchestra patrons.',
      portrait: 'victor_portrait',
      currentExpression: 'nervous',
      baselineHeartRate: 98,
      baselineTells: [
        {
          label: 'Humming Tempo',
          description: 'Involuntarily taps his conductor baton against his thigh in 4/4 time.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Absolute acoustic precision and musical memory.',
        vulnerability: 'Completely naive regarding the technical machinations behind his donor endowments.',
        habitualDefense: 'Artistic grandstanding and hysteria.'
      },
      initialSuspicion: 45,
      disclosedInformation: []
    }
  ],

  deductions: [
    {
      id: 'ded_sonic_assassination',
      title: 'The Wireless Pacemaker Assassination',
      hypothesis: 'Sterling was assassinated via a remote electromagnetic pulse targeting his pacemaker.',
      requiredClueIds: ['clue_wireless_transmitter', 'clue_pacemaker_device'],
      unlockedInsight: 'The copper induction loop in the seat was pulsed by the 403 MHz transmitter, forcing Sterling\'s pacemaker into fatal ventricular fibrillation.',
      isUnlocked: false,
      position: { x: 220, y: 150 }
    },
    {
      id: 'ded_puppetmaster_identity',
      title: 'Dr. Alistair Finch Is the Puppetmaster',
      hypothesis: 'Alistair Finch engineered all five cases as a psychological vendetta against Julian Cross.',
      requiredClueIds: ['clue_origami_crane', 'clue_puppetmaster_web'],
      unlockedInsight: 'Alistair Finch destroyed Julian\'s brother Leo seven years ago and used the cases of Marcus, Henri, Simon, and Rachel to lead Julian to this grand showdown.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 500, y: 150 }
    },
    {
      id: 'ded_symphonic_synchronization',
      title: 'The Orchestra Was Used as a Countdown Trigger',
      hypothesis: 'The 3.5-second grand pause in Dies Irae was purchased to clear the frequency airwaves.',
      requiredClueIds: ['clue_sterling_program', 'clue_orchestra_timing'],
      unlockedInsight: 'Finch bought the pause via endowment to ensure the RF trigger pulsed precisely when the bass drum crashed, masking the electromagnetic discharge.',
      isUnlocked: false,
      position: { x: 240, y: 340 }
    },
    {
      id: 'ded_st_judes_vengeance',
      title: 'The Silence of St. Jude\'s Scandal',
      hypothesis: 'Justice Sterling was executed to prevent the reopening of the St. Jude\'s experiments.',
      requiredClueIds: ['clue_st_judes_scalpel', 'clue_origami_crane'],
      unlockedInsight: 'Sterling had agreed to hear Leo Cross\'s posthumous exoneration appeal. Finch murdered Sterling to bury the truth forever.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 520, y: 340 }
    }
  ],

  timelineEvents: [
    {
      id: 'time_5_1',
      timeLabel: '6:30 PM',
      description: 'Dr. Alistair Finch uses his State Board trustee key to enter Box Suite A and stitch the induction coil into the seat.',
      sourceClueId: 'clue_pacemaker_device',
      correctSlotIndex: 0,
      revealed: false
    },
    {
      id: 'time_5_2',
      timeLabel: '7:15 PM',
      description: 'Finch places the St. Jude\'s scalpel and origami crane in the box as a personalized taunt for Julian.',
      sourceClueId: 'clue_origami_crane',
      correctSlotIndex: 1,
      revealed: true
    },
    {
      id: 'time_5_3',
      timeLabel: '8:00 PM',
      description: 'Chief Justice Sterling sits in Box Suite A and notices the circled words in his gala program.',
      sourceClueId: 'clue_sterling_program',
      correctSlotIndex: 2,
      revealed: true
    },
    {
      id: 'time_5_4',
      timeLabel: '9:41 PM',
      description: 'Maestro Victor Vance initiates the 3.5-second grand pause in Measure 124 of Verdi\'s Requiem.',
      sourceClueId: 'clue_orchestra_timing',
      correctSlotIndex: 3,
      revealed: false
    },
    {
      id: 'time_5_5',
      timeLabel: '9:42 PM',
      description: 'Finch pulses the 403 MHz transmitter; the seat coil disrupts Sterling\'s pacemaker, killing him instantly on the drum crash.',
      sourceClueId: 'clue_wireless_transmitter',
      correctSlotIndex: 4,
      revealed: false
    }
  ],

  interrogations: {
    dr_alistair_finch: {
      suspectId: 'dr_alistair_finch',
      rootDialogueId: 'alistair_root',
      nodes: {
        alistair_root: {
          id: 'alistair_root',
          speaker: 'Dr. Alistair Finch',
          speakerTitle: 'The Puppetmaster',
          text: 'Julian. Seven long years since your brother\'s tragic ruin, and here we are at last. An auditorium of eight hundred fools listening to a Requiem, while the great mentalist scours the red carpet for strings. Do you truly believe you can deduce a master of your own craft?',
          expression: 'calculating',
          choices: [
            {
              id: 'c_alistair_baseline',
              text: '[Observe Baseline] Study Finch\'s hypnotic composure and steady breathing.',
              type: 'baseline',
              nextDialogueId: 'alistair_baseline_read'
            },
            {
              id: 'c_alistair_scalpel',
              text: 'You left the bone-handled scalpel from St. Jude\'s beneath Sterling\'s seat.',
              type: 'inquiry',
              nextDialogueId: 'alistair_scalpel_q'
            },
            {
              id: 'c_alistair_grand_bluff',
              text: '[The Master Bluff] "You made one fatal mistake, Alistair. The fail-safe frequency was broadcast on 403.5 MHz... we jammed your trigger and recorded your transmitter hand!"',
              type: 'bluff',
              nextDialogueId: 'alistair_bluff_response'
            },
            {
              id: 'c_alistair_present_crane',
              text: '[Present Evidence] The origami crane folded from Sterling\'s appeal denial.',
              type: 'presentEvidence',
              requiredClueId: 'clue_origami_crane',
              nextDialogueId: 'alistair_confront_crane'
            }
          ]
        },

        alistair_baseline_read: {
          id: 'alistair_baseline_read',
          speaker: 'Julian',
          speakerTitle: 'Mentalist Observation',
          text: 'Look at his pulse: exactly 60 bpm. Pure autonomic mastery. But his eyes... he isn\'t watching the corpse, or the police, or the exits. He is fixated entirely on me. He doesn\'t care about survival—he cares only about proving he is the superior mind. To defeat him, I must strike at his intellectual vanity.',
          expression: 'calculating',
          choices: [
            {
              id: 'c_back_alistair_1',
              text: 'Engage his pride.',
              type: 'inquiry',
              nextDialogueId: 'alistair_root'
            }
          ]
        },

        alistair_scalpel_q: {
          id: 'alistair_scalpel_q',
          speaker: 'Dr. Alistair Finch',
          speakerTitle: 'The Puppetmaster',
          text: 'St. Jude\'s was a crucible of enlightenment, Julian. Your brother was too fragile for the heights of neuro-behavioral architecture. A pity. But Sterling had forgotten his oath to uphold judicial finality.',
          expression: 'neutral',
          choices: [
            {
              id: 'c_press_appeal',
              text: '[Cold Read] "Sterling didn\'t forget his oath. He had scheduled a hearing for next Thursday to reopen Leo\'s case and overturn your fraudulent testimony."',
              type: 'coldread',
              nextDialogueId: 'alistair_appeal_counter'
            }
          ]
        },

        alistair_appeal_counter: {
          id: 'alistair_appeal_counter',
          speaker: 'Dr. Alistair Finch',
          speakerTitle: 'The Puppetmaster',
          text: 'A hearing that would have undone twenty years of scientific progress for sentimental family grief! Sterling was an old man with a diseased heart—nature simply fulfilled its verdict on cue.',
          expression: 'defensive',
          audioStinger: 'tension',
          choices: [
            {
              id: 'c_back_alistair_2',
              text: 'Move toward the final psychological confrontation.',
              type: 'inquiry',
              nextDialogueId: 'alistair_root'
            }
          ]
        },

        alistair_bluff_response: {
          id: 'alistair_bluff_response',
          speaker: 'Dr. Alistair Finch',
          speakerTitle: 'The Puppetmaster',
          text: 'Jammed on 403.5?! Absurd! My induction trigger operates strictly on 403.00 MHz with encrypted rolling frequency hops! You could not possibly have intercepted the packet before Measure 124!',
          expression: 'shocked',
          audioStinger: 'bluff',
          bluffSuccess: true,
          insightGained: 'Alistair Finch fell into the mentalist\'s trap! In his narcissistic urge to prove his technical superiority, he stated the exact rolling frequency and Measure 124 cue on the open state bureau audio record!',
          choices: [
            {
              id: 'c_clara_trap_spring',
              text: '[Clara steps forward with federal recording equipment and state troopers]',
              type: 'inquiry',
              nextDialogueId: 'alistair_trap_sprung'
            }
          ]
        },

        alistair_trap_sprung: {
          id: 'alistair_trap_sprung',
          speaker: 'Clara Vance',
          speakerTitle: 'State Bureau Investigator',
          text: 'Thank you, Dr. Finch. 403.00 MHz, rolling frequency hops, synchronized to Measure 124. State Bureau technical sweeps have recorded your exact admission, along with the transmitter token currently in your tuxedo vest pocket.',
          expression: 'calculating',
          audioStinger: 'contradiction',
          choices: [
            {
              id: 'c_julian_final_word',
              text: '"You spent seven years pulling strings, Alistair. But a puppetmaster is only as clever as the audience that humors him."',
              type: 'coldread',
              nextDialogueId: 'alistair_collapse'
            }
          ]
        },

        alistair_confront_crane: {
          id: 'alistair_confront_crane',
          speaker: 'Dr. Alistair Finch',
          speakerTitle: 'The Puppetmaster',
          text: 'The crane was an homage, Julian. An acknowledgement that among all the mindless cattle in this republic, you alone possessed the intellect to follow the crumbs I dropped across five crime scenes.',
          expression: 'neutral',
          choices: [
            {
              id: 'c_dismantle_homage',
              text: '"It wasn\'t an homage, Alistair. It was desperate terror. You needed to prove you were in control because you know that inside, you are merely a butcher with an asylum pedigree."',
              type: 'coldread',
              nextDialogueId: 'alistair_collapse'
            }
          ]
        },

        alistair_collapse: {
          id: 'alistair_collapse',
          speaker: 'Dr. Alistair Finch',
          speakerTitle: 'The Puppetmaster',
          text: 'You insolent amateur... You think this changes anything?! You think a pair of state detectives and a disgraced carnival mentalist can cage my mind?! I built you, Julian! You solved these cases because I ALLOWED YOU TO SOLVE THEM!',
          expression: 'defeated',
          audioStinger: 'realization',
          choices: [
            {
              id: 'c_finish_case5',
              text: 'Deliver the definitive final accusation before the State Supreme Court.',
              type: 'inquiry',
              nextDialogueId: 'alistair_root'
            }
          ]
        }
      }
    }
  },

  accusationConfig: {
    options: {
      culprits: [
        { id: 'dr_alistair_finch', name: 'Dr. Alistair Finch (The Puppetmaster & State Board Director)', isCorrect: true, feedback: 'Correct. Alistair Finch is the architect who coordinated the murder web and executed Sterling.' },
        { id: 'senator_eleanor_grey', name: 'Senator Eleanor Vance-Grey (Judiciary Chair)', isCorrect: false, feedback: 'Incorrect. Senator Grey had political ambition, but was completely blind to the biometric assassination.' },
        { id: 'maestro_victor_vance', name: 'Maestro Victor Vance (Conductor)', isCorrect: false, feedback: 'Incorrect. Victor was a pawn whose orchestral timing was manipulated via anonymous donor funds.' }
      ],
      motives: [
        { id: 'motive_prevent_exoneration', text: 'To silence Chief Justice Sterling before he could overturn Leo Cross\'s conviction and expose the illegal cognitive experiments at St. Jude\'s Asylum.', isCorrect: true, feedback: 'Correct. Sterling was about to grant the appeal and unveil Finch\'s criminal empire.' },
        { id: 'motive_ticket_sales', text: 'To boost ticket sales for the Orpheum Symphony.', isCorrect: false, feedback: 'Incorrect. Ludicrous motive for a high-profile assassination.' }
      ],
      methods: [
        { id: 'method_sonic_rf_pacemaker', text: 'Stitched a magnetic induction coil into Box Suite A\'s chair, purchased a 3.5-second orchestral pause in Dies Irae, and pulsed a 403 MHz RF burst to force Sterling\'s pacemaker into ventricular fibrillation.', isCorrect: true, feedback: 'Masterful, irrefutable deduction! Explains every technical, physical, and musical anomaly.' },
        { id: 'method_poisoned_champagne', text: 'Poisoned Sterling\'s gala champagne flute.', isCorrect: false, feedback: 'Incorrect. Toxicology confirmed zero poisons; this was an electro-magnetic cardiac arrest.' }
      ],
      decisiveClues: [
        { id: 'clue_pacemaker_device', title: 'Concealed Magnetic Induction Loop & 403 MHz Transmitter', isCorrect: true, feedback: 'Decisive evidence. Physical and forensic proof of the assassination apparatus.' },
        { id: 'clue_sterling_program', title: 'Circled Latin Dies Irae Program', isCorrect: false, feedback: 'Establishes the timing countdown, but the coil is the mechanical proof.' }
      ],
      stagedEvidenceExplanations: [
        { id: 'staged_natural_heart_attack', text: 'The murder was disguised as a natural age-related coronary failure, exploiting Sterling\'s known pre-existing cardiac condition.', isCorrect: true, feedback: 'Exactly. Without telemetry forensics, the coroner would have ruled it natural cardiac arrest.' },
        { id: 'staged_stolen_wallet', text: 'A robbery gone wrong in the VIP box.', isCorrect: false, feedback: 'Incorrect. No property was stolen.' }
      ]
    },
    confrontationDialogueId: 'case5_resolution'
  },

  briefingDialogue: [
    {
      speaker: 'Julian Cross',
      text: 'The Orpheum Opera House. The chandelier is shining, the champagne is flowing, and eight hundred of the most powerful men and women in the state are gathered in their tuxedos and gowns.'
    },
    {
      speaker: 'Clara Vance',
      text: 'Chief Justice Donald Sterling collapsed three minutes ago during the climax of Verdi\'s Requiem. Box Suite A. The private box doors were bolted from within. Paramedics called it a massive coronary, but Julian... look at what was left on the seat.'
    },
    {
      speaker: 'Julian Cross',
      text: 'A bone-handled scalpel from St. Jude\'s. An origami crane folded from penal code statutes. And the phantom who took my brother seven years ago... is in this room, watching us from the shadows.'
    },
    {
      speaker: 'Clara Vance',
      text: 'Marcus Vance in the penthouse. Henri Laurent in the winery. Dr. Simon Finch in the atelier. Rachel Vance-Kemp at Meridian Tower. All roads led to this opera house.'
    },
    {
      speaker: 'Julian Cross',
      text: 'Tonight, the curtain comes down on the Puppetmaster. Let us examine the theater.'
    }
  ],

  resolutionStory: {
    summary: 'Dr. Alistair Finch, state neuropsychiatrist and the shadow mastermind known as The Puppetmaster, executed his final symphonic assassination before eight hundred witnesses. To prevent Chief Justice Donald Sterling from granting a posthumous judicial review that would expose Finch\'s horrific cognitive experiments at St. Jude\'s Asylum, Finch weaponized medical telemetry.',
    howCrimeWasCommitted: 'Finch stitched a surgical magnetic induction loop into the velvet cushion of Box Suite A. He then endowed the Orpheum Symphony with a $100,000 gift requiring a 3.5-second grand pause in Measure 124 of Verdi\'s Requiem. During the sudden silence, Finch beamed an encrypted 403 MHz radio pulse, inducing instantaneous ventricular fibrillation in Sterling\'s pacemaker as the thunderous bass drum struck.',
    whySuspectsFailed: 'Finch\'s fatal flaw was his uncontrollable intellectual narcissism. He could not resist taunting Julian Cross with the St. Jude\'s scalpel and origami crane, believing his psychological superiority was absolute. Julian baited Finch with a fabricated jamming frequency, causing Finch to boast of his exact 403 MHz telemetry protocol on recorded police channels.',
    julianReflection: '"I opened the wax-sealed crane. Inside, on a scrap of yellowed legal parchment, was my brother\'s name. For seven years, I chased shadows and illusions. Tonight, the strings are cut. Sleep peacefully, Leo. The play is finished."',
    claraClosingRemarks: '"Alistair Finch is taken into federal custody under multiple counts of first-degree murder and conspiracy. Julian... your brother\'s name is cleared. Let\'s go home."'
  },

  hints: {
    level1_nudge: 'How did Chief Justice Sterling\'s pacemaker fail at the exact split-second of the drum crash?',
    level2_category: 'Examine the magnetic coil in Box Suite A and the 403 MHz RF transmitter.',
    level3_connection: 'Connect the Pacemaker Induction Loop with the Wireless Transmitter in your Mind Palace.',
    level4_solution: 'Alistair Finch used the seat induction coil to kill Sterling. Bait him with the Master Bluff during interrogation.'
  }
};
