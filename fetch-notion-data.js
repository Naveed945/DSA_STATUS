#!/usr/bin/env node

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = process.env.PAGE_ID || "363bc09fccb2812aab8ac19b355f59fa";
const fs = require("fs");

const headers = {
  "Authorization": `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json"
};

const SECTIONS = [
  "Learn the basics", "Learn Important Sorting Techniques", "Learn Basic Maths",
  "Learn Basic Recursion", "Learn Basic Hashing", "Sort an Array", "Arrays_",
  "Binary Search", "Strings_", "Linked List", "Recursion", "Bit Manipulation",
  "Stack & Queue", "Sliding Window & Two Pointers", "Heaps", "Greedy Algorithms",
  "Binary Trees", "Binary Search Trees", "Graphs", "Dynamic Programming", "Tries",
];


//const SUB_HEADING_NAMES = ["Easy", "Medium", "Hard"];

async function countProblems(blockId) {
  let count = 0;
  const blocks = await getBlocks(blockId);
  for (const b of blocks) {
    if (b.type === "toggle") count++;
  }
  return count;
}

async function main() {
  try {
    console.log("Fetching Notion data...");
    const topBlocks = await getBlocks(PAGE_ID);

    // Step 1: Find each section's heading_2 block id
    const sectionBlockIds = {};
    for (const block of topBlocks) {
      if (block.type === "heading_2") {
        const text = (block.heading_2?.rich_text || []).map(t => t.plain_text).join("");
        const match = SECTIONS.find(s => text.includes(s));
        if (match) sectionBlockIds[match] = block.id;
      }
    }

    // Step 2: For each section, find ALL toggles as sub-headings and count their children
    const results = {};

    for (const section of SECTIONS) {
      const sectionId = sectionBlockIds[section];
      if (!sectionId) {
        results[section] = { total: 0, subHeadings: {} };
        continue;
      }

      const children = await getBlocks(sectionId);
      const sectionResult = { total: 0, subHeadings: {} };

      for (const block of children) {
        // ✅ Every toggle at this level is a sub-heading (Easy/Medium/Hard or anything)
        if (block.type !== "toggle") continue;

        const subHeadingName = (block.toggle?.rich_text || []).map(t => t.plain_text).join("").trim() || "(untitled)";

        if (block.has_children) {
          // ✅ Count toggles inside it — those are the problems
          const count = await countProblems(block.id);
          sectionResult.subHeadings[subHeadingName] = (sectionResult.subHeadings[subHeadingName] || 0) + count;
          sectionResult.total += count;
        } else {
          // Toggle exists but has no children, still register it with 0
          sectionResult.subHeadings[subHeadingName] = sectionResult.subHeadings[subHeadingName] || 0;
        }
      }

      results[section] = sectionResult;

      console.log(`\n ${section} — ${sectionResult.total} total`);
      for (const [sub, cnt] of Object.entries(sectionResult.subHeadings)) {
     //   console.log(`   📌 ${sub}: ${cnt}`); //to count sub headings
      }
    }

    fs.writeFileSync("data.json", JSON.stringify({ sections: results, updatedAt: new Date().toISOString() }, null, 2));
    console.log("\n✓ data.json updated");
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  }
}

main();