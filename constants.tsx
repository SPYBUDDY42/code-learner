
import React from 'react';
import { World, LanguageType, Difficulty } from './types';

export const WORLDS_DATA: World[] = [
  {
    id: 'w1',
    language: LanguageType.PYTHON,
    description: 'The Serpent Matrix. Master automation logic.',
    isUnlocked: true,
    missions: [
      {
        id: 'py1', title: 'Output Link', description: 'Send code to terminal.', story: 'Establish a handshake.', xpReward: 100, difficulty: Difficulty.ROOKIE, starterCode: '# Print "999"\n', solutionKeywords: ['print', '999'], hint: 'print("999")', challengeGoal: 'Print "999".', tutorialSteps: [{ text: "Use:", codeSnippet: "print('123')" }]
      },
      {
        id: 'py2', title: 'Neural Buffer', description: 'Store data.', story: 'Allocate a slot.', xpReward: 150, difficulty: Difficulty.ROOKIE, starterCode: '# Set key to 42\n', solutionKeywords: ['key', '=', '42'], hint: 'key = 42', challengeGoal: 'Set key to 42.', tutorialSteps: [{ text: "Use:", codeSnippet: "val = 10" }]
      },
      {
        id: 'py3', title: 'Logic Gate', description: 'Conditional bypass.', story: 'Bypass logic.', xpReward: 200, difficulty: Difficulty.SKILLED, starterCode: '# If level is 100 print "OPEN"\nlevel = 100\n', solutionKeywords: ['if', '100', 'print', 'OPEN'], hint: 'if level == 100: print("OPEN")', challengeGoal: 'If level is 100 print "OPEN".', tutorialSteps: [{ text: "Use:", codeSnippet: "if x == 5: print('YES')" }]
      },
      {
        id: 'py4', title: 'Data Array', description: 'List extraction.', story: 'Multiple targets.', xpReward: 250, difficulty: Difficulty.SKILLED, starterCode: '# List "targets" with [1, 2, 3]\n', solutionKeywords: ['targets', '=', '[1, 2, 3]'], hint: 'targets = [1, 2, 3]', challengeGoal: 'List "targets" with [1, 2, 3].', tutorialSteps: [{ text: "Use:", codeSnippet: "a = [0, 0]" }]
      },
      {
        id: 'py5', title: 'Subroutine', description: 'Reusable hack.', story: 'Define behavior.', xpReward: 300, difficulty: Difficulty.ELITE, starterCode: '# Function "hack" prints "OK"\n', solutionKeywords: ['def', 'hack', 'print', 'OK'], hint: 'def hack(): print("OK")', challengeGoal: 'Function "hack" prints "OK".', tutorialSteps: [{ text: "Use:", codeSnippet: "def start(): print('HI')" }]
      },
      {
        id: 'py6_boss',
        title: 'SERPENT OVERLORD',
        description: 'Automated Firewall Bypass.',
        story: 'The core firewall rotates its key. You must build a script that checks a list of ports and opens the "Master" node.',
        xpReward: 1000,
        difficulty: Difficulty.MASTER,
        isBoss: true,
        starterCode: '# BOSS PROGRAM: Port Scanner & Unlocker\nports = [80, 443, 8080]\n\n# Loop through ports and if port is 8080, print "UNLOCK_MASTER"\n',
        solutionKeywords: ['for', 'ports', 'if', '8080', 'print', 'UNLOCK_MASTER'],
        hint: 'Use a for-loop on ports, then an if-statement inside to check if p == 8080.',
        challengeGoal: 'Write a program that iterates through the "ports" list and prints "UNLOCK_MASTER" only when the port is 8080.',
        tutorialSteps: [{ text: "Combine a loop and a condition:", codeSnippet: "for p in ports:\n  if p == 1: print('Found')" }]
      }
    ]
  },
  {
    id: 'w2',
    language: LanguageType.JAVASCRIPT,
    description: 'The Web Weave. Real-time reality manipulation.',
    isUnlocked: true,
    missions: [
      { id: 'js1', title: 'Variable Buffer', description: 'Store data.', story: 'Memory slot.', xpReward: 150, difficulty: Difficulty.ROOKIE, starterCode: '// let id = 77\n', solutionKeywords: ['let', 'id', '77'], hint: 'let id = 77;', challengeGoal: 'Set id to 77.', tutorialSteps: [{ text: "Use:", codeSnippet: "let x = 10;" }] },
      { id: 'js2', title: 'DOM Injection', description: 'Change text.', story: 'Visual hack.', xpReward: 200, difficulty: Difficulty.ROOKIE, starterCode: '// alert "HACKED"\n', solutionKeywords: ['alert', 'HACKED'], hint: 'alert("HACKED");', challengeGoal: 'Alert "HACKED".', tutorialSteps: [{ text: "Use:", codeSnippet: "alert('HELLO');" }] },
      { id: 'js3', title: 'Math Processor', description: 'Calculate.', story: 'Bypass math.', xpReward: 250, difficulty: Difficulty.SKILLED, starterCode: '// result = 50 * 2\n', solutionKeywords: ['result', '50', '*', '2'], hint: 'let result = 50 * 2;', challengeGoal: 'Result is 50 * 2.', tutorialSteps: [{ text: "Use:", codeSnippet: "let res = 10 * 5;" }] },
      { id: 'js4', title: 'Array Cluster', description: 'Node lists.', story: 'Collect IDs.', xpReward: 300, difficulty: Difficulty.SKILLED, starterCode: '// nodes = ["A", "B"]\n', solutionKeywords: ['nodes', 'A', 'B'], hint: 'let nodes = ["A", "B"];', challengeGoal: 'Nodes array ["A", "B"].', tutorialSteps: [{ text: "Use:", codeSnippet: "let list = ['X', 'Y'];" }] },
      { id: 'js5', title: 'Object Core', description: 'Structured data.', story: 'JSON slot.', xpReward: 400, difficulty: Difficulty.ELITE, starterCode: '// vault = {status: "OPEN"}\n', solutionKeywords: ['vault', 'status', 'OPEN'], hint: 'let vault = { status: "OPEN" };', challengeGoal: 'Vault object {status: "OPEN"}.', tutorialSteps: [{ text: "Use:", codeSnippet: "let u = { id: 1 };" }] },
      {
        id: 'js6_boss',
        title: 'SYNTAX ARCHITECT',
        description: 'Neural Link Synchronizer.',
        story: 'The mainframe requires an asynchronous handshake. Build a link object and fire a connection alert.',
        xpReward: 1200,
        difficulty: Difficulty.MASTER,
        isBoss: true,
        starterCode: '// BOSS PROGRAM: System Handshake\n// Create an object "link" with "id: 9" and then print link.id\n',
        solutionKeywords: ['link', 'id', '9', 'console.log', 'link.id'],
        hint: 'Define let link = { id: 9 }; then console.log(link.id);',
        challengeGoal: 'Create an object named "link" with an "id" of 9. Then, output that ID using console.log.',
        tutorialSteps: [{ text: "Access object properties like this:", codeSnippet: "let obj = { x: 1 }; console.log(obj.x);" }]
      }
    ]
  },
  {
    id: 'w3',
    language: LanguageType.SQL,
    description: 'The Data Vault. Query the deep mainframe.',
    isUnlocked: true,
    missions: [
      { id: 'sql1', title: 'Vault Access', description: 'Select all.', story: 'Mainframe query.', xpReward: 150, difficulty: Difficulty.ROOKIE, starterCode: '-- Select from secrets\n', solutionKeywords: ['SELECT', '*', 'secrets'], hint: 'SELECT * FROM secrets;', challengeGoal: 'Select all from secrets.', tutorialSteps: [{ text: "Use:", codeSnippet: "SELECT * FROM users;" }] },
      { id: 'sql2', title: 'Target Search', description: 'Filter rows.', story: 'Find target.', xpReward: 200, difficulty: Difficulty.ROOKIE, starterCode: '-- Filter id 5\n', solutionKeywords: ['WHERE', 'id', '5'], hint: 'SELECT * FROM logs WHERE id = 5;', challengeGoal: 'Filter by id 5.', tutorialSteps: [{ text: "Use:", codeSnippet: "SELECT * FROM data WHERE id = 1;" }] },
      { id: 'sql3', title: 'Identity Theft', description: 'Insert data.', story: 'Fake record.', xpReward: 250, difficulty: Difficulty.SKILLED, starterCode: "-- Insert 'GHOST'\n", solutionKeywords: ['INSERT', 'INTO', 'names', 'GHOST'], hint: "INSERT INTO names VALUES ('GHOST');", challengeGoal: "Insert 'GHOST'.", tutorialSteps: [{ text: "Use:", codeSnippet: "INSERT INTO list VALUES ('USER');" }] },
      { id: 'sql4', title: 'Data Distortion', description: 'Update data.', story: 'Change record.', xpReward: 300, difficulty: Difficulty.SKILLED, starterCode: "-- Update code to '9999'\n", solutionKeywords: ['UPDATE', 'vault', 'SET', 'code', '9999'], hint: "UPDATE vault SET code = '9999';", challengeGoal: "Update code to '9999'.", tutorialSteps: [{ text: "Use:", codeSnippet: "UPDATE system SET val = '0';" }] },
      { id: 'sql5', title: 'Trace Wipe', description: 'Delete logs.', story: 'Clear signs.', xpReward: 400, difficulty: Difficulty.ELITE, starterCode: '-- Delete id 1\n', solutionKeywords: ['DELETE', 'tracking', 'id', '1'], hint: 'DELETE FROM tracking WHERE id = 1;', challengeGoal: 'Delete where id is 1.', tutorialSteps: [{ text: "Use:", codeSnippet: "DELETE FROM logs WHERE id = 10;" }] },
      {
        id: 'sql6_boss',
        title: 'DATA LEVIATHAN',
        description: 'Complete Mainframe Purge.',
        story: 'The administrators are tracking you. You must delete all records of "GHOST" and then verify the remaining "ADMIN" count.',
        xpReward: 1500,
        difficulty: Difficulty.MASTER,
        isBoss: true,
        starterCode: '-- BOSS PROGRAM: Advanced Query Chain\n-- 1. DELETE FROM users WHERE name = \'GHOST\'\n-- 2. SELECT COUNT(*) FROM users WHERE role = \'ADMIN\'\n',
        solutionKeywords: ['DELETE', 'GHOST', 'SELECT', 'COUNT', 'ADMIN'],
        hint: 'Chain a DELETE statement and then a SELECT COUNT(*) statement.',
        challengeGoal: 'Write a two-step query: First, delete all rows where name is "GHOST". Second, count all rows where role is "ADMIN".',
        tutorialSteps: [{ text: "You can combine queries in the hack pad:", codeSnippet: "DELETE FROM x; SELECT * FROM x;" }]
      }
    ]
  },
  {
    id: 'w4',
    language: LanguageType.RUST,
    description: 'The Iron Sector. Memory-safe infiltration.',
    isUnlocked: true,
    missions: [
      { id: 'rs1', title: 'Safety Lock', description: 'Const data.', story: 'Rust safety.', xpReward: 200, difficulty: Difficulty.ROOKIE, starterCode: '// VAL = 500\n', solutionKeywords: ['const', 'VAL', '500'], hint: 'const VAL: i32 = 500;', challengeGoal: 'Const VAL 500.', tutorialSteps: [{ text: "Use:", codeSnippet: "const X: i32 = 1;" }] },
      { id: 'rs2', title: 'Memory Slot', description: 'Mut variables.', story: 'Data change.', xpReward: 250, difficulty: Difficulty.ROOKIE, starterCode: '// mut x = 50\n', solutionKeywords: ['let', 'mut', 'x', '50'], hint: 'let mut x = 50;', challengeGoal: 'Mut variable x 50.', tutorialSteps: [{ text: "Use:", codeSnippet: "let mut a = 1;" }] },
      { id: 'rs3', title: 'Iron Print', description: 'Output.', story: 'Print logs.', xpReward: 300, difficulty: Difficulty.SKILLED, starterCode: '// Print "RUST-SAFE"\n', solutionKeywords: ['println!', 'RUST-SAFE'], hint: 'println!("RUST-SAFE");', challengeGoal: 'Print "RUST-SAFE".', tutorialSteps: [{ text: "Use:", codeSnippet: "println!(\"HI\");" }] },
      { id: 'rs4', title: 'Function Core', description: 'Blocks.', story: 'Logic blocks.', xpReward: 350, difficulty: Difficulty.SKILLED, starterCode: '// fn init\n', solutionKeywords: ['fn', 'init'], hint: 'fn init() {}', challengeGoal: 'Define fn init.', tutorialSteps: [{ text: "Use:", codeSnippet: "fn main() {}" }] },
      { id: 'rs5', title: 'Safe Int', description: 'Types.', story: 'Precise data.', xpReward: 450, difficulty: Difficulty.ELITE, starterCode: '// count as i64 = 99\n', solutionKeywords: ['let', 'count', 'i64', '99'], hint: 'let count: i64 = 99;', challengeGoal: 'Let count: i64 = 99.', tutorialSteps: [{ text: "Use:", codeSnippet: "let v: i32 = 0;" }] },
      {
        id: 'rs6_boss',
        title: 'THE BORROW CHECKER',
        description: 'Memory Lockdown.',
        story: 'The system is leaking memory. You must encapsulate the vault access within a struct and implement an unlock method.',
        xpReward: 1800,
        difficulty: Difficulty.MASTER,
        isBoss: true,
        starterCode: '// BOSS PROGRAM: Safe Vault Implementation\nstruct Vault { id: i32 }\n\nimpl Vault {\n    fn unlock(&self) { println!("BOSS_BYPASS"); }\n}\n',
        solutionKeywords: ['struct', 'Vault', 'impl', 'unlock', 'BOSS_BYPASS'],
        hint: 'Define the struct and its implementation with an unlock method that prints the bypass code.',
        challengeGoal: 'Define a "Vault" struct and an "impl" block that contains an "unlock" method printing "BOSS_BYPASS".',
        tutorialSteps: [{ text: "Implementation blocks in Rust:", codeSnippet: "struct S; impl S { fn go(&self){} }" }]
      }
    ]
  },
  {
    id: 'w5',
    language: LanguageType.GO,
    description: 'The Speed Sector. High-concurrency hacking.',
    isUnlocked: true,
    missions: [
      { id: 'go1', title: 'Fast Greet', description: 'Init.', story: 'Engine start.', xpReward: 200, difficulty: Difficulty.ROOKIE, starterCode: '// Print "GO-FAST"\n', solutionKeywords: ['fmt.Println', 'GO-FAST'], hint: 'fmt.Println("GO-FAST")', challengeGoal: 'Print "GO-FAST".', tutorialSteps: [{ text: "Use:", codeSnippet: "fmt.Println(\"HI\")" }] },
      { id: 'go2', title: 'Quick Var', description: 'Short decl.', story: 'Fast save.', xpReward: 250, difficulty: Difficulty.ROOKIE, starterCode: '// id := 808\n', solutionKeywords: ['id', ':=', '808'], hint: 'id := 808', challengeGoal: 'id := 808.', tutorialSteps: [{ text: "Use:", codeSnippet: "x := 1" }] },
      { id: 'go3', title: 'Go Route', description: 'Loops.', story: 'Repeat cycle.', xpReward: 300, difficulty: Difficulty.SKILLED, starterCode: '// Loop 3 times "WAIT"\n', solutionKeywords: ['for', '3', 'WAIT'], hint: 'for i := 0; i < 3; i++ { fmt.Println("WAIT") }', challengeGoal: 'Loop 3 times printing "WAIT".', tutorialSteps: [{ text: "Use:", codeSnippet: "for i := 0; i < 5; i++ {}" }] },
      { id: 'go4', title: 'Logic Jump', description: 'Switch.', story: 'Decisions.', xpReward: 350, difficulty: Difficulty.SKILLED, starterCode: '// Switch code 100\n', solutionKeywords: ['switch', 'code', '100'], hint: 'switch code { case 100: }', challengeGoal: 'Switch code case 100.', tutorialSteps: [{ text: "Use:", codeSnippet: "switch x { case 1: }" }] },
      { id: 'go5', title: 'Package Init', description: 'Define.', story: 'Entry setup.', xpReward: 450, difficulty: Difficulty.ELITE, starterCode: '// package hack\n', solutionKeywords: ['package', 'hack'], hint: 'package hack', challengeGoal: 'Package hack.', tutorialSteps: [{ text: "Use:", codeSnippet: "package main" }] },
      {
        id: 'go6_boss',
        title: 'CONCURRENCY KING',
        description: 'Parallel Node Injection.',
        story: 'The network is too fast for one thread. You must launch a goroutine to inject the payload.',
        xpReward: 2000,
        difficulty: Difficulty.MASTER,
        isBoss: true,
        starterCode: '// BOSS PROGRAM: Concurrent Payload\n// Use "go" keyword to run "inject()" function\n',
        solutionKeywords: ['go', 'inject'],
        hint: 'Simply type: go inject()',
        challengeGoal: 'Initiate a concurrent routine for the "inject" function using the Go keyword.',
        tutorialSteps: [{ text: "Concurrency is simple in Go:", codeSnippet: "go routine()" }]
      }
    ]
  },
  {
    id: 'w6',
    language: LanguageType.HTML_CSS,
    description: 'The UI Matrix. Build the digital facade.',
    isUnlocked: true,
    missions: [
      { id: 'html1', title: 'Header Influx', description: 'Heading.', story: 'Page title.', xpReward: 100, difficulty: Difficulty.ROOKIE, starterCode: '<!-- h1 "DANGER" -->\n', solutionKeywords: ['<h1>', 'DANGER', '</h1>'], hint: '<h1>DANGER</h1>', challengeGoal: 'h1 DANGER.', tutorialSteps: [{ text: "Use:", codeSnippet: "<h1>HI</h1>" }] },
      { id: 'html2', title: 'Text Block', description: 'Paragraph.', story: 'Description.', xpReward: 150, difficulty: Difficulty.ROOKIE, starterCode: '<!-- p "SYSTEM-DOWN" -->\n', solutionKeywords: ['<p>', 'SYSTEM-DOWN', '</p>'], hint: '<p>SYSTEM-DOWN</p>', challengeGoal: 'p SYSTEM-DOWN.', tutorialSteps: [{ text: "Use:", codeSnippet: "<p>HI</p>" }] },
      { id: 'html3', title: 'Color Bypass', description: 'Inline CSS.', story: 'Style change.', xpReward: 200, difficulty: Difficulty.SKILLED, starterCode: '<!-- div color: red -->\n', solutionKeywords: ['style', 'color', 'red'], hint: '<div style="color: red"></div>', challengeGoal: 'div style color red.', tutorialSteps: [{ text: "Use:", codeSnippet: "<div style='color: blue'></div>" }] },
      { id: 'html4', title: 'Link Portal', description: 'Anchor.', story: 'Navigation.', xpReward: 250, difficulty: Difficulty.SKILLED, starterCode: '<!-- link /hack -->\n', solutionKeywords: ['<a', 'href', '/hack'], hint: '<a href="/hack"></a>', challengeGoal: 'Link to /hack.', tutorialSteps: [{ text: "Use:", codeSnippet: "<a href='/'></a>" }] },
      { id: 'html5', title: 'ID Target', description: 'IDs.', story: 'Specific target.', xpReward: 350, difficulty: Difficulty.ELITE, starterCode: '<!-- span id target -->\n', solutionKeywords: ['span', 'id', 'target'], hint: '<span id="target"></span>', challengeGoal: 'span id target.', tutorialSteps: [{ text: "Use:", codeSnippet: "<span id='main'></span>" }] },
      {
        id: 'html6_boss',
        title: 'STYLESHEET PHANTOM',
        description: 'Visual Deception Layer.',
        story: 'You need to build a hidden login form with a secret button.',
        xpReward: 2500,
        difficulty: Difficulty.MASTER,
        isBoss: true,
        starterCode: '<!-- BOSS PROGRAM: Secret HUD -->\n<div id="hud">\n  <button style="display: none">SECURE</button>\n</div>\n',
        solutionKeywords: ['id', 'hud', 'button', 'display', 'none', 'SECURE'],
        hint: 'Ensure your div has id="hud" and your button uses display: none style.',
        challengeGoal: 'Build a HUD container with id "hud" containing a button labeled "SECURE" that is hidden using CSS "display: none".',
        tutorialSteps: [{ text: "Hidden elements in CSS:", codeSnippet: "<div style='display: none'>Secret</div>" }]
      }
    ]
  },
  {
    id: 'w7',
    language: LanguageType.JAVA,
    description: 'The Legacy Core. Secure enterprise systems.',
    isUnlocked: true,
    missions: [
      { id: 'java1', title: 'Class Protocol', description: 'Object.', story: 'Handshake.', xpReward: 200, difficulty: Difficulty.ROOKIE, starterCode: '// Print "JAVA-CORE"\n', solutionKeywords: ['System.out.println', 'JAVA-CORE'], hint: 'System.out.println("JAVA-CORE");', challengeGoal: 'Print JAVA-CORE.', tutorialSteps: [{ text: "Use:", codeSnippet: "System.out.println(\"HI\");" }] },
      { id: 'java2', title: 'Integer Slot', description: 'Numbers.', story: 'ID save.', xpReward: 250, difficulty: Difficulty.ROOKIE, starterCode: '// int code = 1234\n', solutionKeywords: ['int', 'code', '1234'], hint: 'int code = 1234;', challengeGoal: 'int code = 1234.', tutorialSteps: [{ text: "Use:", codeSnippet: "int x = 1;" }] },
      { id: 'java3', title: 'String Stream', description: 'Text.', story: 'Name save.', xpReward: 300, difficulty: Difficulty.SKILLED, starterCode: '// String msg = "SECRET"\n', solutionKeywords: ['String', 'msg', 'SECRET'], hint: 'String msg = "SECRET";', challengeGoal: 'String msg = "SECRET".', tutorialSteps: [{ text: "Use:", codeSnippet: "String s = \"A\";" }] },
      { id: 'java4', title: 'Boolean Lock', description: 'Logic.', story: 'Flag setup.', xpReward: 350, difficulty: Difficulty.SKILLED, starterCode: '// boolean isOpen = true\n', solutionKeywords: ['boolean', 'isOpen', 'true'], hint: 'boolean isOpen = true;', challengeGoal: 'boolean isOpen = true.', tutorialSteps: [{ text: "Use:", codeSnippet: "boolean b = false;" }] },
      { id: 'java5', title: 'Method Entry', description: 'Methods.', story: 'Behavior.', xpReward: 450, difficulty: Difficulty.ELITE, starterCode: '// void run\n', solutionKeywords: ['void', 'run'], hint: 'void run() {}', challengeGoal: 'Define void run().', tutorialSteps: [{ text: "Use:", codeSnippet: "void start() {}" }] },
      {
        id: 'java6_boss',
        title: 'ENTERPRISE ARCHITECT',
        description: 'Static Access Override.',
        story: 'The enterprise mainframe uses static locks. You must define a static main method that executes the bypass.',
        xpReward: 3000,
        difficulty: Difficulty.MASTER,
        isBoss: true,
        starterCode: '// BOSS PROGRAM: Core Entry Point\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("LEGACY_UNLOCKED");\n    }\n}\n',
        solutionKeywords: ['public', 'class', 'static', 'void', 'main', 'LEGACY_UNLOCKED'],
        hint: 'Complete the standard public static void main signature.',
        challengeGoal: 'Create a "Main" class with the standard main entry point that prints "LEGACY_UNLOCKED".',
        tutorialSteps: [{ text: "Every Java app starts with main:", codeSnippet: "public static void main(String[] args) {}" }]
      }
    ]
  },
  {
    id: 'w_fullstack',
    language: LanguageType.JAVASCRIPT,
    description: 'FULL STACK MASTER. Link Frontend to Backend.',
    isUnlocked: true,
    missions: [
      { id: 'fs1', title: 'API Bridge', description: 'Fetch.', story: 'Connect.', xpReward: 500, difficulty: Difficulty.MASTER, starterCode: '// fetch /api/secret\n', solutionKeywords: ['fetch', '/api/secret'], hint: 'fetch("/api/secret")', challengeGoal: 'Fetch /api/secret.', tutorialSteps: [{ text: "Use:", codeSnippet: "fetch('/api')" }] },
      { id: 'fs2', title: 'Async Wait', description: 'Async.', story: 'Handle delay.', xpReward: 550, difficulty: Difficulty.MASTER, starterCode: '// await fetch /v1/auth\n', solutionKeywords: ['await', 'fetch', '/v1/auth'], hint: 'await fetch("/v1/auth")', challengeGoal: 'Await /v1/auth.', tutorialSteps: [{ text: "Use:", codeSnippet: "await fetch('/v')" }] },
      { id: 'fs3', title: 'State Inject', description: 'React.', story: 'Dynamic UI.', xpReward: 600, difficulty: Difficulty.MASTER, starterCode: '// setCount 100\n', solutionKeywords: ['setCount', '100'], hint: 'setCount(100);', challengeGoal: 'setCount(100).', tutorialSteps: [{ text: "Use:", codeSnippet: "setCount(0);" }] },
      { id: 'fs4', title: 'Prop Transfer', description: 'Props.', story: 'Pass data.', xpReward: 700, difficulty: Difficulty.MASTER, starterCode: '// function Comp({id})\n', solutionKeywords: ['props', 'id'], hint: 'function Comp({ id }) {}', challengeGoal: 'Comp with id prop.', tutorialSteps: [{ text: "Use:", codeSnippet: "function C({name}){}" }] },
      { id: 'fs5', title: 'Master Uplink', description: 'POST.', story: 'Send hack.', xpReward: 1000, difficulty: Difficulty.MASTER, starterCode: '// POST to /hack\n', solutionKeywords: ['POST', '/hack'], hint: 'fetch("/hack", {method: "POST"})', challengeGoal: 'POST /hack.', tutorialSteps: [{ text: "Use:", codeSnippet: "fetch('/', {method:'GET'})" }] },
      {
        id: 'fs6_boss',
        title: 'GOD MOD: FULL STACK',
        description: 'Complete Neural Uplink.',
        story: 'The final barrier. You must fetch the auth token, wait for the response, and then update the global state with "AUTHORIZED".',
        xpReward: 5000,
        difficulty: Difficulty.MASTER,
        isBoss: true,
        starterCode: '// BOSS PROGRAM: End-to-End Handshake\n// 1. await fetch("/auth")\n// 2. setState("AUTHORIZED")\n',
        solutionKeywords: ['await', 'fetch', '/auth', 'setState', 'AUTHORIZED'],
        hint: 'Combine an await fetch with a setState call.',
        challengeGoal: 'Asynchronously fetch from "/auth" and then call setState with the string "AUTHORIZED".',
        tutorialSteps: [{ text: "The ultimate stack combination:", codeSnippet: "await fetch('/x'); setStatus('DONE');" }]
      }
    ]
  }
];

export const Icons = {
  Terminal: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2-2v12a2 2 0 002 2z" />
    </svg>
  ),
  Zap: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  User: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  Map: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m6 13l5.447-2.724A1 1 0 0021 16.382V5.618a1 1 0 00-1.447-.894L15 7m-6 13V7m6 10V7" />
    </svg>
  ),
  Award: () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  )
};
