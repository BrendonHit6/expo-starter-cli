#!/usr/bin/env node

const { intro, outro, log, spinner, confirm, isCancel } = require('@clack/prompts');
const pc = require('picocolors');
const { collectAnswers } = require('./src/prompts');
const { resolveProjectPath, resolveTemplateName, isDirNonEmpty, createProject, runInstall } = require('./src/project');
const { removeClaudeConfig } = require('./src/claude');
const { ROUTING_LABEL, STORE_LABEL, STYLING_LABEL, PKG_MANAGER_LABEL, PRESETS } = require('./src/constants');
const pkg = require('./package.json');

const rawArgs = process.argv.slice(2);
const flags = new Set();
const flagValues = {};
const positionals = [];

for (let i = 0; i < rawArgs.length; i++) {
  if (rawArgs[i].startsWith('--')) {
    const key = rawArgs[i].slice(2);
    if (i + 1 < rawArgs.length && !rawArgs[i + 1].startsWith('-')) {
      flagValues[key] = rawArgs[i + 1];
      i++;
    } else {
      flags.add(key);
    }
  } else if (rawArgs[i].startsWith('-') && rawArgs[i].length === 2) {
    flags.add(rawArgs[i].slice(1));
  } else {
    positionals.push(rawArgs[i]);
  }
}

const skipInstall    = flags.has('skip-install');
const dryRun         = flags.has('dry-run');
const presetName     = flagValues['preset'];
const projectNameArg = positionals[0];

if (flags.has('version') || flags.has('v')) {
  console.log(pkg.version);
  process.exit(0);
}

if (flags.has('help') || flags.has('h') || positionals[0] === 'help') {
  console.log(`
${pc.bold('Create Mobile App')} ${pc.dim('v' + pkg.version)}

${pc.bold('Використання:')}
  npm start
  npm start -- [назва-проекту] [опції]

${pc.bold('Довідка:')}
  npm run help
  npm start help

${pc.bold('Опції:')}
  ${pc.cyan('--preset <name>')}      Пропустити всі питання, використати готову конфігурацію
  ${pc.cyan('--dry-run')}            Показати що буде створено, не записуючи файлів
  ${pc.cyan('--skip-install')}       Не запускати установку залежностей
  ${pc.cyan('--version')}, ${pc.cyan('-v')}       Вивести версію
  ${pc.cyan('--help')}, ${pc.cyan('-h')}          Вивести цю довідку

${pc.bold('Пресети:')}
${Object.entries(PRESETS).map(([name, { routing, store, styling }]) =>
  `  ${pc.cyan(name)}\n` +
  `  ${pc.dim(`роутінг: ${ROUTING_LABEL[routing]}`)}\n` +
  `  ${pc.dim(`стор:    ${STORE_LABEL[store]}`)}\n` +
  `  ${pc.dim(`стилі:   ${STYLING_LABEL[styling]}`)}`
).join('\n\n')}

${pc.bold('Приклади:')}
  ${pc.dim('$')} npm start
  ${pc.dim('$')} npm start -- my-app --preset expo-router-redux-tailwind
  ${pc.dim('$')} npm start -- my-app --preset react-navigation-zustand-stylesheet --skip-install
  ${pc.dim('$')} npm start -- my-app --preset expo-router-zustand-tailwind --dry-run
`);
  process.exit(0);
}

const preset = presetName != null ? PRESETS[presetName] : null;
if (presetName != null && !preset) {
  console.error(pc.red(`Невідомий пресет: "${presetName}"`));
  console.error(pc.dim('Доступні пресети:'));
  Object.keys(PRESETS).forEach(p => console.error(pc.dim(`  ${p}`)));
  process.exit(1);
}

async function main() {
  const startedAt = Date.now();

  console.log();
  intro(
    pc.bgCyan(pc.black(' Create Mobile App ')) +
    (dryRun ? ' ' + pc.bgYellow(pc.black(' DRY RUN ')) : '')
  );

  const answers = await collectAnswers({ preset, projectNameArg });
  const { projectName, routing, store, styling, addClaude, packageManager, projectPath } = answers;

  const resolvedPath = resolveProjectPath(projectPath, projectName);
  const templateName = resolveTemplateName(routing, store, styling);

  if (!dryRun && isDirNonEmpty(resolvedPath)) {
    console.log();
    log.warn(`Папка вже існує і не порожня:\n  ${pc.yellow(resolvedPath)}`);
    console.log();
    const overwrite = await confirm({ message: 'Перезаписати вміст папки?' });
    if (!overwrite || isCancel(overwrite)) {
      outro(pc.yellow('Скасовано'));
      process.exit(0);
    }
  }

  console.log();
  log.info(
    pc.bold('Конфігурація:') + '\n' +
    `  Назва:    ${pc.cyan(projectName)}\n` +
    `  Роутінг:  ${ROUTING_LABEL[routing]}\n` +
    `  Стор:     ${STORE_LABEL[store]}\n` +
    `  Стилі:    ${STYLING_LABEL[styling]}\n` +
    `  Claude:   ${addClaude ? pc.green('так') : pc.dim('ні')}\n` +
    `  Пакети:   ${PKG_MANAGER_LABEL[packageManager]}${skipInstall ? pc.dim(' (пропущено)') : ''}\n` +
    `  Шлях:     ${resolvedPath}`
  );
  console.log();

  if (dryRun) {
    log.info(
      pc.bold('Файли не будуть створені. Буде використано:') + '\n' +
      `  Шаблон:   ${pc.cyan(templateName)}\n` +
      `  Claude:   ${addClaude ? pc.green('так') : pc.dim('ні')}\n` +
      `  Install:  ${skipInstall ? pc.dim('пропущено') : packageManager + ' install'}`
    );
    console.log();
    outro(pc.yellow('Dry-run завершено — жодного файлу не створено'));
    return;
  }

  try {
    const s = spinner();

    s.start('Копіювання шаблону...');
    const destDir = await createProject({ routing, store, styling, projectName, projectPath, addClaude });
    s.stop(pc.green('Шаблон скопійовано'));

    if (!addClaude) {
      s.start('Видалення Claude конфігурації...');
      removeClaudeConfig(destDir);
      s.stop(pc.green('Claude конфігурацію видалено'));
    }

    if (!skipInstall) {
      log.step(`Встановлення залежностей (${packageManager} install)...`);
      await runInstall(destDir, packageManager);
      log.success('Залежності встановлено');
    }

    const elapsed = Math.round((Date.now() - startedAt) / 1000);
    const cdPath = projectPath ? `${projectPath}/${projectName}` : projectName;
    console.log();
    outro(
      pc.green(`✓ Проект створено за ${elapsed}с: ${resolvedPath}`) + '\n\n' +
      pc.bold('  Наступні кроки:') + '\n' +
      `  ${pc.cyan('cd ' + cdPath)}\n` +
      (skipInstall ? `  ${pc.cyan(packageManager + ' install')}\n` : '') + '\n' +
      pc.dim('  # запуск:') + '\n' +
      `  ${pc.white('npx expo start')}          ${pc.dim('— вибір платформи в меню')}\n` +
      `  ${pc.white('npx expo start --ios')}     ${pc.dim('— iOS симулятор')}\n` +
      `  ${pc.white('npx expo start --android')} ${pc.dim('— Android емулятор')}\n` +
      `  ${pc.white('npx expo start --web')}     ${pc.dim('— браузер')}\n\n` +
      pc.dim('  # перевірка типів:') + '\n' +
      `  ${pc.white('npx tsc --noEmit')}`
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
