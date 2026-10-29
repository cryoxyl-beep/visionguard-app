import { CaseData } from '../../types/game';

export const case4Data: CaseData = {
  id: 'case4',
  caseNumber: 4,
  title: 'The Architect\'s Proxy',
  subtitle: 'The Rooftop Plunge at Meridian Tower',
  difficulty: 'Complex',
  location: 'Rooftop Observatory & Server Hub, Meridian Communications Tower (65th Floor)',
  victim: {
    name: 'Nolan Burke',
    age: 41,
    occupation: 'Lead Investigative Reporter, The Metro Sentinel',
    apparentDeath: 'Fatal fall from the 65th-floor observation balustrade onto the terrace below during an electrical alarm blackout.'
  },
  actualCulprit: 'Rachel Vance-Kemp (Mastermind / Architect)',
  synopsis: 'Investigative reporter Nolan Burke falls to his death from the storm-swept rooftop of Meridian Communications Tower. Junior data analyst Sarah Chen admits with trembling terror that she shoved Nolan backward over the railing, claiming he pulled a hunting blade on her in the strobe light. Yet when Julian inspects the scene, Nolan possessed no knife—only an umbrella with a reflective silver alloy trim. Who engineered the panic, the blackout, and the sensory illusion that turned Sarah into a weapon?',

  scenes: [
    {
      id: 'rooftop_deck',
      name: 'Rooftop Observatory',
      subtitle: 'The rain-soaked glass observation balustrade overlooking the stormy metropolis.',
      visualTheme: 'rooftop',
      hotspots: [
        {
          id: 'hs_nolan_umbrella',
          name: 'Nolan\'s Broken Umbrella & Notebook',
          x: 45,
          y: 62,
          width: 10,
          height: 12,
          clueId: 'clue_nolan_umbrella',
          examinePrompt: 'Examine the fallen umbrella with the metallic curved ferrule.'
        },
        {
          id: 'hs_sarah_phone',
          name: 'Sarah\'s Encrypted Smartphone',
          x: 28,
          y: 52,
          width: 8,
          height: 8,
          clueId: 'clue_sarah_phone',
          examinePrompt: 'Inspect the incoming anonymous signal messages on Sarah\'s phone.'
        },
        {
          id: 'hs_strobe_timer',
          name: 'Strobe Alarm & Power Loop Panel',
          x: 74,
          y: 38,
          width: 10,
          height: 14,
          clueId: 'clue_strobe_alarm',
          examinePrompt: 'Inspect the emergency lighting bypass junction box.'
        },
        {
          id: 'hs_ventilation_duct',
          name: 'Acoustic Ventilation Duct & Blower',
          x: 84,
          y: 55,
          width: 12,
          height: 14,
          clueId: 'clue_infrasound_duct',
          examinePrompt: 'Examine the industrial HVAC blower emitting an unusual low-frequency drone.'
        },
        {
          id: 'hs_server_hub',
          name: 'Central Relay Server Terminal',
          x: 18,
          y: 44,
          width: 12,
          height: 12,
          clueId: 'clue_relay_server',
          examinePrompt: 'Check the behavioral profiling terminal and security routing logs.'
        }
      ]
    }
  ],

  clues: [
    {
      id: 'clue_nolan_umbrella',
      title: 'Titanium-Rimmed GustBuster Umbrella',
      category: 'physical',
      location: 'Rooftop Balustrade',
      iconName: 'Umbrella',
      summary: 'A collapsed black umbrella with a polished, razor-sharp reflective silver band.',
      fullDescription: 'Under high-intensity strobe lighting, the reflective 3M silver alloy band flashes with the blinding silhouette of a ten-inch combat blade. Nolan was holding it out toward Sarah to shield her from the wind and rain when she panicked.',
      julianObservation: 'Sensory conditioning. If you prime a terrified subject to expect a knife, flash a 7-hertz strobe light in total darkness, and thrust a reflective metallic rod forward, their autonomic nervous system reacts to a blade before the conscious brain can evaluate reality.',
      claraForensics: 'Forensic ballistics and trajectory show zero weapons on Nolan\'s body. The umbrella was the only object in his hand when he tumbled over the railing.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'The Optical Illusion Blade',
      combinedDeductionText: 'The reflective umbrella band flashed like a combat dagger under the synchronized strobe.'
    },
    {
      id: 'clue_sarah_phone',
      title: 'Anonymous Threat Matrix Messages',
      category: 'document',
      location: 'Sarah Chen\'s Phone',
      iconName: 'Smartphone',
      summary: 'Series of encrypted burn-after-reading SMS messages sent from an internal Meridian IP.',
      fullDescription: 'At 10:15 PM: "Nolan Burke is coming to silence you on the roof. He carries a concealed serrated combat knife. If he reaches his pocket, strike first or you die." The IP address was masked using the building\'s executive security VPN.',
      julianObservation: 'Note the clinical, commanding vocabulary: "stimulus-response trigger." This was written by a trained behavioral psychologist who understood Sarah\'s chronic generalized anxiety disorder.',
      claraForensics: 'Digital forensics traced the routing headers back through Meridian\'s Sub-Basement 2 security relay server—a terminal requiring Director-level biometric clearance.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_strobe_alarm',
      title: 'Programmed Strobe Loop (7.2 Hz)',
      category: 'contradiction',
      location: 'Alarm Junction Box',
      iconName: 'Zap',
      summary: 'Emergency circuit manually overridden to flash intermittently at exactly 7.2 Hertz.',
      fullDescription: 'The building fire alarm did not trigger due to smoke or heat. A custom firmware script bypassed the building automation system at 10:48 PM, cutting primary grid power and activating the rooftop strobes at 7.2 Hz—the exact frequency known to induce disorientation, optical illusions, and severe autonomic panic.',
      julianObservation: 'This wasn\'t a mechanical failure; it was a calibrated psychological weapon designed to distort visual distance and depth perception.',
      claraForensics: 'Firmware override was executed using credential profile "SECURITY_DIRECTOR_VK". That is Rachel Vance-Kemp.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'Engineered Sensory Panic',
      combinedDeductionText: 'The blackout and 7.2Hz strobe were pre-programmed to induce extreme panic and optical distortion.'
    },
    {
      id: 'clue_infrasound_duct',
      title: 'HVAC Infrasound Resonator (18.9 Hz)',
      category: 'physical',
      location: 'Rooftop Ventilation Shaft',
      iconName: 'Wind',
      summary: 'Industrial fan speed modified via software to resonate at 18.9 Hz ("the fear frequency").',
      fullDescription: 'Infrasound between 18 and 19 Hz cannot be consciously heard, but vibrates the human ocular globe and chest cavity, inducing intense dread, hyperventilation, and visual hallucinations of movement.',
      julianObservation: 'Sarah wasn\'t just nervous; her entire neurobiology was hijacked. Infrasound combined with strobe lighting creates the sensation of an imminent monstrous predator.',
      claraForensics: 'Blower RPM was throttled exactly sixteen minutes before Nolan arrived on the roof. The acoustic frequency log verifies sustained 18.9 Hz output.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_relay_server',
      title: 'Decrypted Behavioral Dossier (Sarah Chen)',
      category: 'motive',
      location: 'Server Hub Terminal',
      iconName: 'Database',
      summary: 'Confidential psychometric profile detailing Sarah\'s claustrophobia, PTSD, and panic reflexes.',
      fullDescription: 'Compiled by Rachel Vance-Kemp six months ago during company health screenings. Rachel noted: "Subject displays exaggerated startle response and defensive thrust mechanism under sudden optical sensory overload."',
      julianObservation: 'Rachel did not hire an assassin. She weaponized Sarah\'s own psychiatric vulnerabilities, transforming a frightened girl into an involuntary executioner.',
      claraForensics: 'File access logs show Rachel accessed this dossier three hours prior to the blackout and exported the acoustic override protocols.',
      isExamined: false,
      discovered: false
    }
  ],

  suspects: [
    {
      id: 'rachel_vance_kemp',
      name: 'Rachel Vance-Kemp',
      title: 'Head of Security & Behavioral Profiler',
      age: 44,
      bio: 'Brilliant, ice-cold former defense intelligence profiler. Controls Meridian\'s electronic surveillance, biometric networks, and psychological threat assessments.',
      portrait: 'rachel_portrait',
      currentExpression: 'neutral',
      baselineHeartRate: 68,
      baselineTells: [
        {
          label: 'Micro-smirk on Perception',
          description: 'A faint, dismissive curl of the upper lip whenever Julian mentions human gullibility.'
        },
        {
          label: 'Fingertip Tapping on Tablet',
          description: 'Taps a steady four-beat rhythm on her security tablet when challenged on access credentials.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Deep mastery of human perception, sensory manipulation, and corporate legal shielding.',
        vulnerability: 'Arrogance in viewing humans as simple input-output algorithms.',
        habitualDefense: 'Bureaucratic deflection and pointing to Sarah\'s physical confession.'
      },
      initialSuspicion: 80,
      disclosedInformation: []
    },
    {
      id: 'sarah_chen',
      name: 'Sarah Chen',
      title: 'Junior Data Analyst (The Proxy)',
      age: 25,
      bio: 'Trembling, traumatized young analyst. In tears in the holding room, repeatedly babbling about a shining silver blade in the dark.',
      portrait: 'sarah_portrait',
      currentExpression: 'shocked',
      baselineHeartRate: 128,
      baselineTells: [
        {
          label: 'Hyperventilation',
          description: 'Rapid shallow breathing and tremors in both hands.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Honest, innocent, desperate to explain what she experienced.',
        vulnerability: 'Severe sensory disorientation and guilt.',
        habitualDefense: 'Insisting that she saw the knife with her own eyes.'
      },
      initialSuspicion: 40,
      disclosedInformation: []
    },
    {
      id: 'gregory_vance',
      name: 'Gregory Vance',
      title: 'CEO, Meridian Telecom',
      age: 58,
      bio: 'Ruthless telecom tycoon. Nolan Burke was preparing a story exposing Meridian\'s illicit backdoor surveillance contract with foreign regimes.',
      portrait: 'gregory_portrait',
      currentExpression: 'defensive',
      baselineHeartRate: 90,
      baselineTells: [
        {
          label: 'Checking Cell Phone',
          description: 'Constantly glances at his legal counsel\'s text messages.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Massive political influence and financial power.',
        vulnerability: 'Terrified of federal indictment over the whistleblower leaks.',
        habitualDefense: 'Aggressive threats of defamation lawsuits.'
      },
      initialSuspicion: 60,
      disclosedInformation: []
    }
  ],

  deductions: [
    {
      id: 'ded_no_knife',
      title: 'The Blade Was a Visual Illusion',
      hypothesis: 'Nolan was holding an umbrella, not a combat weapon.',
      requiredClueIds: ['clue_nolan_umbrella', 'clue_strobe_alarm'],
      unlockedInsight: 'The reflective GustBuster rim strobing at 7.2 Hz created the undeniable visual perception of a thrusting chrome blade in total darkness.',
      isUnlocked: false,
      position: { x: 220, y: 150 }
    },
    {
      id: 'ded_orchestrated_panic',
      title: 'Sensory Conditions Were Deliberately Manipulated',
      hypothesis: 'The blackout, 18.9 Hz infrasound, and strobe were engineered to force a violent reaction.',
      requiredClueIds: ['clue_strobe_alarm', 'clue_infrasound_duct'],
      unlockedInsight: 'Rachel programmed the building\'s HVAC and strobe systems to trigger extreme autonomic dread and sensory confusion.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 500, y: 150 }
    },
    {
      id: 'ded_behavioral_weaponization',
      title: 'Sarah Chen Was Weaponized as a Proxy',
      hypothesis: 'Rachel used Sarah\'s psychological profile to execute Nolan without touching him.',
      requiredClueIds: ['clue_sarah_phone', 'clue_relay_server'],
      unlockedInsight: 'Rachel used Sarah\'s documented PTSD and startle response, feeding her targeted anonymous threats to guarantee she would shove Nolan over the railing.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 240, y: 340 }
    },
    {
      id: 'ded_corporate_silencing',
      title: 'Meridian Telecom Whistleblower Cover-Up',
      hypothesis: 'Nolan was lured to the roof to silence his investigation into Meridian.',
      requiredClueIds: ['clue_relay_server', 'clue_sarah_phone'],
      unlockedInsight: 'Nolan was meeting Sarah to receive leaked files. Rachel intercepted the meeting and turned it into Nolan\'s death sentence.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 520, y: 340 }
    }
  ],

  timelineEvents: [
    {
      id: 'time_4_1',
      timeLabel: '10:15 PM',
      description: 'Rachel sends anonymous threat messages to Sarah Chen warning that Nolan Burke is armed with a knife.',
      sourceClueId: 'clue_sarah_phone',
      correctSlotIndex: 0,
      revealed: true
    },
    {
      id: 'time_4_2',
      timeLabel: '10:40 PM',
      description: 'Rachel throttles the 65th-floor HVAC blowers to emit 18.9 Hz infrasound, inducing chemical fear in Sarah.',
      sourceClueId: 'clue_infrasound_duct',
      correctSlotIndex: 1,
      revealed: false
    },
    {
      id: 'time_4_3',
      timeLabel: '10:48 PM',
      description: 'Rachel triggers the firmware blackout override, activating the disorienting 7.2 Hz strobe light on the roof.',
      sourceClueId: 'clue_strobe_alarm',
      correctSlotIndex: 2,
      revealed: false
    },
    {
      id: 'time_4_4',
      timeLabel: '10:55 PM',
      description: 'Nolan steps onto the rooftop and extends his reflective umbrella to shield Sarah from the downpour.',
      sourceClueId: 'clue_nolan_umbrella',
      correctSlotIndex: 3,
      revealed: false
    },
    {
      id: 'time_4_5',
      timeLabel: '10:56 PM',
      description: 'Sarah, perceiving a thrusting dagger, screams and shoves Nolan backward over the balustrade.',
      sourceClueId: 'clue_nolan_umbrella',
      correctSlotIndex: 4,
      revealed: true
    }
  ],

  interrogations: {
    rachel_vance_kemp: {
      suspectId: 'rachel_vance_kemp',
      rootDialogueId: 'rachel_root',
      nodes: {
        rachel_root: {
          id: 'rachel_root',
          speaker: 'Rachel Vance-Kemp',
          speakerTitle: 'Head of Security & Profiler',
          text: 'Detectives. A tragic incident of workplace manslaughter. Miss Chen has already confessed to pushing Mr. Burke off the rooftop balustrade. My security team captured her immediately. Case closed, wouldn\'t you agree?',
          expression: 'neutral',
          choices: [
            {
              id: 'c_rachel_baseline',
              text: '[Observe Baseline] Analyze Rachel\'s guarded posture and micro-expressions.',
              type: 'baseline',
              nextDialogueId: 'rachel_baseline_read'
            },
            {
              id: 'c_rachel_strobe',
              text: 'Why was the rooftop strobe flashing at exactly 7.2 Hertz during the blackout?',
              type: 'inquiry',
              nextDialogueId: 'rachel_strobe_q'
            },
            {
              id: 'c_rachel_bluff_server',
              text: '[Set the Trap / Bluff] "We decrypted the relay server log... and your private voice memo dictating Sarah\'s threat scripts."',
              type: 'bluff',
              nextDialogueId: 'rachel_bluff_response'
            },
            {
              id: 'c_rachel_present_infrasound',
              text: '[Present Evidence] The 18.9 Hz acoustic frequency logs and your behavioral dossier on Sarah Chen.',
              type: 'presentEvidence',
              requiredClueId: 'clue_infrasound_duct',
              nextDialogueId: 'rachel_confront_infrasound'
            }
          ]
        },

        rachel_baseline_read: {
          id: 'rachel_baseline_read',
          speaker: 'Julian',
          speakerTitle: 'Mentalist Observation',
          text: 'Notice her eyes. No fear, no sorrow—only clinical evaluation. She views human beings as predictable organic circuits. She believes that because her hands never touched Nolan Burke, the legal system is completely impotent to reach her.',
          expression: 'calculating',
          choices: [
            {
              id: 'c_back_rachel_1',
              text: 'Return to interrogation with psychological leverage.',
              type: 'inquiry',
              nextDialogueId: 'rachel_root'
            }
          ]
        },

        rachel_strobe_q: {
          id: 'rachel_strobe_q',
          speaker: 'Rachel Vance-Kemp',
          speakerTitle: 'Head of Security & Profiler',
          text: 'Power fluctuations during a severe storm. Building automation switches to emergency auxiliary beacons. That is standard electrical architecture.',
          expression: 'neutral',
          choices: [
            {
              id: 'c_press_frequency',
              text: '[Cold Read] "Standard architecture doesn\'t calibrate flash timing to 7.2 Hz—the precise frequency for visual depth degradation. You wanted Nolan\'s umbrella to look like a dagger."',
              type: 'coldread',
              nextDialogueId: 'rachel_strobe_defend'
            }
          ]
        },

        rachel_strobe_defend: {
          id: 'rachel_strobe_defend',
          speaker: 'Rachel Vance-Kemp',
          speakerTitle: 'Head of Security & Profiler',
          text: 'You are spinning paranoid theories, Detective Cross. Sarah Chen shoved a man off a 65-story building. Her hands, her decision, her homicide.',
          expression: 'defensive',
          audioStinger: 'tension',
          choices: [
            {
              id: 'c_back_rachel_2',
              text: 'Press her on the manipulated trigger.',
              type: 'inquiry',
              nextDialogueId: 'rachel_root'
            }
          ]
        },

        rachel_bluff_response: {
          id: 'rachel_bluff_response',
          speaker: 'Rachel Vance-Kemp',
          speakerTitle: 'Head of Security & Profiler',
          text: 'A voice memo?! Ridiculous. I never recorded any voice notes on that relay server—I used purely text-based socket injections from the—',
          expression: 'shocked',
          audioStinger: 'bluff',
          bluffSuccess: true,
          insightGained: 'Rachel slipped: she confirmed she used "text-based socket injections", admitting to sending the anonymous threat messages directly to Sarah!',
          choices: [
            {
              id: 'c_expose_rachel_socket',
              text: '"Thank you for confirming the socket injection method, Rachel. Clara has the terminal logs matching your biometric token."',
              type: 'coldread',
              nextDialogueId: 'rachel_flustered'
            }
          ]
        },

        rachel_flustered: {
          id: 'rachel_flustered',
          speaker: 'Rachel Vance-Kemp',
          speakerTitle: 'Head of Security & Profiler',
          text: 'You... you tricked me. But in a court of law, Sarah Chen is the sole physical actor. Proxies are responsible for their own actions!',
          expression: 'defensive',
          audioStinger: 'contradiction',
          choices: [
            {
              id: 'c_back_rachel_3',
              text: 'Deliver the decisive blow.',
              type: 'inquiry',
              nextDialogueId: 'rachel_root'
            }
          ]
        },

        rachel_confront_infrasound: {
          id: 'rachel_confront_infrasound',
          speaker: 'Rachel Vance-Kemp',
          speakerTitle: 'Head of Security & Profiler',
          text: 'Infrasound? Dossiers? You think a jury will convict a corporate security officer based on sound frequencies and psychology?',
          expression: 'nervous',
          choices: [
            {
              id: 'c_explain_proxy_murder',
              text: '"You didn\'t just observe Sarah Chen; you calibrated the environment to override her conscious volition. That is first-degree murder through an innocent agent under state penal code § 125. You are the architect, Rachel."',
              type: 'coldread',
              nextDialogueId: 'rachel_collapse'
            }
          ]
        },

        rachel_collapse: {
          id: 'rachel_collapse',
          speaker: 'Rachel Vance-Kemp',
          speakerTitle: 'Head of Security & Profiler',
          text: 'Nolan was going to destroy Meridian... destroy thirty billion dollars of market cap with his crusade... Sarah was just a fragile, predictable little gear in the machine! Any amateur could have predicted her reflex!',
          expression: 'defeated',
          audioStinger: 'realization',
          choices: [
            {
              id: 'c_finish_rachel',
              text: 'Conclude interrogation and prepare final formal accusation.',
              type: 'inquiry',
              nextDialogueId: 'rachel_root'
            }
          ]
        }
      }
    }
  },

  accusationConfig: {
    options: {
      culprits: [
        { id: 'rachel_vance_kemp', name: 'Rachel Vance-Kemp (Security Head & Mastermind)', isCorrect: true, feedback: 'Correct. Rachel orchestrated the sensory trap, weaponizing Sarah Chen as an innocent agent.' },
        { id: 'sarah_chen', name: 'Sarah Chen (Data Analyst)', isCorrect: false, feedback: 'Incorrect. Sarah was an unwitting psychological proxy whose perception was artificially hijacked.' },
        { id: 'gregory_vance', name: 'Gregory Vance (CEO)', isCorrect: false, feedback: 'Incorrect. Gregory was the beneficiary, but Rachel designed and executed the trap.' }
      ],
      motives: [
        { id: 'motive_silence_leak', text: 'To stop Nolan Burke from publishing leaked documents detailing Meridian\'s illegal surveillance backdoors.', isCorrect: true, feedback: 'Correct. Nolan was moments away from receiving the final database export.' },
        { id: 'motive_ransom', text: 'To extort money from the newspaper.', isCorrect: false, feedback: 'Incorrect. No ransom demands were made.' }
      ],
      methods: [
        { id: 'method_psychological_proxy', text: 'Injected targeted threats into Sarah\'s phone, triggered an 18.9 Hz infrasound fear response, cut lights to 7.2 Hz strobe, and used Nolan\'s reflective umbrella to simulate a lethal knife strike.', isCorrect: true, feedback: 'Masterful deduction! Fully captures the sophisticated multi-tiered sensory manipulation.' },
        { id: 'method_direct_push', text: 'Sneaked onto the roof and shoved Nolan in the dark.', isCorrect: false, feedback: 'Incorrect. Surveillance confirms Sarah was the one who physically collided with Nolan.' }
      ],
      decisiveClues: [
        { id: 'clue_relay_server', title: 'Behavioral Dossier & Biometric HVAC Override Logs', isCorrect: true, feedback: 'Decisive evidence. Conclusively binds Rachel\'s credentials to the atmospheric sabotage.' },
        { id: 'clue_nolan_umbrella', title: 'Reflective Umbrella', isCorrect: false, feedback: 'Explains the optical illusion, but requires the server proof to convict Rachel.' }
      ],
      stagedEvidenceExplanations: [
        { id: 'staged_sarah_confession', text: 'Sarah\'s confession to seeing a knife was genuine in her mind, but was an artificial optical illusion created by the strobe frequency.', isCorrect: true, feedback: 'Exactly right. Sarah believed she was defending her life.' },
        { id: 'staged_security_guard', text: 'A guard was bribed to look away.', isCorrect: false, feedback: 'Incorrect. The automation system was hijacked directly.' }
      ]
    },
    confrontationDialogueId: 'case4_resolution'
  },

  briefingDialogue: [
    {
      speaker: 'Julian Cross',
      text: 'Meridian Communications Tower, 65th-floor observation deck. A storm raging across the skyline, lightning ripping through the glass.'
    },
    {
      speaker: 'Clara Vance',
      text: 'Nolan Burke, top investigative reporter in the state, plunged five hundred feet to the terrace below. A young analyst, Sarah Chen, is in custody. She told the first responders that Nolan pulled a ten-inch combat dagger on her and she shoved him in self-defense.'
    },
    {
      speaker: 'Julian Cross',
      text: 'And what did you find on Nolan\'s body, Clara?'
    },
    {
      speaker: 'Clara Vance',
      text: 'A wet notebook, a pen, and an umbrella with a reflective silver band. Not a single knife. Yet Sarah is shaking so violently she can barely speak, swearing on her mother\'s grave that she saw cold steel.'
    },
    {
      speaker: 'Julian Cross',
      text: 'The eye sees what the brain expects, Clara. If someone engineered the expectation, the shadows, and the fear... then Sarah wasn\'t a killer. She was a firearm pulled by an unseen finger. Let us examine the roof.'
    }
  ],

  resolutionStory: {
    summary: 'Rachel Vance-Kemp executed a terrifyingly modern crime: murder through sensory manipulation and psychological proxy. To protect Meridian Telecom from Nolan Burke\'s devastating surveillance exposé, Rachel decided to silence him while providing a ready-made, self-confessed culprit.',
    howCrimeWasCommitted: 'Using Sarah Chen\'s confidential psychometric file, Rachel primed Sarah with anonymous threats that Nolan was coming to murder her with a knife. She then throttled the building\'s rooftop ventilation to 18.9 Hz infrasound (triggering irrational physiological dread) and cut power to a 7.2 Hz strobe light (severely impairing optical depth perception). When Nolan approached Sarah and reached out with his reflective titanium umbrella, Sarah\'s conditioned nervous system perceived a stabbing combat blade, causing her to shove him over the balustrade.',
    whySuspectsFailed: 'Rachel believed her indirect method made her legally invulnerable. But Clara extracted her biometric credential logins from the building\'s HVAC and strobe override servers, while Julian proved in the Mind Palace that Sarah\'s perception was deliberately manufactured.',
    julianReflection: '"The most dangerous predators do not dirty their hands with steel or poison. They whisper into the dark and let human fear do their butchery for them."',
    claraClosingRemarks: '"Sarah Chen is released into medical care. Rachel Vance-Kemp is charged under criminal doctrine for homicide via an innocent agent."'
  },

  hints: {
    level1_nudge: 'Did Nolan really have a weapon, or did something make his umbrella look like one?',
    level2_category: 'Examine the relationship between the 7.2 Hz strobe, the 18.9 Hz infrasound, and Sarah\'s phone messages.',
    level3_connection: 'Connect the Optical Strobe Alarm with Nolan\'s Umbrella in your Mind Palace.',
    level4_solution: 'Rachel orchestrated the sensory blackout and fear conditioning. Accuse Rachel as the mastermind architect.'
  }
};
