#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import ora from 'ora';

const program = new Command();

interface Answers {
  projectName: string;
  router: 'pages' | 'app';
  typescript: boolean;
  installDeps: boolean;
}

program
  .name('create-next-rkk')
  .description('Create a new Next.js app with rkk-next pre-configured')
  .version('1.0.0')
  .argument('[project-name]', 'name of your project')
  .action(async (projectName?: string) => {
    console.log(chalk.bold.cyan('\n🚀 Create RKK Next.js App\n'));

    const answers: Answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: projectName || 'my-rkk-app',
        when: !projectName,
      },
      {
        type: 'list',
        name: 'router',
        message: 'Which Next.js router do you want to use?',
        choices: [
          { name: 'App Router (Recommended)', value: 'app' },
          { name: 'Pages Router', value: 'pages' },
        ],
        default: 'app',
      },
      {
        type: 'confirm',
        name: 'typescript',
        message: 'Use TypeScript?',
        default: true,
      },
      {
        type: 'confirm',
        name: 'installDeps',
        message: 'Install dependencies now?',
        default: true,
      },
    ]);

    const targetDir = projectName || answers.projectName;

    // Step 1: Create Next.js app
    const spinner = ora('Creating Next.js application...').start();

    try {
      const nextFlags = [
        '--use-npm',
        answers.typescript ? '--typescript' : '--javascript',
        answers.router === 'app' ? '--app' : '',
        '--no-tailwind',
        '--eslint',
        '--src-dir',
      ].filter(Boolean).join(' ');

      execSync(
        `npx create-next-app@latest ${targetDir} ${nextFlags} --yes`,
        { stdio: 'pipe' }
      );

      spinner.succeed('Next.js application created!');

      // Step 2: Install rkk-next
      if (answers.installDeps) {
        spinner.start('Installing rkk-next...');
        process.chdir(targetDir);
        execSync('npm install rkk-next', { stdio: 'pipe' });
        spinner.succeed('rkk-next installed!');
      }

      // Step 3: Setup template files
      spinner.start('Setting up rkk-next configuration...');
      setupTemplateFiles(targetDir, answers.router, answers.typescript);
      spinner.succeed('Configuration complete!');

      // Success message
      console.log(chalk.green.bold('\n✨ Success! Created ' + targetDir));
      console.log(chalk.cyan('\n📁 Inside your project directory:\n'));
      console.log(chalk.white('  cd ' + targetDir));

      if (!answers.installDeps) {
        console.log(chalk.white('  npm install'));
      }

      console.log(chalk.white('  npm run dev'));

      console.log(chalk.cyan('\n📚 Documentation:'));
      console.log(chalk.white('  https://github.com/ROHIT8759/rkk-next\n'));

      console.log(chalk.yellow('Happy coding! 🎉\n'));
    } catch (error: any) {
      spinner.fail('Failed to create application');
      console.error(chalk.red('\nError:'), error.message);
      process.exit(1);
    }
  });

function setupTemplateFiles(
  projectDir: string,
  router: 'pages' | 'app',
  typescript: boolean
) {
  const ext = typescript ? 'tsx' : 'jsx';
  const srcDir = path.join(projectDir, 'src');

  if (router === 'pages') {
    // Setup Pages Router
    const pagesDir = path.join(srcDir, 'pages');

    // _app file
    const appContent = `import type { AppProps } from 'next/app';
import { reportWebVitals } from 'rkk-next';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export { reportWebVitals };
`;

    // index.tsx with rkk-next
    const indexContent = `import { MetaManager, SmartLink, OptimizedImage } from 'rkk-next';

export default function Home() {
  return (
    <>
      <MetaManager
        title="Home | My App"
        description="Built with rkk-next and Next.js"
        keywords="nextjs, seo, performance"
      />

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Welcome to Your RKK Next.js App!</h1>
        <p>This app is pre-configured with rkk-next for SEO, performance, and routing optimization.</p>
        
        <SmartLink href="/about">
          Learn More →
        </SmartLink>
      </main>
    </>
  );
}
`;

    fs.writeFileSync(path.join(pagesDir, `_app.${ext}`), appContent);
    fs.writeFileSync(path.join(pagesDir, `index.${ext}`), indexContent);
  } else {
    // Setup App Router
    const appDir = path.join(srcDir, 'app');

    // layout.tsx
    const layoutContent = `import { generateAppMetadata } from 'rkk-next';
import './globals.css';

export const metadata = generateAppMetadata({
  title: 'My RKK App',
  description: 'Built with rkk-next and Next.js',
  image: '/og-image.png',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
`;

    // page.tsx
    const pageContent = `import { JsonLd, OptimizedImage } from 'rkk-next';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      <JsonLd
        type="WebSite"
        data={{
          name: "My RKK App",
          url: "https://myapp.com",
        }}
      />

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h1>Welcome to Your RKK Next.js App!</h1>
        <p>This app is pre-configured with rkk-next for SEO, performance, and routing optimization.</p>
        
        <Link href="/about">Learn More →</Link>
      </main>
    </>
  );
}
`;

    fs.writeFileSync(path.join(appDir, `layout.${ext}`), layoutContent);
    fs.writeFileSync(path.join(appDir, `page.${ext}`), pageContent);
  }

  // Create next.config.js with rkk-next
  const configContent = `/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextConfig;
`;

  fs.writeFileSync(path.join(projectDir, 'next.config.js'), configContent);
}

program.parse(process.argv);
