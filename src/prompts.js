const { text, select, confirm, cancel, isCancel } = require('@clack/prompts');
const { ROUTING, STORE, STYLING } = require('./constants');

function handleCancel(value) {
  if (isCancel(value)) {
    cancel('Скасовано');
    process.exit(0);
  }
}

async function askProjectName() {
  const value = await text({
    message: 'Назва проекту:',
    placeholder: 'my-app',
    hint: 'Тільки латинські літери, цифри, _ та -',
    validate(v) {
      if (!v.trim()) return 'Назва не може бути порожньою';
      if (!/^[a-zA-Z0-9_-]+$/.test(v)) return 'Тільки латинські літери, цифри, _ та -';
    },
  });
  handleCancel(value);
  return value.trim();
}

async function askRouting() {
  const value = await select({
    message: 'Тип роутінгу:',
    options: [
      {
        value: ROUTING.EXPO_ROUTER,
        label: 'Expo Router',
        hint: 'file-based routing — папка app/, _layout.tsx (рекомендовано)',
      },
      {
        value: ROUTING.REACT_NAVIGATION,
        label: 'React Navigation',
        hint: 'ручна навігація — stack, bottom tabs, drawer',
      },
    ],
  });
  handleCancel(value);
  return value;
}

async function askStore() {
  const value = await select({
    message: 'Менеджер стану:',
    options: [
      {
        value: STORE.REDUX,
        label: 'Redux Toolkit',
        hint: 'battle-tested, DevTools, три слайси (app, user, toast)',
      },
      {
        value: STORE.ZUSTAND,
        label: 'Zustand',
        hint: 'мінімалістичний, менше boilerplate, три стори',
      },
    ],
  });
  handleCancel(value);
  return value;
}

async function askStyling() {
  const value = await select({
    message: 'Стилізація:',
    options: [
      {
        value: STYLING.STYLESHEET,
        label: 'StyleSheet',
        hint: 'нативний React Native, без додаткових залежностей',
      },
      {
        value: STYLING.TAILWIND,
        label: 'Tailwind (NativeWind v4)',
        hint: 'utility-first класи через className',
      },
    ],
  });
  handleCancel(value);
  return value;
}

async function askAddClaude() {
  const value = await confirm({
    message: 'Додати налаштування Claude (CLAUDE.md + .claude/)?',
    initialValue: true,
  });
  handleCancel(value);
  return value;
}

async function askProjectPath() {
  const value = await text({
    message: 'Шлях для створення проекту:',
    placeholder: '. або /Users/me/projects',
    hint: 'Enter — поточна директорія',
    defaultValue: '',
  });
  handleCancel(value);
  return value.trim();
}

async function collectAnswers() {
  const projectName = await askProjectName();
  const routing = await askRouting();
  const store = await askStore();
  const styling = await askStyling();
  const addClaude = await askAddClaude();
  const projectPath = await askProjectPath();

  return { projectName, routing, store, styling, addClaude, projectPath };
}

module.exports = { collectAnswers };
