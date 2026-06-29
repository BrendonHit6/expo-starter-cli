const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');
const { ROUTING, CLAUDE_FILES, SKILLS } = require('./constants');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

function resolveProjectPath(pathInput, projectName) {
  if (!pathInput) return path.join(process.cwd(), projectName);
  if (pathInput === '.') return path.join(process.cwd(), projectName);
  return path.join(path.resolve(pathInput), projectName);
}

const ROUTING_TO_TEMPLATE_KEY = {
  [ROUTING.EXPO_ROUTER]: 'file-base-routing',
  [ROUTING.REACT_NAVIGATION]: 'react-navigation',
};

function resolveTemplateName(routing, store, styling) {
  const routingKey = ROUTING_TO_TEMPLATE_KEY[routing];
  return `expo-${routingKey}-${store}-${styling}`;
}

function copyTemplate(templateDir, destDir) {
  if (!fs.existsSync(templateDir)) {
    throw new Error(`Шаблон не знайдено: ${templateDir}`);
  }
  fs.mkdirSync(destDir, { recursive: true });
  fs.cpSync(templateDir, destDir, { recursive: true });
}

function updatePackageJson(destDir, projectName) {
  const pkgPath = path.join(destDir, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.name = projectName;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
}

function copySkills(destDir) {
  for (const skill of Object.values(SKILLS)) {
    const src = path.join(TEMPLATES_DIR, skill.source);
    const dest = path.join(destDir, CLAUDE_FILES.SKILLS_DIR, skill.target);
    if (!fs.existsSync(src)) throw new Error(`Skill не знайдено: ${src}`);
    fs.mkdirSync(dest, { recursive: true });
    fs.cpSync(src, dest, { recursive: true });
  }
}

function runInstall(destDir) {
  return new Promise((resolve, reject) => {
    const proc = spawn('npm', ['install'], { cwd: destDir, stdio: 'inherit' });
    proc.on('close', code => {
      if (code === 0) resolve();
      else reject(new Error(`npm install завершився з кодом ${code}`));
    });
    proc.on('error', reject);
  });
}

async function createProject({ routing, store, styling, projectName, projectPath, addClaude }) {
  const destDir = resolveProjectPath(projectPath, projectName);
  const templateName = resolveTemplateName(routing, store, styling);
  const templateDir = path.join(TEMPLATES_DIR, templateName);

  copyTemplate(templateDir, destDir);
  updatePackageJson(destDir, projectName);

  if (addClaude) copySkills(destDir);

  return destDir;
}

module.exports = { resolveProjectPath, createProject, runInstall };
