import { CaseData } from '../../types/game';

export const case2Data: CaseData = {
  id: 'case2',
  caseNumber: 2,
  title: 'Vintage Blood',
  subtitle: 'The Poisoned Falcon of Castille Winery',
  difficulty: 'Intermediate',
  location: 'Cellar Dining Hall, Castille Winery, Private Vault',
  victim: {
    name: 'Gabriel Moreau',
    age: 58,
    occupation: 'Syndicated Culinary & Oenology Critic ("The Acid Palate")',
    apparentDeath: 'Sudden respiratory paralysis and cyanosis mid-toast during an exclusive 1982 Cabernet vintage uncorking.'
  },
  actualCulprit: 'Henri Laurent',
  synopsis: 'Six prominent guests gathered in the subterranean tasting cellar of Castille Winery. All six drank from a single, unopened 1982 Grand Cru decanter. Within four minutes of tasting, critic Gabriel Moreau convulsed and collapsed dead, while the remaining five guests remained unharmed. How could a shared decanter claim a single life?',

  scenes: [
    {
      id: 'cellar_vault',
      name: 'Cellar Dining Hall',
      subtitle: 'The candle-lit tasting table beneath arched limestone vaults.',
      visualTheme: 'cellar',
      hotspots: [
        {
          id: 'hs_gabriel_glass',
          name: 'Gabriel\'s Wine Glass (Seat 1)',
          x: 28,
          y: 52,
          width: 8,
          height: 12,
          clueId: 'clue_gabriel_glass',
          examinePrompt: 'Examine the crystal Riedel glass at the head of the table.'
        },
        {
          id: 'hs_citrus_handkerchief',
          name: 'Embroidered Linen Handkerchief',
          x: 22,
          y: 60,
          width: 8,
          height: 8,
          clueId: 'clue_citrus_handkerchief',
          examinePrompt: 'Inspect the damp handkerchief beside Gabriel\'s plate.'
        },
        {
          id: 'hs_seating_cards',
          name: 'Engraved Seating Place Cards',
          x: 48,
          y: 50,
          width: 14,
          height: 8,
          clueId: 'clue_seating_cards',
          examinePrompt: 'Examine the calligraphy cards showing the arrangement of guests.'
        },
        {
          id: 'hs_glass_markers',
          name: 'Silver Glass-Marker Case',
          x: 68,
          y: 44,
          width: 10,
          height: 10,
          clueId: 'clue_glass_markers',
          examinePrompt: 'Inspect the velvet-lined mahogany box containing heraldic glass markers.'
        },
        {
          id: 'hs_shared_decanter',
          name: '1982 Cabernet Crystal Decanter',
          x: 52,
          y: 42,
          width: 8,
          height: 14,
          clueId: 'clue_shared_decanter',
          examinePrompt: 'Examine the large antique decanter resting in the center ice ring.'
        },
        {
          id: 'hs_wine_corks',
          name: 'Original Lead-Foiled Cork & Cradle',
          x: 82,
          y: 54,
          width: 8,
          height: 8,
          clueId: 'clue_wine_corks',
          examinePrompt: 'Inspect the newly extracted cork and sommelier lever.'
        }
      ]
    }
  ],

  clues: [
    {
      id: 'clue_gabriel_glass',
      title: 'Gabriel\'s Riedel Glass (Coated Rim & Stem)',
      category: 'physical',
      location: 'Seat 1 Place Setting',
      iconName: 'Wine',
      summary: 'A crystal Bordeaux glass. The outer base and stem show a faint sticky, odorless film.',
      fullDescription: 'Under UV light examination, the crystal rim and the top three centimeters of the slender stem fluoresce pale chartreuse. Chemical tests identify trace coniine—a fast-acting neurotoxic alkaloid found in hemlock.',
      julianObservation: 'Gabriel had an eccentric signature ritual: before tasting any wine, he would spin the glass three times by its upper stem and rub the rim with fresh lemon peel from his pocket to "cleanse the tannic film."',
      claraForensics: 'The interior of the bowl contains untainted 1982 Cabernet. The poison was not inside the wine; it was applied as a water-insoluble resin onto the exterior stem and rim!',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'Exterior Contact Poisoning',
      combinedDeductionText: 'The toxin was not poured into the wine, but transferred from Gabriel\'s fingertips as he rubbed the stem.'
    },
    {
      id: 'clue_citrus_handkerchief',
      title: 'Citrus-Infused Linen Handkerchief',
      category: 'psychological',
      location: 'Table Beside Seat 1',
      iconName: 'Sparkles',
      summary: 'Damp handkerchief smelling heavily of cold-pressed Bergamot and lemon oils.',
      fullDescription: 'Gabriel carried this in his breast pocket. He used lemon oil as an astringent solvent for his fingers. The solvent properties of citrus limonene act as an organic dissolving agent for resinous plant alkaloids.',
      julianObservation: 'The killer didn\'t just choose a poison; they chose a toxin that required a specific organic solvent to activate and penetrate the skin rapidly. Gabriel\'s known citrus ritual was weaponized against him.',
      claraForensics: 'Coniine resin is dormant when dry, but dissolves instantly into high-acidity citrus essential oil, allowing transdermal and mucosal absorption in under ninety seconds.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_seating_cards',
      title: 'Altered Seating Arrangement',
      category: 'timeline',
      location: 'Dining Table Center',
      iconName: 'Users',
      summary: 'Original calligraphy place cards indicate Gabriel was scheduled to sit at Seat 4.',
      fullDescription: 'Seat 4 was between the sommelier and Gabriel\'s wife Vivienne. However, ten minutes before the uncorking, host Henri Laurent personally insisted that Gabriel occupy Seat 1 at the head of the table "as the guest of supreme honor."',
      julianObservation: 'Seating switches in formal tastings are rare. Henri claimed it was an impromptu honor, but his voice tightened when Gabriel initially resisted moving away from the hearth.',
      claraForensics: 'Microscopic indentations on Seat 1\'s card show it was written on a different ink batch two days ago. Henri had planned this placement in advance.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_glass_markers',
      title: 'Antique Silver Marker (Missing Falcon Crest)',
      category: 'contradiction',
      location: 'Sommelier Sideboard',
      iconName: 'Shield',
      summary: 'A set of 6 antique silver wine clip markers with animal crests. The Falcon is missing.',
      fullDescription: 'The markers clip onto the base of Riedel stems so guests don\'t swap glasses. Five clips remain in the velvet case: Boar, Stag, Lion, Serpent, and Hound. The Falcon clip was placed exclusively on the glass at Seat 1.',
      julianObservation: 'Look at the velvet recess for the Falcon. It is stained with a yellowish waxy residue. Someone spent hours in the prep kitchen coating that specific heraldic silver piece.',
      claraForensics: 'Spectrometry on the velvet slot matches the coniine alkaloid found on Gabriel\'s glass stem. The Falcon marker was the delivery vehicle!',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'The Poisoned Falcon',
      combinedDeductionText: 'The poison was coated directly onto the silver Falcon glass marker attached to Seat 1\'s glass.'
    },
    {
      id: 'clue_shared_decanter',
      title: 'Pure 1982 Cabernet Decanter',
      category: 'physical',
      location: 'Table Center',
      iconName: 'Layers',
      summary: 'The crystal magnum decanter containing remaining vintage wine.',
      fullDescription: 'Mass spectrometry tests conducted by Clara Vance prove the liquid in the decanter is 100% pure, aged wine with zero contaminants or poisons. All five surviving guests drank from this exact vessel.',
      julianObservation: 'A classic illusionist trick: draw everyone\'s paranoid attention to the grand shared centerpiece so they ignore the small personal token in their hand.',
      claraForensics: 'Confirms zero toxic residue throughout the decanter or neck. The mystery of the "poisoned bottle" is officially debunked.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_wine_corks',
      title: 'Pristine 1982 Cork & Wax Seal',
      category: 'document',
      location: 'Sommelier Prep Station',
      iconName: 'CheckCircle',
      summary: 'The natural cork extracted by sommelier Lucian Dupuis before the guests.',
      fullDescription: 'No hypodermic needle punctures or chemical discoloration. The lead seal was intact until opened in full view of the six guests under candlelight.',
      julianObservation: 'Lucian performed the opening with theatrical transparency. He wanted everyone to watch the cork come out clean.',
      claraForensics: 'Zero micro-fissures or chemical degradation. Bottle integrity was pristine.',
      isExamined: false,
      discovered: false
    }
  ],

  suspects: [
    {
      id: 'henri_laurent',
      name: 'Henri Laurent',
      title: 'Vineyard Owner & Patriarch',
      age: 63,
      bio: 'Aristocratic French winemaker whose family held Castille for five generations. Facing imminent foreclosure after Gabriel drafted a devastating 60-point review of his flagship vintage.',
      portrait: 'henri_portrait',
      currentExpression: 'neutral',
      baselineHeartRate: 74,
      baselineTells: [
        {
          label: 'Rubbing Family Signet Ring',
          description: 'Twists his gold signet ring frantically when asked about Gabriel\'s draft review.'
        },
        {
          label: 'Deflection to Decanter',
          description: 'Constantly insists that "we all drank from the same bottle, God be my witness."'
        }
      ],
      psychologicalProfile: {
        strengths: 'Deep knowledge of cellar traditions, calm aristocratic demeanor.',
        vulnerability: 'Desperate terror of losing the estate to bankruptcy; intense hatred for Gabriel.',
        habitualDefense: 'Appealing to the shared bottle as an unassailable proof of innocence.'
      },
      initialSuspicion: 75,
      disclosedInformation: []
    },
    {
      id: 'vivienne_moreau',
      name: 'Vivienne Moreau',
      title: 'Widow & Trust Beneficiary',
      age: 44,
      bio: 'Quiet, elegant woman who endured fifteen years of Gabriel\'s cruel temper and public humiliations. Primary heir to his multi-million dollar publishing trust.',
      portrait: 'vivienne_portrait',
      currentExpression: 'calculating',
      baselineHeartRate: 82,
      baselineTells: [
        {
          label: 'Gaze Aversion',
          description: 'Looks downward at her silver napkin ring whenever Gabriel\'s temper is brought up.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Composed, guarded, very careful with words.',
        vulnerability: 'Exhausted by years of psychological torment.',
        habitualDefense: 'Cool politeness and feigned sorrow.'
      },
      initialSuspicion: 40,
      disclosedInformation: []
    },
    {
      id: 'lucian_dupuis',
      name: 'Lucian Dupuis',
      title: 'Master Sommelier',
      age: 39,
      bio: 'Rigid, obsessive sommelier who treats wine service like a sacred religious liturgy. Guarded the silver markers and glassware.',
      portrait: 'lucian_portrait',
      currentExpression: 'defensive',
      baselineHeartRate: 92,
      baselineTells: [
        {
          label: 'Polishing Cloth Twirl',
          description: 'Fidgets with his microfiber glass cloth whenever someone questions his cellar inventory.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Perfectionist memory for every decanter, cork, and glass position.',
        vulnerability: 'Offended by any suggestion that his cellar sanitation was compromised.',
        habitualDefense: 'Technical jargon and insistence on sommelier protocol.'
      },
      initialSuspicion: 35,
      disclosedInformation: []
    }
  ],

  deductions: [
    {
      id: 'ded_pure_wine',
      title: 'The Decanted Wine Was Untainted',
      hypothesis: 'The poison was never in the shared decanter.',
      requiredClueIds: ['clue_shared_decanter', 'clue_wine_corks'],
      unlockedInsight: 'All six guests drank the exact same liquid. The mystery does not lie in the vintage or the decanter.',
      isUnlocked: false,
      position: { x: 220, y: 160 }
    },
    {
      id: 'ded_falcon_marker_trap',
      title: 'The Toxin Was on the Falcon Marker',
      hypothesis: 'The silver Falcon marker was the sole contaminated object.',
      requiredClueIds: ['clue_gabriel_glass', 'clue_glass_markers'],
      unlockedInsight: 'The Falcon clip was coated with coniine resin. Only the glass at Seat 1 received this clip.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 500, y: 160 }
    },
    {
      id: 'ded_citrus_activation',
      title: 'Gabriel\'s Personal Ritual Triggered the Dose',
      hypothesis: 'Gabriel\'s citrus-rubbing habit acted as the chemical activator.',
      requiredClueIds: ['clue_citrus_handkerchief', 'clue_gabriel_glass'],
      unlockedInsight: 'The dry coniine alkaloid required Gabriel\'s lemon oil to dissolve and absorb into his bloodstream. The killer targeted his specific habit.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 240, y: 340 }
    },
    {
      id: 'ded_premeditated_seat',
      title: 'Henri Premeditated the Seating Shift',
      hypothesis: 'Henri deliberately guided Gabriel to the poisoned Falcon glass.',
      requiredClueIds: ['clue_seating_cards', 'clue_glass_markers'],
      unlockedInsight: 'Henri moved Gabriel to Seat 1 right before the toast. The Falcon marker had already been clipped to Seat 1\'s glass in the prep room.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 520, y: 340 }
    }
  ],

  timelineEvents: [
    {
      id: 'time_2_1',
      timeLabel: '7:30 PM',
      description: 'Henri Laurent enters the prep cellar alone and clips the poisoned silver Falcon marker to Seat 1\'s glass.',
      sourceClueId: 'clue_glass_markers',
      correctSlotIndex: 0,
      revealed: false
    },
    {
      id: 'time_2_2',
      timeLabel: '8:00 PM',
      description: 'Guests arrive in the subterranean dining room; Gabriel is seated at Seat 4.',
      sourceClueId: 'clue_seating_cards',
      correctSlotIndex: 1,
      revealed: true
    },
    {
      id: 'time_2_3',
      timeLabel: '8:15 PM',
      description: 'Henri insists Gabriel move to Seat 1 to honor him as the critic of the evening.',
      sourceClueId: 'clue_seating_cards',
      correctSlotIndex: 2,
      revealed: false
    },
    {
      id: 'time_2_4',
      timeLabel: '8:22 PM',
      description: 'Sommelier Lucian Dupuis decants the 1982 Cabernet and pours for all six guests.',
      sourceClueId: 'clue_shared_decanter',
      correctSlotIndex: 3,
      revealed: true
    },
    {
      id: 'time_2_5',
      timeLabel: '8:26 PM',
      description: 'Gabriel rubs his glass stem with his citrus handkerchief, drinks, and collapses from coniine poisoning.',
      sourceClueId: 'clue_citrus_handkerchief',
      correctSlotIndex: 4,
      revealed: false
    }
  ],

  interrogations: {
    henri_laurent: {
      suspectId: 'henri_laurent',
      rootDialogueId: 'henri_root',
      nodes: {
        henri_root: {
          id: 'henri_root',
          speaker: 'Henri Laurent',
          speakerTitle: 'Vineyard Owner',
          text: 'Detective Cross, Detective Vance. This is madness. You saw the bottle uncorked before our eyes. We all drank from the same crystal decanter! If there was poison in that vintage, why am I still standing?',
          expression: 'neutral',
          choices: [
            {
              id: 'c_henri_baseline',
              text: '[Observe Baseline] Study Henri\'s hands and breathing rhythm.',
              type: 'baseline',
              nextDialogueId: 'henri_baseline_obs'
            },
            {
              id: 'c_henri_seating',
              text: 'Why did you move Gabriel from Seat 4 to Seat 1 at the last minute?',
              type: 'inquiry',
              nextDialogueId: 'henri_seating_q'
            },
            {
              id: 'c_henri_bluff_cork',
              text: '[Set the Trap / Bluff] "The lab found a micro-puncture in the bottle cork sealed with dark wax."',
              type: 'bluff',
              nextDialogueId: 'henri_bluff_response'
            },
            {
              id: 'c_henri_present_falcon',
              text: '[Present Evidence] The coniine was coated onto the silver Falcon marker at Seat 1.',
              type: 'presentEvidence',
              requiredClueId: 'clue_glass_markers',
              nextDialogueId: 'henri_confront_falcon'
            }
          ]
        },

        henri_baseline_obs: {
          id: 'henri_baseline_obs',
          speaker: 'Julian',
          speakerTitle: 'Mentalist Observation',
          text: 'Notice the signet ring on his right hand. He twists it violently whenever the word "decanter" is uttered. He is anchoring his entire psychological defense to the shared liquid. Break the bottle illusion, and his composure will shatter.',
          expression: 'calculating',
          choices: [
            {
              id: 'c_back_henri_1',
              text: 'Return to questioning with this behavioral read.',
              type: 'inquiry',
              nextDialogueId: 'henri_root'
            }
          ]
        },

        henri_seating_q: {
          id: 'henri_seating_q',
          speaker: 'Henri Laurent',
          speakerTitle: 'Vineyard Owner',
          text: 'Castille hospitality dictates that the most distinguished palate sits at the head! Seat 1 has the premier view of our vaulted archways.',
          expression: 'neutral',
          choices: [
            {
              id: 'c_press_honor',
              text: '[Cold Read] "You didn\'t want to honor him, Henri. Gabriel was about to publish a 60-point score that would have bankrupted your lineage."',
              type: 'coldread',
              nextDialogueId: 'henri_score_defend'
            }
          ]
        },

        henri_score_defend: {
          id: 'henri_score_defend',
          speaker: 'Henri Laurent',
          speakerTitle: 'Vineyard Owner',
          text: 'Gabriel was harsh, yes! But I am a winemaker, not a savage! I wouldn\'t commit murder at my own family table!',
          expression: 'defensive',
          audioStinger: 'tension',
          choices: [
            {
              id: 'c_back_henri_2',
              text: 'Pivot to the physical mechanics of the murder.',
              type: 'inquiry',
              nextDialogueId: 'henri_root'
            }
          ]
        },

        henri_bluff_response: {
          id: 'henri_bluff_response',
          speaker: 'Henri Laurent',
          speakerTitle: 'Vineyard Owner',
          text: 'A puncture in the cork?! Impossible! That bottle never had a single syringe near it—the cork was pristine from the cellar rack!',
          expression: 'shocked',
          audioStinger: 'bluff',
          bluffSuccess: true,
          insightGained: 'Henri immediately ruled out a syringe without asking if we inspected the cork interior. He was completely confident the wine itself was safe.',
          choices: [
            {
              id: 'c_expose_confidence',
              text: '"You were very certain no syringe touched that wine, Henri. Because you knew the decanter was completely pure all along."',
              type: 'coldread',
              nextDialogueId: 'henri_flustered'
            }
          ]
        },

        henri_flustered: {
          id: 'henri_flustered',
          speaker: 'Henri Laurent',
          speakerTitle: 'Vineyard Owner',
          text: 'I... I watched Lucian pull the cork! Anyone could see it was intact!',
          expression: 'nervous',
          audioStinger: 'contradiction',
          choices: [
            {
              id: 'c_back_henri_3',
              text: 'Press the attack.',
              type: 'inquiry',
              nextDialogueId: 'henri_root'
            }
          ]
        },

        henri_confront_falcon: {
          id: 'henri_confront_falcon',
          speaker: 'Henri Laurent',
          speakerTitle: 'Vineyard Owner',
          text: 'The... the Falcon marker? What does a decorative silver clip have to do with poisoning?',
          expression: 'nervous',
          choices: [
            {
              id: 'c_explain_citrus_trigger',
              text: '"Coniine resin on the silver stem, activated when Gabriel spun the glass with his citrus handkerchief. You set Seat 1 specifically for him."',
              type: 'coldread',
              nextDialogueId: 'henri_collapse'
            }
          ]
        },

        henri_collapse: {
          id: 'henri_collapse',
          speaker: 'Henri Laurent',
          speakerTitle: 'Vineyard Owner',
          text: 'He was going to call Castille \'vinegar for peasants\'... three hundred years of my ancestors\' sweat, erased by that bloated parasite with a pen... I had to protect my family\'s bloodline!',
          expression: 'defeated',
          audioStinger: 'realization',
          choices: [
            {
              id: 'c_finish_henri',
              text: 'Conclude interrogation and proceed to formal accusation.',
              type: 'inquiry',
              nextDialogueId: 'henri_root'
            }
          ]
        }
      }
    }
  },

  accusationConfig: {
    options: {
      culprits: [
        { id: 'henri_laurent', name: 'Henri Laurent (Vineyard Owner)', isCorrect: true, feedback: 'Correct. Henri planned the seating switch and possessed the motive to save his estate.' },
        { id: 'vivienne_moreau', name: 'Vivienne Moreau (Widow)', isCorrect: false, feedback: 'Incorrect. Vivienne wanted a divorce, not a messy public execution at a winery.' },
        { id: 'lucian_dupuis', name: 'Lucian Dupuis (Sommelier)', isCorrect: false, feedback: 'Incorrect. Lucian revere wine protocol and had no grudge against Gabriel.' }
      ],
      motives: [
        { id: 'motive_ruinous_review', text: 'Gabriel\'s forthcoming 60-point review would trigger bank foreclosure and strip Henri of his family estate.', isCorrect: true, feedback: 'Correct. The winery was deep in debt, and Gabriel\'s review was the final blow.' },
        { id: 'motive_cellar_theft', text: 'To steal rare 19th-century vintages from the cellar.', isCorrect: false, feedback: 'Incorrect. No wine was stolen.' }
      ],
      methods: [
        { id: 'method_coated_marker', text: 'Coated the silver Falcon glass marker with coniine resin, clipped it to Seat 1\'s glass, and counted on Gabriel\'s citrus ritual to dissolve the toxin.', isCorrect: true, feedback: 'Spot on! This resolves the apparent paradox of the single shared decanter.' },
        { id: 'method_poison_decanter', text: 'Poured poison into the decanter that miraculously settled only at the bottom.', isCorrect: false, feedback: 'Incorrect. Fluid dynamics makes targeted decanter poisoning impossible.' }
      ],
      decisiveClues: [
        { id: 'clue_glass_markers', title: 'Contaminated Silver Falcon Marker & Velvet Case', isCorrect: true, feedback: 'Decisive evidence. Matches the coniine on Gabriel\'s glass rim and stem.' },
        { id: 'clue_shared_decanter', title: '1982 Cabernet Decanter', isCorrect: false, feedback: 'The decanter was pure wine, proving the poison lay elsewhere.' }
      ],
      stagedEvidenceExplanations: [
        { id: 'staged_shared_bottle', text: 'The shared decanter was an intentional psychological distraction to make the murder appear mathematically impossible.', isCorrect: true, feedback: 'Exactly. Henri hid behind the group toast as an airtight alibi.' },
        { id: 'staged_broken_glass', text: 'A glass was shattered to destroy evidence.', isCorrect: false, feedback: 'Incorrect. No glass was broken.' }
      ]
    },
    confrontationDialogueId: 'case2_resolution'
  },

  briefingDialogue: [
    {
      speaker: 'Clara Vance',
      text: 'Castille Winery, fifty feet underground. Gabriel Moreau, the most feared food and wine critic on the eastern seaboard, dropped dead four minutes into a private tasting.'
    },
    {
      speaker: 'Julian Cross',
      text: 'And the paradox, Clara?'
    },
    {
      speaker: 'Clara Vance',
      text: 'Six people sat at the table. Henri Laurent, the owner; Vivienne Moreau, his wife; Lucian Dupuis, the sommelier; and two visiting collectors. All six glasses were filled from a single crystal decanter of 1982 Cabernet Grand Cru. Only Gabriel died.'
    },
    {
      speaker: 'Julian Cross',
      text: 'A magician does not poison the river, Clara. He poisons the cup, or better yet, the hand that lifts it. Let us examine the table.'
    }
  ],

  resolutionStory: {
    summary: 'Henri Laurent, facing the imminent loss of his five-generation vineyard due to Gabriel Moreau\'s scathing unpublished review, devised an ingeniously targeted assassination. Knowing the shared 1982 Cabernet decanter would baffle any ordinary poison investigation, Henri focused on the glassware accessories.',
    howCrimeWasCommitted: 'Henri coated the silver Falcon glass marker with insoluble coniine alkaloid resin. He then manipulated the seating so Gabriel took Seat 1. When Gabriel performed his signature ritual of rubbing the stem with a citrus-infused handkerchief, the limonene acid dissolved the resin, rapidly transmitting the lethal dose through his fingertips and lips.',
    whySuspectsFailed: 'Henri assumed the shared decanter would provide an infallible defense. He did not anticipate that Clara would isolate the chemical residue specifically to the external silver clip and Gabriel\'s citrus handkerchief.',
    julianReflection: '"When everyone is watching the grand gesture in the middle of the room, look for the quiet detail everyone was told to take for granted."',
    claraClosingRemarks: '"Forensics isn\'t just about where the poison went—it\'s about understanding where it never was. Case closed."'
  },

  hints: {
    level1_nudge: 'If the wine inside the decanter was clean, where was the poison physically located?',
    level2_category: 'Examine Gabriel\'s personal tasting habits and the heraldic silver markers.',
    level3_connection: 'Connect the Falcon Glass Marker with the Citrus Handkerchief in the Mind Palace.',
    level4_solution: 'The Falcon marker was painted with coniine; Gabriel\'s lemon oil dissolved it. Accuse Henri Laurent.'
  }
};
