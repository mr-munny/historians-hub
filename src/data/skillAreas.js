export const SKILL_AREAS = [
  {
    id: 1, name: "Chronological Reasoning & Causation", icon: "\u23F3", color: "#B45309", bg: "#FEF3C7",
    components: [
      { id: "1A", name: "Sequencing & Change Over Time", rubricW: "I can place events in order and say what changed between them.", rubricM: "I can explain why a development happened when it did, distinguishing short-term from long-term causes.", rubricE: "I can construct a narrative that explains how multiple changes over time led to a significant development." },
      { id: "1B", name: "Identifying Multiple Causes", rubricW: "When asked why something happened, I can name more than one cause.", rubricM: "I can explain how individuals, groups, and institutions each contributed to an event.", rubricE: "I can analyze how multiple causes interacted and weigh which were most significant." },
      { id: "1C", name: "Consequences (Intended vs. Unintended)", rubricW: "I can identify what people expected to happen and what actually happened.", rubricM: "I can distinguish intended outcomes from unintended consequences and explain the difference.", rubricE: "I can analyze how consequences affected different groups differently and connect to broader patterns." },
    ]
  },
  {
    id: 2, name: "Use of Primary Sources", icon: "\uD83D\uDCDC", color: "#1D4ED8", bg: "#DBEAFE",
    components: [
      { id: "2A", name: "Sourcing (Who & When)", rubricW: "I can identify who created a source and when.", rubricM: "I can use authorship info to set expectations about what a source might say and identify its audience.", rubricE: "I can explain how the creator's identity and context shaped the source's content and purpose." },
      { id: "2B", name: "Contextualization", rubricW: "I can connect a source to what was happening when it was created.", rubricM: "I can explain why a source exists by connecting it to the historical moment.", rubricE: "I can analyze how the historical context shaped both what the source says and how it says it." },
      { id: "2C", name: "Close Reading", rubricW: "I can identify the author's main point or purpose.", rubricM: "I can point to specific words and details that reveal meaning beyond the surface.", rubricE: "I can interpret what a source reveals about the historical moment that the author may not have intended." },
      { id: "2D", name: "Comparing Sources", rubricW: "I can identify what two sources about the same topic have in common.", rubricM: "I can explain how two sources agree, disagree, or offer different information.", rubricE: "I can explain why two sources about the same event might differ based on their creators and contexts." },
    ]
  },
  {
    id: 3, name: "Secondary Source Analysis", icon: "\uD83D\uDCD6", color: "#059669", bg: "#D1FAE5",
    components: [
      { id: "3A", name: "Primary vs. Secondary Classification", rubricW: "I can correctly identify whether a source is primary or secondary.", rubricM: "I can explain the difference: primary sources are from the time; secondary sources interpret after the fact.", rubricE: "I can explain how the same document could be primary for one question and secondary for another." },
    ]
  },
  {
    id: 4, name: "Argumentation & Claims", icon: "\u2696\uFE0F", color: "#DC2626", bg: "#FEE2E2",
    components: [
      { id: "4A", name: "Formulating a Claim", rubricW: "I can write a statement that takes a position on a historical question.", rubricM: "My claim is specific enough to be supported or challenged, and it responds to an inquiry question.", rubricE: "My claim acknowledges complexity and I can explain why other positions might exist." },
      { id: "4B", name: "Defending a Claim with Reasoning", rubricW: "I can explain why my evidence supports my claim.", rubricM: "I can connect evidence to my claim through a logical reasoning chain.", rubricE: "I can defend my claim while acknowledging its limits and that other positions exist." },
    ]
  },
  {
    id: 5, name: "Use of Evidence", icon: "\uD83D\uDD0D", color: "#7C3AED", bg: "#EDE9FE",
    components: [
      { id: "5A", name: "Selecting Relevant Evidence", rubricW: "I can choose information from sources that connects to my topic.", rubricM: "I can select evidence that directly supports my claim and avoid irrelevant information.", rubricE: "I can distinguish between a fact and evidence deployed for a specific argument." },
      { id: "5B", name: "Explaining How Evidence Supports a Claim", rubricW: "I can say which evidence goes with my claim.", rubricM: "I can explain the connection between my evidence and my claim clearly.", rubricE: "I can explain why this particular evidence matters for this particular argument." },
    ]
  },
  {
    id: 6, name: "Comparative Analysis", icon: "\u2696\uFE0F", color: "#0891B2", bg: "#CFFAFE",
    components: [
      { id: "6A", name: "Identifying Similarities & Differences", rubricW: "I can name what two things have in common and how they differ.", rubricM: "I can use specific details from sources to ground my comparisons.", rubricE: "I can organize comparisons using my own framework and categories." },
      { id: "6B", name: "Explaining Significance of Comparisons", rubricW: "I can say what my comparison shows.", rubricM: "I can explain why my comparison matters for understanding the historical moment.", rubricE: "I can connect my comparison to the unit's compelling question or broader themes." },
    ]
  },
  {
    id: 7, name: "Perspective-Taking", icon: "\uD83D\uDDE3\uFE0F", color: "#BE185D", bg: "#FCE7F3",
    components: [
      { id: "7A", name: "Identifying a Different Perspective", rubricW: "I can describe what someone in a different position believed or experienced.", rubricM: "I can describe a historical perspective using evidence, without projecting modern values.", rubricE: "I can ground a perspective in source evidence and distinguish it from stereotypes." },
      { id: "7B", name: "Explaining Why Someone Holds That Perspective", rubricW: "I can suggest a reason someone thought the way they did.", rubricM: "I can connect a person's perspective to their identity, circumstances, or incentives.", rubricE: "I can demonstrate empathy without endorsement and explain context that shaped the perspective." },
    ]
  },
  {
    id: 8, name: "Research & Communication", icon: "\u270F\uFE0F", color: "#4338CA", bg: "#E0E7FF",
    components: [
      { id: "8A", name: "Source Evaluation (CRAAP)", rubricW: "I can say whether a source seems reliable or not.", rubricM: "I can evaluate a source using criteria like currency, authority, and purpose.", rubricE: "I can explain why a source is or isn't reliable for a specific purpose." },
      { id: "8B", name: "Guided Research", rubricW: "Given tools, I can find information related to my question.", rubricM: "I can locate relevant information and take organized notes that track sources.", rubricE: "I can conduct focused research without rabbit-holing and evaluate what I find." },
      { id: "8C", name: "Written Communication (CER)", rubricW: "I can write a paragraph with a claim and some evidence.", rubricM: "I can write a clear, cohesive CER paragraph where sentences connect logically.", rubricE: "I can write a polished CER paragraph using appropriate historical vocabulary." },
      { id: "8D", name: "Oral Presentation", rubricW: "I can present my reasoning out loud with some organization.", rubricM: "I can present with clarity, organization, and basic visual supports.", rubricE: "I can speak about my reasoning using historical examples, not just reading from notes." },
    ]
  },
];
