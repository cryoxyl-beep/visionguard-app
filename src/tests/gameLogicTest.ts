import { allCases } from '../data/cases/index';

console.log('--- RUNNING MIND PALACE: THE COLD READ AUTOMATED QA TESTS ---');
let totalTests = 0;
let passedTests = 0;

function assert(condition: boolean, message: string) {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    console.error(`  ✗ FAIL: ${message}`);
  }
}

const cases = Object.values(allCases);

// Test 1: All 5 cases exist with valid titles and numbers
assert(cases.length === 5, 'Exactly 5 canonical cases are registered');
cases.forEach((c, idx) => {
  assert(c.caseNumber === idx + 1, `Case ${c.id} has correct sequential number ${idx + 1}`);
  assert(c.title.length > 0, `Case ${c.id} has a non-empty title: "${c.title}"`);
  assert(c.scenes.length > 0, `Case ${c.id} has at least one active investigation scene`);
  assert(c.clues.length >= 5, `Case ${c.id} has at least 5 collectible clues (Found: ${c.clues.length})`);
  assert(c.suspects.length >= 3, `Case ${c.id} has at least 3 suspects (Found: ${c.suspects.length})`);
  assert(c.deductions.length >= 4, `Case ${c.id} has at least 4 Mind Palace deductions (Found: ${c.deductions.length})`);
  assert(c.timelineEvents.length >= 4, `Case ${c.id} has at least 4 timeline events`);
});

// Test 2: Hotspot Clue Cross-Reference Integrity
cases.forEach(c => {
  c.scenes.forEach(scene => {
    scene.hotspots.forEach(hs => {
      const matchClue = c.clues.find(clue => clue.id === hs.clueId);
      assert(matchClue !== undefined, `Hotspot "${hs.name}" links to valid clue ID "${hs.clueId}" in Case ${c.id}`);
    });
  });
});

// Test 3: Mind Palace Deduction Required Clues Integrity
cases.forEach(c => {
  c.deductions.forEach(ded => {
    assert(ded.requiredClueIds.length >= 2, `Deduction "${ded.title}" requires at least 2 clues`);
    ded.requiredClueIds.forEach(clueId => {
      const exists = c.clues.some(clue => clue.id === clueId);
      assert(exists, `Deduction "${ded.title}" references existing clue "${clueId}"`);
    });
  });
});

// Test 4: Final Accusation Configuration Integrity
cases.forEach(c => {
  const acc = c.accusationConfig.options;
  const correctCulprits = acc.culprits.filter(x => x.isCorrect);
  const correctMotives = acc.motives.filter(x => x.isCorrect);
  const correctMethods = acc.methods.filter(x => x.isCorrect);
  const correctClues = acc.decisiveClues.filter(x => x.isCorrect);
  const correctStaged = acc.stagedEvidenceExplanations.filter(x => x.isCorrect);

  assert(correctCulprits.length === 1, `Case ${c.id} has exactly one correct culprit: ${correctCulprits[0]?.name}`);
  assert(correctMotives.length === 1, `Case ${c.id} has exactly one correct motive`);
  assert(correctMethods.length === 1, `Case ${c.id} has exactly one correct method`);
  assert(correctClues.length === 1, `Case ${c.id} has exactly one correct decisive clue`);
  assert(correctStaged.length === 1, `Case ${c.id} has exactly one correct staged explanation`);
});

// Test 5: Interrogation Node Connectivity
cases.forEach(c => {
  Object.entries(c.interrogations).forEach(([suspectId, inter]) => {
    const rootNode = inter.nodes[inter.rootDialogueId];
    assert(rootNode !== undefined, `Interrogation for "${suspectId}" has valid root node "${inter.rootDialogueId}"`);
    
    Object.values(inter.nodes).forEach(node => {
      node.choices.forEach(ch => {
        const nextNode = inter.nodes[ch.nextDialogueId];
        assert(nextNode !== undefined, `Dialogue choice in node "${node.id}" points to existing node "${ch.nextDialogueId}"`);
      });
    });
  });
});

// Test 6: Timeline Index Continuity
cases.forEach(c => {
  const indices = c.timelineEvents.map(e => e.correctSlotIndex).sort((a, b) => a - b);
  indices.forEach((val, i) => {
    assert(val === i, `Timeline slot in Case ${c.id} is contiguous at index ${i}`);
  });
});

console.log(`\nQA TEST RESULTS: ${passedTests} / ${totalTests} TESTS PASSED.`);
if (passedTests === totalTests) {
  console.log('ALL GAME SYSTEMS AND NARRATIVE BRANCHES PASS VALIDATION.');
  process.exit(0);
} else {
  console.error('SOME TESTS FAILED.');
  process.exit(1);
}
