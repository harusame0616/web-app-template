# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

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

## 設計方針

### RSC（React Server Components）

- 基本的に RSC で実装する
- RSC でデータフェッチを行うことを優先する
  - 例 user-data.ts / getUserById(), getUsers()
  - 上位で取得して props で drill down するのではなく、コンポーネントの末端で取得する

### RCC（React Client Component）

- RCC での実装は極力避ける
- インタラクションが必用な場合にのみ別ファイルに切り出し RCC で実装する

#### Server Action

- ミューテーションを伴う操作は基本的に Server Action で実装する
- レスポンスは Result 型とし、 succeed() と fail() 関数を使う
- 操作するサーバーアクションごとに do-entity-action.ts ファイルを作成し、doEntityAction を定義
  - 例：create-user-action.ts / createUserAction
  - nextjs 固有機能に関するハンドリング
    - revalidatePath
  - HTTP リクエスト処理（ヘッダーの取得など）
  - 受け取ったパラメーターをパースし、実際の処理に引き渡す
  - try-catch で包括的なエラーハンドリング
  - クライアントコンポーネントからの呼び出しの場合は Object を受け取る
  - サーバーコンポーネントの form から呼び出される場合は FormData を受け取る
- 実際の処理（ビジネスロジック）は do-entity.ts ファイルの doEntity 関数として実装する
  - 例： create-user.ts / createUser
- createAction 関数を使用して定義する
- createAction で inputSchema を定義する際は、中間変数を使わず直接 v.object() を渡す

#### Route Handler

- Route Handler での実装は極力避け、RSC でのデータフェッチもしくは Server Action を優先する
- 使用例：
  - クライアントコンポーネントから SWR でのデータフェッチ
  - cron 用のバッチ処理のエントリーポイント
  - ファイルダウンロード用
  - その他 Server Action や RSC でのデータフェッチで出来ない場合

#### Container/Presentational パターン

- データフェッチが発生する場合は Container/Presentational パターンを利用する
  - 関数名のサフィックスに Container / Presenter を使用する
    例：
    Page
    └── EntitiesContainer (データ取得・ビジネスロジック)
    └── EntitiesPresenter (UI 表現)
    └── Entity (個別の UI コンポーネント)

### SearchParams

- SearchParams のままデータを持ち回らずビジネスロジックのモデルを定義して page でパースする

例

```ts
// entities-search-condition.ts
const entitiesSearchConditionSchema = v.object({
  page: v.optional(v.number(), 1),
})

export EntitiesSearchCondition = v.inferOutput<typeof entitiesSearchConditionSchema>


// search-params.ts
export function parseSearchParams(searchParams: SearchParams): EntitiesSearchCondition {
  return v.parse(v.object({
    page: v.pipe(v.string(), v.regex(/\d+/), v.transform(Number))
  }), searchParams)
}
```

### Suspense

- データフェッチは Suspense でローディングを表示する
- CLS（Cumulative Layout Shift）防止用のスケルトンを作成して表示する

### その他

- コメント：コードで自明なことは避け、「なぜ」そうしているのかを説明
- useEffect：エスケープハッチとして極力避ける
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
| Linter                 | Biome                       |
| Formatter              | Prettier                    |
| 時刻ライブラリ         | date-fns                    |
| アイコン               | lucide-react                |
| CI/CD                  | GitHub Actions              |
| モノレポ管理           | Turbo Repo & pnpm workspace |
| ビルドキャッシュ       | Turbo Repo                  |

## ファイル命名規則とコロケーション

- **ファイル名**: kebab-case（例: user-profile.tsx）
- **コロケーション**: 関連ファイルは同じディレクトリに配置
  ```
  apps/entities/
  ├── entities.tsx (Container も Presenter も RSC の場合は同一ファイル)
  ├── entities-search-container.tsx
  ├── entities-search-form-presenter.tsx (Presenter がクライアントコンポーネントの場合はファイルも分離)
  ├── page.tsx (nextjs のページファイル、データ取得はコンポーネントの末端で行う)
  ```

## テスト戦略詳細

- 内部実装ではなく振る舞いをテストする
- 極力 Mock を避け、統合されたテストを行う

### E2E（Playwright）

- 主要なユーザーフロー
- クリティカルパスのみ
- 例: VMD 登録 → 一覧表示 → 詳細確認

### Component（Testing Library + Vitest）

- クライアントコンポーネントの振る舞い
- ユーザーインタラクション
- e2e でカバーされない細かい動作

### Integration/Medium（Vitest）

- Server Actions
- Route Handlers
- 外部 API 連携

### Unit/Small（Vitest）

- ユーティリティ関数
- カスタムフック
- ビジネスロジック
