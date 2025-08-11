# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

Next.js App Router を使用したモダンな Web アプリケーションテンプレートです。
Server Components、Server Actions を活用し、高パフォーマンスで保守性の高いアプリケーション開発を実現します。

### 主な特徴

- **RSC ファースト**: React Server Components を最大限活用
- **型安全**: TypeScript による厳密な型チェック
- **テスト重視**: Vitest、Testing Library、Playwright による包括的なテスト
- **DX 最適化**: Turbo Repo によるビルドキャッシュ、pnpm による高速な依存関係管理

### 環境構築

```bash
# 依存関係のインストール
pnpm install

# データベースのセットアップ
pnpm db:start    # Supabase起動
pnpm db:migrate  # マイグレーション実行
pnpm db:seed     # シードデータ投入

# 開発サーバー起動
pnpm dev
```

---

## 共通コマンド

```bash
# 開発
pnpm dev                # Turbopackで開発サーバー起動
pnpm build              # プロダクションビルド
pnpm start              # プロダクションサーバー起動
pnpm lint:fix           # ESLint 自動修正
pnpm lint:check         # ESLint チェック実行
pnpm format:fix         # Prettier 自動修正
pnpm format:check       # Prettier チェック
pnpm type:check         # TypeScript型チェック

# 依存関係
pnpm install      # 全依存関係をインストール

# テスト（将来実装予定）
pnpm test         # Vitestでユニットテスト実行
pnpm test:e2e     # Playwrightでe2eテスト実行
```

## エージェント振り分け方針

### Server Action

- ミューテーションを伴う操作は基本的に Server Action で実装する
- Server Action の実装が必要な場合は .claude/agents/nextjs-server-action-expert.md のエージェントを使用

### Route Handler

- Route Handler での実装は極力避ける
  - データフェッチ：RSC で直接実行することを優先
  - ミューテーション：Server Action で実装することを優先
- Route Handler の使用例：
  - クライアントコンポーネントから SWR でのデータフェッチ
  - cron 用のバッチ処理のエントリーポイント
  - ファイルダウンロード用
  - その他 Server Action や RSC で実現できない場合

### UIコンポーネント開発

- フロントエンドのUI実装が必要な場合は .claude/agents/nextjs-ui-developer.md のエージェントを使用

### テスト作成

- テストの作成が必要な場合は .claude/agents/test-creation-expert.md のエージェントを使用
- Vitest、Testing Library、Playwrightを使用した網羅的なテスト作成を行う

## コーディング規約

- コメント：コードで自明なことは避け、「なぜ」そうしているのかを説明
- 型の定義は type で定義する
- Enum を避け、const Object で定義を行う
- 関数の戻り値は明示する

## 技術スタック

以下のパッケージは常にインストール済みで利用可能です。

| カテゴリ               | 技術                        |
| ---------------------- | --------------------------- |
| パッケージマネージャー | pnpm                        |
| フレームワーク         | Next.js App Router          |
| CSS                    | Tailwind CSS                |
| UI ライブラリ          | shadcn/ui                   |
| バリデーション         | Valibot                     |
| フォーム               | React Hook Form             |
| テストランナー         | Vitest                      |
| コンポーネントテスト   | Testing Library             |
| E2E テスト             | Playwright                  |
| VRT                    | Playwright                  |
| DB クライアント        | Prisma                      |
| 認証・DB               | Supabase                    |
| Linter                 | ESLint                      |
| Formatter              | Prettier                    |
| 時刻ライブラリ         | date-fns                    |
| アイコン               | lucide-react                |
| CI/CD                  | GitHub Actions              |
| モノレポ管理           | Turbo Repo & pnpm workspace |
| ビルドキャッシュ       | Turbo Repo                  |

## ファイル命名規則

- **ファイル名**: kebab-case（例: user-profile.tsx）
