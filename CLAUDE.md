# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 必須コマンド

### 開発

```bash
pnpm dev         # 開発サーバーを起動 (http://localhost:3000)
pnpm build       # プロダクションビルド
pnpm start       # プロダクションサーバーを起動
```

### コード品質

```bash
pnpm lint:check  # ESLintチェック
pnpm lint:fix    # ESLint自動修正
pnpm format:check # Prettierフォーマットチェック
pnpm format:fix   # Prettier自動フォーマット
```

### テスト

```bash
pnpm test        # Vitestテストを実行
pnpm test:e2e    # Playwright E2Eテストを実行
```

## 技術スタック

| カテゴリ               | 技術               |
| ---------------------- | ------------------ |
| パッケージマネージャー | pnpm               |
| フレームワーク         | Next.js App Router |
| CSS                    | Tailwind CSS       |
| UIライブラリ           | shadcn/ui          |
| バリデーション         | Valibot            |
| フォーム               | React Hook Form    |
| テストランナー         | Vitest             |
| コンポーネントテスト   | Testing Library    |
| E2Eテスト              | Playwright         |
| VRT                    | Playwright         |
| DBクライアント         | Prisma             |
| 認証・DB               | Supabase           |
| Linter                 | Biome              |
| Formatter              | Prettier           |
| 時刻ライブラリ         | date-fns           |
| アイコン               | lucide-react       |

## アーキテクチャ概要

認証機能と管理画面を備えたNext.js 15のWebアプリケーションテンプレートです。

### プロジェクト構造

- `src/app/` - Next.js App Routerのページとレイアウト
  - `(card-layout)/` - 公開認証ページ（ログイン、登録、パスワードリセット）
  - `admin/` - 保護された管理画面（ユーザー管理機能付き）
- `src/components/` - 再利用可能なコンポーネント
  - `ui/` - shadcn/uiコンポーネント
  - `form/` - React Hook Form連携のカスタムフォームコンポーネント
- `src/lib/` - ユーティリティと設定
  - `supabase/` - Supabaseクライアント設定（server.tsとbrowser.ts）
  - `server-action.ts` - 型安全なサーバーアクションラッパー
  - `result.ts` - エラーハンドリング用のResult型

### 認証フロー

- Supabase Authによるメール/パスワード認証
- ミドルウェア（`src/app/middleware.ts`）でセッション管理
- 一般ユーザー（`/login`）と管理者（`/admin/login`）で別フロー
- 保護されたルートは自動的にログインページへリダイレクト

## 命名規則

### 共通

- 技術要素のネーミングを避ける
  - e.g. FooComponent
- デザインパターンを採用した場合はデザインパターンの名前を明示する
  - Container/Presentational Pattern -> FooContainer / FooPresenter

### ファイル

- ケバブケース
- ブラウザテストは `*.browser.test.ts`
- Nodeテストは `*.node.test.ts`
- E2Eテストは `*.e2e.test.ts`

### コンポーネント

- ユーザー視点での名前

## 設計指針

### 共通

- ファイル配置はコロケーションを最優先とする
- 共通で使うものはcomponentsに切り出し共通利用する
- interfaceよりtypeを優先する
- classNameの動的な統合はcn関数を使用する
- エラーメッセージは日本語で表示
- 関数定義時の型は常に明示する

### フロントエンド

#### 一般

- Suspense とスケルトンを活用しローディング状態を明示する
  - スケルトンは CLS が発生しないように実装する
- useMemo / memo / useCallback は React コンパイラーに任せるため使用を避ける
- Container/Presentational パターンを利用する
  - Container : RSC でデータフェッチの責務を負う
  - Presenter: コンポーネントが表示の責務を負うことを優先する(RSC/クライアントコンポーネント)
- React のベストプラクティスを採用する
- Nextjs のベストプラクティスを採用する
- アクセシビリティーを考慮する

#### RSC

- RSC ファーストの設計を行う
- データフェッチは data/フォルダに関数を作成して呼び出すだけにする

#### クライアントコンポーネント

- インタラクティブな要素はクライアントコンポーネントに切り出す
- 基本的に直接サーバーアクションをインポートして呼び出し、引数として受け取らない
- ロジックはカスタム hook に切り出す
- useEffect は最小限に使用する
  - 公式ドキュメントの「そのエフェクトは不要かも」を参考にする

#### その他

##### page.tsx

- 必ず RSC として実装する
- NextPage コンポーネントを定義し、デフォルトエクスポート
- Nextjs の固有機能に関する責務を負う
  - SearchParams のパースや next/\* パッケージの機能を利用するもの
- 実際のページの機能は ○○Page 関数として別ファイルに切り出して呼び出す

#### ○○-page.tsx

- ○○Page 関数を定義しエクスポートする
- RSC で実装する

### バックエンド

#### データフェッチ

- 使用するファイルと同じ階層の `_data` フォルダにファイルを配置
- 取得するデータごとの ○○.ts というファイルを作成し、専用のフェッチ関数を作成する
- それぞれの関数を `index.ts` で export する

#### ルートハンドラー

- Server Action で代替できない場合にのみ使用する

#### サーバーアクション

- 使用するファイルと同じ階層の `_actions` フォルダにファイルを配置
- `index.ts` というファイルを作成し、`index.ts` で export する
- 操作するサーバーアクションごとの ○○-action.ts ファイルを作成し、○○Action を定義
  - nextjs 固有機能に関するハンドリング
  - 受け取ったパラメーターをパースし、実際の処理に引き渡す
  - try-catch で包括的なエラーハンドリング
  - サーバーコンポーネントの form から直接呼び出される場合は FormData を受け取る
  - それ以外の場合は基本的に Object を受け取る
- 実際の処理は ○○.ts ファイルの ○○ 関数として実装する
- レスポンスは Result 型とし、 succeed() と fail() 関数を使う

ファイル構成例：

```
_actions/
├── index.ts
├── evaluate-action.ts
├── evaluate.ts
```

## テスト

### 共通

- 内部仕様ではなく振る舞いをテストする
- コンポーネントの結合テストを優先する
- テスティングトロフィーの優先順位に従う

### ユニットテスト

- テストの対象と同じ階層に配置
- test/expect を使用

### コンポーネントテスト

- スタイルはVRTで行うためコンポーネントテストから除外する
  - classNameの付与されているかのテストなど
- クライアントコンポーネント、もしくはユニバーサルコンポーネントを対象とする
  - asyncコンポーネントをRSCと判定する
- テストの対象と同じ階層に配置する
- 結合テストはなるべく上位のコンポーネントから行い、多くが結合した状態で実施する
- Mockは最小限にする
- 原則としてアクセシビリティによるクエリのみを使用する

### E2E

- 重要なシナリオについてのみ作成する
- 原則としてアクセシビリティによるクエリのみを使用する

### VRT

- Playwrightを使用

## 開発方法

### フロー

1. 詳細な作業計画を立て合意を得る
2. 必要なテストケースを洗い出し合意を得る
3. テストを実装し合意を得る
4. 処理の設計方針を検討し合意を得る
5. 処理を実装する
6. lint・テストを実施
   - テストが通るまで修正、テスト実施を繰り返す
7. コーディング内容を俯瞰して確認し、リファクタリングできる箇所を修正する
   - 修正が完了したら`pnpm test`コマンドを実施する
8. lint-テストを実施
   - テストが通るまで修正、テスト実施を繰り返す

### 補足

- lintエラーの修正は3回試みて治らなかったら無視する
- テストを3回実施・修正しても通らなかったら無視する
