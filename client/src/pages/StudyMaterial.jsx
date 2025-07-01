import React from "react";
import "../styles/StudyMaterial.css";

export default function StudyMaterial() {
  const resources = [
    {
      category: "DSA & Coding Practice",
      links: [
        { name: "GeeksforGeeks", url: "https://www.geeksforgeeks.org" },
        { name: "LeetCode", url: "https://leetcode.com" },
        {
          name: "HackerRank",
          url: "https://www.hackerrank.com/domains/tutorials/10-days-of-javascript",
        },
        { name: "Codeforces", url: "https://codeforces.com" },
      ],
    },
    {
      category: "Programming Tutorials",
      links: [
        {
          name: "TutorialsPoint",
          url: "https://www.tutorialspoint.com/index.htm",
        },
        { name: "JavaTpoint", url: "https://www.javatpoint.com" },
        { name: "Programiz", url: "https://www.programiz.com" },
        { name: "MDN Web Docs", url: "https://developer.mozilla.org" },
      ],
    },
    {
      category: "Computer Science Core",
      links: [
        { name: "CS50 (Harvard)", url: "https://cs50.harvard.edu" },
        { name: "OpenGenus", url: "https://iq.opengenus.org" },
        { name: "Khan Academy", url: "https://www.khanacademy.org/computing" },
      ],
    },
    {
      category: "Machine Learning & AI",
      links: [
        {
          name: "Coursera (Andrew Ng)",
          url: "https://www.coursera.org/learn/machine-learning",
        },
        { name: "Fast.ai", url: "https://www.fast.ai" },
        { name: "DeepLearning.AI", url: "https://www.deeplearning.ai" },
      ],
    },
  ];

  return (
    <div className="study-container">
      <div className="study-content">
        <h1 className="study-heading">📚 Study Material & Practice Links</h1>
        {resources.map((section, idx) => (
          <div className="study-section card mb-4" key={idx}>
            <h2 className="study-category">{section.category}</h2>
            <ul className="study-links">
              {section.links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="study-link"
                  >
                    {link.name} 🔗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
