# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 必須コマンド

### 開発

1. 開発サーバーを起動 (http://localhost:3000)

```bash
pnpm dev
```

2. プロダクションビルド

```bash
pnpm build
```

3. プロダクションサーバーを起動

```bash
pnpm start
```

### 依存

1. 依存パッケージのインストール

```bash
pnpm --filter <AppName> add <PackageName>
```

2. shadcn/ui のコンポーネント追加

```bash
pnpm --filter web dlx shadcn@latest add <ComponentName>
```

### コード品質

1. Lint チェック

```bash
pnpm lint:check
```

2. Lint 修正

```bash
pnpm lint:fix
```

3. フォーマットチェック

```bash
pnpm format:check
```

4. フォーマット修正

```bash
pnpm format:fix
```

### テスト

1. small, medium, コンポーネントテスト

```bash
pnpm test
```

2. E2E テスト

```bash
pnpm test:e2e:list-reporter
```

### DB

1. DB リセット

```bash
pnpm db:reset
```

2. DB 起動

```bash
pnpm dlx supabase start
```

## MCP ツール

1.Playwright

- 開発や、調査、エラー解決、テストの作成ために Playwright を使用して開発サーバーにアクセスできます

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
| Linter                 | Biome                       |
| Formatter              | Prettier                    |
| 時刻ライブラリ         | date-fns                    |
| アイコン               | lucide-react                |
| CI/CD                  | GitHub Actions              |
| モノレポ管理           | Turbo Repo & pnpm workspace |
| ビルドキャッシュ       | Turbo Repo                  |

## アーキテクチャ概要

認証機能と管理画面を備えた Next.js 15 の Web アプリケーションテンプレートです。

### プロジェクト構造

- `apps/web/` - Next.js App Router のページとレイアウト
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

### ファイル

- ケバブケース

### 共通

- 技術要素のネーミングを避ける
  - e.g. FooComponent
- デザインパターンを採用した場合はデザインパターンの名前を明示する
  - Container/Presentational Pattern -> FooContainer / FooPresenter

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
- パスカルケース

## 設計指針

### 共通

- ファイル配置はコロケーションを最優先とする
- 共通で使うものは components に切り出し共通利用する
- interface より type を優先する
- className の動的な統合は cn 関数を使用する
- エラーメッセージは日本語で表示
- 関数定義時の型は常に明示する
- TypeScript の enum は利用は避け const オブジェクトを利用する
- バリデーションには valibot を利用する
- 冗長なコメントは排除し、why の説明が必要な場合にのみ記載する

### フロントエンド

#### 一般

- Suspense とスケルトンを活用しローディング状態を明示する
  - スケルトンは CLS が発生しないように実装する
- useMemo / memo / useCallback は React コンパイラーに任せるため使用を避ける
- データフェッチはページなどの上位で行うのを避け、そのデータを必要とする末端のコンポーネントで行う
- データの取得がある場合 Container/Presentational パターンを利用する
  - Container : RSC でデータフェッチの責務を負う
  - Presenter: コンポーネントが表示の責務を負うことを優先する(RSC/クライアントコンポーネント)
  - データ取得がない場合は Container/Presenter を分けずに作成する
    - データ取得がある場合 FooContainer / FooPresenter
    - データ取得がない場合：Foo
    - 仮実装でモックデータの直接インポートをする場合もデータ取得としてみなす

// foo-container.tsx

```ts
type FooContainerProps = {
  id: string;
};
async function FooContainer({ id }: FooContainerProps) {
  const foo = await getFooById(id);

  return <FooPresenter foo={foo} />;
}
```

// foo-presenter.tsx

```tsx
"use client";

type FooPresenterProps = {
  foo: Foo;
};
function FooPresenter({ foo }: FooPresenterProps) {
  return <div>{foo.name}</div>;
}
```

#### アクセシビリティ

- アクセシビリティーを考慮する
- **ボタンとリンクの適切な使い分け**
  - ナビゲーション（ページ遷移）: `<a>` タグまたは `Link` コンポーネントを使用し、見た目もリンクらしくする
  - アクション（同じページでの操作）: `<button>` タグまたは `Button` コンポーネントを使用
  - ボタンをリンクのように見せたり、リンクをボタンのように見せることは避ける（ユーザーの期待と支援技術の挙動が一致しないため）
  - リンクには右クリックメニューや Ctrl/Cmd+クリックなどのブラウザ機能が期待されることを考慮する

#### RSC

- RSC ファーストの設計を行う
- データフェッチ Container で行い data フォルダに関数を作成して呼び出すだけにする

#### クライアントコンポーネント

- インタラクティブな要素はクライアントコンポーネントに切り出す
- 基本的に直接サーバーアクションをインポートして呼び出し、引数として受け取らない
- サーバーアクションを呼び出す際は `handleServerAction` を使用する
  - `lib/handle-server-action.ts` からインポート
  - version skew 対策として result が undefined の場合も適切にハンドリングされる
- ロジックはカスタム hook に切り出す
- useEffect は最小限に使用する
  - 公式ドキュメントの「そのエフェクトは不要かも」を参考にする
- フォームは react-hook-form と shadcn の Form コンポーネントを利用する
  - resolver には valibotResolver を利用する
- 表示に関わるロジック以外は hooks に切り出す

### CI/CD

- concurrency を必ず設定し、同時実行を防ぐ
- job には必ず timeout を設定する
- node のバージョンは .node-version を参照する
- pnpm のバージョンを未指定にする
- name は日本語で設定する

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

  return <FooPage id={id} bar={bar} />;
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

  ```tsx
  export function FooPage({ fooId, barCount }: FooPageContainerProps) {
    return (
      <>
        <Suspense fallback={<FooSkeleton />} key={fooId}>
          <FooContainer fooId={fooId} barCount={barCount} />
        </Suspense>
        <Suspense fallback={<BarSkeleton />} key={barCount}>
          <BarContainer />
        </Suspense>
      </>
    );
  }
  ```

### バックエンド

#### データフェッチ

- 使用するファイルと同じ階層の `_data` フォルダにファイルを配置
- 取得するデータごとの ○○.ts というファイルを作成し、専用のフェッチ関数を作成する
- それぞれの関数を `index.ts` で export する

例

- \_data
  - index.ts
  - foo.ts

```ts
// index.ts
export * from "./foo";
```

```ts
// foo.ts
export function fetchFoo(fooId: string) {
  return prisma.foo.findUnique({
    where: {
      id: fooId,
    },
  });
}
```

#### ルートハンドラー

- ミューテーションを伴わないクライアントからのサーバー操作にルートハンドラーを使用する
  - ファイルダウンロードやクライアントコンポーネントからのデータフェッチなど
- ミューテーションの場合でも Server Action で代替できない場合は使用する

#### サーバーアクション

- ミューテーションを伴う操作にサーバーアクションを使用する
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
- サーバーアクシションは createAction 関数を使用して定義する
- createAction で inputSchema を定義する際は、中間変数を使わず直接 v.object() を渡す

ファイル構成例：

- \_actions/
  - index.ts
  - evaluate-action.ts
  - evaluate.ts

## テスト

### 共通

- 内部仕様ではなく振る舞いをテストする

### スモールテスト

- vitest を使用する
- ファイル名は `*.small.test.ts`
- テストの対象のファイルと同じ階層に配置
- test/expect を使用

### ミディアムテスト

- vitest を使用する
- ファイル名は `*.medium.test.ts`
- テストの対象のファイルと同じ階層に配置
- test/expect を使用
- vitest.extend を使用して必要な DB の状態を作成した test fixture を作成する
  - test-fixtures.ts に定義する
  - 作成するデータは他のテストに影響を与えないようにすること
  - 作成したデータはテスト後に削除すること

```ts
// test-fixtures.ts
const testWithFoo = test.extend({
  foo: async ({}, use) => {
    const id = uuidv7();
    const foo = await prisma.foo.create({
      data: {
        id,
        name: "test",
      },
    });

    await use(foo);

    await prisma.foo.delete({
      where: { id },
    });
  },
});

// example.test.ts
testWithFoo("example", async ({ foo }) => {
  changeName(foo.id, "test2");
  expect(foo.name).toBe("test2");
});
```

### コンポーネントテスト

- vitest と testing-library/react を使用する
- ファイル名は `*.browser.test.ts`
- スタイルは VRT で行うためコンポーネントテストから除外する
  - className の付与されているかのテストなど
- テストの対象のファイルと同じ階層に配置する
- 結合テストはなるべく上位のコンポーネントから行い、多くが結合した状態で実施する
- Mock は最小限にする
- 原則としてアクセシビリティによるクエリのみを使用する
- test/expect を使用する

### E2E

- Playwright を使用する
- ファイル名は `*.e2e.test.ts`
- 重要なシナリオに絞って作成する
  - どのようなシナリオが重要か調査すること
- 原則としてアクセシビリティによるクエリのみを使用する
- test.step を使い、ステップ毎にわける
- 一連のシナリオをまとめてテストする
  - 例：新規作成して、編集して、削除するなど

### VRT

- Playwright を使用

## 開発方法

### フロー

1. テストの作成、修正を行う
   - ページ単位の e2e, クライアントコンポーネントのテスト、サーバーアクション、ルートハンドラー、その他関数のスモール、ミディアムテスト
2. 実装を行う
3. テスト及び lint を実行し、エラーがないことを確認する
4. エラーがある場合、問題が実装なのかテストなのか判断し、1 もしくは 2 に戻る
5. コードのフォーマットを行う

### 補足

- lint エラーの修正は 2 回試みて治らなかったらユーザーに相談する
- テストを 2 回実施・修正しても通らなかったらユーザーに相談する
- コミットは適切な粒度で分ける
  - 「1 つの目的を持つ最小の論理的変更単位」でコミットする
  - レビュアーが「なぜ」と「何を」変更したか即座に理解できる粒度を保つ
  - 例：機能追加、リファクタリング、ドキュメント更新は別々のコミットにする

## 他

- ユーザーが質問してきた際は質問に対する回答のみをする
- 作業内容が明確になるまでユーザーに確認をすること
