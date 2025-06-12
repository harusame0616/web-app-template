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

以下のパッケージは常にインストール済みで利用可能です
| カテゴリ | 技術 |
| ---------------------- | ------------------ |
| パッケージマネージャー | pnpm |
| フレームワーク | Next.js App Router |
| CSS | Tailwind CSS |
| UI ライブラリ | shadcn/ui |
| バリデーション | Valibot |
| フォーム | React Hook Form |
| テストランナー | Vitest |
| コンポーネントテスト | Testing Library |
| E2E テスト | Playwright |
| VRT | Playwright |
| DB クライアント | Prisma |
| 認証・DB | Supabase |
| Linter | Biome |
| Formatter | Prettier |
| 時刻ライブラリ | date-fns |
| アイコン | lucide-react |

## アーキテクチャ概要

認証機能と管理画面を備えた Next.js 15 の Web アプリケーションテンプレートです。

### プロジェクト構造

- `apps/src/web/` - Next.js App Router のページとレイアウト
  - `(card-layout)/` - 公開認証ページ（ログイン、登録、パスワードリセット）
  - `admin/` - 保護された管理画面（ユーザー管理機能付き）
- `apps/web/src/components/` - 再利用可能なコンポーネント
  - `ui/` - shadcn/ui コンポーネント
  - `form/` - React Hook Form 連携のカスタムフォームコンポーネント
- `apps/web/src/lib/` - ユーティリティと設定
  - `supabase/` - Supabase クライアント設定（server.ts と browser.ts）
  - `server-action.ts` - 型安全なサーバーアクションラッパー
  - `result.ts` - エラーハンドリング用の Result 型
- `src/app/` - Next.js App Router のページとレイアウト
  - `(card-layout)/` - 公開認証ページ（ログイン、登録、パスワードリセット）
  - `admin/` - 保護された管理画面（ユーザー管理機能付き）
- `src/components/` - 再利用可能なコンポーネント
  - `ui/` - shadcn/ui コンポーネント
  - `form/` - React Hook Form 連携のカスタムフォームコンポーネント
- `src/lib/` - ユーティリティと設定
  - `supabase/` - Supabase クライアント設定（server.ts と browser.ts）
  - `server-action.ts` - 型安全なサーバーアクションラッパー

### 認証フロー

- Supabase Auth によるメール/パスワード認証
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
- Node テストは `*.node.test.ts`
- E2E テストは `*.e2e.test.ts`

### Enum

- 変数名もプロパティ名もパスカルケース
  例:

```ts
const Foo = {
  Bar: "bar",
  Baz: "baz",
};
```

### コンポーネント

- ユーザー視点での名前

## 設計指針

### 共通

- ファイル配置はコロケーションを最優先とする
- 共通で使うものは components に切り出し共通利用する
- interface より type を優先する
- className の動的な統合は cn 関数を使用する
- エラーメッセージは日本語で表示
- 関数定義時の型は常に明示する
- TypeScript の enum は利用せず const オブジェクトを利用する

### フロントエンド

#### 一般

- Suspense とスケルトンを活用しローディング状態を明示する
  - スケルトンは CLS が発生しないように実装する
- useMemo / memo / useCallback は React コンパイラーに任せるため使用を避ける
- データの取得がある場合 Container/Presentational パターンを利用する
  - Container : RSC でデータフェッチの責務を負う
  - Presenter: コンポーネントが表示の責務を負うことを優先する(RSC/クライアントコンポーネント)
  - データ取得層がない場合は Container/Presenter を分けずに作成する
    - データ取得があるある場合 FooContainer / FooPresenter
    - データ取得がない場合：Foo
      - データ取得がある場合：FooContainer（データ取得） / FooPresenter（表示）
      - データ取得がない場合：Foo のみ（分割しない）
    - なお、本来データ取得があり、仮実装でモックデータの直接インポートをする場合もデータ取得としてみなす
    - page.tsx から呼び出す際も、データ取得がなければ FooPage を直接呼び出す（FooPageContainer は作らない）
- React のベストプラクティスを採用する
- Nextjs のベストプラクティスを採用する
- アクセシビリティーを考慮する

#### RSC

- RSC ファーストの設計を行う
- データフェッチは data/フォルダに関数を作成して呼び出すだけにする
- データフェッチは極力末端のコンポーネントで行う。

#### クライアントコンポーネント

- インタラクティブな要素はクライアントコンポーネントに切り出す
- 基本的に直接サーバーアクションをインポートして呼び出し、引数として受け取らない
- ロジックはカスタム hook に切り出す
- useEffect は最小限に使用する
  - 公式ドキュメントの「そのエフェクトは不要かも」を参考にする
- フォームは react-hook-form と shadcn の Form コンポーネントを利用する

#### その他

##### page.tsx

- 必ず RSC として実装する
- NextPage コンポーネントを定義し、デフォルトエクスポート
- Nextjs の固有機能に関する責務を負う
  - SearchParams のパースや next/\* パッケージの機能を利用するもの
- 実際のページの機能は ○○Page 関数として別ファイルに切り出して呼び出す
- 引数は NextPageProps 型として、 "@/lib/nextjs/next-page.js からインポートする
- params, searchParams を使用する場合は parseParams, parseSearchParams を同階層の next-page-props.ts 定義してパースする

例: page.tsx

```tsx
import * as v from "valibot";

import type { NextPageProps } from "@/lib/nextjs/next-page";
import { fail, succeed } from "@/lib/result";

export default function NextPage({ params, searchParams }: NextPageProps) {
  const parsedParams = parseParams(params);
  const parsedSearchParams = parseSearchParams(searchParams);

  if (!parsedParams.success || !parsedSearchParams.success) {
    return <div>適切なエラーメッセージ</div>;
  }

  const { id } = parsedParams.data;
  const { bar } = parsedSearchParams.data;

  return <FooPageContainer id={id} bar={bar} />;
}
```

例： next-page-props.ts

```ts
function parseParams(params: unknown) {
  const result = v.safeParse(
    v.object({
      foo: v.string(),
    })
  );

  if (!result.success) {
    return fail(result.error);
  }

  return succeed(result.data);
}

function parseSearchParams(searchParams: unknown) {
  const result = v.safeParse(
    v.object({
      bar: v.string(),
    })
  );

  if (!result.success) {
    return fail(result.error);
  }

  return succeed(result.data);
}
```

#### foo-page.tsx

- ○○Page 関数を定義しエクスポートする
- RSC で実装する
- 必要なパラメーターを個別に受け取る(searchParams のまま受け取らない)
  - type FooPageContainerProps = {fooId:string, barCount: number}

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

- スタイルは VRT で行うためコンポーネントテストから除外する
  - className の付与されているかのテストなど
- クライアントコンポーネント、もしくはユニバーサルコンポーネントを対象とする
  - async コンポーネントを RSC と判定する
- テストの対象と同じ階層に配置する
- 結合テストはなるべく上位のコンポーネントから行い、多くが結合した状態で実施する
- Mock は最小限にする
- 原則としてアクセシビリティによるクエリのみを使用する

### E2E

- 重要なシナリオについてのみ作成する
- 原則としてアクセシビリティによるクエリのみを使用する

### VRT

- Playwright を使用

## 開発方法

### フロー

1. 詳細な作業計画を立て合意を得る
2. TDD を元に開発を行う

### 補足

- lint エラーの修正は 2 回試みて治らなかったらユーザーに相談する
- テストを 2 回実施・修正しても通らなかったらユーザーに相談する

## 他

- ユーザーが質問してきた際は質問に対する回答のみをする
- ユーザーの依頼に対して、作業前にユーザーに合意を得るまで調査と作業計画を立てる
