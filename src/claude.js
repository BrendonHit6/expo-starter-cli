const fs = require('fs');
const path = require('path');
const { CLAUDE_FILES } = require('./constants');

function removeClaudeConfig(projectRoot) {
  fs.rmSync(path.join(projectRoot, CLAUDE_FILES.CONFIG_FILE), { force: true });
  fs.rmSync(path.join(projectRoot, CLAUDE_FILES.CONFIG_DIR), { recursive: true, force: true });
}

module.exports = { removeClaudeConfig };
