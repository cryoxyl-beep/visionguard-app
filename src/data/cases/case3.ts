import { CaseData } from '../../types/game';

export const case3Data: CaseData = {
  id: 'case3',
  caseNumber: 3,
  title: 'The Sightless Mirror',
  subtitle: 'The Framing of Damian Cole',
  difficulty: 'Challenging',
  location: 'Backstage Atelier, Contemporary Art Gallery, Warehouse District',
  victim: {
    name: 'Julianne Sterling',
    age: 38,
    occupation: 'Renowned Avant-Garde Sculptor',
    apparentDeath: 'Blunt force trauma to the occipital cranium from a heavy bronze casting statuette.'
  },
  actualCulprit: 'Dr. Simon Finch',
  synopsis: 'Celebrated sculptor Julianne Sterling is murdered in her private studio atelier. Her volatile former apprentice, Damian Cole, is found unconscious in the adjacent alleyway, his knuckles scraped and his leather jacket soaked in the victim\'s blood. While all physical evidence screams Damian\'s guilt, Julian spots an insurmountable behavioral fracture: the shattered studio mirror was meticulously swept into the waste bin in neat, orderly rows—a compulsive ritual completely alien to Damian\'s chaotic psyche.',

  scenes: [
    {
      id: 'atelier_studio',
      name: 'Sculptor\'s Atelier',
      subtitle: 'The cavernous studio surrounded by marble busts, bronze molds, and broken glass.',
      visualTheme: 'gallery',
      hotspots: [
        {
          id: 'hs_bronze_statuette',
          name: 'Bronze Casting Statuette (Weapon)',
          x: 44,
          y: 56,
          width: 8,
          height: 12,
          clueId: 'clue_bronze_statuette',
          examinePrompt: 'Examine the bloodstained 12-pound bronze statuette on the floor.'
        },
        {
          id: 'hs_shattered_mirror',
          name: 'Shattered Wall Mirror & Bin',
          x: 22,
          y: 42,
          width: 14,
          height: 18,
          clueId: 'clue_mirror_cleanup',
          examinePrompt: 'Inspect the broken full-length mirror and the adjacent metal bin.'
        },
        {
          id: 'hs_eyedrops_vial',
          name: 'Custom Eyedrop Solution Vial',
          x: 62,
          y: 48,
          width: 6,
          height: 8,
          clueId: 'clue_eyedrops',
          examinePrompt: 'Inspect the amber prescription dropper bottle on the workbench.'
        },
        {
          id: 'hs_keycard_terminal',
          name: 'Electronic Security Reader',
          x: 82,
          y: 38,
          width: 8,
          height: 10,
          clueId: 'clue_keycard_logs',
          examinePrompt: 'Check the digital door access timestamps and reader lights.'
        },
        {
          id: 'hs_damian_jacket',
          name: 'Damian Cole\'s Leather Jacket',
          x: 36,
          y: 68,
          width: 10,
          height: 12,
          clueId: 'clue_blood_splatter',
          examinePrompt: 'Examine the blood splatter patterns on Damian\'s clothing.'
        },
        {
          id: 'hs_finch_medical_file',
          name: 'Fiancé Legal Trust & Vision Chart',
          x: 72,
          y: 52,
          width: 10,
          height: 8,
          clueId: 'clue_finch_trust',
          examinePrompt: 'Inspect the notarized estate documents inside the portfolio.'
        }
      ]
    }
  ],

  clues: [
    {
      id: 'clue_blood_splatter',
      title: 'Passive Blood Flow on Damian\'s Jacket',
      category: 'physical',
      location: 'Alleyway / Damian\'s Coat',
      iconName: 'Droplet',
      summary: 'Bloodstains on Damian\'s sleeve show passive gravitational drip, not high-velocity cast-off.',
      fullDescription: 'If Damian had swung the heavy bronze statuette, the weapon would have generated arc-shaped cast-off spatter across his chest and cuffs. Instead, the blood soaked into his shoulder as he lay motionless on the studio floor beside Julianne.',
      julianObservation: 'Damian wasn\'t standing over her swinging a club; he was struck down first and collapsed into her bleeding pool before being dragged outside.',
      claraForensics: 'Forensic spatter analysis confirms: zero active swing spatter. The blood transfer occurred while the garment was stationary and horizontal.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'Damian Was a Secondary Victim',
      combinedDeductionText: 'Damian did not wield the weapon; he was incapacitated and smeared with blood to frame him.'
    },
    {
      id: 'clue_bronze_statuette',
      title: 'Bronze Statuette (Reverse Grip Fingerprint)',
      category: 'contradiction',
      location: 'Studio Floor',
      iconName: 'Award',
      summary: 'A 12-pound sculpture of Perseus. The handle grip shows wiped metal and a smudged glove mark.',
      fullDescription: 'The base of the statuette is caked in cranial tissue. Damian\'s fingerprints were found near the bronze head, but the actual striking shaft was gripped with textured medical latex.',
      julianObservation: 'Whoever swung this weapon had surgical knowledge of craniocerebral anatomy—a single blow delivered precisely to the lambda suture of the skull.',
      claraForensics: 'Latex powder residue (cornstarch and talc) detected on the handle. Damian does not wear medical gloves.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_mirror_cleanup',
      title: 'Orderly Shards in the Waste Bin',
      category: 'psychological',
      location: 'Beside Shattered Mirror',
      iconName: 'Sparkles',
      summary: 'The wall mirror was struck and broken, but the glass fragments were swept into neat, parallel piles.',
      fullDescription: 'Inside the bin, the glass shards are stacked in descending size order, largest plates at the bottom, micro-shards swept with a hand-brush. Not a single splinter was left in the work pathway.',
      julianObservation: 'Damian is manic, chaotic, and leaves half-eaten sandwiches inside clay molds. He would never spend seven minutes meticulously sweeping and grading glass shards by millimeter in the dark.',
      claraForensics: 'Sweeping pattern shows deliberate, obsessive-compulsive precision. The broom was returned to its exact peg on the wall.',
      isExamined: false,
      discovered: false,
      requiresBothPerspectives: true,
      combinedDeductionTitle: 'Compulsive Behavioral Signature',
      combinedDeductionText: 'The killer possesses an ingrained, pathological need for sterile clinical order.'
    },
    {
      id: 'clue_keycard_logs',
      title: 'Impossible Keycard Timestamps',
      category: 'timeline',
      location: 'Security Reader',
      iconName: 'Key',
      summary: 'Damian\'s keycard swiped at 11:15 PM, and again at 11:42 PM.',
      fullDescription: 'Paramedics and alley surveillance confirmed Damian had already suffered a severe concussion and was deeply unconscious by 11:30 PM. His keycard could not have been used by him at 11:42 PM.',
      julianObservation: 'The killer stole the keycard from the unconscious boy, re-entered the studio at 11:42 PM to plant the statuette, and tossed the card back onto Damian\'s body in the alley.',
      claraForensics: 'Alley CCTV shows Damian\'s body inert on the pavement by 11:28 PM. The 11:42 PM swipe was an imposter framing him.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_eyedrops',
      title: 'Adulterated Eyedrop Solution (Pilocarpine)',
      category: 'document',
      location: 'Sculpture Workbench',
      iconName: 'Eye',
      summary: 'Prescribed by Dr. Simon Finch. Contains high-dose pilocarpine that induces severe night blindness.',
      fullDescription: 'Julianne complained of worsening vision in low light. Forensic toxicology reveals the drops she received were double-concentrated miotics, severely constricting her pupils and leaving her functionally blind in dimly lit rooms.',
      julianObservation: 'Julianne wasn\'t going blind naturally; she was being systematically blinded by her treating optometrist so she couldn\'t identify her attacker.',
      claraForensics: 'The chemical label on the bottle was typed on Dr. Finch\'s clinic label printer. The dosage is four times therapeutic limits.',
      isExamined: false,
      discovered: false
    },
    {
      id: 'clue_finch_trust',
      title: 'Sole Estate Beneficiary Agreement',
      category: 'motive',
      location: 'Portfolio Case',
      iconName: 'FileCheck',
      summary: 'A secret legal trust making fiancé Dr. Simon Finch sole executor of Julianne\'s $14M art estate.',
      fullDescription: 'Signed only twelve days ago. Julianne believed Dr. Finch was helping her establish a foundation for blind artists. Instead, upon her death, full copyright and physical ownership of all seventy-four bronze sculptures transfer unconditionally to Finch.',
      julianObservation: 'A classic predatory sociopath: groom the vulnerable artist, worsen her condition, secure the signature, and eliminate her before the wedding where state marital laws would complicate the trust.',
      claraForensics: 'Witnessed and filed by Finch\'s private attorney without notifying Julianne\'s family.',
      isExamined: false,
      discovered: false
    }
  ],

  suspects: [
    {
      id: 'dr_simon_finch',
      name: 'Dr. Simon Finch',
      title: 'Optometrist & Secret Fiancé',
      age: 46,
      bio: 'Impeccably tailored, cold, precise clinical specialist. Speaks with measured, quiet authority. Wears silver-rimmed glasses and latex-banded wristwatches.',
      portrait: 'finch_portrait',
      currentExpression: 'neutral',
      baselineHeartRate: 64,
      baselineTells: [
        {
          label: 'Checking Cuticles',
          description: 'Inspects his fingernails and cuticles under light whenever blood or broken glass is mentioned.'
        },
        {
          label: 'Monotone Modulation',
          description: 'His vocal pitch does not fluctuate even when describing gruesome cranial injuries.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Absolute emotional control, clinical detachment, encyclopedic medical knowledge.',
        vulnerability: 'Arrogance regarding his hygiene and intelligence; inability to leave a mess uncleaned.',
        habitualDefense: 'Feigned medical objectivity and patronizing pity.'
      },
      initialSuspicion: 70,
      disclosedInformation: []
    },
    {
      id: 'damian_cole',
      name: 'Damian Cole',
      title: 'Former Apprentice',
      age: 24,
      bio: 'Talented, manic, emotionally volatile young sculptor. Found battered and concussed in the alleyway. Desperately loved Julianne despite constant creative fights.',
      portrait: 'damian_portrait',
      currentExpression: 'shocked',
      baselineHeartRate: 112,
      baselineTells: [
        {
          label: 'Head Clutching',
          description: 'Clutches his temple where he suffered a blunt blow from behind.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Raw artistic passion and honesty.',
        vulnerability: 'Severe memory gap due to traumatic brain injury.',
        habitualDefense: 'Explosive emotional outbursts masking terror.'
      },
      initialSuspicion: 55,
      disclosedInformation: []
    },
    {
      id: 'veronica_vance_hill',
      name: 'Veronica Vance-Hill',
      title: 'Gallery Owner & Dealer',
      age: 52,
      bio: 'High-society art dealer drowning in gallery debts. Needed Julianne\'s upcoming retrospective to sell out to avert bankruptcy.',
      portrait: 'veronica_portrait',
      currentExpression: 'defensive',
      baselineHeartRate: 85,
      baselineTells: [
        {
          label: 'Necklace Clutch',
          description: 'Twirls her pearl necklace when discussing gallery revenue.'
        }
      ],
      psychologicalProfile: {
        strengths: 'Commercial savvy and social connections.',
        vulnerability: 'Financial records showing unauthorized presales.',
        habitualDefense: 'Blaming Damian\'s notorious temper.'
      },
      initialSuspicion: 45,
      disclosedInformation: []
    }
  ],

  deductions: [
    {
      id: 'ded_damian_framed',
      title: 'Damian Cole Was Staged to Take the Fall',
      hypothesis: 'Damian was ambushed, knocked unconscious, and painted with blood.',
      requiredClueIds: ['clue_blood_splatter', 'clue_keycard_logs'],
      unlockedInsight: 'Damian was unconscious in the alley before the fatal keycard return swipe occurred. The blood on his jacket was passive pooling, not attacker splatter.',
      isUnlocked: false,
      position: { x: 220, y: 150 }
    },
    {
      id: 'ded_clinical_killer',
      title: 'The Killer Has a Clinical Medical Profile',
      hypothesis: 'The murderer used medical gloves, precision striking, and compulsive sweeping.',
      requiredClueIds: ['clue_bronze_statuette', 'clue_mirror_cleanup'],
      unlockedInsight: 'The single blow to the lambda suture, latex residue, and orderly graded glass sorting prove the killer is a clinical perfectionist, not a raging apprentice.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 500, y: 150 }
    },
    {
      id: 'ded_systematic_blinding',
      title: 'Julianne Was Deliberately Blinded',
      hypothesis: 'The victim was drugged to prevent her from fighting back in the dark.',
      requiredClueIds: ['clue_eyedrops', 'clue_finch_trust'],
      unlockedInsight: 'Dr. Finch prescribed quadruple-strength pilocarpine to induce tunnel vision and night blindness, setting up the studio ambush.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 240, y: 340 }
    },
    {
      id: 'ded_finch_inheritance',
      title: 'Fourteen Million Dollar Art Estate Motive',
      hypothesis: 'Dr. Finch killed Julianne to execute the secret sole beneficiary trust.',
      requiredClueIds: ['clue_finch_trust', 'clue_eyedrops'],
      unlockedInsight: 'Finch drafted a secret foundation contract making himself sole inheritor of all seventy-four bronze sculptures upon her sudden demise.',
      isUnlocked: false,
      leadsToAccusation: true,
      position: { x: 520, y: 340 }
    }
  ],

  timelineEvents: [
    {
      id: 'time_3_1',
      timeLabel: '10:30 PM',
      description: 'Julianne uses her prescribed pilocarpine eyedrops, which severely constrict her vision in the dim atelier.',
      sourceClueId: 'clue_eyedrops',
      correctSlotIndex: 0,
      revealed: true
    },
    {
      id: 'time_3_2',
      timeLabel: '11:10 PM',
      description: 'Damian arrives to return borrowed chisels; Dr. Finch ambushes Damian from behind and knocks him unconscious.',
      sourceClueId: 'clue_blood_splatter',
      correctSlotIndex: 1,
      revealed: false
    },
    {
      id: 'time_3_3',
      timeLabel: '11:20 PM',
      description: 'Dr. Finch strikes Julianne with the bronze statuette, kills her, and drags Damian\'s limp body into the alley.',
      sourceClueId: 'clue_bronze_statuette',
      correctSlotIndex: 2,
      revealed: false
    },
    {
      id: 'time_3_4',
      timeLabel: '11:35 PM',
      description: 'Dr. Finch obsessively sweeps the shattered mirror fragments into orderly piles inside the waste bin.',
      sourceClueId: 'clue_mirror_cleanup',
      correctSlotIndex: 3,
      revealed: false
    },
    {
      id: 'time_3_5',
      timeLabel: '11:42 PM',
      description: 'Dr. Finch uses Damian\'s stolen keycard to re-enter, plant the statuette, and return the card to the alley.',
      sourceClueId: 'clue_keycard_logs',
      correctSlotIndex: 4,
      revealed: true
    }
  ],

  interrogations: {
    dr_simon_finch: {
      suspectId: 'dr_simon_finch',
      rootDialogueId: 'finch_root',
      nodes: {
        finch_root: {
          id: 'finch_root',
          speaker: 'Dr. Simon Finch',
          speakerTitle: 'Optometrist & Fiancé',
          text: 'Detectives. A horrific, savage butchery. Damian Cole has always been unstable—Julianne tolerated him out of artistic pity. You have the weapon, the blood on his coat, and his keycard on the reader. What more could you possibly need from me?',
          expression: 'neutral',
          choices: [
            {
              id: 'c_finch_baseline',
              text: '[Observe Baseline] Analyze Finch\'s clinical calmness and physical mannerisms.',
              type: 'baseline',
              nextDialogueId: 'finch_baseline_read'
            },
            {
              id: 'c_finch_lights',
              text: 'Why were the atelier floodlights switched off during the attack?',
              type: 'inquiry',
              nextDialogueId: 'finch_lights_q'
            },
            {
              id: 'c_finch_bluff_drops',
              text: '[Set the Trap / Bluff] "Julianne wrote in her journal that she took her eyedrops to a second doctor yesterday for chemical analysis."',
              type: 'bluff',
              nextDialogueId: 'finch_bluff_response'
            },
            {
              id: 'c_finch_present_mirror',
              text: '[Present Evidence] The killer meticulously graded and swept the mirror shards in the dark.',
              type: 'presentEvidence',
              requiredClueId: 'clue_mirror_cleanup',
              nextDialogueId: 'finch_confront_mirror'
            }
          ]
        },

        finch_baseline_read: {
          id: 'finch_baseline_read',
          speaker: 'Julian',
          speakerTitle: 'Mentalist Observation',
          text: 'Look at his pulse: 64 bpm. Absolute chilling homeostasis. He treats this conversation like a laboratory autopsy. But watch his right index finger—he has a small bandage, and he repeatedly checks his cuticles. He caught glass when he swept that mirror.',
          expression: 'calculating',
          choices: [
            {
              id: 'c_back_finch_1',
              text: 'Resume interrogation with this behavioral insight.',
              type: 'inquiry',
              nextDialogueId: 'finch_root'
            }
          ]
        },

        finch_lights_q: {
          id: 'finch_lights_q',
          speaker: 'Dr. Simon Finch',
          speakerTitle: 'Optometrist & Fiancé',
          text: 'Julianne had chronic photophobia. Strong incandescent lamps caused her severe ocular migraine. Damian knew this and exploited it like a coward.',
          expression: 'neutral',
          choices: [
            {
              id: 'c_press_photophobia',
              text: '[Cold Read] "She didn\'t have natural photophobia, Doctor. You induced severe miosis with quadruple-dose pilocarpine to leave her helpless."',
              type: 'coldread',
              nextDialogueId: 'finch_drops_defend'
            }
          ]
        },

        finch_drops_defend: {
          id: 'finch_drops_defend',
          speaker: 'Dr. Simon Finch',
          speakerTitle: 'Optometrist & Fiancé',
          text: 'Pilocarpine is a standard treatment for intraocular pressure! Are you attempting to practice ophthalmology without a license, Detective?',
          expression: 'defensive',
          audioStinger: 'tension',
          choices: [
            {
              id: 'c_back_finch_2',
              text: 'Press him on the physical contradictions.',
              type: 'inquiry',
              nextDialogueId: 'finch_root'
            }
          ]
        },

        finch_bluff_response: {
          id: 'finch_bluff_response',
          speaker: 'Dr. Simon Finch',
          speakerTitle: 'Optometrist & Fiancé',
          text: 'A second doctor?! She did no such thing! That vial was locked in her private medicine cabinet until eight o\'clock last night when I personally—',
          expression: 'shocked',
          audioStinger: 'bluff',
          bluffSuccess: true,
          insightGained: 'Finch slipped: he admitted he was personally in her private medicine cabinet at 8:00 PM last night, placing him at the scene before the murder!',
          choices: [
            {
              id: 'c_finch_admit_trap',
              text: '"So you personally replaced her eyedrop vial last night, Doctor Finch. Thank you for putting yourself at the scene."',
              type: 'coldread',
              nextDialogueId: 'finch_trap_sprung'
            }
          ]
        },

        finch_trap_sprung: {
          id: 'finch_trap_sprung',
          speaker: 'Dr. Simon Finch',
          speakerTitle: 'Optometrist & Fiancé',
          text: 'I... I delivered medical supplies as her treating physician! That does not make me a killer! Look at Damian\'s coat—it is saturated in her blood!',
          expression: 'defensive',
          audioStinger: 'contradiction',
          choices: [
            {
              id: 'c_back_finch_3',
              text: 'Dismantle Damian\'s blood pattern.',
              type: 'inquiry',
              nextDialogueId: 'finch_root'
            }
          ]
        },

        finch_confront_mirror: {
          id: 'finch_confront_mirror',
          speaker: 'Dr. Simon Finch',
          speakerTitle: 'Optometrist & Fiancé',
          text: 'Swept mirror shards? What relevance does a tidy floor have to a homicide investigation?',
          expression: 'nervous',
          choices: [
            {
              id: 'c_explain_glass_dna',
              text: '"Damian is a manic artist who leaves wet plaster on his bedding. But you... you have severe clinical OCD. You couldn\'t leave without sweeping every shard into descending order. And your bandaged finger left blood on the largest shard."',
              type: 'coldread',
              nextDialogueId: 'finch_collapse'
            }
          ]
        },

        finch_collapse: {
          id: 'finch_collapse',
          speaker: 'Dr. Simon Finch',
          speakerTitle: 'Optometrist & Fiancé',
          text: 'She was squandering her genius on cheap activist galleries... giving away bronze masterworks that should be preserved in private institutional vaults... I built her reputation! I deserved the trust!',
          expression: 'defeated',
          audioStinger: 'realization',
          choices: [
            {
              id: 'c_finish_finch',
              text: 'Conclude interrogation and prepare final formal accusation.',
              type: 'inquiry',
              nextDialogueId: 'finch_root'
            }
          ]
        }
      }
    }
  },

  accusationConfig: {
    options: {
      culprits: [
        { id: 'dr_simon_finch', name: 'Dr. Simon Finch (Optometrist & Secret Fiancé)', isCorrect: true, feedback: 'Correct. Dr. Finch manipulated Julianne\'s eyesight, framed Damian, and stood to inherit the $14M estate.' },
        { id: 'damian_cole', name: 'Damian Cole (Former Apprentice)', isCorrect: false, feedback: 'Incorrect. Damian was struck unconscious and used as a human prop.' },
        { id: 'veronica_vance_hill', name: 'Veronica Vance-Hill (Gallery Dealer)', isCorrect: false, feedback: 'Incorrect. Veronica needed Julianne alive to complete her retrospective tour.' }
      ],
      motives: [
        { id: 'motive_estate_trust', text: 'To acquire complete legal ownership of Julianne\'s $14M bronze sculpture estate through a secret foundation trust.', isCorrect: true, feedback: 'Correct. The notarized trust made Finch sole executor and owner.' },
        { id: 'motive_artistic_jealousy', text: 'Jealousy over Julianne\'s creative recognition in European journals.', isCorrect: false, feedback: 'Incorrect. Finch was an optometrist, not a competing artist.' }
      ],
      methods: [
        { id: 'method_blind_ambush_frame', text: 'Blinded Julianne with pilocarpine drops, ambushed Damian in the alley, struck Julianne with the statuette, and returned with Damian\'s keycard to plant evidence.', isCorrect: true, feedback: 'Exact deduction. Perfectly reconciles the timestamps, blood spatter, and eye drops.' },
        { id: 'method_furious_brawl', text: 'A drunken physical fight over broken mirrors.', isCorrect: false, feedback: 'Incorrect. Zero defensive struggle marks on Julianne.' }
      ],
      decisiveClues: [
        { id: 'clue_mirror_cleanup', title: 'Meticulously Swept Shards & Finch\'s Cuticle Blood', isCorrect: true, feedback: 'Decisive behavioral and physical link. Finch\'s compulsion left his DNA on the swept shards.' },
        { id: 'clue_eyedrops', title: 'Adulterated Eyedrop Solution', isCorrect: false, feedback: 'Proves medical poisoning, but needs the physical scene linkage.' }
      ],
      stagedEvidenceExplanations: [
        { id: 'staged_damian_frame', text: 'Damian was knocked out and dragged into Julianne\'s blood pool to create a counterfeit crime of passion.', isCorrect: true, feedback: 'Brilliant analysis. The passive drip pattern disproves an active assault by Damian.' },
        { id: 'staged_shattered_bust', text: 'A marble bust was smashed to create noise.', isCorrect: false, feedback: 'Incorrect. No busts were broken.' }
      ]
    },
    confrontationDialogueId: 'case3_resolution'
  },

  briefingDialogue: [
    {
      speaker: 'Clara Vance',
      text: 'Warehouse District, gallery atelier. Julianne Sterling was found bludgeoned to death. Her former assistant, Damian Cole, was found unconscious in the alley behind the fire door, covered in her blood with the bronze statuette twenty feet away.'
    },
    {
      speaker: 'Julian Cross',
      text: 'And what does the first precinct say?'
    },
    {
      speaker: 'Clara Vance',
      text: 'Open and shut. Volatile apprentice has a drunken fight with his mentor, strikes her with her own sculpture, flees into the alley, and trips in a stupor.'
    },
    {
      speaker: 'Julian Cross',
      text: 'Whenever a crime scene arrives packaged with a neat ribbon and a screaming culprit on the floor, Clara, look at who benefits from our immediate satisfaction. Let\'s inspect the atelier.'
    }
  ],

  resolutionStory: {
    summary: 'Dr. Simon Finch executed a cold, clinically plotted murder disguised as a volatile crime of passion. After persuading Julianne to sign a foundation trust leaving him sole ownership of her multi-million dollar sculpture collection, Finch systematically degraded her eyesight using prescription pilocarpine to leave her helpless in dim lighting.',
    howCrimeWasCommitted: 'When Damian Cole arrived to return studio tools, Finch knocked him unconscious from behind. Finch then bludgeoned Julianne with a single surgical strike to the lambda suture using a 12-pound bronze statuette. He dragged Damian\'s limp body into her blood pool, staged him in the alley, and re-entered with Damian\'s keycard at 11:42 PM to plant the murder weapon.',
    whySuspectsFailed: 'Finch\'s clinical perfectionism betrayed him. Incapable of tolerating the chaotic mess of the broken mirror, he swept the glass shards into compulsive, millimeter-graded stacks—cutting his own finger in the dark and leaving his DNA on the bin.',
    julianReflection: '"A violent man leaves chaos in his wake. Only a clinical predator attempts to sanitize a murder scene while framing a boy for his own savagery."',
    claraClosingRemarks: '"Damian Cole is cleared of all charges. Dr. Simon Finch is remanded to state custody without bail."'
  },

  hints: {
    level1_nudge: 'Does the blood on Damian\'s jacket look like he was swinging a weapon, or lying still?',
    level2_category: 'Investigate the timestamps of Damian\'s keycard and the swept mirror shards.',
    level3_connection: 'Connect the Blood Splatter pattern with the Keycard Timestamps in your Mind Palace.',
    level4_solution: 'Damian was unconscious before 11:42 PM. The orderly glass cleanup points directly to Dr. Finch\'s clinical OCD.'
  }
};
