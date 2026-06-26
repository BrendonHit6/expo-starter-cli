#!/usr/bin/env node

const { intro, outro, log, spinner } = require('@clack/prompts');
const pc = require('picocolors');
const { collectAnswers } = require('./src/prompts');
const { resolveProjectPath, createProject, runInstall } = require('./src/project');
const { removeClaudeConfig } = require('./src/claude');

const ROUTING_LABEL = {
  'expo-router': 'Expo Router      (file-based, app/)',
  'react-navigation': 'React Navigation (stack / tabs / drawer)',
};

const STORE_LABEL = {
  redux: 'Redux Toolkit',
  zustand: 'Zustand',
};

async function main() {
  console.log();
  intro(pc.bgCyan(pc.black(' Create Mobile App ')));

  const answers = await collectAnswers();
  const { projectName, routing, store, addClaude, projectPath } = answers;

  const resolvedPath = resolveProjectPath(projectPath, projectName);

  console.log();
  log.info(
    pc.bold('Конфігурація:') + '\n' +
    `  Назва:    ${pc.cyan(projectName)}\n` +
    `  Роутінг:  ${ROUTING_LABEL[routing]}\n` +
    `  Стор:     ${STORE_LABEL[store]}\n` +
    `  Claude:   ${addClaude ? pc.green('так') : pc.dim('ні')}\n` +
    `  Шлях:     ${resolvedPath}`
  );
  console.log();

  try {
    const s = spinner();

    s.start('Копіювання шаблону...');
    const destDir = await createProject({ routing, store, projectName, projectPath });
    s.stop(pc.green('Шаблон скопійовано'));

    if (!addClaude) {
      s.start('Видалення Claude конфігурації...');
      removeClaudeConfig(destDir);
      s.stop(pc.green('Claude конфігурацію видалено'));
    }

    s.start('Встановлення залежностей (npm install)...');
    s.stop('');
    await runInstall(destDir);

    console.log();
    outro(
      pc.green(`✓ Проект створено: ${resolvedPath}`) + '\n\n' +
      pc.bold('  Наступні кроки:') + '\n' +
      `  cd ${projectPath ? projectPath + '/' : ''}${projectName}\n` +
      `  npx expo start`
    );
  } catch (err) {
    outro(pc.red(`Помилка: ${err.message}`));
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
