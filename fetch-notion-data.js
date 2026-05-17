#!/usr/bin/env node

const fs = require("fs");

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const PAGE_ID = process.env.PAGE_ID || "363bc09fccb2812aab8ac19b355f59fa";

if (!NOTION_TOKEN) {
  console.error("Error: NOTION_TOKEN environment variable not set");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${NOTION_TOKEN}`,
  "Notion-Version": "2022-06-28",
  "Content-Type": "application/json",
};

const SECTIONS = [
  "Learn the basics",
  "Learn Important Sorting Techniques",
  "Learn Basic Maths",
  "Learn Basic Recursion",
  "Learn Basic Hashing",
  "Sort an Array",
  "Arrays",
  "Binary Search",
  "Strings",
  "Linked List",
  "Recursion",
  "Bit Manipulation",
  "Stack & Queue",
  "Sliding Window & Two Pointers",
  "Heaps",
  "Greedy Algorithms",
  "Binary Trees",
  "Binary Search Trees",
  "Graphs",
  "Dynamic Programming",
  "Tries",
];

async function getBlocks(blockId) {
  let results = [];
  let cursor = undefined;
  do {
    const url = `https://api.notion.com/v1/blocks/${blockId}/children?page_size=100${cursor ? `&start_cursor=${cursor}` : ""}`;
    const r = await fetch(url, { headers });
    if (!r.ok) {
      const err = await r.json();
      throw new Error(err.message || "Notion API error");
    }
    const data = await r.json();
    results = results.concat(data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return results;
}

async function countToggles(blockId) {
  let count = 0;
  const blocks = await getBlocks(blockId);
  for (const b of blocks) {
    if (b.type === "toggle") count++;
    if (b.has_children) count += await countToggles(b.id);
  }
  return count;
}

async function main() {
  try {
    console.log("Fetching Notion data...");
    const topBlocks = await getBlocks(PAGE_ID);

    let currentSection = null;
    let sectionBlockIds = {};

    for (const block of topBlocks) {
      if (block.type === "heading_2") {
        const text = (block.heading_2?.rich_text || []).map((t) => t.plain_text).join("");
        const match = SECTIONS.find((s) => text.includes(s));
        if (match) {
          currentSection = match;
          sectionBlockIds[match] = sectionBlockIds[match] || [];
        }
      } else if (currentSection) {
        sectionBlockIds[currentSection] = sectionBlockIds[currentSection] || [];
        sectionBlockIds[currentSection].push(block.id);
      }
    }

    const results = {};
    for (const section of SECTIONS) {
      let count = 0;
      for (const blockId of sectionBlockIds[section] || []) {
        const block = topBlocks.find((b) => b.id === blockId);
        if (block?.type === "toggle") count++;
        if (block?.has_children) count += await countToggles(blockId);
      }
      results[section] = count;
    }

    const data = {
      sections: results,
      updatedAt: new Date().toISOString(),
    };

    fs.writeFileSync("data.json", JSON.stringify(data, null, 2));
    console.log("✓ data.json updated successfully");
  } catch (e) {
    console.error("Error fetching Notion data:", e.message);
    process.exit(1);
  }
}

main();

