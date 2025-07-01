const Leaderboard = ({ scores }) => {
  if (!scores || scores === "ended" || scores.length === 0) {
    return (
      <div style={styles.container}>
        <h2>🏆 Final Scores</h2>
        <p>No scores available. Please wait or try again.</p>
      </div>
    );
  }

  const sortedScores = [...scores].sort((a, b) => b.score - a.score);

  const getRowStyle = (index) => {
    if (index === 0) return { backgroundColor: "#ffd70022" }; // Gold
    if (index === 1) return { backgroundColor: "#c0c0c022" }; // Silver
    if (index === 2) return { backgroundColor: "#cd7f3222" }; // Bronze
    return {};
  };

  return (
    <div style={styles.container}>
      <h2>🏆 Final Scores</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Rank</th>
            <th style={styles.th}>Player</th>
            <th style={styles.th}>Score</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((player, index) => (
            <tr key={player.username} style={getRowStyle(index)}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{player.username}</td>
              <td style={styles.td}>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "30px",
  },
  table: {
    width: "80%",
    maxWidth: "500px",
    margin: "0 auto",
    borderCollapse: "collapse",
    fontSize: "18px",
  },
  th: {
    borderBottom: "2px solid #333",
    padding: "12px",
    backgroundColor: "#f8f8f8",
  },
  td: {
    borderBottom: "1px solid #ddd",
    padding: "10px",
  },
};

export default Leaderboard;
