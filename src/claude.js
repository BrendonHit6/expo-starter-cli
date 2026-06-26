const fs = require('fs');
const path = require('path');

function removeClaudeConfig(projectRoot) {
  fs.rmSync(path.join(projectRoot, 'CLAUDE.md'), { force: true });
  fs.rmSync(path.join(projectRoot, '.claude'), { recursive: true, force: true });
}

module.exports = { removeClaudeConfig };
