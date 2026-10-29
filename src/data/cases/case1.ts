import { CaseData } from '../../types/game';

export const case1Data: CaseData = {
  id: 'case1',
  caseNumber: 1,
  title: 'The Staged Solo',
  subtitle: 'The Apparent Suicide of Arthur Pendelton',
  difficulty: 'Tutorial',
  location: 'Penthouse Study, Glass Tower Condos, 42nd Floor',
  victim: {
    name: 'Arthur Pendelton',
    age: 52,
    occupation: 'Managing Director, Pendelton & Vance Hedge Fund',
    apparentDeath: 'Barbiturate overdose, slumped over mahogany desk with a typed suicide note.'
  },
  actualCulprit: 'Marcus Vance',
  synopsis: 'Billionaire fund manager Arthur Pendelton is found dead in his locked penthouse study beside an empty bottle of Seconal and a neatly typed suicide note. While Clara notices the forensic cleanliness of the glass and print, Julian spots an immediate psychological anomaly: a man obsessed with fountain pens and missing his right index fingertip would never compose his final farewell on a manual typewriter.',
  
  scenes: [
    {
      id: 'study_main',
      name: 'Penthouse Study',
      subtitle: 'The victim sits motionless at his mahogany desk overlooking the skyline.',
      visualTheme: 'penthouse',
      hotspots: [
        {
          id: 'hs_pill_bottle',
          name: 'Seconal Pill Bottle',
          x: 48,
          y: 44,
          width: 8,
          height: 10,
          clueId: 'clue_pill_bottle',
          examinePrompt: 'Examine the empty prescription bottle beside the limp hand.'
        },
        {
          id: 'hs_typewritten_note',
          name: 'Typed Suicide Note',
          x: 42,
          y: 50,
          width: 12,
          height: 10,
          clueId: 'clue_typed_note',
          examinePrompt: 'Inspect the paper resting beneath Arthur\'s fountain pen.'
        },
        {
          id: 'hs_fountain_pens',
          name: 'Collection of Fountain Pens',
          x: 35,
          y: 46,
          width: 6,
          height: 8,
          clueId: 'clue_fountain_pens',
          examinePrompt: 'Inspect the polished mahogany pen display case.'
        },
        {
          id: 'hs_typewriter',
          name: 'Royal Manual Typewriter',
          x: 24,
          y: 42,
          width: 14,
          height: 14,
          clueId: 'clue_typewriter',
          examinePrompt: 'Examine the vintage mechanical typewriter on the side credenza.'
        },
        {
          id: 'hs_slippers',
          name: 'Displaced Silk Slippers',
          x: 52,
          y: 72,
          width: 10,
          height: 10,
          clueId: 'clue_slippers',
          examinePrompt: 'Examine the slippers kicked askew beneath the desk chair.'
        },
        {
          id: 'hs_bar_glasses',
          name: 'Bourbon Decanter & Glasses',
          x: 78,
          y: 48,
          width: 12,
          height: 14,
          clueId: 'clue_bourbon_glasses',
          examinePrompt: 'Inspect the crystal bar cabinet and the two used tumbler glasses.'
        },
        {
          id: 'hs_victim_hand',
          name: 'Arthur\'s Right Hand',
          x: 54,
          y: 50,
          width: 8,
          height: 8,
          clueId: 'clue_missing_fingertip',
          examinePrompt: 'Look closely at Arthur\'s hands resting on the desk blotter.'
        },
        {
          id: 'hs_phone_logs',
          name: 'Desk Telephone & Call Log',
          x: 62,
          y: 42,
          width: 8,
          height: 8,
          clueId: 'clue_phone_records',
          examinePrompt: 'Check the digital memory log of the desk phone.'
        }
      ]
    }
  ],

  clues: [
    {
      id: 'clue_pill_bottle',
      title: 'Seconal Bottle with Pristine Thumbprint',
      category: 'physical',
      location: 'Mahogany Desk',
      iconName: 'Pill',
      summary: 'An amber bottle of sodium secobarbital. Completely empty.',
      fullDescription: 'Prescribed to Arthur Pendelton two weeks ago. Contains traces of lethal barbiturate powder. The exterior glass has been wiped clean of natural skin oils, save for one remarkably sharp, pristine right thumbprint on the front label.',
      julianObservation: 'A man who is frantic enough to swallow twenty lethal capsules does not carefully wipe down the circumference of the glass bottle only to stamp a single, textbook-grade thumbprint right on the label.',
      claraForensics: 'Forensic swab confirms zero smudge overlap. It looks placed—as if Arthur\'s limp hand was pressed against the bottle post-mortem.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'Fabricated Suicide Scene',
      combinedDeductionText: 'The thumbprint was manufactured by someone pressing the victim\'s finger onto the bottle after his death.'
    },
    {
      id: 'clue_typed_note',
      title: 'Typewritten Suicide Note',
      category: 'document',
      location: 'Desk Blotter',
      iconName: 'FileText',
      summary: 'A brief farewell message: "Forgive me. The losses are insurmountable. Arthur."',
      fullDescription: 'Typed on heavy 32lb linen stock using black ink ribbon. The keystrokes are uniform in pressure and rapid, executed by a practiced touch-typist. Note the wording: "losses are insurmountable".',
      julianObservation: 'Arthur was an old-money aristocrat who took enormous pride in his calligraphy. He sent handwritten memos for everything. Moreover, his fund gained 14% last quarter—he had no losses to run from.',
      claraForensics: 'Analysis of key impact depth shows a steady strike rhythm across all ten fingers. The ink ribbon wear matches the Royal typewriter on the credenza.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_fountain_pens',
      title: 'Montblanc Meisterstück Fountain Pens',
      category: 'psychological',
      location: 'Pen Display Case',
      iconName: 'PenTool',
      summary: 'Custom engraved pens inked with customized midnight-blue pigment.',
      fullDescription: 'Arthur had five tailored fountain pens, each fitted with a left-slant italic gold nib. The desk inkwell is wet and freshly replenished.',
      julianObservation: 'If a man who spent forty years insisting that typed letters were the mark of the uncivilized decided to pen his final words to the world, he would have reached for his gold Meisterstück, not a clattering mechanical relic.',
      claraForensics: 'No fingerprints on the fountain pens from today. The pens remained capped in their velvet slots.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_typewriter',
      title: 'Royal Manual Typewriter (1948)',
      category: 'physical',
      location: 'Side Credenza',
      iconName: 'Keyboard',
      summary: 'Vintage typewriter with fresh black ink ribbon and key alignment.',
      fullDescription: 'Dust on the chassis has been recently disturbed. The ribbon was newly spooled within the last 48 hours. Key resistance on the letter \'T\' is slightly stiff.',
      julianObservation: 'This machine was a decorative heirloom passed down from Arthur\'s father. Arthur kept it purely for aesthetic prestige—he despised the mechanical racket.',
      claraForensics: 'Micro-scratches on the slug of the letter \'e\' directly match the offset serif visible on the suicide note.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_slippers',
      title: 'Displaced Silk Slippers',
      category: 'timeline',
      location: 'Under Desk',
      iconName: 'Footprints',
      summary: 'Right slipper is turned backwards; carpet pile is crushed in drag marks.',
      fullDescription: 'Arthur\'s right slipper is caught under the rear caster of the desk chair, facing away from the desk. A subtle scuff along the Persian rug indicates his feet were dragged toward the desk rather than walking voluntarily.',
      julianObservation: 'He didn\'t sit down, contemplate his life, and swallow pills. He lost consciousness elsewhere in the room—likely by the bar—and was hauled into the desk chair.',
      claraForensics: 'Fibers from the Persian rug match the heels of Arthur\'s socks, corroborating a horizontal pull while semi-conscious.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_bourbon_glasses',
      title: 'Two Bourbon Glasses (Lipstick Smudge)',
      category: 'physical',
      location: 'Bar Cabinet',
      iconName: 'Wine',
      summary: 'A crystal decanter of Pappy Van Winkle and two tumblers. One glass bears cherry-red lipstick.',
      fullDescription: 'The first glass contains melted ice and trace barbiturate residue at the bottom rim. The second glass is empty save for a distinct smear of crimson lipstick along the rim. The decanter is 90 proof Kentucky bourbon.',
      julianObservation: 'A staged distraction. Look at the lipstick smudge—it is smeared straight across without any lip impressions. Someone pressed a cosmetic stick against the glass, rather than drinking from it.',
      claraForensics: 'Lipstick compound matches "Scarlet Haze", commercially common. Chemical swab of Glass 1 shows crushed Seconal dissolved directly into the whiskey.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_missing_fingertip',
      title: 'Arthur\'s Severed Right Index Fingertip',
      category: 'contradiction',
      location: 'Victim\'s Body',
      iconName: 'Hand',
      summary: 'Arthur lost the top joint of his right index finger in a 2018 hunting accident.',
      fullDescription: 'The right index finger ends at the proximal interphalangeal joint. Because of this, Arthur could not touch-type on a mechanical typewriter without striking adjacent keys or exerting uneven downward pressure.',
      julianObservation: 'Look at the suicide note again. The letters \'U\', \'J\', and \'M\'—which require the right index finger on a QWERTY keyboard—are struck with crisp, flawless, standard velocity. A nine-fingered man did not type that note!',
      claraForensics: 'Medical records confirm the amputation. The mechanical strike uniformity on the suicide note proves an operator with ten functional, experienced fingers.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'Impossible Author',
      combinedDeductionText: 'The typist must possess a fully functional right index finger—which excludes Arthur Pendelton entirely.'
    },
    {
      id: 'clue_phone_records',
      title: 'Digital Call Timestamp Discrepancy',
      category: 'timeline',
      location: 'Desk Phone & Cell Network',
      iconName: 'PhoneCall',
      summary: 'Incoming call from Marcus Vance at 11:14 PM; Sofia Cruz 911 call at 11:45 PM.',
      fullDescription: 'Marcus claimed in his initial statement that he only learned of Arthur\'s death when assistant Sofia Cruz panicked and phoned him at 11:55 PM. However, tower pings and telecom records show Marcus placed a call to Arthur\'s private landline at 11:14 PM that connected for 18 seconds.',
      julianObservation: 'He dialed the penthouse from the lobby downstairs to check if anyone was with Arthur before ascending in the private service elevator.',
      claraForensics: 'Marcus\'s mobile cell tower ping placed him within 100 meters of the Glass Tower at 11:12 PM, completely blowing his alibi that he was across town at dinner.',
      isExamined: false,
      discovered: false
    }
  ],

  suspects: [
    {
      id: 'marcus_vance',
      name: 'Marcus Vance',
      title: 'Junior Partner & Co-Founder',
      age: 34,
      bio: 'Sharp, immaculately groomed, wearing an bespoke Savile Row suit. Fastidious and prideful. Joined Pendelton five years ago and managed fund liquidity.',
      portrait: 'marcus_portrait',
      currentExpression: 'neutral',
      baselineHeartRate: 78,
      baselineTells: [
        {
          label: 'Checking Platinum Cufflinks',
          description: 'Repeatedly adjusts his left cufflink whenever the typewriter or fund audit is mentioned.'
        },
        {
          label: 'Micro-pause on Timeframes',
          description: 'Swallows and hesitates for 1.8 seconds before stating when he arrived at the tower.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Quick-witted, articulate, highly conscious of legal boundaries.',
        vulnerability: 'Arrogance regarding his own intellect; contempt for Arthur\'s traditional methods.',
        habitualDefense: 'Feigned grief masked by financial pragmatism.'
      },
      initialSuspicion: 65,
      disclosedInformation: []
    },
    {
      id: 'evelyn_pendelton',
      name: 'Evelyn Pendelton',
      title: 'Estranged Wife',
      age: 49,
      bio: 'Sophisticated socialite in the midst of contentious divorce proceedings. Wears dark sunglasses even indoors.',
      portrait: 'evelyn_portrait',
      currentExpression: 'defensive',
      baselineHeartRate: 88,
      baselineTells: [
        {
          label: 'Lipstick Touchup',
          description: 'Opens her clutch to touch up her makeup whenever Arthur\'s personal life is brought up.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Iron-clad public alibi at a high-profile contemporary art auction.',
        vulnerability: 'Financial desperation if the prenuptial agreement held.',
        habitualDefense: 'Cynical detachment and hostility toward the police.'
      },
      initialSuspicion: 50,
      disclosedInformation: []
    },
    {
      id: 'sofia_cruz',
      name: 'Sofia Cruz',
      title: 'Executive Personal Assistant',
      age: 28,
      bio: 'Fiercely loyal assistant who managed Arthur\'s calendar, medication, and domestic appointments. Discovered the body at 11:40 PM.',
      portrait: 'sofia_portrait',
      currentExpression: 'nervous',
      baselineHeartRate: 104,
      baselineTells: [
        {
          label: 'Trembling Hands',
          description: 'Clutches her notebook tightly to suppress involuntary muscle tremors.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Deeply knowledgeable about Arthur\'s habits, handwriting, and visitors.',
        vulnerability: 'Easily intimidated by aggressive authority.',
        habitualDefense: 'Excessive detail and emotional guilt for not arriving earlier.'
      },
      initialSuspicion: 20,
      disclosedInformation: []
    }
  ],

  deductions: [
    {
      id: 'ded_staged_suicide',
      title: 'The Suicide Was Fabricated',
      hypothesis: 'Arthur did not voluntarily write the note or swallow the pills.',
      requiredClueIds: ['clue_pill_bottle', 'clue_typed_note', 'clue_fountain_pens'],
      unlockedInsight: 'Arthur was a fountain pen purist with booming quarterly profits. The single pristine thumbprint and typed note were manufactured to mimic a depressive spiral.',
      isUnlocked: false,
      position: { x: 220, y: 150 }
    },
    {
      id: 'ded_impossible_typist',
      title: 'The Killer Must Have Ten Fingers',
      hypothesis: 'The author of the typed suicide note could not be Arthur Pendelton.',
      requiredClueIds: ['clue_typed_note', 'clue_missing_fingertip', 'clue_typewriter'],
      unlockedInsight: 'The note features perfectly even key strikes on keys typed by the right index finger. Arthur lost that fingertip four years ago. The killer typed it!',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 500, y: 180 }
    },
    {
      id: 'ded_physical_drag',
      title: 'Poisoned at the Bar, Dragged to Desk',
      hypothesis: 'Arthur lost consciousness at the bar cabinet, not in the desk chair.',
      requiredClueIds: ['clue_slippers', 'clue_bourbon_glasses'],
      unlockedInsight: 'Arthur was served poisoned bourbon at the bar, collapsed, and his limp body was dragged across the Persian rug to the desk chair.',
      isUnlocked: false,
      position: { x: 240, y: 340 }
    },
    {
      id: 'ded_alibi_shattered',
      title: 'Marcus Vance Was at the Tower',
      hypothesis: 'Marcus lied about receiving the first news from Sofia.',
      requiredClueIds: ['clue_phone_records', 'clue_bourbon_glasses'],
      unlockedInsight: 'Marcus called Arthur\'s landline at 11:14 PM while pinging the lobby cell tower. He staged the fake lipstick glass to frame Arthur\'s wife Evelyn.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 520, y: 360 }
    }
  ],

  timelineEvents: [
    {
      id: 'time_1',
      timeLabel: '10:45 PM',
      description: 'Arthur enters his penthouse study and pours a glass of Pappy Van Winkle bourbon.',
      sourceClueId: 'clue_bourbon_glasses',
      correctSlotIndex: 0,
      revealed: true
    },
    {
      id: 'time_2',
      timeLabel: '11:12 PM',
      description: 'Marcus Vance arrives at the tower lobby and dials Arthur\'s landline to confirm he is alone.',
      sourceClueId: 'clue_phone_records',
      correctSlotIndex: 1,
      revealed: false
    },
    {
      id: 'time_3',
      timeLabel: '11:20 PM',
      description: 'Marcus joins Arthur for a drink, slips dissolved Seconal into Arthur\'s glass, and Arthur collapses.',
      sourceClueId: 'clue_slippers',
      correctSlotIndex: 2,
      revealed: false
    },
    {
      id: 'time_4',
      timeLabel: '11:32 PM',
      description: 'Marcus drags Arthur to the desk, types the suicide note on the Royal typewriter, and presses Arthur\'s thumb onto the empty pill bottle.',
      sourceClueId: 'clue_missing_fingertip',
      correctSlotIndex: 3,
      revealed: false
    },
    {
      id: 'time_5',
      timeLabel: '11:45 PM',
      description: 'Assistant Sofia Cruz arrives with urgent signature files and discovers Arthur\'s body.',
      sourceClueId: 'clue_typed_note',
      correctSlotIndex: 4,
      revealed: true
    }
  ],

  interrogations: {
    marcus_vance: {
      suspectId: 'marcus_vance',
      rootDialogueId: 'marcus_root',
      nodes: {
        marcus_root: {
          id: 'marcus_root',
          speaker: 'Marcus Vance',
          speakerTitle: 'Junior Partner',
          text: 'Detectives. A hideous tragedy. Arthur was like an elder brother to me, but the pressure of the market can break even the hardest men. How can I assist the State Bureau?',
          expression: 'neutral',
          choices: [
            {
              id: 'c_observe_baseline',
              text: '[Observe Baseline] Watch Marcus\'s posture and physiological rhythm.',
              type: 'baseline',
              nextDialogueId: 'marcus_baseline_read'
            },
            {
              id: 'c_ask_typewriter',
              text: 'Arthur left a typed suicide note on that vintage Royal credenza.',
              type: 'inquiry',
              nextDialogueId: 'marcus_typewriter_inquiry'
            },
            {
              id: 'c_bluff_lipstick',
              text: '[Set the Trap / Bluff] "Curious that Evelyn\'s lipstick was on the glass... and a trace of it on your collar."',
              type: 'bluff',
              nextDialogueId: 'marcus_bluff_lipstick_response'
            },
            {
              id: 'c_present_fingertip',
              text: '[Present Evidence] Arthur could never have typed that note with ten-finger precision.',
              type: 'presentEvidence',
              requiredClueId: 'clue_missing_fingertip',
              nextDialogueId: 'marcus_confront_fingertip'
            }
          ]
        },

        marcus_baseline_read: {
          id: 'marcus_baseline_read',
          speaker: 'Julian',
          speakerTitle: 'Mentalist Observation',
          text: 'Notice his hands. His left thumb keeps rhythmically flicking the platinum cufflink. His pulse is slightly elevated, around 86, but controlled. Yet when he spoke of the market pressure, his eyes darted toward the bar cabinet, not the desk.',
          expression: 'calculating',
          choices: [
            {
              id: 'c_back_to_root_1',
              text: 'Return to questioning with this insight.',
              type: 'inquiry',
              nextDialogueId: 'marcus_root'
            }
          ]
        },

        marcus_typewriter_inquiry: {
          id: 'marcus_typewriter_inquiry',
          speaker: 'Marcus Vance',
          speakerTitle: 'Junior Partner',
          text: 'Yes, Arthur always kept that Royal typewriter on the credenza. He said typing cleared his thoughts when financial projections became too dizzying.',
          expression: 'neutral',
          choices: [
            {
              id: 'c_call_typewriter_lie',
              text: '[Cold Read] "Everyone in this firm knows Arthur despised typewriters. You, however, worked at the clerk dispatch for three years."',
              type: 'coldread',
              nextDialogueId: 'marcus_typewriter_counter'
            },
            {
              id: 'c_back_to_root_2',
              text: 'Press him on other matters.',
              type: 'inquiry',
              nextDialogueId: 'marcus_root'
            }
          ]
        },

        marcus_typewriter_counter: {
          id: 'marcus_typewriter_counter',
          speaker: 'Marcus Vance',
          speakerTitle: 'Junior Partner',
          text: 'I... I merely meant he had it displayed. You\'re reading too much into a decorative antiquity, Detective Cross.',
          expression: 'nervous',
          audioStinger: 'tension',
          choices: [
            {
              id: 'c_back_to_root_3',
              text: 'Shift the angle of attack.',
              type: 'inquiry',
              nextDialogueId: 'marcus_root'
            }
          ]
        },

        marcus_bluff_lipstick_response: {
          id: 'marcus_bluff_lipstick_response',
          speaker: 'Marcus Vance',
          speakerTitle: 'Junior Partner',
          text: 'What?! That\'s absurd! That glass was wiped with her cosmetic tube—I mean, I don\'t wear lipstick, and I certainly haven\'t touched Evelyn Pendelton!',
          expression: 'shocked',
          audioStinger: 'bluff',
          bluffSuccess: true,
          insightGained: 'Marcus slipped: he knew the glass was "wiped with her cosmetic tube" before forensics disclosed it!',
          choices: [
            {
              id: 'c_trap_sprung',
              text: '"How did you know the lipstick was wiped from a tube, Marcus? We haven\'t released the forensic report."',
              type: 'coldread',
              nextDialogueId: 'marcus_bluff_collapse'
            }
          ]
        },

        marcus_bluff_collapse: {
          id: 'marcus_bluff_collapse',
          speaker: 'Marcus Vance',
          speakerTitle: 'Junior Partner',
          text: 'I... it was a figure of speech! A guess! You\'re twisting my words. Ask Clara—she knows police procedure doesn\'t run on parlor tricks!',
          expression: 'defensive',
          audioStinger: 'contradiction',
          choices: [
            {
              id: 'c_clara_intervene',
              text: '[Clara steps forward with phone logs and forensic analysis]',
              type: 'inquiry',
              nextDialogueId: 'clara_phone_reveal'
            }
          ]
        },

        clara_phone_reveal: {
          id: 'clara_phone_reveal',
          speaker: 'Clara Vance',
          speakerTitle: 'State Bureau Forensics',
          text: 'Actually Marcus, parlor tricks didn\'t ping your cell phone at the Glass Tower lobby at 11:12 PM. Nor did they drag Arthur\'s feet across the Persian rug. The Seconal bottle has a single, pristine thumbprint with zero natural handling oil. You staged this entire room.',
          expression: 'calculating',
          choices: [
            {
              id: 'c_final_confrontation_prompt',
              text: 'Deliver the definitive accusation in the Mind Palace.',
              type: 'inquiry',
              nextDialogueId: 'marcus_root'
            }
          ]
        },

        marcus_confront_fingertip: {
          id: 'marcus_confront_fingertip',
          speaker: 'Marcus Vance',
          speakerTitle: 'Junior Partner',
          text: 'Arthur\'s finger? What on earth does an old hunting injury have to do with his suicide note?!',
          expression: 'nervous',
          choices: [
            {
              id: 'c_explain_keys',
              text: '"The letters \'U\', \'J\', and \'M\' on that note were struck at 120 grams of mechanical pressure with a complete fingertip. Arthur didn\'t type it. You did."',
              type: 'coldread',
              nextDialogueId: 'marcus_cornered'
            }
          ]
        },

        marcus_cornered: {
          id: 'marcus_cornered',
          speaker: 'Marcus Vance',
          speakerTitle: 'Junior Partner',
          text: 'You have no right... no right to fabricate these insane forensic leaps! Speak to my attorneys!',
          expression: 'defeated',
          audioStinger: 'realization',
          choices: [
            {
              id: 'c_finish_interrogation',
              text: 'Conclude interrogation and prepare final formal accusation.',
              type: 'inquiry',
              nextDialogueId: 'marcus_root'
            }
          ]
        }
      }
    }
  },

  accusationConfig: {
    options: {
      culprits: [
        { id: 'marcus_vance', name: 'Marcus Vance (Junior Partner)', isCorrect: true, feedback: 'Correct. Marcus had the financial motive, physical capability, and access.' },
        { id: 'evelyn_pendelton', name: 'Evelyn Pendelton (Estranged Wife)', isCorrect: false, feedback: 'Incorrect. Evelyn was verified at the art auction across town with 200 witnesses.' },
        { id: 'sofia_cruz', name: 'Sofia Cruz (Personal Assistant)', isCorrect: false, feedback: 'Incorrect. Sofia discovered the body and loved Arthur like a father figure.' }
      ],
      motives: [
        { id: 'motive_embezzlement', text: 'Arthur uncovered Marcus\'s massive offshore embezzlement and was filing an SEC complaint in the morning.', isCorrect: true, feedback: 'Correct. The audit files on the server confirm Marcus was facing federal prison.' },
        { id: 'motive_divorce', text: 'To collect a 50-million dollar divorce payout.', isCorrect: false, feedback: 'Incorrect. Marcus was not married to Arthur.' },
        { id: 'motive_depression', text: 'Arthur was depressed over market fluctuations.', isCorrect: false, feedback: 'Incorrect. Arthur\'s fund was up 14%.' }
      ],
      methods: [
        { id: 'method_poison_staged', text: 'Laced Arthur\'s bourbon with crushed Seconal at the bar, dragged his body to the desk, typed a fake suicide note, and planted a single print on the bottle.', isCorrect: true, feedback: 'Spot on. This seamlessly explains the rug scuffs, clean glass, and displaced slippers.' },
        { id: 'method_force_feed', text: 'Forced Arthur at gunpoint to swallow twenty pills at the desk.', isCorrect: false, feedback: 'Incorrect. There were zero signs of struggle or bruising around the mouth.' }
      ],
      decisiveClues: [
        { id: 'clue_missing_fingertip', title: 'Arthur\'s Severed Fingertip vs. Crisp Typewritten Note', isCorrect: true, feedback: 'Irrefutable proof. A nine-fingered man could not strike those specific keys with touch-type uniformity.' },
        { id: 'clue_fountain_pens', title: 'Fountain Pen Collection', isCorrect: false, feedback: 'Suggestive of habits, but not sufficient proof on its own.' },
        { id: 'clue_bourbon_glasses', title: 'Bourbon Glass', isCorrect: false, feedback: 'Proves poison was in the drink, but doesn\'t single out the typist.' }
      ],
      stagedEvidenceExplanations: [
        { id: 'staged_lipstick_print', text: 'The lipstick smear was artificially stamped to frame Evelyn, and the bottle was wiped clean save for a staged post-mortem thumbprint.', isCorrect: true, feedback: 'Accurate deduction. The killer over-staged the scene to create an open-and-shut suicide.' },
        { id: 'staged_broken_pen', text: 'A pen was snapped in half to simulate fury.', isCorrect: false, feedback: 'Incorrect. No pens were broken.' }
      ]
    },
    confrontationDialogueId: 'case1_resolution'
  },

  briefingDialogue: [
    {
      speaker: 'Julian Cross',
      text: 'Glass Tower Condos, penthouse suite. Arthur Pendelton: hedge fund titan, patron of the arts, dead at fifty-two. The door was locked from the inside with a latch bolt.'
    },
    {
      speaker: 'Clara Vance',
      text: 'First precinct ruled it a clean suicide before the body went cold. Barbiturate overdose, suicide note on the desk, bottle on the blotter. But Detective Chief Miller wanted us to double-check before the morning markets open.'
    },
    {
      speaker: 'Julian Cross',
      text: 'Suicide is an intensely personal act, Clara. People reveal their lifelong truths in their final moments. Look at this room: mahogany, silk, tailored fountain pens... and yet a clattering Royal typewriter sits at the center of the narrative. Let\'s look closely.'
    }
  ],

  resolutionStory: {
    summary: 'Marcus Vance broke into the penthouse after confirming Arthur was alone via a lobby phone call. Knowing an internal audit on Monday would reveal his $18M embezzlement, Marcus poisoned Arthur\'s bourbon with crushed Seconal. After Arthur collapsed near the bar, Marcus dragged him to the desk, typed a hurried suicide note, and pressed the deceased man\'s thumb to the pill bottle.',
    howCrimeWasCommitted: 'Marcus used his clerical typing skills to forge the note, unaware that Arthur\'s severed right index fingertip rendered such mechanical touch-typing physically impossible.',
    whySuspectsFailed: 'Marcus over-staged the scene. In attempting to craft both a suicide narrative and a backup frame on Arthur\'s wife (via the cosmetic lipstick smudge), he created glaring psychological contradictions that Julian and Clara dismantled step by step.',
    julianReflection: '"A mentalist learns early that whenever someone works too hard to convince you of an obvious story, they are terrified of the simple truth behind it."',
    claraClosingRemarks: '"Fingerprints can be stamped, Detective, but physics and anatomy don\'t lie. Marcus Vance is booked for first-degree murder."'
  },

  hints: {
    level1_nudge: 'Look closely at how Arthur wrote vs. how the note was composed.',
    level2_category: 'Compare the physical evidence of Arthur\'s hands with the mechanical requirements of the typewriter.',
    level3_connection: 'Connect the Missing Fingertip with the Typewritten Note in your Mind Palace.',
    level4_solution: 'Arthur could not type those specific letters with a severed index finger. Confront Marcus about the typewriter and lipstick bluff.'
  }
};
