const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

function resolveProjectPath(pathInput, projectName) {
  if (!pathInput) return path.join(process.cwd(), projectName);
  if (pathInput === '.') return path.join(process.cwd(), projectName);
  return path.join(path.resolve(pathInput), projectName);
}

function resolveTemplateName(routing, store) {
  const routingKey = routing === 'expo-router' ? 'file-base-routing' : 'react-navigation';
  return `expo-${routingKey}-${store}`;
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

async function createProject({ routing, store, projectName, projectPath }) {
  const destDir = resolveProjectPath(projectPath, projectName);
  const templateName = resolveTemplateName(routing, store);
  const templateDir = path.join(TEMPLATES_DIR, templateName);

  copyTemplate(templateDir, destDir);
  updatePackageJson(destDir, projectName);

  return destDir;
}

module.exports = { resolveProjectPath, createProject, runInstall };
